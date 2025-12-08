import { ask } from "../cli/ask";
import { clientOpenAi } from "../config/openiaClient";
import { MODEL_CHAT } from "../core/constants";

export async function rewriteMessage() {
  try {
    const original = await ask("Cole a mensagem que você quer reescrever:\n");
    const tone = await ask(
      "Qual tom você quer? (ex: mais formal, mais direto, mais simples):\n"
    );

    const response = await clientOpenAi.responses.create({
      model: MODEL_CHAT,
      instructions:
        "Você reescreve mensagens em português no tom solicitado, mantendo o significado original.",
      input: `Mensagem original:\n${original}\n\nTom desejado: ${tone}\n\nReescreva apenas a nova versão da mensagem.`,
    });

    console.log("\nMensagem reescrita:\n");
    console.log(response.output_text);
  } catch (error) {
    console.error("Erro ao reescrever mensagem:", error);
    console.log(
      "\nNão consegui reescrever a mensagem agora. Tenta de novo em alguns minutos.\n"
    );
  }
}

export async function rewriteMessageAutomatic(input: string) {
  try {
    const response = await clientOpenAi.responses.create({
      model: MODEL_CHAT,
      instructions:
        "Você reescreve mensagens em português no tom solicitado, mantendo o significado original.",
      input: input,
    });

    console.log("\nMensagem reescrita:\n");
    console.log(response.output_text);
  } catch (error) {
    console.error("Erro ao reescrever mensagem:", error);
    console.log(
      "\nNão consegui reescrever a mensagem agora. Tenta de novo em alguns minutos.\n"
    );
  }
}
