import { execSync } from 'node:child_process';

function commitRepo(repoPath: string, message: string, token: string): string | undefined {
    const output = execSync(
        `npx verified-bot-commit@latest --workspace ${repoPath} --message "${message}" --token ${token}`,
        { encoding: 'utf-8' }
    );
    // output looks like: "✅ Commit signed and pushed: <sha>"
    const match = output.match(/([0-9a-f]{40})/);
    if (!match) throw new Error(`Could not extract commit SHA from output: ${output}`);
    return match[1];
}

const repos = [{path:'dspi/testing_github_actions_workflow'}];
const newVersion = `1.2.0`;
for (const repo of repos) {
    // bump files in repo.path first...
    const sha = commitRepo(
        repo.path,
        `Bump version to ${newVersion}`,
        process.env['GITHUB_TOKEN']!
    );
    //applicationResult.commitSha = sha;
    console.log(sha)
}