# 🎸 tracer-node

The `@baselime/tracer-node` package instruments your lambda functions and automatically ships OTEL compatible trace data to Baselime. This is the most powerful and flexible way to instrument your node service.

The downside of this node tracer is it adds a small performance hit to each lambda invocation. If this matters to you use our [https://docs.baselime.io/x-ray](x-ray) integration instead.

## Manual Installation

Install the `@baselime/tracer-node` package

```bash
npm install `@baselime/tracer-node`
```

Add the following environment variables to your service

| Key | Example  | Description  |  
|---|---|---|
| BASELIME_OTEL_KEY  |  j45jticf9ui4hj9dfk39fk69dpa | Get this key from your dataset settings  |
|  BASELIME_NAMESPACE | prod-users | The name of the service the traces belong to  |
| NODE_OPTIONS  |  --require node_modules/@baselime/tracer-node/lambda-wrapper | Preloads the tracing sdk at startup |

You need to make sure the lambda-wrapper file is included in the .zip file that is used by aws-lambda. The exact steps depend on the packaging step of the framework you are using.


### SST


### Serverless

By default the serverless framework includes your whole node_module directory in the .zip file. If you are using the `serverless-esbuild` plugin to avoid this then you need to add the following configuration to your project.


https://www.serverless.com/framework/docs/providers/aws/guide/packaging

Add the following line to the `package.patterns` block of your serverless.yml

```yaml
- 'node_modules/@baselime/tracer-node/lambda-wrapper.js'
```

Example

```yaml
package:
  patterns:
    - 'node_modules/@baselime/tracer-node/lambda-wrapper.js'
```



## Customise traces

The `@baselime/tracer-node` package also contains a client to enrich the traces with specific information about your systems that is not picked up by the automatic instrumentation.

To start customising your traces import the client library 

```javascript
import baselime from '@baselime/tracer-node';
// or for cjs
const baselime = require('@baselime/tracer-node');
```

### baselime.label

To add a label to every span in a trace use the baselime.label method. This adds information that will propagate to all the systems that your code interacts with so make sure it does not contain any sensitive information.

```javascript

exports.handler = async (event) => {
  baselime.label('user_id', event.pathParameters.id)
}
```
### baselime.log

To add a timestamped event into the span use the baselime.log method. It works just like a logger :) 


```javascript

exports.handler = async (event) => {

  await linkedAccountToBaselime();
  baselime.log("something amazing just happened", { type: 'amazign thing', quantity: 42 });
}
```

### baselime.enrich

Enrich a span with additional information

```javascript
baselime.erich('a.b.c', 4)
```

### baselime.track

Wrap async functions and add a span to the tree, useful when you want to capture business information as part of a trace

```javascript

// services/customer.js
const baselime = require('@baselime/tracer-node');

async function create(...) {}

module.exports = {

create: baselime.track('customer.create', create)
}

// handler.js
const customer = require('./services/customer');

exports.handler =async (event) => {

  await customer.create(event)
}
```

Now you will see a span called customer.create in the trace with all the information about what the customer.create method did.



