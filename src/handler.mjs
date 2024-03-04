import { wrap } from './index';
import { load } from './load-async'


const actualHandler = process.env.BASELIME_ACTUAL_HANDLER;
const taskRoot = process.env.LAMBDA_TASK_ROOT;

if(typeof taskRoot !== 'string') {
    throw Error('LAMBDA_TASK_ROOT is not defined');
}

if(typeof actualHandler !== 'string') {
    throw Error('BASELIME_ACTUAL_HANDLER is not defined');
}

export const handler = wrap(await load(taskRoot, actualHandler), { 
    timeoutThreshold: 100
});