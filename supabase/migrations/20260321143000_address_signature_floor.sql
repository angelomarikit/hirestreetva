update public.site_settings
set
  address_line1 = '26th Floor, Signature Alveo Park Triangle Tower',
  address_line2 = '32nd Street Corner 11th Avenue',
  address_line3 = 'Bonifacio Global City'
where id = 1;

update public.content_entries
set value = 'Visit us on the 26th floor at Signature Alveo Park Triangle Tower, Bonifacio Global City — a space designed for focused work, client meetings, and the team behind Hire Street VA.'
where key = 'home.office.body';
