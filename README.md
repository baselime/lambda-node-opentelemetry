# 🎸 Lambda Opentelemetry for Node.JS

The `@baselime/lambda-node-opentelemetry` package instruments your lambda functions and automatically ships OTEL compatible trace data to Baselime. This is the most powerful and flexible way to instrument your node service.

The downside of this node tracer is it adds a small performance hit to each lambda invocation. We are working as hard as possible to minimise this but for now if this matters to you use our [x-ray](https://docs.baselime.io/sending-data/xray/) integration instead.


## Manual Installation

Install the `@baselime/lambda-node-opentelemetry` package

```bash
npm install @baselime/lambda-node-opentelemetry
```

Add the following environment variables to your service

| Key                | Example                         | Description                                                                         |
| ------------------ | ------------------------------- | ----------------------------------------------------------------------------------- |
| BASELIME_OTEL_KEY  | nora-is-the-cutest-baselime-dog | Get this key from the [cli](https://github.com/Baselime/cli) running `baselime iam` |
| BASELIME_NAMESPACE | prod-users                      | The name of the service the traces belong to                                        |
| NODE_OPTIONS       | --require @baselime/lambda-node-opentelemetry      | Preloads the tracing sdk at startup                                                 |

Get the baselime key using our [cli](https://github.com/Baselime/cli) 

```bash
baselime iam
```

You need to make sure the lambda-wrapper file is included in the .zip file that is used by aws-lambda. The exact steps depend on the packaging step of the framework you are using.

> If you use `export const` `export function` or `export default` for your handler you need to rename it to a cjs export like `module.exports = ` or `exports.handler =`. Even if you use esbuild. We are tracking issues in [esbuild](https://github.com/evanw/esbuild/issues/1079) and [open-telemetry](https://github.com/open-telemetry/opentelemetry-js/issues/1946) and are looking to see how we can help out.


### Architect

Copy the lambda-wrapper.js file from our node modules to the shared folder of your architect project, this way it is automatically included in all of your lambdas bundles.

```bash
cp node_modules/@baselime/lambda-node-opentelemetry/lambda-wrapper.js src/shared/
```

Add the environment variables to your architect project

```bash
arc env -e production --add BASELIME_OTEL_KEY tux-is-the-smartest-baselime-dog
arc env -e production --add BASELIME_NAMESPACE project-1
arc env -e production --add -- NODE_OPTIONS '--require @architect/shared/lambda-wrapper'
```

> Watch out for the '--' in the NODE_OPTIONS command. This is required to escape options parsing. This totally didn't frustrate me for a whole day! :D


### Serverless

By default the serverless framework includes your whole node_module directory in the .zip file. If you are using the `serverless-esbuild` plugin to avoid this then you need to add the following configuration to your project.

https://www.serverless.com/framework/docs/providers/aws/guide/packaging

Add the following line to the `package.patterns` block of your serverless.yml

```yaml
- 'node_modules/@baselime/lambda-node-opentelemetry/lambda-wrapper.js'
```

Example

```yaml
package:
  patterns:
    - 'node_modules/@baselime/lambda-node-opentelemetry'
```

Add the following environment variables
```yaml
    BASELIME_OTEL_KEY: ${env:BASELIME_OTEL_KEY}
    BASELIME_NAMESPACE: '${self:provider.stage}-${self:provider.service}'
    NODE_OPTIONS: '--require @baselime/lambda-node-opentelemetry'
```

### SST

> Fun fact Baselime is built using SST :)

Copy the lambda-wrapper file to your srcPath directory

```bash
cp node_modules/@baselime/lambda-node-opentelemetry/lambda-wrapper.js services
```

Then add the default props to include the wrapper in your bundle and add your environment variables


```javascript
app.setDefaultFunctionProps({
  runtime: "nodejs16.x",
  srcPath: "services",
  environment: {
    NODE_OPTIONS: '--require lambda-wrapper.js',
    BASELIME_NAMESPACE: stack.stackName,
    BASELIME_OTEL_KEY: process.env.BASELIME_OTEL_KEY
  },
  bundle: {
    format: "esm",
    copyFiles: [{ from: "./lambda-wrapper.js", to: "./lambda-wrapper.js" }],
  },
});
```

## Automatic Instrumentation [WIP]

Lambda Extension coming soon

## Send data to another OpenTelemetry Backend

Add the environment variable `COLLECTOR_URL` to send the spans somewhere else.