-- Script de inicialización para Supabase
-- Ejecuta este script en el SQL Editor de Supabase (https://supabase.com/dashboard/project/YOUR_PROJECT/sql)

-- Tabla de usuarios
CREATE TABLE IF NOT EXISTS users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('super_user', 'super_admin', 'admin')),
  discipline TEXT,
  first_login BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Tabla de integrantes/miembros
CREATE TABLE IF NOT EXISTS members (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  semester TEXT NOT NULL,
  discipline TEXT NOT NULL,
  position TEXT,
  status TEXT CHECK (status IN ('Suplente', 'Seleccionado')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Tabla de asistencias
CREATE TABLE IF NOT EXISTS attendances (
  id TEXT PRIMARY KEY,
  member_id TEXT NOT NULL,
  training_date TEXT NOT NULL,
  present BOOLEAN NOT NULL,
  discipline TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(member_id, training_date)
);

-- Índices para mejorar rendimiento
CREATE INDEX IF NOT EXISTS idx_members_discipline ON members(discipline);
CREATE INDEX IF NOT EXISTS idx_attendances_member_id ON attendances(member_id);
CREATE INDEX IF NOT EXISTS idx_attendances_discipline ON attendances(discipline);
CREATE INDEX IF NOT EXISTS idx_attendances_date ON attendances(training_date);
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
CREATE INDEX IF NOT EXISTS idx_users_discipline ON users(discipline);

-- Insertar usuarios por defecto
INSERT INTO users (username, password, role, discipline, first_login) VALUES
  ('pablo', 'pablo1', 'super_user', NULL, false),
  ('superadmin', 'superadmin', 'super_admin', NULL, true),
  ('voley', 'voley', 'admin', 'Vóley', true),
  ('futbol', 'futbol', 'admin', 'Futbol', true),
  ('ajedrez', 'ajedrez', 'admin', 'Ajedrez', true),
  ('drill', 'drill', 'admin', 'Drill', true),
  ('basquet', 'basquet', 'admin', 'Básquet', true),
  ('atletismo', 'atletismo', 'admin', 'Atletismos', true),
  ('karate', 'karate', 'admin', 'Karate', true)
ON CONFLICT (username) DO NOTHING;

-- Habilitar Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE members ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendances ENABLE ROW LEVEL SECURITY;

-- Políticas de acceso (permitir todo por ahora, puedes ajustar según necesites)
CREATE POLICY "Permitir todo en users" ON users FOR ALL USING (true);
CREATE POLICY "Permitir todo en members" ON members FOR ALL USING (true);
CREATE POLICY "Permitir todo en attendances" ON attendances FOR ALL USING (true);
