import { describe, expect, test } from "vitest";
import { wrap } from '../src/index';
import { NodeTracerProvider, ReadableSpan } from "@opentelemetry/sdk-trace-node";
import { Resource } from "@opentelemetry/resources";

let spans: ReadableSpan[] = [];

function setupOtelTestHarness() {
    const provider = new NodeTracerProvider({
        resource: new Resource({
            "testing": true,
        }),
    });

    provider.register();

    provider.addSpanProcessor({
        forceFlush: async () => console.log('im called'),
        onStart: (span, context) => { },
        onEnd: (span) => { spans.push(span); },
        shutdown: async () => console.log('im called'),
    })

    return {
        getSpan() {
            return spans.pop();
        }
    }
}


async function asyncHandler(event, context) {
    return "async lambda go brrr"
};

function callbackHandler(event, context, callback) {
    callback(null, "callback lambda go brrr");
}

const context = {
    functionName: "test",
    awsRequestId: "1234",
    invokedFunctionArn: "arn:aws:lambda:us-east-1:123456789012:function:test",
    callbackWaitsForEmptyEventLoop: false,
    memoryLimitInMB: "128",
    logGroupName: "test",
    logStreamName: "test",
    getRemainingTimeInMillis: () => 1000,
    functionVersion: "1",
    invokedFunctionUniqueIdentifier: "1",
    done: () => { },
    fail: () => { },
    succeed: () => { }

}
describe("wrap", () => {
    const { getSpan } = setupOtelTestHarness()
    test("should wrap a callback lambda handler and not error", async () => {
        const wrapped = wrap(callbackHandler);
        await wrapped({}, context, (err, result) => {
            expect(result).toBe("callback lambda go brrr");

        });

        const span = getSpan();
        expect(span).toBeDefined();
        expect(span?.name).toBe("test");
        expect(span?.attributes.result).toBe("callback lambda go brrr");


    });
    test.only("should wrap a async lambda handler and not error", async () => {
        const wrapped = wrap(asyncHandler);
        const result = await wrapped({}, context, () => {});
        const span = getSpan();
        expect(span).toBeDefined();
        expect(span?.name).toBe("test");
        expect(span?.attributes.result).toBe("async lambda go brrr");

        expect(result).toBe("async lambda go brrr");
    });


});