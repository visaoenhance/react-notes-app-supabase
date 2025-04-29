import { createClient } from '@supabase/supabase-js'

// Ensure you have a .env file at the root of your project
// with VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY defined.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase URL and Anon Key must be provided in environment variables.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey) 