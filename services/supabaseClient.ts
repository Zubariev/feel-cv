import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/supabase';

// Access Vite env in a way that is safe even if the code ever runs outside Vite.
const rawEnv = (typeof import.meta !== 'undefined'
  ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ((import.meta as any).env as Record<string, string | boolean | undefined>)
  : undefined) || {};

const isDev = Boolean(rawEnv.DEV);
const supabaseUrl = (rawEnv.VITE_SUPABASE_URL as string | undefined) || undefined;
const supabaseAnonKey = (rawEnv.VITE_SUPABASE_ANON_KEY as string | undefined) || undefined;

if (!supabaseUrl || !supabaseAnonKey) {
  const msg =
    'Missing Supabase environment variables. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env.local file.';

  if (isDev) {
    // In dev, log a clear error but still create a placeholder client
    // so the React app can render instead of showing a blank screen.
    // Any Supabase calls will then fail with network/auth errors,
    // which is acceptable for local debugging.
    // eslint-disable-next-line no-console
    console.error(msg);
  } else {
    // In production we fail fast so misconfiguration is not silent.
    throw new Error(msg);
  }
}

// Fallback to dummy values in dev if missing to avoid crashing the bundle.
const effectiveUrl = supabaseUrl || 'http://localhost';
const effectiveAnonKey = supabaseAnonKey || 'public-anon-key';

export const supabase = createClient<Database>(effectiveUrl, effectiveAnonKey);
