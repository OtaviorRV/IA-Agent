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
   - `1`: cole um texto para receber um resumo curto.
   - `2`: cole uma mensagem e informe o tom desejado (ex.: mais formal, mais direto) para reescrita.
   - `4`: lista o histórico da sessão (limpo quando o processo encerra).
   - `5`: modo automático — escreva livremente o que quer (instrução + texto) e o modelo retorna apenas a ação escolhida (`resume`, `rewrite` ou `unknown`).
   - `3`: sai do loop e encerra o programa.

## Modo automático (opção 5)
- Serve como roteador: você digita a instrução em linguagem natural e o modelo devolve somente qual ação pretende executar.
- Hoje ele imprime a decisão; para executar automaticamente, conecte o resultado (`resume` ou `rewrite`) às funções `summarizeTextAutomatic` ou `rewriteMessageAutomatic` em `src/actions.ts`.

## Scripts úteis
- `npm start`: executa o agente via `ts-node`.
- `npm run build`: compila os arquivos TypeScript para `dist/`.

## Estrutura rápida
- `src/index.ts`: inicialização do cliente OpenAI, menu principal e loop de execução.
- `src/actions.ts`: ações de resumo, reescrita, roteamento automático e exibição de histórico.
- `src/ask.ts`: utilitário para ler entradas do terminal.
- `src/constants.ts` e `src/interfaces.ts`: modelos e constantes compartilhadas.

## Dicas
- Certifique-se de que a chave do OpenAI tem acesso ao modelo `gpt-4o-mini`.
- Em caso de erro de rede ou limite de uso da API, aguarde alguns minutos e tente novamente.
