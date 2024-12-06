import { Status } from "../definitions";
import { validate } from "../helpers/validation";

const runResult = {
    overallStatus: Status.FAILURE,
    details: [
        { status: Status.SUCCESS, resource: "MongoDB collection 1", info: "Update was successful" },
        { status: Status.FAILURE, resource: "MongoDB collection 2", info: "Update was not successful." },
        { status: Status.SKIPPED, resource: "MongoDB collection 3", info: "Update didn't run!" }
    ]
};

/**
 * Maybe some result has to be passed into a validation function,
 * and the yml validation only has to check that its imported, and executed.
 * because Typescript does the rest.
 */

validate(runResult);
