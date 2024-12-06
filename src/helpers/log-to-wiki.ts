import { ScriptRunResult, Status } from "../definitions";
import * as process from "node:process";
import { updateWiki } from "../lib/github-wiki";

const scriptName = process.env["SCRIPT_NAME"];
const environment = process.env["RUN_ENV"];
const scriptOutput = process.env["SCRIPT_OUTPUT"];
const initiator = process.env["RUN_INITIATOR"];
const token = process.env["GITHUB_TOKEN"];
const repository = process.env["GITHUB_REPOSITORY"]; // Format: owner/repo
const wikiReposUrl = `https://github-actions:${token}@github.com/${repository}.wiki.git`;

let scriptRunResult: ScriptRunResult;
if (scriptOutput) {
    scriptRunResult = JSON.parse(scriptOutput) as ScriptRunResult;
} else {
    scriptRunResult = {
        overallStatus: Status.UNKNOWN,
        overallInfo: "No information returned from the script.",
        details: [{ status: Status.SKIPPED, resource: "Unknown", info: "Unknown" }]
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
        : status === Status.FAILURE
          ? Icon.FAILURE
          : status === Status.SKIPPED
            ? Icon.SKIPPED
            : Icon.UNKNOWN;
};

export const createWikiSummary = () => {
    const timestamp = new Date().toISOString();

    const overViewTableHeader = `# ${scriptName}:\n`;
    const overViewTableContent = `| ${getStatusIcon(scriptRunResult.overallStatus)} | ${environment} | ${timestamp} | ${initiator} |\n`;
    console.log(overViewTableHeader);
    console.log(overViewTableContent);

    let overViewTable = overViewTableHeader;
    overViewTable += `| Run Status | Env | Timestamp | Initiator |\n`;
    overViewTable += `|:---:|:---:|:---:|:---|\n`;
    overViewTable += overViewTableContent;

    let runInfoTable = ``;
    if (scriptRunResult.overallInfo) {
        const runInfoContent = scriptRunResult.overallInfo;
        console.log(runInfoContent);
        runInfoTable += `\n`;
        runInfoTable += `| Run Information |\n`;
        runInfoTable += `|:---|\n`;
        runInfoTable += `| ${runInfoContent} |\n`;
    }

    const detailsTableHeader = `### Run details:\n`;
    console.log(detailsTableHeader);

    let detailsTable = detailsTableHeader;
    detailsTable += `| Status | Resource | Details |\n`;
    detailsTable += `|:---:|:---|:---|\n`;

    scriptRunResult.details.forEach((detail) => {
        const detailSuccessIcon = `${getStatusIcon(detail.status)}`;
        const detailsTableContent = `| ${detailSuccessIcon} | ${detail.resource} | ${detail.info} |\n`;
        console.log(detailsTableContent);
        detailsTable += detailsTableContent;
    });

    const summaryEnd = `\n---\n`;
    console.log(summaryEnd);

    let summary = ``;
    summary += overViewTable;
    summary += runInfoTable;
    summary += detailsTable;
    summary += summaryEnd;

    //Write to wiki
    const today = timestamp.substring(0, 10);
    const pagePath = `SCRIPT_RUNS:${today}.md`;
    updateWiki(wikiReposUrl, pagePath, summary);
};

//TEMP
createWikiSummary();
