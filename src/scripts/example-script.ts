import { ScriptRunResult, Status } from "../definitions";

/**
 * All scripts must execute a run function, which returns a ScriptRunResult type.
 */
export const run = (): ScriptRunResult => {
    const runResult = {
        overallStatus: Status.FAILURE,
        details: [
            { status: Status.SUCCESS, resource: "MongoDB collection 5", info: "Line 1 blah was successful" },
            { status: Status.FAILURE, resource: "MongoDB collection 16", info: "Line 2 blah was not successful." },
            { status: Status.SKIPPED, resource: "MongoDB collection 31", info: "Line 3 blah didn't run!" }
        ]
    };

    //This needed to get the into the workflow!!!
    console.log(JSON.stringify(runResult));

    return runResult;
};

run();
