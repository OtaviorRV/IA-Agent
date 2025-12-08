import { ask } from "../cli/ask";
import { clientOpenAi } from "../config/openiaClient";
import { MODEL_CHAT } from "../core/constants";
import { HISTORIC } from "./historic";

export async function translateText() {
  const text = await ask("Cole o texto para ser traduzido:\n");
  const language = await ask("Digite qual linguagem a ser traduzida:\n");

  const response = await clientOpenAi.responses.create({
    model: MODEL_CHAT,
    instructions:
      "Indentifque o indioma do texto e depois traduz para o indioma solicitado, mantendo o significado original.",
    input: `Texto original:\n${text}\n\nIndioma desejado: ${language}\n\nReescreva apenas a nova versão do texto.`,
  });

  HISTORIC.push({
    type: "translate",
    input: `text:${text}, language:${language}`,
    output: response.output_text || "",
    timestamp: new Date(),
  });

  console.log("\nTexto Traduzido: \n");
  console.log(response.output_text);
}

export async function translateTextAutomatic(input: string) {
  const response = await clientOpenAi.responses.create({
    model: MODEL_CHAT,
    instructions:
      "Indentifque o indioma do texto e depois traduz para o indioma solicitado, mantendo o significado original.",
    input: input,
  });

  HISTORIC.push({
    type: "translate",
    input: input,
    output: response.output_text || "",
    timestamp: new Date(),
  });

  console.log("\nTexto Traduzido: \n");
  console.log(response.output_text);
}
