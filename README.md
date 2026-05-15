# 🏆 Sistema de Gestión - Olimpiadas 2026

Sistema completo de administración de integrantes y asistencias para las Olimpiadas 2026.

## 🚀 Características

### Para Usuarios Públicos
- ✅ Ver información de contacto de encargados
- ✅ Unirse a grupos oficiales de WhatsApp
- ✅ Acceso a formularios de inscripción
- ✅ Ver listas públicas de integrantes por disciplina

### Para Administradores
- ✅ Gestión completa de integrantes (crear, editar, eliminar)
- ✅ Registro de asistencias por fecha
- ✅ Historial completo en formato tabla
- ✅ Estadísticas de asistencia por integrante
- ✅ Panel administrativo intuitivo y responsive

## 🔐 Credenciales de Acceso

### Usuarios Predeterminados

| Rol | Usuario | Contraseña | Cambio Obligatorio |
|-----|---------|-----------|-------------------|
| Super Usuario | `pablo` | `pablo1` | ❌ No |
| Super Admin | `superadmin` | `superadmin` | ✅ Sí (primer login) |

### Encargados de Disciplinas

**🆕 Sistema de Registro de Encargados**

Los encargados de cada disciplina deben **crear sus propias cuentas**:

1. Haz clic en el ícono de login (🔑) en la esquina superior derecha
2. Selecciona **"Crear Cuenta de Encargado"**
3. Completa el formulario:
   - Selecciona tu disciplina
   - Crea tu usuario (mínimo 3 caracteres)
   - Crea tu contraseña (mínimo 6 caracteres)

**⚠️ Restricción:** Solo puede haber **un encargado por disciplina**

### Disciplinas Disponibles para Registro

- 🏐 Vóley
- ⚽ Futbol
- ♟️ Ajedrez
- 🥁 Drill
- 🏀 Básquet
- 🏃 Atletismos
- 🥋 Karate

📖 **Guía completa de registro:** `REGISTRO_ENCARGADOS.md`

## 📊 Base de Datos

**Estado actual:** Usando **localStorage** (almacenamiento local del navegador)

### Para Migrar a Supabase

Lee el archivo `SUPABASE_SETUP.md` para instrucciones completas sobre cómo:
1. Conectar tu proyecto a Supabase
2. Crear las tablas necesarias
3. Configurar políticas de seguridad
4. Migrar datos existentes

## 🎨 Disciplinas Disponibles

1. **🏐 Vóley**
   - Grupo oficial de WhatsApp
   - 2 encargados

2. **⚽ Fútbol**
   - Grupo oficial de WhatsApp
   - Formulario de inscripción técnico
   - 2 encargados

3. **♟️ Ajedrez**
   - Grupo oficial de WhatsApp
   - 1 encargado

4. **🥁 Drill**
   - Grupo oficial de WhatsApp
   - 1 encargado

5. **🏀 Básquet**
   - 2 grupos oficiales (Varones y Mujeres)
   - 2 encargados

6. **🏃 Atletismo**
   - Grupo oficial de WhatsApp
   - 1 encargado

7. **🥋 Karate**
   - Grupo oficial de WhatsApp
   - 1 encargado

## 💻 Tecnologías Utilizadas

- **React** con TypeScript
- **Tailwind CSS** para estilos
- **Lucide React** para iconos
- **localStorage** para persistencia (temporal)
- **Supabase** (preparado para migración)

## 📱 Diseño Responsive

La aplicación está optimizada principalmente para dispositivos móviles con soporte completo para:
- 📱 Smartphones (prioridad)
- 💻 Tablets
- 🖥️ Computadoras de escritorio

## 🔧 Funcionalidades del Panel Admin

### Pestaña "Integrantes"
- Agregar nuevos integrantes
- Editar información existente
- Eliminar integrantes
- Vista organizada por disciplina

### Pestaña "Asistencia"
- Seleccionar fecha del entrenamiento
- Marcar presente/ausente para cada integrante
- Guardado automático

### Pestaña "Historial"
- Tabla matricial con fechas como columnas
- Estadísticas por integrante (porcentaje de asistencia)
- Indicadores visuales (✓ asistió, ✗ faltó, - sin registro)
- Vista scrolleable horizontal optimizada para móviles

## ⚠️ Importante

### Sobre localStorage
- Los datos se guardan solo en el navegador donde se crean
- No se sincronizan entre dispositivos
- Se pueden perder al borrar caché del navegador
- Ideal para pruebas y uso temporal

### Migración a Producción
Para uso en producción se recomienda **conectar Supabase** para:
- Sincronización entre dispositivos
- Respaldos automáticos
- Mayor seguridad
- Acceso desde cualquier lugar

## 📞 Soporte

Para cambiar credenciales o agregar nuevos administradores, edita:
```
src/app/hooks/useAuth.tsx
```

Para modificar disciplinas o encargados, edita:
```
src/app/App.tsx
```

## 🎯 Próximos Pasos

1. ✅ Sistema de autenticación - Completado
2. ✅ Gestión de integrantes - Completado
3. ✅ Control de asistencias - Completado
4. ✅ Historial completo - Completado
5. ⏳ Conexión a Supabase - Pendiente
6. ⏳ Exportar reportes - Futuro

---

**Desarrollado para Olimpiadas 2026**
*Diseño responsive optimizado para móviles*
