# DNS — institutoartemis.com.br (Registro.br → Vercel)

O domínio já está adicionado ao projeto **instituto-artemis** na Vercel. Falta apontar o DNS no Registro.br.

## Passo a passo no Registro.br

1. Acesse [registro.br](https://registro.br) e faça login.
2. **Meus domínios** → `institutoartemis.com.br`.
3. **Editar zona DNS** (mantenha os servidores DNS do Registro.br: `a.auto.dns.br` e `b.auto.dns.br`).
4. Inclua ou altere os registros abaixo (remova conflitos antigos para `@` e `www` se existirem):

| Tipo | Nome / entrada | Valor | TTL |
|------|----------------|-------|-----|
| **A** | `@` (raiz, vazio) | `76.76.21.21` | 3600 (padrão) |
| **A** | `www` | `76.76.21.21` | 3600 |

A Vercel recomenda registro **A** para apex e `www` neste projeto (não CNAME para `www`).

5. Salve a zona e aguarde a propagação (geralmente de alguns minutos a algumas horas).

## Verificação

- No painel Vercel: **Settings → Domains** — os domínios devem ficar com status **Valid**.
- HTTPS é emitido automaticamente pela Vercel após o DNS propagar.
- Teste no navegador: `https://institutoartemis.com.br` e `https://www.institutoartemis.com.br`.

## Domínio primário

No painel Vercel (**Settings → Domains**), defina `institutoartemis.com.br` como **Primary** e configure redirecionamento de `www` para o apex (sem `www`).

## Alternativa: nameservers da Vercel

Se preferir que a Vercel gerencie todo o DNS, troque os nameservers do domínio para:

- `ns1.vercel-dns.com`
- `ns2.vercel-dns.com`

Isso substitui a edição manual de registros A/CNAME no Registro.br.

## Site temporário

Enquanto o DNS não propaga, o site já está em:

**https://instituto-artemis.vercel.app**
