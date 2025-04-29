-- Enable Row-Level Security
alter table notesapp_notes enable row level security;

-- Allow select only for demo user
create policy "Allow demo select"
on notesapp_notes for select
using (user_id = '00000000-0000-4000-8000-000000000001');

-- Allow insert only for demo user
create policy "Allow demo insert"
on notesapp_notes for insert
with check (user_id = '00000000-0000-4000-8000-000000000001');

-- Allow update and delete for demo user
create policy "Allow demo update"
on notesapp_notes for update
using (user_id = '00000000-0000-4000-8000-000000000001');

create policy "Allow demo delete"
on notesapp_notes for delete
using (user_id = '00000000-0000-4000-8000-000000000001');
