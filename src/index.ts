import "dotenv/config";
import OpenAI from "openai";
import { ask } from "./ask";

import {
  decideAction,
  reescreverMensagem,
  resumirTexto,
  showHistory,
} from "./actions";

export const clientOpenAi = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const main = async () => {
  let doLoop = true;

  while (doLoop) {
    const option = await ask(
      "O que você quer fazer?\n1) Resumir texto\n2) Reescrever mensagem\n3) Sair\n4) Ver Histórico\n5) Modo automático (texto livre)\n> "
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
        doLoop = false;
        break;
      case "4":
        showHistory();
        break;
      case "5":
        const free = await ask(
          "\nDigite o que você quer fazer (instrução + texto):\n"
        );
        const action = await decideAction(free);
        console.log("Ação decidida pelo modelo:", action);
        break;
      default:
        console.log("Opção inválida.");
        break;
    }
  }
};

main().catch(console.error);
