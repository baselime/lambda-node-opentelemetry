import Dynamodb from 'aws-sdk/clients/dynamodb';
import SNS from 'aws-sdk/clients/sns';
import EventBridge from 'aws-sdk/clients/eventbridge';

const dynamo = new Dynamodb();
const sns = new SNS();
const eventbridge = new EventBridge();

export const handler = async (event, context) => {
    context.callbackWaitForEmptyEventLoop = false;
    await sns.publish({ TopicArn: process.env.TOPIC_ARN, Message: 'wow much payload' }).promise()
    await eventbridge.putEvents({
        Entries: [{
            Source: 'baselime',
            Detail: JSON.stringify({ comment: "too many chickens" }),
            DetailType: 'comment',
            Resources: [],
        }]
    }).promise()
    const random = Math.random();
    // if(random < 0.3) {
    //     const response = await dynamo.updateItem({
    //         TableName: 'this-table-does-not-exist',
    //         ReturnValues: 'ALL_NEW',
    //         Key: {
    //             id: {
    //                 S: 'test'
    //             }
    //         },
    //         UpdateExpression: 'ADD #c :c',
    //         ExpressionAttributeNames: {
    //             '#c': 'count'
    //         },
    //         ExpressionAttributeValues: {
    //             ':c': { N: '1' }
    //         }
    //     }).promise()
    // }
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
};
