# E-mail — contato@institutoartemis.com.br

O site em produção envia o formulário de contato para `CONTACT_TO` (hoje: `rafa@byutmb.com.br`). O endereço público no site é `contato@institutoartemis.com.br`.

## 1. Contratar provedor de e-mail

Exemplos: Google Workspace, Zoho Mail, Microsoft 365, Locaweb E-mail.

## 2. Registros MX no Registro.br

Na mesma **zona DNS** do domínio (junto com os registros A do site), adicione os **MX** que o provedor informar.

**Exemplo (Google Workspace):**

| Tipo | Nome | Valor | Prioridade |
|------|------|-------|------------|
| MX | `@` | `ASPMX.L.GOOGLE.COM` | 1 |
| MX | `@` | `ALT1.ASPMX.L.GOOGLE.COM` | 5 |
| MX | `@` | `ALT2.ASPMX.L.GOOGLE.COM` | 5 |
| MX | `@` | `ALT3.ASPMX.L.GOOGLE.COM` | 10 |
| MX | `@` | `ALT4.ASPMX.L.GOOGLE.COM` | 10 |

Use os valores exatos do seu provedor (não copie cegamente se não for Google).

## 3. SPF / DKIM (recomendado)

O provedor passará registros **TXT** para reduzir spam. Adicione na zona DNS do Registro.br.

## 4. SMTP no Vercel (formulário do site)

No projeto **instituto-artemis** → **Settings → Environment Variables** (Production), configure:

- `SMTP_HOST` — ex.: `smtp.gmail.com`
- `SMTP_PORT` — `587`
- `SMTP_USER` — conta que envia (ex.: `contato@institutoartemis.com.br`)
- `SMTP_PASS` — senha de app do provedor
- `CONTACT_TO` — quem recebe (pode ser o mesmo `contato@` ou outro)

Depois de salvar, faça um **redeploy** (Deployments → Redeploy) para aplicar.

## 5. Teste

Envie uma mensagem em `https://institutoartemis.com.br/contato` e confirme o recebimento na caixa configurada em `CONTACT_TO`.
