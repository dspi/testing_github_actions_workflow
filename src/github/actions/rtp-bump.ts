import * as fs from "node:fs";
import {execSync} from "child_process";
import * as path from "node:path";

const repos = [
    'git@github.com:myorg/service-a.git',
    'git@github.com:myorg/service-b.git',
];

for (const repo of repos) {
    const name = repo.split('/').pop()?.replace(/\.git$/, '');
    const targetDir = `repos/${name}`;

    // clone if missing
    if (!fs.existsSync(targetDir)) {
        execSync(`git clone ${repo} ${targetDir}`, {stdio: 'inherit'});
    }

    // bump version inside targetDir/package.json
    const pkgFile = path.join(targetDir, 'package.json');
    const pkg = JSON.parse(fs.readFileSync(pkgFile, 'utf-8'));
    //pkg.version = bumpVersion(pkg.version); // however you do this
    pkg.version = '1.2.0';
    fs.writeFileSync(pkgFile, JSON.stringify(pkg, null, 2));
}
