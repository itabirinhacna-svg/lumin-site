# Atlas Aprova Premium

Base em Next.js para um produto educacional com:

- landing page premium para concursos e ENEM
- checkout com criação de conta
- autenticação com cookie `httpOnly`
- área do aluno protegida por compra confirmada
- painel admin protegido por perfil
- endpoint de healthcheck
- webhook de pagamento com assinatura HMAC

## Variáveis de ambiente

Use `.env.example` como referência.

## Fluxo local

1. Instale dependências:

```powershell
npm.cmd install
```

2. Rode em desenvolvimento:

```powershell
npm.cmd run dev
```

3. Valide saúde da aplicação:

```powershell
Invoke-RestMethod http://localhost:3000/api/health
```

## Webhook local

O endpoint espera `POST /api/payments/webhook` com corpo JSON:

```json
{
  "purchaseId": "id-da-compra",
  "status": "paid",
  "gatewayReference": "ref-externa"
}
```

A assinatura deve ser enviada no header `x-atlas-signature` com `HMAC-SHA256` do corpo usando `PAYMENT_WEBHOOK_SECRET`.

## Observação importante

O adaptador atual usa `data/app-db.json` para persistência local. Isso é suficiente para validação e desenvolvimento, mas a próxima etapa para produção é trocar essa camada por PostgreSQL ou outro banco gerenciado.
