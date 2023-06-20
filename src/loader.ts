import path from "path";

async function _tryImport(path:string) {
    try {
        return await import(path);
    } catch(err) {
        return false;
    }

}
export async function load(taskRoot: string, originalHandler: string) {
    if (originalHandler.includes('..')) {
        throw Error(`${originalHandler} is not a valid handler, it must not contain '..'`);
    }
    const pathDetails = path.parse(originalHandler);

    const functionName = pathDetails.ext.slice(1);

    const functionPath = path.resolve(taskRoot, pathDetails.dir, pathDetails.name);

    const lambda = await _tryImport(functionPath + '.js') || await _tryImport(functionPath + '.mjs')

    if (!lambda) {
        throw Error(`Could not load ${functionPath}.js or ${functionPath}.mjs`);
    }
    return lambda[functionName];
}

export function loadSync() {
    throw Error('only esm works just now');
}   