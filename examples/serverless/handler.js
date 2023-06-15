const { lambdaWrapper } = require('@baselime/lambda-node-opentelemetry');


if (!process.env.BASELIME_ORIGINAL_HANDLER) {
    throw Error('BASELIME_ORIGINAL_HANDLER not set');
}

const [path, functionName] = process.env.BASELIME_ORIGINAL_HANDLER.split('.');
console.log(path, functionName);
const originalHandler = require(path + '.js')[functionName];

export const handler = lambdaWrapper(originalHandler);