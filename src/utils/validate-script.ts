import path from 'path';

export async function validateScript(scriptName: string): Promise<void> {
    try {
        // Construct the path to the script file
        const scriptPath = path.resolve(__dirname, `./scripts/${scriptName}`);

        // Dynamically load the script
        const script = require(scriptPath);

        // Validate if the script has a 'run' function
        if (typeof script.run !== 'function') {
            throw new Error(`Script "${scriptName}" must export a 'run' function.`);
        }

        console.log(`Script "${scriptName}" has a valid 'run' function.`);
    } catch (error) {
        // Handle errors (either loading the script or missing 'run' function)
        if (error instanceof Error) {
            throw new Error(`Failed to rename collection "${scriptName}": ${error.message}`);
        }
        else {
            throw new Error(`Failed to validate script "${scriptName}"`);
        }
    }
}
