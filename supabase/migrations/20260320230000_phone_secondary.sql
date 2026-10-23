alter table public.site_settings
  add column if not exists phone_secondary text;

update public.site_settings
set
  phone = '+639393197761',
  phone_secondary = '+639491242491'
where id = 1;
