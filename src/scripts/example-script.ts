import { ScriptRunResult, Status } from "../definitions";
import { validate } from "../helpers/validation";

/*
 * Scripts will only be run by the 'Run script' GitHub Action if they
 * 1 - import 'validate'.
 * 2 - call 'validate'.
 */

//1 - Add script execution logic:

//2 - Build up a ScriptRunResult object:
const runResult: ScriptRunResult = {
    overallStatus: Status.FAILURE,
    overallInfo: "THIS IS JUST AN EXAMPLE SCRIPT!",
    details: [
        { status: Status.SUCCESS, resource: "MongoDB AddOns collection1", info: "Update was successful" },
        { status: Status.FAILURE, resource: "MongoDB AddOns collection2", info: "Update was not successful." },
        { status: Status.SKIPPED, resource: "MongoDB AddOns collection3", info: "Update didn't run!" }
    ]
};

//3 - Pass ScriptRunResult object to validate:
validate(runResult);
