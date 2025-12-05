# IA-Agent

CLI agent in Node/TypeScript to summarize texts and rewrite messages in Portuguese using the OpenAI Responses API. History stays in memory while the session is running.

## Requirements
- Node.js 18+ and npm
- OpenAI API key in the `OPENAI_API_KEY` variable

## Setup and use
1. Install dependencies: `npm install`
2. Create a `.env` file in the project root with your key:
   ```
   OPENAI_API_KEY=sk-...
   ```
3. Start the agent: `npm start`
4. In the interactive menu:
   - `1`: paste a text to get a short summary.
   - `2`: paste a message and provide the desired tone (e.g., more formal, more direct) to rewrite it.
   - `4`: list the session history (cleared when the process stops).
   - `5`: automatic mode — type freely what you want (instruction + text) and the model returns only the chosen action (`resume`, `rewrite`, or `unknown`).
   - `3`: exit the loop and end the program.

## Automatic mode (option 5)
- Works as a router: you type a natural-language instruction and the model returns only the action it intends to run.
- Currently it only prints the decision; to execute automatically, wire the result (`resume` or `rewrite`) to `summarizeTextAutomatic` or `rewriteMessageAutomatic` in `src/actions.ts`.

## Useful scripts
- `npm start`: runs the agent via `ts-node`.
- `npm run build`: compiles TypeScript files to `dist/`.

## Quick structure
- `src/index.ts`: initializes the OpenAI client, main menu, and execution loop.
- `src/actions.ts`: summarization, rewrite, automatic routing, and history actions.
- `src/ask.ts`: terminal input helper.
- `src/constants.ts` and `src/interfaces.ts`: shared models and constants.

## Tips
- Make sure your OpenAI key has access to the `gpt-4o-mini` model.
- If you hit network errors or API rate limits, wait a few minutes and try again.
