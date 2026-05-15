-- Tabla de usuarios
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('super_user', 'super_admin', 'admin')),
  discipline TEXT,
  first_login BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de integrantes/miembros
CREATE TABLE IF NOT EXISTS members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  semester TEXT NOT NULL,
  discipline TEXT NOT NULL,
  position TEXT,
  status TEXT CHECK (status IN ('Suplente', 'Seleccionado')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de asistencias
CREATE TABLE IF NOT EXISTS attendances (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  member_id UUID REFERENCES members(id) ON DELETE CASCADE,
  training_date DATE NOT NULL,
  present BOOLEAN NOT NULL,
  discipline TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(member_id, training_date)
);

-- Índices para mejorar rendimiento
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_members_discipline ON members(discipline);
CREATE INDEX IF NOT EXISTS idx_attendances_member_id ON attendances(member_id);
CREATE INDEX IF NOT EXISTS idx_attendances_training_date ON attendances(training_date);

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

-- Políticas para users (todos pueden leer, solo autenticados pueden modificar)
CREATE POLICY "Allow public read access to users" ON users
  FOR SELECT USING (true);

CREATE POLICY "Allow authenticated insert on users" ON users
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow authenticated update on users" ON users
  FOR UPDATE USING (true);

CREATE POLICY "Allow authenticated delete on users" ON users
  FOR DELETE USING (true);

-- Políticas para members (acceso público)
CREATE POLICY "Allow public read access to members" ON members
  FOR SELECT USING (true);

CREATE POLICY "Allow public insert on members" ON members
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update on members" ON members
  FOR UPDATE USING (true);

CREATE POLICY "Allow public delete on members" ON members
  FOR DELETE USING (true);

-- Políticas para attendances (acceso público)
CREATE POLICY "Allow public read access to attendances" ON attendances
  FOR SELECT USING (true);

CREATE POLICY "Allow public insert on attendances" ON attendances
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update on attendances" ON attendances
  FOR UPDATE USING (true);

CREATE POLICY "Allow public delete on attendances" ON attendances
  FOR DELETE USING (true);
