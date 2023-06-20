import { load } from '../src/loader.js';
import { wrap } from '../src/index.js';

export const handler = async function (...args) {
    const actualHandler = process.env.BASELIME_ACTUAL_HANDLER;
    const taskRoot = process.env.LAMBDA_TASK_ROOT;

    if(!taskRoot) {
        throw Error('LAMBDA_TASK_ROOT is not defined');
    }

    if(!actualHandler) {
        throw Error('BASELIME_ACTUAL_HANDLER is not defined');
    }

    const handler = await load(taskRoot, actualHandler);

    const [event, context] = args
    return wrap(handler)(event, context);
};