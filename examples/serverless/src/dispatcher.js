
exports.handler = async (event, context) => {
    context.callbackWaitForEmptyEventLoop = false;
    console.log(event.Records[0].Sns)
    return {
      message: 'req processed'
    }
};