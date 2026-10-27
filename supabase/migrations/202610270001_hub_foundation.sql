-- Foundation for the leadership-managed Harare Hub.
-- Apply to a fresh Supabase project; the public website currently uses the local seed.
create table public.admin_members (user_id uuid primary key references auth.users(id) on delete cascade);
alter table public.admin_members enable row level security;
revoke all on public.admin_members from anon, authenticated;
create or replace function public.is_hub_admin() returns boolean language sql stable security definer set search_path = '' as $$
  select exists(select 1 from public.admin_members where user_id = (select auth.uid()));
$$;
revoke all on function public.is_hub_admin() from public;
grant execute on function public.is_hub_admin() to authenticated;

create table public.impact_zones (
 id text primary key, name text not null, short_name text not null, color text not null, symbol text not null
);
create table public.fellows (
 id uuid primary key default gen_random_uuid(), slug text not null unique, full_name text not null,
 cohort integer not null check (cohort > 0), bio text, portrait_url text, linkedin_url text,
 published boolean not null default false, featured boolean not null default false,
 created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
-- Keep private contacts outside the public profile table. Expose only explicit approved business contacts later.
create table public.fellow_contacts (
 fellow_id uuid primary key references public.fellows(id) on delete cascade,
 email text, phone text, public_business_email text, public_business_phone text,
 consent_recorded_at timestamptz
);
create table public.fellow_impact_zones (
 fellow_id uuid references public.fellows(id) on delete cascade,
 zone_id text references public.impact_zones(id), primary key(fellow_id, zone_id)
);
create table public.projects (
 id uuid primary key default gen_random_uuid(), slug text not null unique, title text not null,
 summary text, problem text, solution text, impact_description text,
 image_urls text[] not null default '{}', published boolean not null default false,
 created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table public.project_fellows (
 project_id uuid references public.projects(id) on delete cascade,
 fellow_id uuid references public.fellows(id) on delete cascade, primary key(project_id,fellow_id)
);
create table public.offerings (
 id uuid primary key default gen_random_uuid(), fellow_id uuid not null references public.fellows(id),
 project_id uuid references public.projects(id) on delete set null,
 slug text not null unique, title text not null, kind text not null check(kind in ('product','service')),
 description text, image_url text, price numeric check(price >= 0), currency text default 'USD',
 contact_url text, published boolean not null default false, available boolean not null default true,
 created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table public.notices (
 id uuid primary key default gen_random_uuid(), slug text not null unique, title text not null,
 kind text not null check(kind in ('event','article','opportunity','news','promotion','product','service')),
 excerpt text not null, body text not null, image_url text, external_url text,
 fellow_id uuid references public.fellows(id) on delete set null,
 offering_id uuid references public.offerings(id) on delete set null,
 published boolean not null default false, published_at timestamptz,
 expires_at timestamptz, event_starts_at timestamptz, event_ends_at timestamptz, location text,
 featured boolean not null default false, created_at timestamptz not null default now(), updated_at timestamptz not null default now(),
 check(expires_at is null or published_at is null or expires_at > published_at),
 check(event_ends_at is null or event_starts_at is null or event_ends_at >= event_starts_at)
);
create index fellows_published_idx on public.fellows(published);
create index fellow_zones_zone_idx on public.fellow_impact_zones(zone_id);
create index notices_publication_idx on public.notices(published,published_at,expires_at);
create index notices_kind_idx on public.notices(kind);

alter table public.impact_zones enable row level security;
alter table public.fellows enable row level security;
alter table public.fellow_contacts enable row level security;
alter table public.fellow_impact_zones enable row level security;
alter table public.projects enable row level security;
alter table public.project_fellows enable row level security;
alter table public.offerings enable row level security;
alter table public.notices enable row level security;

revoke all on public.impact_zones, public.fellows, public.fellow_contacts, public.fellow_impact_zones, public.projects, public.project_fellows, public.offerings, public.notices from anon, authenticated;
grant select on public.impact_zones, public.fellows, public.fellow_impact_zones, public.projects, public.project_fellows, public.offerings, public.notices to anon;
grant select, insert, update, delete on public.impact_zones, public.fellows, public.fellow_contacts, public.fellow_impact_zones, public.projects, public.project_fellows, public.offerings, public.notices to authenticated;

create policy zones_public_read on public.impact_zones for select to anon,authenticated using (true);
create policy fellows_public_read on public.fellows for select to anon,authenticated using (published);
create policy fellow_zones_public_read on public.fellow_impact_zones for select to anon,authenticated using (exists(select 1 from public.fellows f where f.id=fellow_id and f.published));
create policy projects_public_read on public.projects for select to anon,authenticated using (published);
create policy project_fellows_public_read on public.project_fellows for select to anon,authenticated using (exists(select 1 from public.fellows f where f.id=fellow_id and f.published) and exists(select 1 from public.projects p where p.id=project_id and p.published));
create policy offerings_public_read on public.offerings for select to anon,authenticated using (published and available and exists(select 1 from public.fellows f where f.id=fellow_id and f.published));
create policy notices_public_read on public.notices for select to anon,authenticated using (published and published_at <= now() and (expires_at is null or expires_at > now()));

do $$ declare t text; begin
 foreach t in array array['impact_zones','fellows','fellow_contacts','fellow_impact_zones','projects','project_fellows','offerings','notices'] loop
  execute format('create policy leadership_manage on public.%I for all to authenticated using ((select public.is_hub_admin())) with check ((select public.is_hub_admin()))', t);
 end loop;
end $$;
create function public.set_updated_at() returns trigger language plpgsql set search_path='' as $$ begin new.updated_at = now(); return new; end $$;
do $$ declare t text; begin
 foreach t in array array['fellows','projects','offerings','notices'] loop
  execute format('create trigger set_updated_at before update on public.%I for each row execute function public.set_updated_at()', t);
 end loop;
end $$;
