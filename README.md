# Instituto Conexão Artemis — Site Institucional

Site institucional do [Instituto Conexão Artemis](https://institutoartemis.com.br), ONG brasileira dedicada ao esporte de natureza, apoio a atletas e projetos via Lei de Incentivo ao Esporte.

## Sobre o projeto

Este repositório contém o site público do instituto: páginas institucionais, transparência (documentos), projetos sociais e formulário de contato. O conteúdo é gerenciado por um CMS leve baseado em JSON, com painel administrativo para a equipe de manutenção.

## Stack

- **Next.js 15** (App Router) + TypeScript
- **Tailwind CSS 4**
- **CMS JSON** — conteúdo em `data/site.json`
- **Nodemailer** — envio do formulário de contato (SMTP)
- **Vercel Blob** — armazenamento de uploads em produção

## Páginas públicas

| Rota | Descrição |
|------|-----------|
| `/` | Home |
| `/sobre` | Sobre, governança e objetivos |
| `/projetos` | Lista de projetos sociais |
| `/projetos/[slug]` | Detalhe de cada projeto |
| `/documentos` | Transparência — documentos por categoria |
| `/contato` | Formulário de contato |

## Configuração local

Requisitos: Node.js 18+ e npm.

```bash
git clone <url-do-repositorio>
cd site
npm install
cp .env.example .env.local
# Preencha .env.local com os valores fornecidos pela equipe
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

Para build de produção:

```bash
npm run build
npm start
```

As variáveis de ambiente necessárias estão documentadas em [`.env.example`](.env.example) (apenas nomes e descrições — **nunca** commite valores reais).

> **Equipe de manutenção:** deploy na Vercel, DNS (Registro.br), SMTP e credenciais do admin estão em [`docs/DEPLOY-VERCEL.md`](docs/DEPLOY-VERCEL.md), [`docs/DNS-REGISTRO-BR.md`](docs/DNS-REGISTRO-BR.md) e [`docs/EMAIL-MX.md`](docs/EMAIL-MX.md). Credenciais locais: `.deploy-secrets.txt` (não versionado).

### Imagens no admin (`/admin/images`)

| ID | Onde aparece |
|----|----------------|
| `hero-bg` | Fundo do hero na home |
| `home-about` | Foto ao lado de “Quem somos” na home |
| `lie-cta` | Faixa “Apoie via Lei de Incentivo” na home |
| `about-banner` | Topo da página Sobre |
| `about-mission` | Ao lado de missão/visão na Sobre |
| `projects-banner` | Cabeçalho da lista de projetos |
| `project-caicara` | Cards e página do projeto Caiçara |
| `contact-visual` | Painel visual na página Contato |

Em **Conteúdo**, cada projeto tem o campo **ID da imagem** (deve coincidir com um slot acima).

## Estrutura do projeto

```
data/
  site.json          # Conteúdo CMS (textos, menu, projetos, documentos)
  documents/         # PDFs locais (desenvolvimento)
public/
  uploads/           # Imagens locais (desenvolvimento)
src/
  app/               # Páginas e rotas de API
  components/        # Componentes React
  lib/               # Autenticação, conteúdo, e-mail, storage
```

## Como contribuir

Contribuições são bem-vindas. Sugestões gerais:

1. Abra uma issue descrevendo a melhoria ou correção.
2. Faça fork do repositório e crie um branch para sua alteração.
3. Mantenha o escopo focado e siga o estilo existente do código.
4. Abra um pull request com descrição clara do que mudou e por quê.

Para dúvidas sobre conteúdo institucional ou prioridades, entre em contato pelo site: [institutoartemis.com.br/contato](https://institutoartemis.com.br/contato).

## Licença

Código-fonte disponibilizado para fins de transparência e colaboração com a equipe do instituto. Uso, redistribuição ou fork por terceiros devem respeitar a identidade e a missão do Instituto Conexão Artemis. Consulte a equipe para termos específicos.
