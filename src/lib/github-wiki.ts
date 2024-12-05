import { execSync } from "child_process";

export const updateWiki = (wikiUrl: string, pagePath: string, pageContent: string) => {
    try {
        // Set git config
        execSync('git config --global user.name "github-actions[bot]"');
        execSync('git config --global user.email "github-actions[bot]@users.noreply.github.com"');

        // Clone the wiki repository
        execSync(`git clone ${wikiUrl} .wiki`, { stdio: "inherit" });

        // Navigate to the wiki repository directory
        process.chdir(".wiki");

        // Ensure the directories exist
        execSync(`mkdir -p $(dirname ${pagePath})`);

        // Create or update a wiki page
        execSync(`echo "${pageContent}" >> ${pagePath}`);

        // Commit and push the changes
        execSync(`git add ${pagePath}`);
        execSync('git commit -m "Update wiki via GitHub Actions"');
        execSync("git push origin HEAD:master", { stdio: "inherit" });

        //TEST
        console.log(`pagePath: ${wikiUrl}`);
        console.log(`pagePath: ${pagePath}`);
        console.log(`pagePath: ${pageContent}`);

        console.log("Wiki updated successfully.");
    } catch (error) {
        console.error("Error updating wiki:", error);
        //process.exit(1);
    }
};
