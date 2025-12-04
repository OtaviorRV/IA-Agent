# IA-Agent

Agente de linha de comando em Node/TypeScript para resumir textos e reescrever mensagens em português usando a API de Responses do OpenAI. O histórico fica em memória enquanto a sessão estiver aberta.

## Requisitos
- Node.js 18+ e npm
- Chave da API da OpenAI na variável `OPENAI_API_KEY`

## Passo a passo
1. Instale as dependências: `npm install`
2. Crie um arquivo `.env` na raiz com sua chave:
   ```
   OPENAI_API_KEY=sk-...
   ```
3. Inicie o agente: `npm start`
4. No menu interativo:
   - Escolha `1` para colar um texto e receber um resumo curto.
   - Escolha `2` para colar uma mensagem e informar o tom desejado (ex.: mais formal, mais direto) para reescrita.
   - Escolha `4` para listar o histórico da sessão (limpo quando o processo encerra).
   - Para sair do loop, use `Ctrl + C` (a opção 3 apenas imprime a intenção de sair).

## Scripts úteis
- `npm start`: executa o agente via `ts-node`.
- `npm run build`: compila os arquivos TypeScript para `dist/`.

## Estrutura rápida
- `src/index.ts`: inicialização do cliente OpenAI e menu principal.
- `src/actions.ts`: ações de resumo, reescrita e exibição de histórico.
- `src/ask.ts`: utilitário para ler entradas do terminal.
- `src/constants.ts` e `src/interfaces.ts`: modelos e constantes compartilhadas.

## Dicas
- Certifique-se de que a chave do OpenAI tem acesso ao modelo `gpt-4o-mini`.
- Em caso de erro de rede ou limite de uso da API, aguarde alguns minutos e tente novamente.
