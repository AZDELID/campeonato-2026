import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://qxipabkyxwityzolnfly.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_xktkarptVDH4ekx_ut1Jyw_QQsRWDlC';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export function isSupabaseConfigured(): boolean {
  return true;
}

// Tipos de base de datos
export interface DatabaseUser {
  id: string;
  username: string;
  password: string;
  role: 'super_user' | 'super_admin' | 'admin';
  discipline?: string;
  first_login: boolean;
  created_at: string;
  updated_at: string;
}

export interface DatabaseMember {
  id: string;
  name: string;
  semester: string;
  discipline: string;
  position?: string;
  status?: 'Suplente' | 'Seleccionado';
  created_at: string;
  updated_at: string;
}

export interface DatabaseAttendance {
  id: string;
  member_id: string;
  training_date: string;
  present: boolean;
  discipline: string;
  created_at: string;
  updated_at: string;
}
