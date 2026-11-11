-- Cole este arquivo no SQL Editor do Supabase. Substitua TROQUE-ESTA-SENHA antes de executar.
create extension if not exists pgcrypto;
create table if not exists public.ti_config(id integer primary key default 1 check(id=1), is_open boolean not null default false, admin_hash text not null);
insert into public.ti_config(id,is_open,admin_hash) values(1,false,crypt('Craft531.',gen_salt('bf'))) on conflict(id) do nothing;
create table if not exists public.ti_teams(id uuid primary key default gen_random_uuid(), name text not null, token uuid not null unique default gen_random_uuid(), joined_at timestamptz not null default now(), finished_at timestamptz, answers jsonb, correct integer, score integer, time_seconds integer);
create unique index if not exists ti_team_name_unique on public.ti_teams(lower(name));
alter table public.ti_config enable row level security;
alter table public.ti_teams enable row level security;
revoke all on public.ti_config, public.ti_teams from anon, authenticated;
create or replace function public.ti_game_status() returns jsonb language sql stable security definer set search_path = '' as $$select jsonb_build_object('open',is_open) from public.ti_config where id=1$$;
create or replace function public.ti_leaderboard() returns jsonb language sql stable security definer set search_path = '' as $$select coalesce(jsonb_agg(jsonb_build_object('team',name,'correct',correct,'score',score,'time_seconds',time_seconds) order by score desc,correct desc,time_seconds asc), '[]'::jsonb) from public.ti_teams where finished_at is not null$$;
create or replace function public.ti_join(p_team text) returns jsonb language plpgsql security definer set search_path = '' as $$
declare t public.ti_teams;
begin
 if not (select is_open from public.ti_config where id=1) then raise exception 'A competição ainda não foi liberada.';end if;
 if length(trim(p_team)) < 2 or length(trim(p_team)) > 35 then raise exception 'Use um nome de 2 a 35 caracteres.';end if;
 insert into public.ti_teams(name) values(trim(p_team)) returning * into t;
 return jsonb_build_object('token',t.token);
exception when unique_violation then raise exception 'Este nome de equipe já está em uso.';
end $$;
create or replace function public.ti_submit(p_token uuid,p_answers jsonb) returns jsonb language plpgsql security definer set search_path = '' as $$
declare t public.ti_teams; keys integer[] := array[1,2,3,0,1,2,3,0,1,2]; n integer; hits integer:=0; secs integer;
begin
 select * into t from public.ti_teams where token=p_token for update;
 if not found then raise exception 'Equipe não encontrada.';end if;
 if t.finished_at is not null then raise exception 'Esta equipe já concluiu o jogo.';end if;
 if jsonb_typeof(p_answers) <> 'array' or jsonb_array_length(p_answers) <> 10 then raise exception 'Responda às 10 perguntas.';end if;
 for n in 0..9 loop
  if jsonb_typeof(p_answers->n) <> 'number' or (p_answers->>n)::integer not between -1 and 3 then raise exception 'Resposta inválida.';end if;
  if (p_answers->>n)::integer=keys[n+1] then hits:=hits+1;end if;
 end loop;
 secs:=greatest(1,extract(epoch from (now()-t.joined_at))::integer);
 update public.ti_teams set answers=p_answers,correct=hits,score=hits*100,time_seconds=secs,finished_at=now() where id=t.id;
 return jsonb_build_object('correct',hits,'score',hits*100,'time_seconds',secs);
end $$;
create or replace function public.ti_admin_set_open(p_password text,p_open boolean) returns jsonb language plpgsql security definer set search_path = '' as $$
begin
 if not exists(select 1 from public.ti_config where id=1 and admin_hash=extensions.crypt(p_password,admin_hash)) then raise exception 'Senha incorreta.';end if;
 update public.ti_config set is_open=p_open where id=1;
 return jsonb_build_object('open',p_open);
end $$;
revoke all on function public.ti_game_status(),public.ti_leaderboard(),public.ti_join(text),public.ti_submit(uuid,jsonb),public.ti_admin_set_open(text,boolean) from public;
grant execute on function public.ti_game_status(),public.ti_leaderboard(),public.ti_join(text),public.ti_submit(uuid,jsonb),public.ti_admin_set_open(text,boolean) to anon,authenticated;
