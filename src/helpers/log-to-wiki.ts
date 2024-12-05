import { ScriptRunResult, Status } from "../definitions";
import * as process from "node:process";
import { updateWiki } from "../lib/github-wiki";

//TEMP
// const scriptRunResult: ScriptRunResult = {
//     overallStatus: true,
//     details: [
//         { success: true, resource: "MongoDB collection 5", info: "Line 1 details." },
//         { success: false, resource: "MongoDB collection 16", info: "Line 2 details." },
//         { success: true, resource: "MongoDB collection 31", info: "Line 3 details." }
//     ]
// };
//const scriptName = `test-script.js`;
//const environment = `DEV`;
//const initiator = `David Spiller TME`;

const scriptName = process.env["SCRIPT_NAME"];
const environment = process.env["RUN_ENV"];
const scriptOutput = process.env["SCRIPT_OUTPUT"];
const initiator= process.env["RUN_INITIATOR"];
const token = process.env['GITHUB_TOKEN'];
const repository = process.env['GITHUB_REPOSITORY']; // Format: owner/repo
const wikiReposUrl = `https://github-actions:${token}@github.com/${repository}.wiki.git`;

let scriptRunResult: ScriptRunResult;
if (scriptOutput) {
    scriptRunResult = JSON.parse(scriptOutput) as ScriptRunResult;
} else {
    scriptRunResult = {
        overallStatus: Status.UNKNOWN,
        details: [
            { status: Status.UNKNOWN, resource: "Unknown", info: "No information returned from the script." }
        ]
    };
}



const getStatusIcon = (status: Status) => {
    enum Icon {
        SUCCESS = `✅`,
        FAILURE = `❌`,
        SKIPPED = `⏭️`,
        UNKNOWN = `❓`
    }

    return status === Status.SUCCESS
            ? Icon.SUCCESS
            : scriptRunResult.overallStatus === Status.FAILURE
                ? Icon.FAILURE
                : scriptRunResult.overallStatus === Status.SKIPPED
                    ? Icon.SKIPPED
                    : Icon.UNKNOWN;
}

export const createWikiSummary = () => {
    const timestamp = new Date().toISOString();
    let summary = ``;

    let overViewTable = `# ${scriptName}:\n`;
    overViewTable += `| Run Status | Env | Timestamp | Initiator |\n`;
    overViewTable += `|:---:|:---:|:---:|:---|\n`;
    overViewTable += `| ${getStatusIcon(scriptRunResult.overallStatus)} | ${environment} | ${timestamp} | ${initiator} |\n`;

    let detailsTable = `### Run details:\n`;
    detailsTable += `| Status | Resource | Details |\n`;
    detailsTable += `|:---:|:---|:---|\n`;

    scriptRunResult.details.forEach((detail) => {
        const detailSuccessIcon = `${getStatusIcon(detail.status)}`;
        detailsTable += `| ${detailSuccessIcon} | ${detail.resource} | ${detail.info} |\n`;
    });

    summary += overViewTable;
    summary += detailsTable;
    summary += `\n---\n`;

    //TEMP
    console.log("\n");
    console.log(summary);

    //return summary;....or write to wiki
    const today=  timestamp.substring(0,9);
    const pagePath = `SCRIPT_RUNS:${today}`;
    updateWiki(wikiReposUrl, pagePath, summary);
};



//TEMP
createWikiSummary();
