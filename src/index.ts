import "dotenv/config";
import OpenAI from "openai";
import { ask } from "./ask";

import { reescreverMensagem, resumirTexto, showHistory } from "./actions";
import { HISTORIC } from "./constants";

export const clientOpenAi = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const main = async () => {
  while (true) {
    const option = await ask(
      "O que você quer fazer?\n1) Resumir texto\n2) Reescrever mensagem\n3) Sair\n4) Ver Histórico\n "
    );

    switch (option) {
      case "1":
        await resumirTexto();
        break;
      case "2":
        await reescreverMensagem();
        break;
      case "3":
        console.log("Encerrando...");
        break;
      case "4":
        showHistory();
        break;
      default:
        console.log("Opção inválida.");
        break;
    }
  }
};

main().catch(console.error);
