

exports.handler = function handler(e) {
    return {
        statusCode: 200,
        body: JSON.stringify({
            message: 'Hello World!',
        })
    }
}