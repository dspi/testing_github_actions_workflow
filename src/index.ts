import {updateWiki} from "./lib/wiki";

// GitHub token and repository provided by the GitHub Actions runner
const token = process.env['GITHUB_TOKEN'];
const repository = process.env['GITHUB_REPOSITORY']; // Format: owner/repo
const wikiRepositoryUrl = `https://github-actions:${token}@github.com/${repository}.wiki.git`;

const pagePath = 'Category/SubCategory/NewPage2.md';

const pageContent = "## Sub Title\nThis is new content";

updateWiki(wikiRepositoryUrl, pagePath, pageContent);
