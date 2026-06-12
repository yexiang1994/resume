import { cp, rm } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const deployBranch = "gh-pages";
const staticDir = join(root, "docs");
const worktreeDir = join(root, ".deploy-gh-pages");

function git(args, options = {}) {
  return execFileSync("git", args, {
    cwd: options.cwd ?? root,
    encoding: "utf8",
    stdio: options.stdio ?? "pipe",
  });
}

function branchExists(ref) {
  try {
    git(["rev-parse", "--verify", "--quiet", ref]);
    return true;
  } catch {
    return false;
  }
}

function remoteBranchExists() {
  try {
    git(["ls-remote", "--exit-code", "--heads", "origin", deployBranch]);
    return true;
  } catch {
    return false;
  }
}

function hasDeployChanges() {
  return git(["status", "--porcelain"], { cwd: worktreeDir }).trim().length > 0;
}

execFileSync(process.execPath, ["scripts/build-static.mjs"], { cwd: root, stdio: "inherit" });

git(["worktree", "prune"]);
await rm(worktreeDir, { recursive: true, force: true });

if (remoteBranchExists()) {
  git(["worktree", "add", "-B", deployBranch, worktreeDir, `origin/${deployBranch}`], { stdio: "inherit" });
} else if (branchExists(deployBranch)) {
  git(["worktree", "add", worktreeDir, deployBranch], { stdio: "inherit" });
} else {
  git(["worktree", "add", "--detach", worktreeDir, "HEAD"], { stdio: "inherit" });
  git(["checkout", "--orphan", deployBranch], { cwd: worktreeDir, stdio: "inherit" });
}

git(["rm", "-r", "-f", "--ignore-unmatch", "."], { cwd: worktreeDir, stdio: "inherit" });
git(["clean", "-fdx"], { cwd: worktreeDir, stdio: "inherit" });
await cp(staticDir, worktreeDir, { recursive: true });

git(["add", "-A"], { cwd: worktreeDir, stdio: "inherit" });

if (!hasDeployChanges()) {
  console.log(`${deployBranch} already matches ${staticDir}`);
} else {
  const sourceCommit = git(["rev-parse", "--short", "HEAD"]).trim();
  git(["commit", "-m", `Deploy static site from ${sourceCommit}`], { cwd: worktreeDir, stdio: "inherit" });
}

git(["push", "-u", "origin", deployBranch], { cwd: worktreeDir, stdio: "inherit" });
