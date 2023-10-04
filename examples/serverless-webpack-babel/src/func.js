export default async (event, context) => { 
    console.log('im alive');
    return {
        statusCode: 200,
        body: JSON.stringify({
            message: 'Hello World!',
        })
    }
}