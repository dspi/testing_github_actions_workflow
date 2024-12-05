import { Status } from "./enums";

type ScriptRunResultDetails = {
    status: Status;
    resource: string;
    info: string;
};
export type ScriptRunResult = {
    overallStatus: Status;
    details: ScriptRunResultDetails[];
};
