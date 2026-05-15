# Configuración de Supabase para Olimpiadas 2026

## Estado Actual
✅ El archivo `.env` ya está configurado con las credenciales de Supabase
✅ Todos los servicios de la aplicación están listos para conectarse a Supabase

## Paso 1: Crear las tablas en Supabase

1. Accede a tu proyecto de Supabase: https://supabase.com/dashboard/project/qxipabkyxwityzolnfly

2. Ve a la sección **SQL Editor** en el menú lateral

3. Copia y pega el contenido completo del archivo `supabase-setup.sql` en el editor

4. Haz clic en **Run** para ejecutar el script

Esto creará:
- Tabla `users` con los usuarios por defecto (pablo, superadmin, y encargados de cada disciplina)
- Tabla `members` para los integrantes de cada disciplina
- Tabla `attendances` para el registro de asistencias
- Índices para mejorar el rendimiento
- Políticas de seguridad (RLS)

## Paso 2: Verificar la conexión

1. Reinicia el servidor de desarrollo si está corriendo

2. Abre la aplicación en el navegador

3. Abre la consola del navegador (F12)

4. Deberías ver el mensaje: **"✅ SUPABASE CONFIGURADO CORRECTAMENTE"**

5. Si ves advertencias o errores, revisa que las credenciales en `.env` sean correctas

## Paso 3: Migrar datos existentes (opcional)

Si ya tienes datos en localStorage que quieres migrar a Supabase:

1. Abre la consola del navegador

2. Ejecuta estos comandos para exportar los datos actuales:
```javascript
// Exportar usuarios
console.log(localStorage.getItem('users'))

// Exportar integrantes
console.log(localStorage.getItem('members'))

// Exportar asistencias
console.log(localStorage.getItem('attendances'))
```

3. Copia los datos y guárdalos en un archivo temporal

4. Una vez verificado que Supabase funciona correctamente, los datos se sincronizarán automáticamente

## ¿Qué cambia con Supabase?

### Antes (localStorage)
- ❌ Los datos se borran al limpiar el navegador
- ❌ Los datos solo existen en tu navegador
- ❌ No hay sincronización entre dispositivos

### Después (Supabase)
- ✅ Los datos se guardan permanentemente en la nube
- ✅ Acceso desde cualquier navegador/dispositivo
- ✅ Backup automático
- ✅ Base de datos PostgreSQL real

## Credenciales configuradas

Las siguientes credenciales ya están en el archivo `.env`:

```
VITE_SUPABASE_URL=https://qxipabkyxwityzolnfly.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_xktkarptVDH4ekx_ut1Jyw_QQsRWDlC
```

## Solución de problemas

### "Error fetching from Supabase"
- Verifica que ejecutaste el script SQL correctamente
- Revisa que las tablas existan en la sección **Table Editor** de Supabase

### "Supabase no configurado"
- Verifica que el archivo `.env` existe en la raíz del proyecto
- Reinicia el servidor de desarrollo

### "Permission denied" o errores de RLS
- Revisa las políticas de Row Level Security en Supabase
- Las políticas actuales permiten todo (FOR ALL USING true)

## Soporte

Si tienes problemas, revisa:
1. Dashboard de Supabase: https://supabase.com/dashboard/project/qxipabkyxwityzolnfly
2. Logs de la aplicación en la consola del navegador
3. Documentación de Supabase: https://supabase.com/docs
