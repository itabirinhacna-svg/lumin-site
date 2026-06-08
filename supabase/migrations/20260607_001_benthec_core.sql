create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key,
  name text not null,
  email text not null unique,
  document text not null default '',
  role text not null check (role in ('student', 'admin', 'corrector')),
  created_at timestamptz not null default now(),
  last_login_at timestamptz
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  description text not null default '',
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.plans (
  id uuid primary key default gen_random_uuid(),
  product_slug text not null,
  slug text not null unique,
  name text not null,
  price_label text not null,
  amount_cents integer not null,
  recurring boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.purchases (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  product_slug text not null,
  plan_id text not null,
  plan_name text not null,
  products jsonb not null default '[]'::jsonb,
  payment_method text not null,
  coupon text,
  status text not null check (status in ('pending', 'paid', 'failed', 'approved', 'cancelled', 'expired', 'refunded')),
  provider text not null,
  amount_label text,
  gateway_reference text,
  created_at timestamptz not null default now(),
  paid_at timestamptz
);

create table if not exists public.enrollments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  product_slug text not null,
  plan_id text not null,
  status text not null default 'active',
  created_at timestamptz not null default now()
);

create table if not exists public.student_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  product_slug text not null,
  track_slug text not null,
  lesson_slug text,
  progress_percent integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.question_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  question_id text not null,
  selected_option text,
  is_correct boolean,
  product_slug text not null,
  discipline text not null,
  subject text not null,
  micro_subject text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.simulation_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  simulation_mode text not null,
  product_slug text not null,
  score_percent integer not null default 0,
  summary jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.essays (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  linha text not null,
  contexto text not null,
  instructions text not null default '',
  body text not null default '',
  attachment_ref text,
  attachment_name text,
  attachment_mime_type text,
  notes text,
  status text not null,
  score_label text not null,
  devolutiva text not null,
  pontos_fortes text[] not null default '{}',
  pontos_melhoria text[] not null default '{}',
  erros_recorrentes text[] not null default '{}',
  plano_evolucao text[] not null default '{}',
  proxima_meta text not null default '',
  enem_breakdown jsonb,
  concurso_breakdown jsonb,
  submitted_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.essay_feedback (
  id uuid primary key default gen_random_uuid(),
  essay_id uuid not null references public.essays(id) on delete cascade,
  corrector_id uuid references public.profiles(id),
  status text not null,
  score_label text not null,
  devolutiva text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.admin_users (
  user_id uuid primary key references public.profiles(id) on delete cascade,
  created_at timestamptz not null default now()
);

create table if not exists public.support_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade,
  subject text not null,
  message text not null,
  status text not null default 'aberto',
  response text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.purchases enable row level security;
alter table public.enrollments enable row level security;
alter table public.student_progress enable row level security;
alter table public.question_attempts enable row level security;
alter table public.simulation_attempts enable row level security;
alter table public.essays enable row level security;
alter table public.essay_feedback enable row level security;
alter table public.support_requests enable row level security;

create or replace function public.current_role()
returns text
language sql
stable
as $$
  select role from public.profiles where id = auth.uid()
$$;

create policy "profiles self read" on public.profiles
for select using (id = auth.uid() or public.current_role() = 'admin');

create policy "profiles admin update" on public.profiles
for all using (public.current_role() = 'admin') with check (public.current_role() = 'admin');

create policy "purchases self read" on public.purchases
for select using (user_id = auth.uid() or public.current_role() = 'admin');

create policy "purchases admin manage" on public.purchases
for all using (public.current_role() = 'admin') with check (public.current_role() = 'admin');

create policy "enrollments self read" on public.enrollments
for select using (user_id = auth.uid() or public.current_role() = 'admin');

create policy "enrollments admin manage" on public.enrollments
for all using (public.current_role() = 'admin') with check (public.current_role() = 'admin');

create policy "progress self readwrite" on public.student_progress
for all using (user_id = auth.uid() or public.current_role() = 'admin')
with check (user_id = auth.uid() or public.current_role() = 'admin');

create policy "question attempts self readwrite" on public.question_attempts
for all using (user_id = auth.uid() or public.current_role() = 'admin')
with check (user_id = auth.uid() or public.current_role() = 'admin');

create policy "simulation attempts self readwrite" on public.simulation_attempts
for all using (user_id = auth.uid() or public.current_role() = 'admin')
with check (user_id = auth.uid() or public.current_role() = 'admin');

create policy "essays self readwrite" on public.essays
for all using (
  user_id = auth.uid()
  or public.current_role() = 'admin'
  or public.current_role() = 'corrector'
)
with check (
  user_id = auth.uid()
  or public.current_role() = 'admin'
  or public.current_role() = 'corrector'
);

create policy "essay feedback self readwrite" on public.essay_feedback
for all using (
  public.current_role() in ('admin', 'corrector')
  or exists (select 1 from public.essays e where e.id = essay_id and e.user_id = auth.uid())
)
with check (
  public.current_role() in ('admin', 'corrector')
);

create policy "support self readwrite" on public.support_requests
for all using (user_id = auth.uid() or public.current_role() = 'admin')
with check (user_id = auth.uid() or public.current_role() = 'admin');
