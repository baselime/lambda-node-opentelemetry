import { execSync } from "child_process";
import { config } from "./multiRegion.js";
import { readFile, writeFile } from "fs/promises";

console.log(config)
const stage = process.argv[2]

if (!stage) {
    console.error("Please specify a stage")
    process.exit(1)
}

function deployToRegion(region: string) {
    try {
        const result = execSync(`npm run deploy -- --stage ${stage} --region ${region}`)
        console.log(result.toString())
    } catch (error) {
        console.log(error.stdout?.toString())
        console.log(error.stderr?.toString())
    }
}


for (let region of config.regions) {
    deployToRegion(region)
}