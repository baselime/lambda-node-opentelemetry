const { wrap } = require('@baselime/lambda-node-opentelemetry');

exports.handler = wrap(async (event) => {
    console.log(event.Records[0].Sns)
    return {
      message: 'req processed'
    }
});