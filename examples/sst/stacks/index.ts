import { MyStack } from "./MyStack";
import { App } from "@serverless-stack/resources";

export default function (app: App) {
	app.setDefaultFunctionProps({
		runtime: "nodejs16.x",
		srcPath: "services",
		bundle: {
			format: "esm",
			copyFiles: [{ from: "./lambda-wrapper.js", to: "./lambda-wrapper.js" }],
		},
	});
	app.stack(MyStack);
}
