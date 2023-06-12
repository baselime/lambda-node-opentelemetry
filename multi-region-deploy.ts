import { execSync } from "child_process";
import config from "./multiRegion.json";

console.log(config)
const stage = process.argv[2]

if(!stage) {
    console.error("Please specify a stage")
    process.exit(1)
}
async function deployToRegion(region: string) {
    const result = execSync(`npm run deploy -- --stage ${stage} --region ${region}`)
    console.log(result.toString())
}

for(let region of config.regions) {
    deployToRegion(region)
}