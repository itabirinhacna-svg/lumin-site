# BenThec Premium

Base em Next.js para uma plataforma educacional com:

- landing page comercial para concursos e ENEM
- login com sessao segura
- checkout em modo demonstracao ou pronto para gateway real
- area do aluno protegida por compra aprovada
- painel operacional simples para compras e redacoes
- webhook de pagamento com assinatura HMAC
- persistencia local em `data/app-db.json`

## Variaveis de ambiente

Use o arquivo `.env.example` como referencia.

Campos principais:

- `NEXT_PUBLIC_APP_URL`
- `SESSION_SECRET`
- `PAYMENT_PROVIDER`
- `MERCADO_PAGO_TOKEN`
- `STRIPE_SECRET_KEY`
- `ASAAS_API_KEY`
- `PAYMENT_WEBHOOK_SECRET`
- `WEBHOOK_SECRET`
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`

## Fluxo local

1. Instale dependencias:

```powershell
npm.cmd install
```

2. Rode em desenvolvimento:

```powershell
npm.cmd run dev
```

3. Rode o build de validacao:

```powershell
npm.cmd run build
```

4. Valide saude da aplicacao:

```powershell
Invoke-RestMethod http://localhost:3000/api/health
```

## Webhook local

O endpoint espera `POST /api/payments/webhook` com corpo JSON:

```json
{
  "purchaseId": "id-da-compra",
  "status": "approved",
  "gatewayReference": "ref-externa"
}
```

O header `x-BenThec-signature` deve receber o `HMAC-SHA256` do corpo usando `WEBHOOK_SECRET`.

Status aceitos:

- `approved`
- `paid`
- `pending`
- `cancelled`
- `expired`
- `refunded`
- `failed`

## Persistencia

O adaptador atual usa `data/app-db.json`. Ele ja salva:

- usuarios
- compras
- redacoes
- anexos de redacao

Essa camada foi organizada para troca futura por Supabase ou Postgres sem reescrever a interface.

## Checklist de deploy

1. Subir o projeto para o GitHub.
2. Conectar o repositorio na Vercel.
3. Configurar variaveis de ambiente com base em `.env.example`.
4. Apontar dominio e validar `NEXT_PUBLIC_APP_URL`.
5. Inserir as chaves reais do gateway escolhido.
6. Configurar o webhook no provedor de pagamento.
7. Testar checkout, login, area do aluno, redacao, questoes e simulados.
8. Validar upload de JPG, PNG, PDF e HEIC no fluxo de redacao.

## Observacao honesta

Sem chaves reais de pagamento e sem operacao humana de correcao, a plataforma continua pronta para demonstracao e deploy tecnico, mas nao para venda plena.
