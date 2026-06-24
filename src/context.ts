import { execSync } from "child_process";
import fs from "fs";

function safeExec(cmd: string) {
  try {
    return execSync(cmd).toString().trim();
  } catch {
    return undefined;
  }
}

export async function buildContext() {
  const pkg = JSON.parse(fs.readFileSync("package.json", "utf-8"));

  const gitSha = safeExec("git rev-parse --short HEAD");
  const branch = safeExec("git rev-parse --abbrev-ref HEAD");
  const commitMessage = safeExec("git log -1 --pretty=%s");

  return {
    project: pkg.name ?? "unknown",
    env:
      process.env.DEPLOY_ENV ||
      process.env.CF_ENV ||
      process.env.NODE_ENV ||
      "production",

    gitSha,
    branch,
    commitMessage,
  };
}
