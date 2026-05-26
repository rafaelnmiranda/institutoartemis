# Deploy — Instituto Artemis (Vercel)

## Status

| Item | Estado |
|------|--------|
| Projeto Vercel | `instituto-artemis` |
| GitHub | `rafaelnmiranda/institutoartemis` conectado |
| URL provisória | https://instituto-artemis.vercel.app |
| Domínios na Vercel | `institutoartemis.com.br`, `www.institutoartemis.com.br` (aguardando DNS) |
| Blob | Store `instituto-artemis` ligado ao projeto |

## Credenciais do admin

As credenciais de produção ficam em **`.deploy-secrets.txt`** (gitignored) na raiz do projeto, ou em **Vercel → Settings → Environment Variables**.

- E-mail: `ADMIN_EMAIL` (`rafa@byutmb.com.br`)
- Senha: `ADMIN_PASSWORD` (gerada na configuração; redefina no painel Vercel se necessário)

Painel: https://instituto-artemis.vercel.app/admin

## DNS (Registro.br)

Siga [DNS-REGISTRO-BR.md](./DNS-REGISTRO-BR.md).

## E-mail

Siga [EMAIL-MX.md](./EMAIL-MX.md).

## Variáveis de ambiente (Production)

| Variável | Configurada |
|----------|-------------|
| `ADMIN_EMAIL` | Sim |
| `ADMIN_PASSWORD` | Sim |
| `CONTACT_TO` | Sim (`rafa@byutmb.com.br`) |
| `BLOB_READ_WRITE_TOKEN` | Sim (via Blob store) |
| `SMTP_*` | Não — formulário em modo log até configurar |

## Redeploy

```bash
npx vercel deploy --prod --yes
```

Ou push na branch `main` do GitHub (deploy automático).
