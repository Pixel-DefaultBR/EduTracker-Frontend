# EduTracker — Frontend

Interface web desenvolvida em **React + Vite** para o sistema de controle de ausências escolares. Permite cadastrar alunos, registrar faltas diárias e configurar o webhook do Discord para recebimento de alertas automáticos.

---

## Por que essas tecnologias?

### React
O React foi escolhido pela sua capacidade de escalar naturalmente junto ao backend em C#. Com sua arquitetura baseada em componentes reutilizáveis, é simples adicionar novas funcionalidades sem comprometer o que já existe. A separação clara entre componentes também facilita a manutenção e o crescimento do projeto ao longo do tempo.

### Vite
O Vite substitui ferramentas mais antigas como o Create React App entregando builds mais rápidos, hot reload instantâneo e configuração mínima — ideal tanto para desenvolvimento quanto para produção em ambientes cloud como o Railway.

### Discord como vetor de notificação
Para este protótipo, o Discord foi utilizado como canal de alertas por ser simples de integrar via Webhook e suficiente para validar o fluxo de notificações. A evolução natural do projeto é migrar para um servidor **SMTP** dedicado, possibilitando o envio formal de e-mails para responsáveis e coordenação escolar.

---

## Tecnologias

| Tecnologia | Uso |
|---|---|
| React 19 | Biblioteca de interface |
| Vite | Bundler e dev server |
| JavaScript (ES Modules) | Linguagem |
| Fetch API | Comunicação com o backend |

---

## Estrutura do Projeto

```
FrontEnd/src/
├── api/
│   └── faltasApi.js              # Funções de comunicação com a API
├── components/
│   ├── CadastroAlunoForm.jsx     # Formulário para cadastrar alunos
│   ├── RegistroFaltaForm.jsx     # Formulário para registrar faltas
│   └── ConfiguracaoForm.jsx      # Formulário para configurar webhook do Discord
├── App.jsx                       # Componente raiz — organiza os formulários
└── main.jsx                      # Entry point da aplicação
```

---

## Componentes

### `ConfiguracaoForm`
Permite salvar a URL do Discord Webhook no backend. Ao carregar, busca a URL já salva e preenche o campo automaticamente.

### `CadastroAlunoForm`
Formulário com os campos **Nome** e **E-mail** para cadastrar novos alunos no banco de dados. Ao cadastrar com sucesso, notifica o `App` para atualizar a lista de alunos no formulário de faltas.

### `RegistroFaltaForm`
Formulário principal do sistema. Permite:
- Selecionar um aluno da lista
- Informar a data e a quantidade de faltas
- Visualizar o resumo de faltas dos últimos 7 dias após o registro
- Ver alerta visual caso o limite de 10 faltas tenha sido atingido

---

## Comunicação com a API

Todas as chamadas HTTP estão centralizadas em `src/api/faltasApi.js`:

| Função | Método | Rota |
|---|---|---|
| `listarAlunos()` | GET | `/api/faltas/alunos` |
| `criarAluno(nome, email)` | POST | `/api/faltas/alunos` |
| `registrarFalta(alunoId, data, qtd)` | POST | `/api/faltas` |
| `obterResumoAluno(alunoId)` | GET | `/api/faltas/alunos/{id}/resumo` |

A URL base da API é definida pela variável de ambiente `VITE_API_URL`. Se não estiver definida, usa `http://localhost:5000` como fallback.

---

## Variáveis de Ambiente

| Variável | Descrição | Obrigatória |
|---|---|---|
| `VITE_API_URL` | URL base do backend (ex: `https://seu-backend.up.railway.app`) | Sim (produção) |

> Crie um arquivo `.env` na raiz do projeto baseado no `.env.example` para desenvolvimento local.

---

## Como Rodar Localmente

### Pré-requisitos
- [Node.js 20+](https://nodejs.org/)
- Backend rodando em `http://localhost:5000`

### Passos

```bash
# 1. Clonar o repositório
git clone https://github.com/Pixel-DefaultBR/EduTracker-Frontend.git
cd EduTracker-Frontend

# 2. Instalar dependências
npm install

# 3. Criar o arquivo de ambiente
cp .env.example .env
# Edite o .env se necessário

# 4. Rodar em modo desenvolvimento
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`.

---

## Deploy (Railway)

O projeto está configurado para deploy via **Dockerfile** no Railway usando `node:22-alpine`.

1. Criar um novo serviço no Railway apontando para este repositório
2. Adicionar a variável de ambiente `VITE_API_URL` com a URL pública do backend
3. O Railway faz o build com `npm run build` e serve os arquivos estáticos com `serve`

> A variável `VITE_API_URL` precisa estar configurada **antes do build**, pois o Vite a embute no bundle em tempo de compilação.
