# Deploy BenThec na Vercel

## 1. Conectar o repositório

1. Suba a branch final para o GitHub.
2. Na Vercel, clique em `Add New Project`.
3. Importe o repositório da BenThec.
4. Confirme `Next.js` como framework.

## 2. Configurar variáveis de ambiente

Copie os nomes do arquivo `.env.example`.

Valores mínimos para produção:

- `NEXT_PUBLIC_APP_URL=https://benthec.com.br`
- `SESSION_SECRET`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `PAYMENT_PROVIDER`

Se Mercado Pago estiver ativo:

- `MERCADO_PAGO_PUBLIC_KEY`
- `MERCADO_PAGO_ACCESS_TOKEN`
- `MERCADO_PAGO_WEBHOOK_SECRET`

Se Google login estiver ativo:

- `NEXT_PUBLIC_SUPABASE_GOOGLE_AUTH_ENABLED=true`

## 3. Configurar domínio

1. No projeto da Vercel, abra `Settings > Domains`.
2. Adicione:
   - `benthec.com.br`
   - `www.benthec.com.br`
3. Siga a instrução da Vercel para apontar DNS no registrador.
4. Garanta que o domínio principal fique em `benthec.com.br`.

## 4. Build e publicação

1. Rode localmente `npm.cmd run build`.
2. Faça o deploy pela Vercel.
3. Confirme que a build concluiu sem erro.

## 5. QA mínimo pós-deploy

Teste estas rotas:

1. `/`
2. `/login`
3. `/area`
4. `/checkout`
5. `/checkout/success`
6. `/checkout/pendente`
7. `/questoes`
8. `/simulados`
9. `/redacao`
10. `/redacao/envio`
11. `/redacao/status`
12. `/redacao/historico`
13. `/redacao/devolutiva`
14. `/pmes`
15. `/enem`
16. `/admin`

## 6. Checklist final de colocação no ar

1. Conectar GitHub.
2. Conectar Vercel.
3. Inserir variáveis de ambiente.
4. Rodar migration do Supabase.
5. Configurar domínio `benthec.com.br`.
6. Configurar webhook do Mercado Pago.
7. Testar compra aprovada.
8. Testar login.
9. Testar área do aluno.
10. Testar envio e correção de redação.
11. Testar questões e simulados.

## 7. Observação honesta

Se as chaves reais ainda não estiverem preenchidas, a BenThec continua funcionando em modo demonstração sem quebrar o site.
