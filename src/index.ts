import "dotenv/config";
import OpenAI from "openai";
import { ask } from "./ask";
import { MODEL_CHAT } from "./constants";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const main = async () => {
  // função utilitária para perguntar algo no terminal
  const text = await ask("Cole o texto que você quer resumir:\n");

  const response = await client.responses.create({
    model: MODEL_CHAT,
    instructions:
      "Você é um assistente que resume textos em português em no máximo 3 bullet points.",
    input: text,
  });

  console.log("\nResumo:\n");
  console.log(response.output_text);
};

main().catch(console.error);
