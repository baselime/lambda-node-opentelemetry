
exports.handler = (event, context, callback) => {
    context.callbackWaitForEmptyEventLoop = false;
    console.log(event.Records[0].Sns);
    return callback(null, {
      message: 'req processed'
    })
};