import { createClient } from '@supabase/supabase-js';

// Cần cấu hình biến môi trường VITE_SUPABASE_URL và VITE_SUPABASE_ANON_KEY trong file .env
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://mock-url.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'mock-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
