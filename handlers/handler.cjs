const { loadSync } = require('./loader');
const { wrap } = require('./index');

exports.handler = function (...args) {
    const actualHandler = process.env.BASELIME_ACTUAL_HANDLER;
    const taskRoot = process.env.LAMBDA_TASK_ROOT;

    if(!taskRoot) {
        throw Error('LAMBDA_TASK_ROOT is not defined');
    }

    if(!actualHandler) {
        throw Error('BASELIME_ACTUAL_HANDLER is not defined');
    }

    const handler = loadSync(taskRoot, actualHandler);

    const [event, context] = args
    return wrap(handler)(event, context);
};