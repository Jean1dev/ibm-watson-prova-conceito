# ibm-watson-learn

Projeto de estudo e exemplos práticos de integração com o **IBM Watson Assistant**, demonstrando diferentes arquiteturas e formas de deploy de um chatbot conversacional.

## Visão Geral

O projeto contém três implementações independentes de um chatbot (chamado **Aluraphonebot**), voltado para atendimento em domínios bancário e de venda de smartphones. Os exemplos cobrem desde um backend simples em Node.js até uma SPA em React com funções serverless no Firebase.

---

## Estrutura do Projeto

```
├── assistant simple IBM-cloud/   # Backend Node.js + Express com deploy no IBM Cloud
├── cloud-functions/              # Funções serverless no Google Firebase
├── react-assistant/              # Frontend React com Redux
├── intents/                      # CSVs com exemplos de intenções (pt-BR)
├── intents per project/          # Intenções organizadas por projeto
├── entitis per project/          # Entidades organizadas por projeto
└── dialog.json                   # Fluxo de diálogo do Watson Assistant
```

---

## Componentes

### 1. Backend Express — `assistant simple IBM-cloud/`

Servidor Node.js com Express que expõe a API do Watson Assistant para um frontend web simples.

**Endpoints:**
| Método | Rota | Descrição |
|--------|------|-----------|
| `GET` | `/api/session` | Cria uma nova sessão no Watson Assistant |
| `POST` | `/api/message` | Envia uma mensagem e retorna a resposta do Watson |

**Tecnologias:** Node.js, Express 4, IBM Watson SDK 7, Dotenv, Jest, CasperJS

**Configuração** — crie um arquivo `.env` na raiz da pasta:
```env
ASSISTANT_ID=<workspace_id>
ASSISTANT_IAM_APIKEY=<api_key>
ASSISTANT_URL=https://gateway.watsonplatform.net/assistant/api
```

**Como executar:**
```bash
cd "assistant simple IBM-cloud"
npm install
npm start          # http://localhost:3000
npm run test-unit  # testes unitários com Jest
```

**Deploy no IBM Cloud (Cloud Foundry):**
```bash
ibmcloud login
ibmcloud target --cf
ibmcloud app push
```

---

### 2. Firebase Cloud Functions — `cloud-functions/`

Backend serverless com Google Firebase, utilizado como intermediário entre o frontend React e o Watson Assistant.

**Funções disponíveis:**
- `createSession` — cria uma sessão no Watson Assistant
- `sendToWatson` — envia mensagens e retorna as respostas

**Tecnologias:** Firebase Functions 3, Firebase Admin 8, IBM Watson SDK 5, CORS

**Configuração** — crie `functions/.env`:
```env
ASSISTANT_ID=<assistant_id>
ASSISTANT_IAM_APIKEY=<api_key>
ASSISTANT_URL=https://gateway.watsonplatform.net/assistant/api
```

**Como executar:**
```bash
cd cloud-functions
npm install
npm run serve    # emulador local na porta 5000
npm run deploy   # deploy no Firebase
```

---

### 3. Frontend React — `react-assistant/`

Interface web em React com gerenciamento de estado via Redux, que consome as Cloud Functions do Firebase.

**Tecnologias:** React 16, Redux 4, Axios, Bootstrap 4, Reactstrap

**Como executar:**
```bash
cd react-assistant
npm install
npm start        # http://localhost:3000
npm run build    # build de produção
npm test         # testes
```

> As URLs das Cloud Functions são configuradas em `src/contants/url.js`.

---

### 4. Dados de Treinamento

| Arquivo / Pasta | Conteúdo |
|-----------------|----------|
| `intents/*.csv` | Exemplos de intenções em português: saudação, despedida, confirmação, negação |
| `dialog.json` | Fluxo de diálogo completo do Aluraphonebot |
| `assistant simple IBM-cloud/training/bank_simple_workspace.json` | Workspace completo (intents, entities e dialog) para importar no Watson |

**Para importar o workspace:**
1. Acesse o IBM Watson Assistant no IBM Cloud
2. Clique em **Import workspace**
3. Selecione o arquivo `bank_simple_workspace.json`
4. Escolha _Everything (Intents, Entities, and Dialog)_
5. Copie o **Workspace ID** gerado para a variável `ASSISTANT_ID` no `.env`

---

## Pré-requisitos

- Node.js 12+
- npm
- Conta no [IBM Cloud](https://cloud.ibm.com) com o serviço **Watson Assistant** provisionado
- (Opcional) Conta no [Firebase](https://firebase.google.com) para o componente serverless

---

## Licença

Distribuído sob a licença MIT. Consulte o arquivo [LICENSE](LICENSE) para mais detalhes.
