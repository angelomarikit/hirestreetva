alter table public.site_settings
  add column if not exists phone_secondary text;

update public.site_settings
set
  phone = '(0939) 319-7761',
  phone_secondary = '(0949) 124 2491'
where id = 1;
