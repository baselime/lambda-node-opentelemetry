import path from "path";
import { Handler } from "aws-lambda";
let diagnostics: Error[] = []

async function _tryImport(path: string): Promise<false | Record<string, Handler>> {
    try {
        return await import(path);
    } catch (err) {
        if (err instanceof Error) {
            diagnostics.push(err)
        }
        return false
    }
}

export async function load(taskRoot: string, originalHandler: string) {
    if (originalHandler.includes('..')) {
        throw Error(`${originalHandler} is not a valid handler, it must not contain '..'`);
    }
    const pathDetails = path.parse(originalHandler);

    const functionName = pathDetails.ext.slice(1);

    const functionPath = path.resolve(taskRoot, pathDetails.dir, pathDetails.name);
    const lambda = await _tryImport(functionPath + '.js') || await _tryImport(functionPath + '.mjs');
    if (lambda === false) {
        if (process.env.BASELIME_DEBUG && diagnostics.length > 0) {
            process.stdout.write(`Diagnostics load for ${originalHandler}\n${diagnostics.map(d => JSON.stringify({ name: d.name, message: d.message, stack: d.stack })).join('\n')}\n`)
        }
        throw Error(`Could not load ${originalHandler}`);
    }
    return lambda[functionName];
}
