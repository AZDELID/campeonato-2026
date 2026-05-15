# 🚀 Guía de Configuración de Supabase

## ¿Por qué Supabase?

localStorage **NO funciona confiablemente** porque:
- ❌ Se borra en modo incógnito
- ❌ Puede ser bloqueado por el navegador
- ❌ Se limpia al borrar caché
- ❌ No persiste entre dispositivos

**Supabase** es la solución:
- ✅ Base de datos real en la nube
- ✅ Datos persisten permanentemente
- ✅ Acceso desde cualquier dispositivo
- ✅ Gratis hasta 500MB
- ✅ Ya está TODO configurado en el código

---

## 📋 Pasos para Configurar (5 minutos)

### Paso 1: Crear Cuenta en Supabase

1. Ve a [https://supabase.com](https://supabase.com)
2. Haz clic en "Start your project" o "Sign up"
3. Inicia sesión con GitHub o email
4. **Es GRATIS** - no necesitas tarjeta de crédito

### Paso 2: Crear un Nuevo Proyecto

1. Una vez dentro, haz clic en "**New Project**"
2. Llena los datos:
   - **Name:** `olimpiadas-2026` (o el nombre que quieras)
   - **Database Password:** Crea una contraseña segura (guárdala)
   - **Region:** Selecciona el más cercano a tu ubicación
   - **Pricing Plan:** FREE (gratis)
3. Haz clic en "**Create new project**"
4. Espera 1-2 minutos mientras se crea

### Paso 3: Obtener las Credenciales

1. En el proyecto, ve al menú lateral izquierdo
2. Haz clic en ⚙️ **Settings** (Configuración)
3. Haz clic en **API**
4. Verás dos valores importantes:

   📍 **Project URL** (algo como: `https://xxxxxxxxxxxxx.supabase.co`)
   
   🔑 **anon public** (clave pública - una cadena larga que empieza con `eyJhbGciOi...`)

5. **COPIA ESTOS DOS VALORES** - los necesitarás en el siguiente paso

### Paso 4: Crear las Tablas en la Base de Datos

1. En el proyecto de Supabase, ve a **SQL Editor** (en el menú lateral)
2. Haz clic en "**+ New query**"
3. Abre el archivo `supabase/migrations/001_create_tables.sql` de este proyecto
4. **COPIA TODO** el contenido del archivo SQL
5. **PEGA** el contenido en el editor SQL de Supabase
6. Haz clic en "**Run**" (botón abajo a la derecha)
7. Deberías ver el mensaje: ✅ **Success. No rows returned**

**Verificación:**
- Ve a **Table Editor** en el menú lateral
- Deberías ver 3 tablas: `users`, `members`, `attendances`
- Haz clic en `users` - deberías ver 9 usuarios (pablo, superadmin, futbol, etc.)

### Paso 5: Configurar las Variables de Entorno

1. En la raíz de este proyecto, crea un archivo llamado **`.env`**
2. Copia el contenido de `.env.example`
3. Reemplaza los valores con tus credenciales de Supabase:

```env
VITE_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

4. **GUARDA** el archivo `.env`

**⚠️ IMPORTANTE:**
- El archivo `.env` está en `.gitignore` - NO se subirá a GitHub
- Nunca compartas estas credenciales públicamente

### Paso 6: Reiniciar el Servidor de Desarrollo

1. Detén el servidor si está corriendo (Ctrl+C)
2. Ejecuta de nuevo:
   ```bash
   pnpm run dev
   ```
3. Abre la aplicación en el navegador

### Paso 7: Verificar que Funciona

1. Abre la consola del navegador (F12)
2. Deberías ver el mensaje: **✅ Supabase configurado correctamente**
3. Inicia sesión con `pablo` / `pablo1`
4. Agrega un integrante de prueba
5. **RECARGA LA PÁGINA** (F5)
6. Los datos **deberían seguir ahí** ✅

Si ves: `⚠️ Supabase no configurado, usando localStorage como fallback`
- Verifica que el archivo `.env` existe en la raíz del proyecto
- Verifica que las variables empiezan con `VITE_`
- Reinicia el servidor de desarrollo

---

## 🎯 Checklist de Verificación

- [ ] Cuenta creada en Supabase.com
- [ ] Proyecto nuevo creado
- [ ] Credenciales (URL y ANON_KEY) copiadas
- [ ] Archivo SQL ejecutado en SQL Editor
- [ ] 3 tablas creadas (users, members, attendances)
- [ ] 9 usuarios visibles en tabla `users`
- [ ] Archivo `.env` creado en la raíz
- [ ] Variables configuradas correctamente
- [ ] Servidor reiniciado
- [ ] Mensaje de Supabase configurado en consola

---

## 🔧 Solución de Problemas

### Problema: "Supabase no configurado"

**Causa:** El archivo `.env` no se está cargando

**Solución:**
1. Verifica que `.env` está en la RAÍZ del proyecto (mismo nivel que `package.json`)
2. Verifica que las variables empiezan con `VITE_` (no `REACT_APP_`)
3. Reinicia el servidor (Ctrl+C y `pnpm run dev` de nuevo)

### Problema: "Error al conectar con Supabase"

**Causa:** Credenciales incorrectas

**Solución:**
1. Ve a Supabase → Settings → API
2. Copia de nuevo la URL y la clave
3. Asegúrate de copiar la clave **anon public** (no la service_role)
4. Actualiza el archivo `.env`
5. Reinicia el servidor

### Problema: "Tablas no existen"

**Causa:** El SQL no se ejecutó correctamente

**Solución:**
1. Ve a Supabase → SQL Editor
2. Ejecuta de nuevo el contenido de `001_create_tables.sql`
3. Ve a Table Editor y verifica que las tablas existen

### Problema: "Los datos siguen sin guardarse"

**Causa:** Supabase no está configurado o hay un error

**Solución:**
1. Abre la consola del navegador (F12)
2. Ve a la pestaña Console
3. Busca mensajes de error de Supabase
4. Copia el error y busca la solución

---

## 📊 Cómo Verificar que Supabase Está Funcionando

### Método 1: Desde la Consola del Navegador

```javascript
// Pega esto en la consola (F12 → Console)
console.log('URL:', import.meta.env.VITE_SUPABASE_URL);
console.log('KEY:', import.meta.env.VITE_SUPABASE_ANON_KEY ? '✅ Configurada' : '❌ No configurada');
```

### Método 2: Desde Supabase Dashboard

1. Ve a Supabase → Table Editor → users
2. Cuenta cuántos usuarios hay
3. Agrega un integrante desde la aplicación
4. Ve a Supabase → Table Editor → members
5. Deberías ver el nuevo integrante

### Método 3: Prueba Real

1. Agrega un integrante desde la app
2. Cierra completamente el navegador
3. Abre el navegador de nuevo
4. Entra a la app
5. El integrante debería seguir ahí ✅

---

## 🎉 Beneficios de Usar Supabase

### Antes (localStorage):
- ❌ Datos se borran al recargar
- ❌ No funciona en incógnito
- ❌ Solo en un navegador
- ❌ Se pierde todo al limpiar caché

### Después (Supabase):
- ✅ Datos persisten permanentemente
- ✅ Funciona en cualquier navegador
- ✅ Acceso desde múltiples dispositivos
- ✅ Backup automático
- ✅ Historial de cambios
- ✅ Escalable a miles de usuarios

---

## 📞 ¿Necesitas Ayuda?

Si tienes problemas:

1. Revisa esta guía paso a paso
2. Verifica el checklist
3. Busca mensajes de error en la consola
4. Lee la sección de solución de problemas

---

## 🚀 Próximos Pasos (Después de Configurar)

Una vez que Supabase esté configurado:

1. Todos los datos se guardarán automáticamente
2. Podrás acceder desde cualquier dispositivo
3. Los integrantes de Fútbol se pueden insertar de forma permanente
4. El sistema estará listo para producción

---

**Tiempo estimado:** 5-10 minutos  
**Costo:** $0 (plan gratuito)  
**Complejidad:** ⭐⭐☆☆☆ (Fácil)

¡Vamos a configurarlo! 🎯
