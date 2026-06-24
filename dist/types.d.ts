export type DeployEvent = {
    status: "success" | "failed";
    project: string;
    env: string;
    gitSha?: string;
    branch?: string;
    commitMessage?: string;
    timestamp: number;
    command?: string;
};
//# sourceMappingURL=types.d.ts.map