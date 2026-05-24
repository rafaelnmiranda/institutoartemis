# Instituto Conexão Artemis — Site Institucional

Site institucional do **Instituto Conexão Artemis** (institutoartemis.com.br), construído com Next.js 15, Tailwind CSS 4 e CMS baseado em JSON.

## Stack

- **Next.js 15** (App Router) + TypeScript
- **Tailwind CSS 4** — paleta institucional (eggshell, burnt-peach, twilight-indigo, muted-teal, apricot-cream)
- **CMS JSON** — conteúdo em `data/site.json`, editável via painel `/admin`
- **Nodemailer** — formulário de contato via Gmail SMTP (Google Workspace)
- **Vercel Blob** — uploads de imagens e PDFs em produção (fallback local em dev)

## Páginas públicas

| Rota | Descrição |
|------|-----------|
| `/` | Home |
| `/sobre` | Sobre, governança e objetivos |
| `/projetos` | Lista de projetos sociais |
| `/projetos/um-caicara-em-chamonix` | Projeto em destaque (4ª edição) |
| `/documentos` | Transparência — documentos por categoria |
| `/contato` | Formulário de contato |

## Admin

Painel oculto em **`/admin`** (sem link no site público).

- **Login padrão:** `rafa@byutmb.com.br` / `admin`
- Gerenciar textos, menu, imagens, documentos PDF e e-mail de destino

## Setup local

```bash
# 1. Instalar dependências
npm install

# 2. Configurar variáveis de ambiente
cp .env.example .env.local
# Edite .env.local com suas credenciais

# 3. Rodar em desenvolvimento
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

### Build de produção

```bash
npm run build
npm start
```

## Variáveis de ambiente

| Variável | Obrigatória | Descrição |
|----------|-------------|-----------|
| `SMTP_HOST` | Para e-mail real | `smtp.gmail.com` |
| `SMTP_PORT` | Para e-mail real | `587` |
| `SMTP_USER` | Para e-mail real | E-mail Google Workspace (ex: `rafa@byutmb.com.br`) |
| `SMTP_PASS` | Para e-mail real | App Password do Google |
| `CONTACT_TO` | Recomendada | Destino do formulário (padrão: `rafa@byutmb.com.br`) |
| `ADMIN_EMAIL` | Opcional | Login admin (padrão: `rafa@byutmb.com.br`) |
| `ADMIN_PASSWORD` | Opcional | Senha admin (padrão: `admin`) |
| `BLOB_READ_WRITE_TOKEN` | Produção | Token Vercel Blob para uploads persistentes |

> **Sem SMTP configurado:** o formulário funciona em modo mock — a mensagem é logada no console do servidor.

## Gmail App Password (Google Workspace)

1. Acesse [myaccount.google.com](https://myaccount.google.com) com a conta `rafa@byutmb.com.br`
2. Ative **Verificação em duas etapas** (2FA) — obrigatório para App Passwords
3. Vá em **Segurança → Senhas de app** (ou pesquise "App passwords")
4. Crie uma senha de app para "Mail" / "Outro (Instituto Artemis)"
5. Copie a senha de 16 caracteres gerada
6. Configure no `.env.local`:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=rafa@byutmb.com.br
SMTP_PASS=xxxx xxxx xxxx xxxx
CONTACT_TO=rafa@byutmb.com.br
```

## Deploy na Vercel

### 1. Conectar repositório

```bash
# Via CLI (se ainda não fez deploy)
npx vercel
```

Ou importe o repositório GitHub no [dashboard Vercel](https://vercel.com).

### 2. Variáveis de ambiente na Vercel

Adicione todas as variáveis do `.env.example` em **Project Settings → Environment Variables**.

### 3. Vercel Blob (uploads)

1. No dashboard Vercel: **Storage → Create → Blob**
2. Conecte ao projeto — `BLOB_READ_WRITE_TOKEN` é injetado automaticamente
3. Sem Blob, uploads funcionam apenas em desenvolvimento local

> **CMS JSON em produção:** alterações de texto via admin gravam em `data/site.json`. Na Vercel (serverless), essas gravações **não persistem** entre deploys. Para produção, edite localmente e faça commit, ou migre para Vercel KV/Blob no futuro.

### 4. DNS — registro.br → Vercel

Domínio: **institutoartemis.com.br**

1. No [registro.br](https://registro.br), acesse o painel do domínio
2. Em **DNS**, configure:

**Opção A — CNAME (recomendado para subdomínio www):**
```
Tipo: CNAME
Nome: www
Valor: cname.vercel-dns.com
```

**Opção B — Apex (domínio raiz):**
```
Tipo: A
Nome: @ (ou vazio)
Valor: 76.76.21.21
```

3. Na Vercel: **Project Settings → Domains → Add**
   - Adicione `institutoartemis.com.br`
   - Adicione `www.institutoartemis.com.br` (opcional)
4. Aguarde propagação DNS (até 48h, geralmente minutos)
5. Vercel provisiona SSL automaticamente

## Estrutura do projeto

```
data/
  site.json          # Conteúdo CMS (textos, menu, projetos, documentos)
  documents/         # PDFs locais (dev)
public/
  uploads/           # Imagens locais (dev)
src/
  app/               # Páginas e API routes
  components/        # Componentes React
  lib/               # Auth, content, email, storage
_reference/
  index_artemis.html # HTML original de referência
```

## Categorias de documentos (Transparência)

Inspirado em [Instituto Bravo 99](https://institutobravo99.com.br/transparencia/):

- Atas e Estatutos
- Documentos de projetos
- Relatórios de Atividades
- Relatórios Financeiros, Balanços e DRE
- Processos de Contratação
- Documentos institucionais

## Licença

Projeto privado — Instituto Conexão Artemis.
