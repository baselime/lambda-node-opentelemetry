# Lambda Opentelemetry for Node.JS
[![Documentation][docs_badge]][docs]
[![Latest Release][release_badge]][release]
[![License][license_badge]][license]

The `@baselime/lambda-node-opentelemetry` package instruments your lambda functions and automatically ships OTEL compatible trace data to Baselime. This is the most powerful and flexible way to instrument your node service.


## Getting started

Wrap your handlers with the `baselime.wrap(handler)` method.

Example

```javascript
import baselime from '@baselime/lambda-node-opentelemetry'

async function main(event, context) {
   // your lambda handler
}

export const handler = baselime.wrap(main);

```

For production systems you should remove the latency overhead of sending open telemetry data by adding the baselime-extension layer.

```javascript
`arn:aws:lambda:${region}:097948374213:layer:baselime-extension-${'x86_64' || 'arm64'}:1`
```

## Manual Installation

Install the `@baselime/lambda-node-opentelemetry` package

```bash
npm install @baselime/lambda-node-opentelemetry
```

Add the following environment variables to your service

| Key                | Example                         | Description                                                                         |
| ------------------ | ------------------------------- | ----------------------------------------------------------------------------------- |
| BASELIME_KEY  | nora-is-the-cutest-baselime-dog | Get this key from the [cli](https://github.com/Baselime/cli) running `baselime iam` |
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
arc env -e production --add BASELIME_KEY tux-is-the-smartest-baselime-dog
arc env -e production --add -- NODE_OPTIONS '--require @architect/shared/lambda-wrapper'
```

> Watch out for the '--' in the NODE_OPTIONS command. This is required to escape options parsing.


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
    BASELIME_KEY: ${env:BASELIME_KEY}
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
    BASELIME_SERVICE: stack.stackName,
    BASELIME_KEY: process.env.BASELIME_KEY
  },
  bundle: {
    format: "esm",
    copyFiles: [{ from: "./lambda-wrapper.js", to: "./lambda-wrapper.js" }],
  },
});
```

## Automatic Instrumentation

WIP - you still need to manually apply baselime.wrap(handler). This will be automated in future versions.

## SST

```typescript
import { LayerVersion } from "aws-cdk-lib/aws-lambda";

const baselime = LayerVersion.fromLayerVersionArn(
  stack,
  "BaselimeLayer",
  `arn:aws:lambda:${stack.region}:097948374213:layer:BASElIME-node:2`
);

if (!scope.local) {
  stack.addDefaultFunctionLayers([baselime]);
  stack.addDefaultFunctionEnv({
    AWS_LAMBDA_EXEC_WRAPPER: '/opt/baselime',
    BASELIME_KEY: process.env.BASELIME_KEY
  });
}
```

## Serverless

```yml
provider:
  ...
  layers:
    - arn:aws:lambda:${opt:region}:097948374213:layer:BASElIME-node:2
  environment:
    AWS_LAMBDA_EXEC_WRAPPER: '/opt/baselime',
    BASELIME_KEY: ${env:BASELIME_KEY}
```

## Architect

```
// app.arc
@aws
layers
  arn:aws:lambda:{{ region }}:097948374213:layer:BASElIME-node:2
```

Add the environment variables to your architect project

```bash
arc env -e production --add BASELIME_KEY tux-is-the-smartest-baselime-dog
arc env -e production --add AWS_LAMBDA_EXEC_WRAPPER /opt/baselime
```

## Send data to another OpenTelemetry Backend

Add the environment variable `COLLECTOR_URL` to send the spans somewhere else.

## License

&copy; Baselime Limited, 2023

Distributed under MIT License (`The MIT License`).

See [LICENSE](LICENSE) for more information.

<!-- Badges -->

[docs]: https://baselime.io/docs/
[docs_badge]: https://img.shields.io/badge/docs-reference-blue.svg?style=flat-square
[release]: https://github.com/baselime/lambda-node-opentelemetry/releases/latest
[release_badge]: https://img.shields.io/github/release/baselime/lambda-node-opentelemetry.svg?style=flat-square&ghcache=unused
[license]: https://opensource.org/licenses/MIT
[license_badge]: https://img.shields.io/github/license/baselime/lambda-node-opentelemetry.svg?color=blue&style=flat-square&ghcache=unused
