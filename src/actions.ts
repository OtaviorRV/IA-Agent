import { clientOpenAi } from ".";
import { ask } from "./ask";
import { MODEL_CHAT } from "./constants";

const resumirTexto = async () => {
  const text = await ask("Cole o texto que você quer resumir:\n");

  const response = await clientOpenAi.responses.create({
    model: MODEL_CHAT,
    instructions:
      "Você é um assistente que resume textos em português em no máximo 5 linhas de texto corrido.",
    input: text,
  });

  console.log("\nResumo:\n");
  console.log(response.output_text);
};

const reescreverMensagem = async () => {
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
};

export { resumirTexto, reescreverMensagem };
