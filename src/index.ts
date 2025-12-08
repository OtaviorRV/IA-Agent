import "dotenv/config";

import { ask } from "./cli/ask";

import * as Actions from "./actions";
import { decideAction } from "./core/router";

const {
  rewriteMessage,
  rewriteMessageAutomatic,
  showHistory,
  summarizeText,
  summarizeTextAutomatic,
} = Actions;

const main = async () => {
  let doLoop = true;

  while (doLoop) {
    const option = await ask(
      "O que você quer fazer?\n1) Resumir texto\n2) Reescrever mensagem\n3) Sair\n4) Ver Histórico\n5) Modo automático (texto livre)\n> "
    );

    switch (option) {
      case "1":
        await summarizeText();
        break;
      case "2":
        await rewriteMessage();
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

        if (action === "resume") {
          await summarizeTextAutomatic(free);
        } else if (action === "rewrite") {
          await rewriteMessageAutomatic(free);
        } else {
          console.log("Não sei o que fazer com esse pedido (unknown).");
        }

        break;

      default:
        console.log("Opção inválida.");
        break;
    }
  }
};

main().catch(console.error);
