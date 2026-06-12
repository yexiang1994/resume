import { cp, rm } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const deployBranch = "gh-pages";
const mintlifySiteDir = join(root, "mintlify-site");
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

function removeDeployWorktree() {
  try {
    git(["worktree", "remove", "--force", worktreeDir], { stdio: "inherit" });
  } catch {
    // The directory may exist without a registered worktree after an interrupted run.
  }
}

execFileSync(process.execPath, ["scripts/build-mintlify.mjs"], { cwd: root, stdio: "inherit" });

removeDeployWorktree();
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
await cp(mintlifySiteDir, worktreeDir, { recursive: true });

git(["add", "-A"], { cwd: worktreeDir, stdio: "inherit" });

if (!hasDeployChanges()) {
  console.log(`${deployBranch} already matches ${mintlifySiteDir}`);
} else {
  const sourceCommit = git(["rev-parse", "--short", "HEAD"]).trim();
  git(["commit", "-m", `Deploy static site from ${sourceCommit}`], { cwd: worktreeDir, stdio: "inherit" });
}

git(["push", "-u", "origin", deployBranch], { cwd: worktreeDir, stdio: "inherit" });
