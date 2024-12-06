import { ScriptRunResult } from "../definitions";

/**
 * This function is designed to pass a ScriptRunResult back to the initiating GitHub Action.
 *
 * Additionally, it is useful to have TypeScript's static type-checking to ensure the parameter is of
 * type 'ScriptRunResult'.  This simplifies the validation (for the Wiki entry) in the GitHub Action,
 * to ensure acceptable output before the script is run.
 * @param runResult
 */
export const validate = (runResult:ScriptRunResult) => {
    console.log(JSON.stringify(runResult));
}
