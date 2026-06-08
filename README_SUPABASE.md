# Supabase BenThec

## Variaveis obrigatorias

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

## Passos

1. Abra o projeto Supabase da BenThec.
2. Rode a migration em `supabase/migrations/20260607_001_benthec_core.sql`.
3. Crie os usuarios iniciais no painel:
   - `admin`
   - `corrector`
4. Preencha as variaveis no Vercel.
5. Se quiser Google login, ative o provider no Supabase Auth e marque:
   - `NEXT_PUBLIC_SUPABASE_GOOGLE_AUTH_ENABLED=true`

## Comportamento da plataforma

- Com Supabase configurado, login/cadastro e persistencia principal passam a usar Supabase.
- Sem Supabase configurado, a plataforma continua em modo local/demo.

## Tabelas principais

- `profiles`
- `products`
- `plans`
- `purchases`
- `enrollments`
- `student_progress`
- `question_attempts`
- `simulation_attempts`
- `essays`
- `essay_feedback`
- `admin_users`
- `support_requests`
