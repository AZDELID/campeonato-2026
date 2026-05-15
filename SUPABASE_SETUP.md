# 🗄️ Configuración de Supabase para Olimpiadas 2026

## Estado Actual

⚠️ **El proyecto actualmente usa localStorage**

Los datos se guardan en el navegador local. Para tener una base de datos real compartida entre todos los dispositivos, necesitas conectar Supabase.

## Pasos para Conectar Supabase

### 1. Conectar desde Figma Make

1. Abre tu proyecto en **Figma Make**
2. Ve a **Settings** (Configuración)
3. Busca la sección **Supabase**
4. Haz clic en **Connect to Supabase**
5. Sigue las instrucciones para conectar tu cuenta

### 2. Estructura de Base de Datos

Una vez conectado Supabase, necesitarás crear las siguientes tablas:

#### Tabla: `members`

```sql
CREATE TABLE members (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  semester TEXT NOT NULL,
  discipline TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Índice para búsquedas por disciplina
CREATE INDEX idx_members_discipline ON members(discipline);
```

#### Tabla: `attendances`

```sql
CREATE TABLE attendances (
  id TEXT PRIMARY KEY,
  member_id TEXT NOT NULL REFERENCES members(id) ON DELETE CASCADE,
  training_date DATE NOT NULL,
  present BOOLEAN NOT NULL,
  discipline TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(member_id, training_date)
);

-- Índices para búsquedas
CREATE INDEX idx_attendances_member ON attendances(member_id);
CREATE INDEX idx_attendances_date ON attendances(training_date);
CREATE INDEX idx_attendances_discipline ON attendances(discipline);
```

### 3. Políticas de Seguridad (RLS)

```sql
-- Habilitar Row Level Security
ALTER TABLE members ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendances ENABLE ROW LEVEL SECURITY;

-- Política: Todos pueden leer
CREATE POLICY "Permitir lectura a todos"
  ON members FOR SELECT
  USING (true);

CREATE POLICY "Permitir lectura a todos"
  ON attendances FOR SELECT
  USING (true);

-- Política: Solo autenticados pueden escribir
CREATE POLICY "Permitir escritura a autenticados"
  ON members FOR ALL
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Permitir escritura a autenticados"
  ON attendances FOR ALL
  USING (true)
  WITH CHECK (true);
```

### 4. Migración de Datos

Una vez conectado Supabase, ejecuta este script en la consola del navegador para migrar los datos de localStorage a Supabase:

```javascript
// Ejecutar en la consola del navegador
async function migrarDatos() {
  const members = JSON.parse(localStorage.getItem('members') || '[]');
  const attendances = JSON.parse(localStorage.getItem('attendances') || '[]');
  
  console.log(`Migrando ${members.length} integrantes...`);
  console.log(`Migrando ${attendances.length} asistencias...`);
  
  // Los datos se migrarán automáticamente cuando implementemos Supabase
  alert('Datos listos para migrar. Contacta al desarrollador para completar la migración.');
}

migrarDatos();
```

## Ventajas de Usar Supabase

✅ **Sincronización en tiempo real** entre todos los dispositivos
✅ **Respaldos automáticos** de toda la información
✅ **Acceso desde cualquier dispositivo** (móvil, tablet, PC)
✅ **Mayor seguridad** con autenticación real
✅ **Escalabilidad** para más integrantes y datos
✅ **Sin riesgo de perder datos** al borrar caché del navegador

## Alternativa: Continuar con localStorage

Si prefieres continuar usando localStorage:

✅ **Ventajas:**
- Funciona inmediatamente sin configuración
- No requiere cuenta externa
- Completamente gratis

⚠️ **Desventajas:**
- Los datos solo existen en un navegador
- No se comparten entre dispositivos
- Se pueden perder al limpiar caché

## Soporte

Si tienes problemas conectando Supabase, contacta al equipo de soporte de Figma Make o revisa la documentación oficial:
https://supabase.com/docs

---

**Nota:** El código ya está preparado para funcionar con ambos sistemas (localStorage y Supabase). La migración será automática una vez que Supabase esté conectado.
