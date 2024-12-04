import fs from 'fs';
import path from 'path';

export async function validateScript(scriptName: string): Promise<void> {
    try {
        // Construct the path to the script file
        const scriptPath = path.resolve(__dirname, `./scripts/${scriptName}`);

        // Read the script file content as a string without executing it
        const scriptContent = fs.readFileSync(scriptPath, 'utf-8');

        // Check if the script contains a 'run' function using regex
        const hasRunFunction = /export\s+(const|function)\s+run\s*\(/.test(scriptContent);

        // If the 'run' function is missing, throw an error
        if (!hasRunFunction) {
            throw new Error(`Script "${scriptName}" must export a 'run' function.`);
        }

        console.log(`Script "${scriptName}" has a valid 'run' function.`);
    } catch (error) {
        // Handle errors such as file not found or missing 'run' function
        if (error instanceof Error) {
            throw new Error(`Failed to validate script "${scriptName}": ${error.message}`);
        }
        else {
            throw new Error(`Failed to validate script "${scriptName}"`);
        }
    }
}
