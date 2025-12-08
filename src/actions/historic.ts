import { ActionHistoric } from "../core/types";

export const HISTORIC: ActionHistoric[] = [];

export async function showHistory() {
  if (HISTORIC.length === 0) {
    console.log("\nNenhuma ação registrada ainda.\n");
    return;
  }

  console.log("\nHISTÓRICO:\n");
  HISTORIC.forEach((item, index) => {
    console.log(`#${index + 1} [${item.type}] ${item.timestamp.toISOString()}`);
    console.log("Input:", item.input.slice(0, 80), "...");
    console.log("Output:", item.output.slice(0, 80), "...\n");
  });
}
