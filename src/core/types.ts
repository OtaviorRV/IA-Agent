export type ActionHistoric = {
  type: Extract<AgentActionType, "resume" | "rewrite" | "translate">;
  input: string;
  output: string;
  timestamp: Date;
};

export type AgentActionType = "resume" | "rewrite" | "unknown" | "translate";
