import { load } from './loader.js';
import { wrap } from './index.js';

const actualHandler = process.env.BASELIME_ACTUAL_HANDLER;
const taskRoot = process.env.LAMBDA_TASK_ROOT;

if(!taskRoot) {
    throw Error('LAMBDA_TASK_ROOT is not defined');
}

if(!actualHandler) {
    throw Error('BASELIME_ACTUAL_HANDLER is not defined');
}

export const handler = wrap(await load(taskRoot, actualHandler));