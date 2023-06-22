import { execSync } from "child_process";
import config from "./multiRegion.json";
import { readFile, writeFile } from "fs/promises";

console.log(config)
const stage = process.argv[2]

if (!stage) {
    console.error("Please specify a stage")
    process.exit(1)
}

function deployToRegion(region: string) {
    const result = execSync(`npm run deploy -- --stage ${stage} --region ${region}`)
    console.log(result.toString())
}

async function addLayerToChangeLog() {
    const sstOutput = await import('./.sst/outputs.json');
    const layerArn = sstOutput[`${stage}-lambda-node-opentelemetry-LAYER`].layerArn;
    // arn:aws:lambda:ca-central-1:374211872663:layer:baselime-node:8
    const [account, layer, layerName, layerVersion] = layerArn.split(':').slice(-4);

    const layerStringForUser = `arn:aws:lambda:\${your-region-here}\:${account}:layer:${layerName}:${layerVersion}`
    console.log(layerStringForUser);

    const changeLog = await readFile('./CHANGELOG.md', 'utf8');

    const changeLogSections = changeLog.split('##')
   
    changeLogSections[1] = `${changeLogSections[1]} \n The latest layer is: \`${layerStringForUser}\`\n\n`
    console.log(changeLogSections.join('##'))

    await writeFile('./CHANGELOG.md', changeLogSections.join('##'))
}

for (let region of config.regions) {
    deployToRegion(region)
}

addLayerToChangeLog();

