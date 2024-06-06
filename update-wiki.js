const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Configurations
const WIKI_REPO = 'https://github.com/dspi/testing_github_actions_workflow.wiki.git';
const WIKI_DIR = path.join(__dirname, '.wiki');

// Clone the wiki repository
execSync(`git clone ${WIKI_REPO} ${WIKI_DIR}`, { stdio: 'inherit' });

// Navigate to the wiki directory
process.chdir(WIKI_DIR);

// Write or update the page
const pagePath = path.join(WIKI_DIR, 'NewPage.md');
const content = `# New Page Title\nThis is the content of the new page.`;
fs.writeFileSync(pagePath, content, 'utf8');

// Add, commit, and push changes
execSync('git add NewPage.md', { stdio: 'inherit' });
execSync('git commit -m "Update wiki via GitHub Actions"', { stdio: 'inherit' });
execSync('git push', { stdio: 'inherit' });
