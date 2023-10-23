function middlewareLikeThing(app) {
    return (event, context) => {
        return app(event, context);
    }
}

export const handler = middlewareLikeThing((e) => { 

    return {
        statusCode: 200,
        body: JSON.stringify({
            message: 'hi'
        })
    }
});