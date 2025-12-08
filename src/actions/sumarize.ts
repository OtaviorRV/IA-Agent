import { ask } from "../cli/ask";
import { clientOpenAi } from "../config/openiaClient";
import { MODEL_CHAT } from "../core/constants";
import { HISTORIC } from "./historic";

export async function summarizeText() {
  try {
    const text = await ask("Cole o texto que você quer resumir:\n");

    const response = await clientOpenAi.responses.create({
      model: MODEL_CHAT,
      instructions:
        "Você é um assistente que resume textos em português em no máximo 5 linhas de texto corrido.",
      input: text,
    });

    console.log("\nResumo:\n");
    console.log(response.output_text);

    HISTORIC.push({
      type: "resume",
      input: text,
      output: response.output_text || "",
      timestamp: new Date(),
    });
  } catch (error) {
    console.error("Erro ao resumir texto:", error);
    console.log(
      "\nNão consegui resumir o texto agora. Tenta de novo em alguns minutos.\n"
    );
  }
}

export async function summarizeTextAutomatic(input: string) {
  try {
    const response = await clientOpenAi.responses.create({
      model: MODEL_CHAT,
      instructions:
        "Você é um assistente que resume textos em português em no máximo 5 linhas de texto corrido.",
      input: input,
    });

    console.log("\nResumo:\n");
    console.log(response.output_text);

    HISTORIC.push({
      type: "resume",
      input: input,
      output: response.output_text || "",
      timestamp: new Date(),
    });
  } catch (error) {
    console.error("Erro ao resumir texto:", error);
    console.log(
      "\nNão consegui resumir o texto agora. Tenta de novo em alguns minutos.\n"
    );
  }
}
