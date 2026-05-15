# 🔑 Cómo Obtener tus Credenciales Reales de Supabase

## ❌ Problema Actual
La clave API que tengo no es válida. Necesitas obtener las credenciales **reales** de tu proyecto de Supabase.

## 📋 Paso a Paso (3 minutos)

### 1. Abre tu Dashboard de Supabase
Ve a: **https://supabase.com/dashboard/project/qxipabkyxwityzolnfly/settings/api**

### 2. Busca estas dos secciones:

#### A) Project URL
```
Configuration > URL
```
Copia el valor que se ve como:
```
https://qxipabkyxwityzolnfly.supabase.co
```

#### B) Project API keys → anon public
```
Project API keys
  ├─ anon public ← ESTA ES LA QUE NECESITAS
  └─ service_role (NO uses esta)
```

La clave `anon public` es un texto **MUY LARGO** que empieza con `eyJ...`

**Ejemplo de cómo se ve:**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InByb3llY3RpZCIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNjM4MzE2ODAwLCJleHAiOjE5NTM4OTI4MDB9.ejemplo_muy_largo_de_firma
```

### 3. Edita el archivo `.env`

Abre el archivo `.env` en la raíz del proyecto y pega tus credenciales:

```env
VITE_SUPABASE_URL=https://qxipabkyxwityzolnfly.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.tu_clave_completa_aqui
```

**⚠️ IMPORTANTE:** 
- La clave `anon` es MUY larga (más de 200 caracteres)
- Debe empezar con `eyJ`
- NO uses la clave `service_role`
- Copia toda la clave completa

### 4. Reinicia el servidor de desarrollo

```bash
# Detén el servidor (Ctrl+C)
# Reinicia
npm run dev
# o
pnpm dev
```

### 5. Crea las tablas en Supabase

Una vez que las credenciales funcionen:

1. Ve a: **https://supabase.com/dashboard/project/qxipabkyxwityzolnfly/editor**
2. Haz clic en **SQL Editor** (icono de código)
3. Copia el contenido de `supabase-setup.sql`
4. Pega en el editor
5. Haz clic en **Run** (▶️)

## ✅ Verificación

Después de configurar las credenciales correctas, deberías ver:
```
✅ SUPABASE CONFIGURADO CORRECTAMENTE
Los datos se guardan permanentemente en la nube ☁️
```

## 💡 Mientras Tanto

La aplicación funciona perfectamente con **localStorage**. Los datos se guardan en tu navegador, pero:
- ❌ Se borran si limpias el caché
- ❌ No se sincronizan entre dispositivos
- ✅ Funcionan para desarrollo y pruebas

Una vez que configures Supabase:
- ✅ Datos permanentes en la nube
- ✅ Acceso desde cualquier dispositivo
- ✅ Backup automático

## 🆘 ¿No encuentras las credenciales?

1. Asegúrate de estar logueado en https://supabase.com
2. Ve a **Dashboard** → selecciona tu proyecto
3. En el menú lateral: **Settings** (⚙️) → **API**
4. Busca la sección **Project API keys**
5. Haz clic en el icono 👁️ para revelar la clave `anon`
6. Haz clic en 📋 para copiar

## 📸 Referencia Visual

Las credenciales están en:
```
Dashboard de Supabase
  └─ Tu Proyecto (qxipabkyxwityzolnfly)
      └─ Settings (⚙️)
          └─ API
              ├─ Configuration
              │   └─ URL: [tu URL aquí]
              └─ Project API keys
                  └─ anon public: [tu clave aquí]
```
