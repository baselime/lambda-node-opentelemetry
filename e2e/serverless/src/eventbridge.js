
exports.handler = async (event, context) => {
    context.callbackWaitForEmptyEventLoop = false;
    console.log(event)
    return {
      message: 'req processed'
    }
};