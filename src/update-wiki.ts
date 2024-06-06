import {execSync} from 'child_process';

// GitHub token and repository provided by the GitHub Actions runner
const token = process.env['GITHUB_TOKEN'];
const repository = process.env['GITHUB_REPOSITORY']; // Format: owner/repo
const wikiUrl = `https://github-actions:${token}@github.com/${repository}.wiki.git`;

try {
    // Set git config
    execSync('git config --global user.name "github-actions[bot]"');
    execSync('git config --global user.email "github-actions[bot]@users.noreply.github.com"');

    // Clone the wiki repository
    execSync(`git clone ${wikiUrl} .wiki`, { stdio: 'inherit' });

    // Navigate to the wiki repository directory
    process.chdir('.wiki');

    // Create or update a wiki page
    const pageContent = "# New Page Title\nThis is the content of the new page.";
    execSync(`echo "${pageContent}" > NewPage.md`);

    // Commit and push the changes
    execSync('git add NewPage2.md');
    execSync('git commit -m "Update wiki via GitHub Actions"');
    execSync('git push origin HEAD:master', { stdio: 'inherit' });

    console.log('Wiki updated successfully.');
} catch (error) {
    console.error('Error updating wiki:', error);
    process.exit(1);
}
