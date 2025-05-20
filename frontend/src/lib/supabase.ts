import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fsusdawxrkfbhanlxnit.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});
