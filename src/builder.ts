import { spawn } from "child_process";

export function runBuilder(cmd: string, args: string[]): Promise<{ code: number }> {
  return new Promise((resolve) => {
    const proc = spawn(cmd, args, {
      stdio: "inherit",
      env: process.env,
      shell: true
    });

    proc.on("close", (code) => {
      resolve({ code: code ?? 1 });
    });
  });
}
