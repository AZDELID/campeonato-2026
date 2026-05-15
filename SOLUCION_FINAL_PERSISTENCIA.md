# ✅ SOLUCIÓN FINAL: Configurar Supabase para Persistencia de Datos

## 🔴 El Problema

Los datos se borran cada vez que recargas la página porque **localStorage NO es confiable**:
- Se borra en modo incógnito
- Se limpia al borrar caché
- Depende del navegador
- No funciona entre dispositivos

## 🟢 La Solución

**SUPABASE** - Base de datos real en la nube (GRATIS y YA configurado en el código)

---

## 🚀 GUÍA RÁPIDA (5 Minutos)

### 1️⃣ Crear Cuenta en Supabase

1. Ve a: **https://supabase.com**
2. Clic en "Sign up" 
3. Usa GitHub o email (es GRATIS)

### 2️⃣ Crear Proyecto

1. Clic en "New Project"
2. Nombre: `olimpiadas-2026`
3. Password: Crea una contraseña segura (guárdala)
4. Region: El más cercano
5. Plan: **FREE**
6. Clic en "Create new project"
7. Espera 1-2 minutos

### 3️⃣ Ejecutar SQL

1. En Supabase, ve a **SQL Editor** (menú izquierdo)
2. Clic en "+ New query"
3. Abre el archivo: `supabase/migrations/001_create_tables.sql`
4. Copia TODO el contenido
5. Pega en el editor de Supabase
6. Clic en "**RUN**"
7. Verifica: Ve a **Table Editor** → deberías ver 3 tablas

### 4️⃣ Obtener Credenciales

1. En Supabase, ve a **Settings** → **API**
2. Copia:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public key**: `eyJhbGci...` (la clave larga)

### 5️⃣ Configurar Variables de Entorno

1. En la raíz del proyecto, crea un archivo llamado `.env`
2. Pega esto (reemplaza con tus valores):

```env
VITE_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.xxxxxxxxx
```

3. Guarda el archivo

### 6️⃣ Reiniciar Servidor

```bash
# Detén el servidor (Ctrl+C)
pnpm run dev
```

### 7️⃣ Verificar

1. Abre la app
2. Busca en la consola: **"✅ Supabase configurado correctamente"**
3. Inicia sesión con `pablo` / `pablo1`
4. Agrega un integrante
5. **RECARGA LA PÁGINA** → ¡Los datos deben seguir ahí! ✅

---

## 📊 Indicadores en la App

Ahora verás en la aplicación:

### 🟢 Si Supabase está configurado:
- Banner verde: "✅ Supabase Configurado"
- Indicador abajo a la derecha: "Supabase ON"
- Los datos SE GUARDAN permanentemente

### 🟡 Si Supabase NO está configurado:
- Banner amarillo: "⚠️ Supabase No Configurado"
- Indicador: "localStorage"
- Los datos SE BORRAN al recargar

---

## ❌ Solución de Problemas

### "Supabase no configurado"

1. Verifica que `.env` está en la RAÍZ (mismo nivel que `package.json`)
2. Verifica que las variables empiezan con `VITE_`
3. Reinicia el servidor

### "Error al conectar"

1. Copia de nuevo las credenciales desde Supabase
2. Asegúrate de usar la clave **anon public** (NO service_role)
3. Actualiza `.env`
4. Reinicia

### "Tablas no existen"

1. Ve a Supabase → SQL Editor
2. Ejecuta de nuevo el archivo `001_create_tables.sql`
3. Verifica en Table Editor

---

## 🎯 Resultado Final

✅ Datos guardados permanentemente en la nube
✅ Acceso desde cualquier navegador/dispositivo  
✅ No se borran al recargar
✅ Funciona en modo incógnito
✅ Backup automático
✅ Gratis hasta 500MB

---

## 📁 Archivos Importantes

- `supabase/migrations/001_create_tables.sql` - SQL para crear tablas
- `.env.example` - Plantilla de variables
- `.env` - TUS credenciales (crear este archivo)
- `CONFIGURAR_SUPABASE.md` - Guía completa detallada

---

## 🔄 Migración Automática

El código YA está preparado para usar Supabase:

- **Si Supabase está configurado** → Usa base de datos en la nube ☁️
- **Si NO está configurado** → Usa localStorage como fallback 💾

Simplemente configura las variables y todo funcionará automáticamente.

---

## ⏱️ Tiempo Total

- Crear cuenta: 2 min
- Crear proyecto: 2 min
- Ejecutar SQL: 30 seg
- Configurar .env: 30 seg
- **TOTAL: ~5 minutos**

---

## 💰 Costo

**$0 - COMPLETAMENTE GRATIS**
- Plan gratuito de Supabase
- Sin tarjeta de crédito
- 500MB de base de datos
- Suficiente para miles de usuarios

---

## 🆘 ¿Necesitas Ayuda?

1. Lee `CONFIGURAR_SUPABASE.md` (guía completa)
2. Revisa los mensajes en la consola del navegador
3. Verifica el banner amarillo/verde en la app

---

**¡CONFIGURA SUPABASE AHORA Y OLVÍDATE DEL PROBLEMA DE DATOS QUE SE BORRAN! 🚀**
