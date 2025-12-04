import "dotenv/config";
import OpenAI from "openai";
import { ask } from "./ask";

import { reescreverMensagem, resumirTexto } from "./actions";

export const clientOpenAi = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const main = async () => {
  const option = await ask(
    "O que você quer fazer?\n1) Resumir texto\n2) Reescrever mensagem\n> "
  );

  if (option === "1") {
    await resumirTexto();
  } else if (option === "2") {
    await reescreverMensagem();
  } else {
    console.log("Opção inválida.");
  }
};

main().catch(console.error);
