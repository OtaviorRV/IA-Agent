import { clientOpenAi } from "../config/openiaClient";
import { MODEL_CHAT } from "./constants";
import { AgentActionType } from "./types";

export async function decideAction(
  userMessage: string
): Promise<AgentActionType> {
  const response = await clientOpenAi.responses.create({
    model: MODEL_CHAT,
    instructions: `
      Você é um roteador de ações.
      Leia a mensagem do usuário e devolva APENAS uma das opções:
      - "resume"  -> se o usuário quer que você RESUMA um texto.
      - "rewrite" -> se o usuário quer que você REESCREVA um texto em algum tom.
      - "unknown" -> se não for nenhum dos dois.

      Responda SOMENTE com uma dessas três palavras, sem explicação extra.
    `,
    input: userMessage,
  });

  const raw = (response.output_text || "").trim().toLowerCase();

  if (raw === "resume" || raw === "rewrite" || raw === "unknown") {
    return raw;
  }

  return "unknown";
}
