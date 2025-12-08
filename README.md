# IA-Agent

CLI in Node/TypeScript to summarize, rewrite, and translate texts in Portuguese using the OpenAI Responses API. History lives in memory for the current session.

## Requirements
- Node.js 18+ and npm
- `OPENAI_API_KEY` set in the environment (can be in `.env`)

## Install and run
1) `npm install`
2) Create a `.env` at the project root with:
   ```
   OPENAI_API_KEY=sk-...
   ```
3) `npm start`
4) Interactive menu:
   - `1`: paste text to get a short summary.
   - `2`: paste a message and set the tone (e.g., more formal) to rewrite it.
   - `4`: list session history (cleared when the process exits).
   - `5`: translate text into the target language you provide.
   - `6`: automatic mode (LLM router); type free-form instructions and the model returns only `resume`, `rewrite`, `translate`, or `unknown`.
   - `3`: exit.

## Architecture layers
- CLI input (`src/cli/ask.ts`): reads terminal input with readline.
- Config (`src/config/openiaClient.ts`): instantiates the OpenAI client with the env var.
- Core (`src/core`): shared constants (`MODEL_CHAT`), types (`AgentActionType`, `ActionHitory`), and the router (`router.ts`) that asks the model to decide whether the request is summarize, rewrite, or translate.
- Actions (`src/actions`): business use cases. `sumarize.ts` summarizes text, `rewrite.ts` rewrites messages, `translate.ts` translates to a user-chosen language, `historic.ts` stores and shows in-memory history. Each action calls the OpenAI client.
- Orchestration (`src/index.ts`): main menu loop; invokes actions and, in automatic mode, uses `decideAction` from core to choose `summarizeTextAutomatic`, `rewriteMessageAutomatic`, or `translateTextAutomatic`.

## Scripts
- `npm start`: run the agent via `ts-node`.
- `npm run build`: compile TypeScript to `dist/`.

## Notes
- History is not persisted; to store it on disk or a database, extend `actions/historic.ts`.
- Ensure the key has access to `gpt-4o-mini`. For network or rate-limit issues, try again after a few minutes.
