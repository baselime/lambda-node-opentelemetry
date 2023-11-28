import path from "path";
import { Handler } from "aws-lambda";
let diagnostics: Error[] = []

async function _tryImport(path: string): Promise<false | Record<string, Handler>> {
    try {
        return await import(path);
    } catch (err) {
        if (err instanceof Error && !err.message.includes('file exist?') && !err.message.includes("Cannot find module")) {
            diagnostics.push(err)
        }
        return false
    }
}

export async function load(taskRoot: string, originalHandler: string) {
    diagnostics = []
    if (originalHandler.includes('..')) {
        throw Error(`${originalHandler} is not a valid handler, it must not contain '..'`);
    }
    const pathDetails = path.parse(originalHandler);

    const functionName = pathDetails.ext.slice(1);

    const functionPath = path.resolve(taskRoot, pathDetails.dir, pathDetails.name);
    const lambda = await _tryImport(functionPath + '.js') || await _tryImport(functionPath + '.mjs') || await _tryImport(functionPath + '.cjs');
    
    if (diagnostics.length > 0) {
        process.stdout.write(`Diagnostics load for ${originalHandler}\n${diagnostics.map(d => JSON.stringify({ name: d.name, message: d.message, stack: d.stack })).join('\n')}\n`)
    }

    if (lambda === false) {
        throw Error(`Could not load ${originalHandler}`);
    }
   
    if(typeof lambda[functionName] !== 'function') {
        if(typeof lambda.default === 'object' && typeof lambda.default[functionName] === 'function') {
            return lambda.default[functionName];
        }
        throw Error(`Handler path format not supported for OpenTelemetry Auto Instrumentation. Please contact Baselime \n ${originalHandler} \n ${JSON.stringify(lambda)}`)
    }

    return lambda[functionName];
}
