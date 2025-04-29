-- Table: notesapp_notes
create table if not exists notesapp_notes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  title text,
  content text,
  created_at timestamp default now()
);
