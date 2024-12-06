import { Status } from "./enums";

type NonEmptyArray<T> = [T, ...T[]];

type ScriptRunResultDetails = {
    status: Status;
    resource: string;
    info: string;
};

export type ScriptRunResult = {
    overallStatus: Status;
    overallInfo?: string;
    //details: ScriptRunResultDetails[];
    details: NonEmptyArray<ScriptRunResultDetails>;
};
