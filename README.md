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
|  BASELIME_SERVICE_NAME | prod-users | The name of the service the traces belong to  |
| NODE_OPTIONS  |  --require node_modules/@baselime/tracer-node/lambda-wrapper | Preloads the tracing sdk at startup |

You need to make sure the lambda-wrapper file is included in the .zip file that is used by aws-lambda. The exact steps depend on the packaging step of the framework you are using.

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

[WIP]

