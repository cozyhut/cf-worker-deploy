import type { DeployEvent } from "./types.js";

export async function sendNtfy(event: DeployEvent) {
  const topic = process.env.NTFY_TOPIC;
  if (!topic) return; // silently disabled

  const title =
    event.status === "success"
      ? `Cloudflare worker deploy succeeded: ${event.project}`
      : `Cloudflare worker deploy failed: ${event.project}`;

  const message = [
    `- project: ${event.project}`,
    `- env: ${event.env}`,
    `- git: ${event.gitSha ?? "unknown"}`,
    `- branch: ${event.branch ?? "unknown"}`,
    `- build-cmd: ${event.command ?? "unknown"}`,
    "",
    event.commitMessage ?? ""
  ].join("\n");
  console.log(`sending notification to ntfy.sh/${topic}`);
  await fetch(`https://ntfy.sh/${topic}`, {
    method: "POST",
    headers: {
      Title: title,
      Priority: event.status === "failed" ? "high" : "default",
      Tags: event.status === "success" ? "white_check_mark" : "x"
    },
    body: message
  });
}
