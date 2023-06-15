import { lambdaWrapper } from './index';

if(!process.env.BASELIME_ORIGINAL_HANDLER) {
 throw Error('BASELIME_ORIGINAL_HANDLER not set');
}

const [path, functionName] = process.env.BASELIME_ORIGINAL_HANDLER.split('.');
console.log(path, functionName)
const originalHandler = await import(path + '.mjs')[functionName];

export const handler = lambdaWrapper(originalHandler);