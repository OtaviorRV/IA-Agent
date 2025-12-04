import { clientOpenAi } from ".";
import { ask } from "./ask";
import { HISTORIC, MODEL_CHAT } from "./constants";

const resumirTexto = async () => {
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
};

const reescreverMensagem = async () => {
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
};

const showHistory = () => {
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
};

export { resumirTexto, reescreverMensagem, showHistory };
