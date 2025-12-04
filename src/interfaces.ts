export type ActionHitory = {
  type: "resume" | "rewrite";
  input: string;
  output: string;
  timestamp: Date;
};
