/**
 * Supabase Client — Data Storage Only
 * 
 * This client is used EXCLUSIVELY for persistent data storage:
 * - Storing assessment responses and computed scores
 * - Storing report JSON payloads
 * - Reading previously completed assessments
 * 
 * Authentication is handled by the parent VidyaLoop platform.
 * DO NOT use this client for auth operations.
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    '[Psychometric Module] Supabase credentials not configured. ' +
    'Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file. ' +
    'The module will operate in offline/demo mode.'
  );
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key',
  {
    auth: {
      // Disable all auth features — parent platform handles authentication
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  }
);

/**
 * Returns true if Supabase is properly configured with real credentials.
 */
export function isSupabaseConfigured(): boolean {
  return Boolean(supabaseUrl) && Boolean(supabaseAnonKey) && !supabaseUrl.includes('placeholder');
}
