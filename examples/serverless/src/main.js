const tiny = require("tiny-json-http");
const { context, trace } = require("@opentelemetry/api");
const { flattenObject } = require("./utils");

async function track(name, func, args) {
  const tracer = trace.getTracer(name);

  const attrIn = flattenObject(args, "name.args");

  const span = tracer.startSpan(name, {
    attributes: attrIn,
  });
  const ctx = trace.setSpan(context.active(), span);

  const result = await context.with(ctx, func, null, args);

  const attrOut = flattenObject(result, `${name}.result`);
  span.setAttributes(attrOut);
  span.end();
  return result;
}

function trackAll(name, lib) {
  const tracedLib = {};
  Object.values(lib).forEach((func) => {
    tracedLib[func] = (args) => track(`${name}.${func}`, func, args);
  });
  return tracedLib;
}

exports.handler = async (e) => {
  const { body: customer } = await track("tiny.get", tiny.get, {
    url: `${process.env.API_URL}/hello`,
  });

  await track("tiny.post", tiny.post, {
    url: "https://eo9ex1o5i2mrla8.m.pipedream.net",
    data: customer,
  });

  return customer;
};