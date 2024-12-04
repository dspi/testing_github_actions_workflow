import fs from 'fs';
import path from 'path';

// Validate that the script contains a 'run' function before loading it
export async function validateScript(scriptName: string): Promise<void> {
    try {
        // Construct the path to the script file
        const scriptPath = path.resolve(__dirname, `./scripts/${scriptName}`);

        // Read the script file content as a string
        const scriptContent = fs.readFileSync(scriptPath, 'utf-8');

        // Check if the script contains a function named 'run'
        const hasRunFunction = /export\s+const\s+run\s*=\s*\(/.test(scriptContent) ||
            /export\s+function\s+run\s*\(/.test(scriptContent);

        if (!hasRunFunction) {
            throw new Error(`Script "${scriptName}" must export a 'run' function.`);
        }

        console.log(`Script "${scriptName}" has a valid 'run' function.`);
    } catch (error) {
        // Handle errors (either reading the file or missing 'run' function)
        if (error instanceof Error) {
            throw new Error(`Failed to rename collection "${scriptName}": ${error.message}`);
        }
        else {
            throw new Error(`Failed to validate script "${scriptName}"`);
        }
    }
    
}
