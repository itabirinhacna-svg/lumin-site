# Mercado Pago BenThec

## Variaveis obrigatorias

- `PAYMENT_PROVIDER=mercado-pago`
- `MERCADO_PAGO_PUBLIC_KEY`
- `MERCADO_PAGO_ACCESS_TOKEN`
- `MERCADO_PAGO_WEBHOOK_SECRET`
- `NEXT_PUBLIC_APP_URL`

## O que ja esta preparado

- Checkout Pro com `init_point`
- PIX, boleto e cartao pelo proprio Mercado Pago
- Parcelamento ate 12x
- Webhook em `/api/payments/webhook`
- Status aceitos:
  - `approved`
  - `paid`
  - `pending`
  - `cancelled`
  - `expired`
  - `refunded`
  - `failed`

## Fluxo

1. Usuario escolhe plano.
2. A plataforma cria `purchase` local/Supabase.
3. Se Mercado Pago estiver ativo, o usuario vai para o `init_point`.
4. O webhook recebe a notificacao.
5. Quando o status vira `approved` ou `paid`, o acesso fica liberado.

## Teste minimo

1. Configure as variaveis.
2. Rode `npm run build`.
3. Inicie a aplicacao.
4. Abra `/checkout`.
5. Escolha um plano.
6. Confirme se o redirecionamento vai para o Mercado Pago.
7. Simule notificacao no webhook e confirme a mudanca de status da compra.
