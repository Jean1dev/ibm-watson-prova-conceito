# Guia de Atualização de Dependências

> Gerado em: 2026-03-26
> Baseado nas versões atuais dos três módulos do projeto.

---

## Visão Geral dos Módulos

| Módulo | Caminho |
|--------|---------|
| React Frontend | `react-assistant/` |
| IBM Watson Backend | `assistant simple IBM-cloud/` |
| Firebase Cloud Functions | `cloud-functions/functions/` |

---

## 1. react-assistant

### Dependências

| Pacote | Atual | Mais Recente | Prioridade | Breaking Changes |
|--------|-------|-------------|------------|-----------------|
| `react` | ^16.12.0 | 18.3.x | Alta | Sim |
| `react-dom` | ^16.12.0 | 18.3.x | Alta | Sim |
| `react-redux` | ^7.1.3 | 9.1.x | Alta | Sim |
| `redux` | ^4.0.5 | 5.0.x | Alta | Sim |
| `redux-thunk` | ^2.3.0 | 3.1.x | Alta | Sim |
| `axios` | ^0.21.1 | 1.7.x | Alta | Sim |
| `bootstrap` | ^4.4.1 | 5.3.x | Alta | Sim |
| `reactstrap` | ^8.2.0 | 9.4.x | Alta | Sim (requer Bootstrap 5) |
| `react-scripts` | 3.3.0 | 5.0.1 | Média | Sim |
| `@testing-library/jest-dom` | ^4.2.4 | 6.6.x | Média | Sim |
| `@testing-library/react` | ^9.4.0 | 16.x | Média | Sim (requer React 18) |
| `@testing-library/user-event` | ^7.2.1 | 14.5.x | Média | Sim |

### Passos de Atualização

#### 1.1 React 16 → 18 (breaking)
```bash
npm install react@^18 react-dom@^18
```
**Mudanças necessárias no código:**
- Substituir `ReactDOM.render()` pela nova API de root:
  ```diff
  - import ReactDOM from 'react-dom';
  - ReactDOM.render(<App />, document.getElementById('root'));
  + import { createRoot } from 'react-dom/client';
  + const root = createRoot(document.getElementById('root'));
  + root.render(<App />);
  ```
- Remover `React` do import em arquivos JSX (não é mais necessário com o novo JSX transform).

#### 1.2 Redux 4 → 5 + react-redux 7 → 9 (breaking)
```bash
npm install redux@^5 react-redux@^9 redux-thunk@^3
```
**Mudanças necessárias:**
- Redux 5 é ESM-first; verificar compatibilidade com bundler.
- `redux-thunk` 3.x: o middleware não precisa mais ser importado como default em alguns cenários — verificar imports:
  ```diff
  - import thunk from 'redux-thunk';
  + import { thunk } from 'redux-thunk';
  ```
- Considerar migrar para [Redux Toolkit](https://redux-toolkit.js.org/) (já inclui thunk e simplifica o setup).

#### 1.3 Axios 0.x → 1.x (breaking)
```bash
npm install axios@^1
```
**Mudanças necessárias:**
- O handling de erros mudou: `error.response` ainda existe, mas `axios.isCancel()` e `CancelToken` foram depreciados — migrar para `AbortController`.
- Headers são case-insensitive agora (comportamento padronizado).

#### 1.4 Bootstrap 4 → 5 + Reactstrap 8 → 9 (breaking)
```bash
npm install bootstrap@^5 reactstrap@^9
```
**Mudanças necessárias:**
- Bootstrap 5 removeu a dependência do jQuery.
- Classes utilitárias renomeadas (ex: `ml-*`/`mr-*` → `ms-*`/`me-*`).
- Reactstrap 9 foi reescrito para Bootstrap 5 — a maioria dos componentes mantém a mesma API, mas verificar props depreciadas.
- Remover jQuery e popper.js se estiverem presentes.

#### 1.5 react-scripts 3 → 5 (ou migrar para Vite)
```bash
npm install react-scripts@5
```
> **Recomendação:** `react-scripts` (Create React App) está **descontinuado** desde 2023. Considerar migrar para [Vite](https://vitejs.dev/) com `@vitejs/plugin-react`.

#### 1.6 Testing Library
```bash
npm install @testing-library/jest-dom@^6 @testing-library/react@^16 @testing-library/user-event@^14
```
**Mudanças:**
- `@testing-library/react` 16.x requer React 18.
- `@testing-library/user-event` 14.x tem API assíncrona obrigatória:
  ```diff
  - userEvent.click(button);
  + await userEvent.click(button);
  ```
- `@testing-library/jest-dom` 6.x: importar via `import '@testing-library/jest-dom'` no setup file.

---

## 2. assistant simple IBM-cloud

### Dependências

| Pacote | Atual | Mais Recente | Prioridade | Breaking Changes |
|--------|-------|-------------|------------|-----------------|
| `ibm-watson` | ^7.1.2 | 9.1.x | Alta | Sim |
| `dotenv` | ^6.2.0 | 16.4.x | Alta | Não |
| `express` | ^4.17.1 | 5.0.x / 4.21.x | Média | Sim (v5) |
| `body-parser` | ^1.19.0 | 1.20.x | Baixa | Não |
| `eslint` | ^5.14.0 | 9.x | Alta | Sim |
| `jest` | ^24.9.0 | 29.7.x | Alta | Sim |
| `supertest` | ^4.0.2 | 7.0.x | Média | Não |
| `babel-eslint` | ^10.0.3 | **Depreciado** | Alta | Migrar |
| `casperjs` | ^1.1.4 | **Abandonado** | Alta | Substituir |
| `phantomjs-prebuilt` | ^2.1.16 | **Abandonado** | Alta | Substituir |
| `codecov` | ^3.6.1 | **Depreciado** | Alta | Substituir |

### Passos de Atualização

#### 2.1 ibm-watson 7 → 9 (breaking)
```bash
npm install ibm-watson@^9
```
**Mudanças necessárias:**
- A API de autenticação mudou; verificar uso de `IamAuthenticator` e `BearerTokenAuthenticator`.
- Alguns serviços foram renomeados ou consolidados — consultar o [changelog oficial](https://github.com/watson-developer-cloud/node-sdk/blob/master/CHANGELOG.md).

#### 2.2 dotenv 6 → 16
```bash
npm install dotenv@^16
```
**Sem breaking changes críticas.** Novos recursos: suporte a multiline, `dotenv.config({ override: true })`, e arquivo `.env.vault`.

#### 2.3 Express 4 → 5 (opcional, breaking) ou atualizar patch
```bash
# Opção conservadora (sem breaking changes):
npm install express@^4.21

# Opção moderna (breaking):
npm install express@^5
```
**Se migrar para Express 5:**
- Handlers assíncronos que lançam erros são automaticamente capturados (não precisa mais de `try/catch` ou `next(err)`).
- `res.json()` e `res.send()` não aceitam mais `undefined`.
- Remoção de métodos depreciados: `res.sendfile()`, `app.del()`, etc.

**Observação:** `body-parser` é desnecessário no Express 5+ pois `express.json()` e `express.urlencoded()` já estão embutidos.

#### 2.4 ESLint 5 → 9 (breaking)
```bash
npm install eslint@^9
# Remover babel-eslint (depreciado) e instalar substituto:
npm uninstall babel-eslint
npm install --save-dev @babel/eslint-parser@^7
```
**Mudanças necessárias:**
- ESLint 9 usa **flat config** por padrão (`eslint.config.js`).
- O arquivo `.eslintrc.*` ainda funciona com a flag `ESLINT_USE_FLAT_CONFIG=false`.
- `babel-eslint` foi substituído por `@babel/eslint-parser`.

#### 2.5 Jest 24 → 29 (breaking)
```bash
npm install --save-dev jest@^29
```
**Mudanças:**
- Requer Node.js 14+.
- Configuração de `testEnvironment` mudou — padrão agora é `node` (antes era `jsdom`).
- Timers falsos têm nova API: `jest.useFakeTimers({ legacyFakeTimers: false })`.

#### 2.6 Pacotes abandonados — substituições recomendadas

| Pacote Atual | Status | Substituto Recomendado |
|-------------|--------|----------------------|
| `casperjs` | Abandonado (último release 2017) | [Playwright](https://playwright.dev/) ou [Cypress](https://www.cypress.io/) |
| `phantomjs-prebuilt` | Abandonado (projeto morto) | [Playwright](https://playwright.dev/) (headless Chromium nativo) |
| `codecov` (CLI npm) | Depreciado | [codecov/codecov-action](https://github.com/codecov/codecov-action) (GitHub Action) |

---

## 3. cloud-functions/functions

### Dependências

| Pacote | Atual | Mais Recente | Prioridade | Breaking Changes |
|--------|-------|-------------|------------|-----------------|
| `firebase-admin` | ^8.6.0 | 12.x | **Crítica** | Sim |
| `firebase-functions` | ^3.3.0 | 6.x | **Crítica** | Sim |
| `ibm-watson` | ^5.2.1 | 9.1.x | Alta | Sim |
| `dotenv` | ^8.2.0 | 16.4.x | Média | Não |
| `firebase-functions-test` | ^0.1.6 | 3.3.x | Alta | Sim |
| `cors` | ^2.8.5 | 2.8.5 | Baixa | Não |
| **Node.js engine** | **8** | **20** | **Crítica** | — |

### Passos de Atualização

#### 3.1 Node.js 8 → 20 (CRÍTICO)
```json
// package.json
"engines": {
  "node": "20"
}
```
> **Atenção:** Node.js 8 está **EOL desde dezembro de 2019**. O Google Cloud Functions **não suporta mais Node 8**. Atualizar para Node 20 é obrigatório para fazer deploy.

Atualizar também o `firebase.json` ou `apphosting.yaml` se definir a versão do runtime.

#### 3.2 firebase-admin 8 → 12 (breaking)
```bash
npm install firebase-admin@^12
```
**Mudanças principais:**
- API de inicialização modernizada — `admin.initializeApp()` sem argumentos usa ADC (Application Default Credentials) automaticamente.
- Módulos agora são importados separadamente:
  ```diff
  - const admin = require('firebase-admin');
  - admin.firestore()
  + const { initializeApp } = require('firebase-admin/app');
  + const { getFirestore } = require('firebase-admin/firestore');
  + initializeApp();
  + const db = getFirestore();
  ```
- Suporte a ESM com `import`.

#### 3.3 firebase-functions 3 → 6 (breaking)
```bash
npm install firebase-functions@^6
```
**Mudanças principais:**
- Nova API de triggers: `onRequest`, `onDocumentCreated`, etc. com namespace separado:
  ```diff
  - const functions = require('firebase-functions');
  - exports.fn = functions.https.onRequest(...)
  + const { onRequest } = require('firebase-functions/v2/https');
  + exports.fn = onRequest(...)
  ```
- v2 functions suportam concorrência, timeouts maiores, e regiões múltiplas.
- Configuração via `defineSecret()` / `defineString()` em vez de `functions.config()`.

#### 3.4 ibm-watson 5 → 9 (breaking)
```bash
npm install ibm-watson@^9
```
Mesmas observações do módulo 2 (seção 2.1).

#### 3.5 firebase-functions-test 0.1 → 3.x (breaking)
```bash
npm install --save-dev firebase-functions-test@^3
```
- API de mocking atualizada para suportar v2 functions.
- Inicialização mudou para suportar módulos separados do firebase-admin v12.

---

## Ordem Recomendada de Atualização

### Prioridade Imediata (segurança / EOL)
1. **`cloud-functions`**: Atualizar Node.js 8 → 20 + firebase-admin + firebase-functions (runtime EOL).
2. **`assistant simple IBM-cloud`**: Remover `phantomjs-prebuilt` e `casperjs` (abandonados, podem ter vulnerabilidades).

### Segunda Fase (breaking changes com planejamento)
3. **`react-assistant`**: React 16 → 18 (ecosystem preparado; ganho de performance).
4. **`react-assistant`**: Bootstrap 4 → 5 + Reactstrap 8 → 9.
5. **`assistant simple IBM-cloud`**: ibm-watson 7 → 9 + ESLint 5 → 9.

### Terceira Fase (melhorias)
6. Migrar `react-assistant` de CRA (`react-scripts`) para Vite.
7. Substituir testes de integração CasperJS/PhantomJS por Playwright.
8. Substituir CLI `codecov` por GitHub Action.

---

## Como Executar as Atualizações

### Verificar dependências desatualizadas
```bash
# Em cada módulo:
npm outdated

# Com relatório detalhado:
npx npm-check-updates
```

### Atualizar de forma segura (sem breaking changes)
```bash
# Atualiza apenas patches e minors dentro do range do package.json:
npm update

# Atualiza para versões mais recentes (ignora ranges):
npx npm-check-updates -u
npm install
```

### Verificar vulnerabilidades
```bash
npm audit
npm audit fix
# Para vulnerabilidades que requerem breaking changes:
npm audit fix --force
```

### Testar após cada atualização
```bash
npm test
npm run build  # onde aplicável
```

---

## Notas de Compatibilidade

| Combinação | Compatível |
|-----------|-----------|
| React 18 + react-redux 9 | Sim |
| React 18 + @testing-library/react 16 | Sim |
| Bootstrap 5 + Reactstrap 9 | Sim |
| Bootstrap 4 + Reactstrap 9 | **Não** |
| Express 5 + body-parser | Desnecessário (embutido) |
| Firebase Functions v2 + firebase-admin 12 | Sim |
| Node 8 + firebase-functions 6 | **Não** |
