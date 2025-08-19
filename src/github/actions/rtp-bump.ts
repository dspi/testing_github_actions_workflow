import {readdirSync, readFileSync, writeFileSync} from "fs";
import {join} from "path";

const reposDir = "./repos";
for (const repo of readdirSync(reposDir)) {
    const pkgPath = join(reposDir, repo, "package.json");
    const pkg = JSON.parse(readFileSync(pkgPath, "utf8"));
    const [major, minor, patch] = pkg.version.split(".");
    const newVersion = `${major}.${minor}.${Number(patch) + 1}`;
    pkg.version = newVersion;
    writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + "\n");
    console.log(`${repo}: bumped to ${newVersion}`);
}