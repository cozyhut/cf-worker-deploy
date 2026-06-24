import { runBuilder } from "./builder.js";
import { buildContext } from "./context.js";
import { sendNtfy } from "./ntfy.js";
import { sendToQueue } from "./queue.js";
export async function run(args) {
    if (args.length === 0) {
        console.error("Usage: cf-worker-deploy <command> [args...]");
        process.exit(1);
    }
    const ctx = await buildContext();
    const cmd = args[0];
    const cmdArgs = args.slice(1);
    if (!cmd) {
        console.error("commmand is not valid");
        console.error("Usage: cf-worker-deploy <command> [args...]");
        process.exit(1);
    }
    const result = await runBuilder(cmd, cmdArgs);
    const event = {
        status: result.code === 0 ? "success" : "failed",
        project: ctx.project,
        env: ctx.env,
        gitSha: ctx.gitSha,
        branch: ctx.branch,
        commitMessage: ctx.commitMessage,
        timestamp: Date.now(),
        command: `${cmd} ${cmdArgs.join(" ")}`
    };
    // 1. PRIMARY: ntfy
    await sendNtfy(event);
    // 2. OPTIONAL: Cloudflare Queue
    await sendToQueue(event);
    process.exit(result.code);
}
//# sourceMappingURL=cli.js.map