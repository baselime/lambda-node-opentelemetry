const { wrap } = require('@baselime/lambda-node-opentelemetry');

exports.handler = wrap(async (event) => {
    console.log(event)
    return {
      message: 'req processed'
    }
});