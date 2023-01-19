const Dynamodb = require('aws-sdk/clients/dynamodb')
const SNS = require('aws-sdk/clients/sns')
const dynamo = new Dynamodb();
const sns = new SNS();
exports.handler = async (event) => {
    await sns.publish({ TopicArn: process.env.TOPIC_ARN, Message: 'wow much payload' }).promise()

    const random = Math.random()

    if(random > 0.5) {
        const response = await dynamo.updateItem({
            TableName: 'this-table-does-not-exist',
            ReturnValues: 'ALL_NEW',
            Key: {
                id: {
                    S: 'test'
                }
            },
            UpdateExpression: 'ADD #c :c',
            ExpressionAttributeNames: {
                '#c': 'count'
            },
            ExpressionAttributeValues: {
                ':c': { N: '1' }
            }
        }).promise()
    }
    const response = await dynamo.updateItem({
        TableName: process.env.DB_NAME,
        ReturnValues: 'ALL_NEW',
        Key: {
            id: {
                S: 'test'
            }
        },
        UpdateExpression: 'ADD #c :c',
        ExpressionAttributeNames: {
            '#c': 'count'
        },
        ExpressionAttributeValues: {
            ':c': { N: '1' }
        }
    }).promise()
    return {
        statusCode: 200,
        body: JSON.stringify({
            data: response
        })
    }
}