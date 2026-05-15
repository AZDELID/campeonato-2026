# 🛡️ Manual del Super Usuario - Olimpiadas 2026

## 👤 Credenciales de Acceso

**Usuario:** `pablo`  
**Contraseña:** `pablo1`  
**Rol:** Super User (Control Total del Sistema)

---

## 🎯 Funcionalidades Exclusivas

El super usuario tiene **control total** sobre el sistema, incluyendo funcionalidades que los administradores normales no tienen.

### 1️⃣ **Ver Todos los Usuarios**

Al iniciar sesión, verás un **Panel de Super Usuario** especial con:

- 📊 **Estadísticas del sistema:**
  - Total de usuarios registrados
  - Cantidad de administradores
  - Usuarios pendientes de primer login

- 📋 **Lista completa de usuarios** con detalles:
  - Nombre de usuario
  - Rol (Super User, Super Admin, Administrador)
  - Disciplina asignada (si aplica)
  - Estado de primer login
  - **Contraseña visible** (con botón mostrar/ocultar)

### 2️⃣ **Ver Contraseñas**

Puedes ver las contraseñas de **todos los usuarios**:

1. En la lista de usuarios, cada uno tiene su contraseña
2. Por defecto, las contraseñas están ocultas: `••••••••`
3. Haz clic en el ícono de 👁️ (ojo) para mostrar la contraseña real
4. Haz clic nuevamente en 🙈 (ojo tachado) para ocultarla

**Ejemplo:**
```
Usuario: futbol
Contraseña: ••••••••  [👁️]  ← Clic aquí
         ↓
Contraseña: MiPassword123  [🙈]  ← Clic para ocultar
```

### 3️⃣ **Cambiar Contraseñas**

Puedes cambiar la contraseña de **cualquier usuario** sin necesidad de conocer su contraseña actual:

1. Busca el usuario en la lista
2. Haz clic en **"Cambiar Contraseña"**
3. Se abre un modal
4. Ingresa la nueva contraseña (mínimo 4 caracteres)
5. Confirma la contraseña
6. Haz clic en **"Cambiar Contraseña"**

**Características:**
- ✅ No necesitas la contraseña anterior
- ✅ El cambio es inmediato
- ✅ El usuario puede usar la nueva contraseña de inmediato
- ✅ Se marca `firstLogin: false` automáticamente

**Casos de uso:**
- Un administrador olvidó su contraseña
- Necesitas resetear una cuenta
- Quieres establecer una contraseña temporal

### 4️⃣ **Eliminar Usuarios** ⚠️

Puedes **eliminar cuentas de usuarios** del sistema:

1. Busca el usuario en la lista
2. Haz clic en el botón **"Eliminar"** (🗑️)
3. Confirma la acción en el cuadro de diálogo
4. El usuario se elimina permanentemente

**⚠️ IMPORTANTE:**
- Esta acción **NO se puede deshacer**
- El usuario eliminado **NO podrá iniciar sesión** nuevamente
- Si quieres que vuelva, debe **registrarse de nuevo**

**Usuarios Protegidos:**
- ❌ No puedes eliminar a `pablo` (tú mismo)
- ❌ No puedes eliminar a `superadmin`
- Estos usuarios muestran un botón "Protegido" 🛡️ en lugar de "Eliminar"

**Usuarios que SÍ puedes eliminar:**
- ✅ Todos los administradores de disciplinas
- ✅ Cualquier cuenta creada por registro

---

## 🎨 Interfaz del Panel

### Diseño Visual

El panel de super usuario tiene un **diseño especial** en color **púrpura**:

- 🟣 Header morado con ícono de escudo
- 📊 Tarjetas de estadísticas con bordes de colores
- 👥 Lista de usuarios con badges de colores por rol

### Badges de Roles

Cada usuario tiene un badge de color según su rol:

- **🟣 Super Usuario** (púrpura) → Pablo
- **🟡 Super Admin** (amarillo) → Acceso total a todas las disciplinas
- **🔵 Administrador** (azul) → Acceso solo a su disciplina
- **🟠 Primer Login** (naranja) → Usuarios que no han cambiado su contraseña

---

## 📋 Ejemplos de Uso

### Ejemplo 1: Ver la Contraseña de un Usuario

**Situación:** El administrador de Fútbol olvidó su contraseña.

**Solución:**
1. Inicia sesión como `pablo`
2. Busca al usuario `futbol` en la lista
3. Haz clic en el ícono de ojo 👁️
4. Ves la contraseña: `MiPassword123`
5. Dísela al administrador de Fútbol

### Ejemplo 2: Cambiar la Contraseña de un Usuario

**Situación:** El administrador de Vóley necesita resetear su contraseña.

**Solución:**
1. Inicia sesión como `pablo`
2. Busca al usuario `voley` en la lista
3. Haz clic en **"Cambiar Contraseña"**
4. Ingresa nueva contraseña: `NuevaPassword456`
5. Confirma: `NuevaPassword456`
6. Haz clic en **"Cambiar Contraseña"**
7. Informa al administrador de Vóley su nueva contraseña

### Ejemplo 3: Eliminar un Usuario

**Situación:** Un encargado renunció y ya no debe tener acceso.

**Solución:**
1. Inicia sesión como `pablo`
2. Busca al usuario en la lista
3. Haz clic en **"Eliminar"** 🗑️
4. Confirma: "¿Estás seguro de eliminar el usuario 'X'?"
5. El usuario se elimina del sistema
6. ✅ Ya no puede iniciar sesión

---

## 🔒 Seguridad

### Protecciones Implementadas

1. **Usuarios Protegidos:**
   - `pablo` (tú) no puede eliminarse a sí mismo
   - `superadmin` tampoco puede eliminarse
   - Botón "Eliminar" está deshabilitado para ellos

2. **Confirmación de Eliminación:**
   - Siempre pide confirmación antes de eliminar
   - Muestra advertencia clara de que no se puede deshacer

3. **Persistencia:**
   - Todos los cambios se guardan en `localStorage`
   - Los cambios son inmediatos

### Recomendaciones de Seguridad

- ✅ **Mantén segura** la contraseña de pablo
- ✅ **No compartas** las credenciales del super usuario
- ✅ **Verifica** antes de eliminar usuarios
- ✅ **Documenta** los cambios importantes que hagas
- ⚠️ **Ten cuidado** al ver contraseñas de otros

---

## ⚙️ Comparación de Permisos

| Funcionalidad | Super User (pablo) | Super Admin | Admin |
|---------------|-------------------|-------------|-------|
| Ver todos los usuarios | ✅ Sí | ❌ No | ❌ No |
| Ver contraseñas | ✅ Sí | ❌ No | ❌ No |
| Cambiar contraseñas de otros | ✅ Sí | ❌ No | ❌ No |
| Eliminar usuarios | ✅ Sí | ❌ No | ❌ No |
| Ver todas las disciplinas | ✅ Sí | ✅ Sí | ❌ No |
| Gestionar integrantes | ❌ No* | ✅ Sí | ✅ Sí |
| Registrar asistencias | ❌ No* | ✅ Sí | ✅ Sí |
| Ver historial | ❌ No* | ✅ Sí | ✅ Sí |

*El super usuario está enfocado en gestión de cuentas, no en operaciones del día a día.

---

## 🆘 Resolución de Problemas

### Problema: "No veo el panel de super usuario"
**Solución:** Verifica que estés usando el usuario `pablo` con contraseña `pablo1`.

### Problema: "No puedo eliminar un usuario"
**Solución:** Solo puedes eliminar administradores de disciplinas. Los usuarios `pablo` y `superadmin` están protegidos.

### Problema: "Eliminé un usuario por error"
**Solución:** 
1. El usuario puede registrarse de nuevo desde la pantalla de login
2. O puedes recrear manualmente editando `localStorage`:
   - Abre consola (F12)
   - Application → Local Storage → users
   - Agrega el usuario manualmente

### Problema: "La contraseña que veo no funciona"
**Solución:** Asegúrate de que el usuario no haya cambiado su contraseña recientemente. Recarga el panel para ver la versión actualizada.

---

## 🎓 Consejos y Mejores Prácticas

### Para Gestión de Contraseñas

1. **Contraseñas Temporales:**
   - Si reseteas una contraseña, usa algo temporal
   - Ejemplo: `Temp2026!`
   - Pide al usuario que la cambie después

2. **Documentación:**
   - Mantén un registro de cambios importantes
   - Anota cuándo y por qué cambiaste contraseñas

3. **Privacidad:**
   - Solo ve contraseñas cuando sea necesario
   - No las compartas por mensajes inseguros

### Para Eliminación de Usuarios

1. **Verificación:**
   - Confirma que el usuario realmente debe ser eliminado
   - Pregunta antes de actuar

2. **Alternativas:**
   - Considera solo cambiar la contraseña en lugar de eliminar
   - Así la cuenta queda inactiva pero puede recuperarse

3. **Backup Mental:**
   - Recuerda la disciplina del usuario eliminado
   - Por si necesitas crear una cuenta nueva después

---

## 📞 Contacto y Soporte

Si tienes dudas sobre el uso del panel de super usuario:

1. Revisa este manual
2. Consulta `CREDENCIALES_ACTUALIZADAS.md` para ver todos los usuarios
3. Revisa `GUIA_CAMBIO_CONTRASEÑA.md` para entender el flujo de contraseñas

---

**Sistema:** Olimpiadas 2026  
**Rol:** Super Usuario  
**Usuario:** pablo  
**Última actualización:** Mayo 2026

🛡️ **Con gran poder viene gran responsabilidad** - Usa estas funciones sabiamente.
