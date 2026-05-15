# 🔐 Sistema de Contraseñas - Olimpiadas 2026

## Funcionamiento del Sistema

### Primer Inicio de Sesión

Cuando un administrador ingresa **por primera vez** al sistema:

1. **Credenciales iniciales:**
   - Usuario: nombre de la disciplina (ej: `voley`, `futbol`)
   - Contraseña: igual al usuario (ej: `voley`, `futbol`)

2. **Flujo automático:**
   - El usuario ingresa con credenciales por defecto
   - El sistema detecta que es su primer inicio (`firstLogin: true`)
   - **Automáticamente** aparece un modal obligatorio de cambio de contraseña
   - El usuario NO puede cerrar este modal sin cambiar la contraseña
   - Debe ingresar y confirmar una nueva contraseña

3. **Validaciones:**
   - La contraseña debe tener mínimo 4 caracteres
   - Las contraseñas deben coincidir
   - La nueva contraseña NO puede ser igual al usuario

4. **Después del cambio:**
   - El sistema guarda la nueva contraseña
   - Marca `firstLogin: false` para ese usuario
   - El usuario ya puede acceder normalmente con su nueva contraseña

### Inicios Posteriores

Después del primer cambio de contraseña:
- El usuario ingresa con su **nueva contraseña**
- Ya no se le pide cambiarla obligatoriamente
- Accede directamente al panel administrativo

## 👥 Usuarios Predeterminados

### Super Usuario
- **Usuario:** `pablo`
- **Contraseña:** `pablo1`
- **Rol:** Super Usuario (acceso total)
- **Primera vez:** NO requiere cambio

### Super Administrador
- **Usuario:** `superadmin`
- **Contraseña:** `superadmin` (primera vez)
- **Rol:** Super Admin (gestiona todas las disciplinas)
- **Primera vez:** SÍ requiere cambio obligatorio

### Administradores de Disciplina

Todos requieren cambio de contraseña en el primer ingreso:

| Disciplina | Usuario | Contraseña Inicial | Primera Vez |
|------------|---------|-------------------|-------------|
| Vóley | `voley` | `voley` | Cambio obligatorio ✅ |
| Fútbol | `futbol` | `futbol` | Cambio obligatorio ✅ |
| Ajedrez | `ajedrez` | `ajedrez` | Cambio obligatorio ✅ |
| Drill | `drill` | `drill` | Cambio obligatorio ✅ |
| Básquet | `basquet` | `basquet` | Cambio obligatorio ✅ |
| Atletismo | `atletismo` | `atletismo` | Cambio obligatorio ✅ |
| Karate | `karate` | `karate` | Cambio obligatorio ✅ |

## 🔒 Seguridad

### Almacenamiento
- Las contraseñas se guardan en **localStorage** del navegador
- Cada navegador tiene sus propias credenciales guardadas
- Al cambiar de dispositivo, usar credenciales actualizadas

### Recuperación de Contraseña
⚠️ **Importante:** No hay sistema de recuperación automática de contraseña.

Si un administrador olvida su contraseña:
1. El super usuario (`pablo`) puede resetearla
2. O necesitas limpiar el localStorage y empezar de nuevo

### Resetear Contraseñas (Para Desarrolladores)

Si necesitas resetear todas las contraseñas a valores por defecto:

```javascript
// Ejecutar en la consola del navegador
localStorage.removeItem('users');
localStorage.removeItem('currentUser');
location.reload();
```

Esto volverá todas las contraseñas a sus valores iniciales.

## 🎯 Ejemplo de Flujo Completo

### Caso: Administrador de Vóley (Primera Vez)

1. **Abrir la página** → Ver botón de login (icono dorado arriba a la derecha)

2. **Hacer clic en Login** → Aparece modal de inicio de sesión

3. **Ingresar:**
   - Usuario: `voley`
   - Contraseña: `voley`

4. **Presionar "Iniciar Sesión"** → El sistema detecta primer ingreso

5. **Aparece modal de cambio de contraseña** (no se puede cerrar)
   - Mensaje: "Es tu primer ingreso. Debes cambiar tu contraseña para continuar."
   - Campo: Nueva Contraseña (ej: `voley2026`)
   - Campo: Confirmar Contraseña (ej: `voley2026`)

6. **Hacer clic en "Cambiar Contraseña"** → Sistema valida y guarda

7. **Redirige al panel administrativo** → Ya está dentro

8. **Próximos inicios:**
   - Usuario: `voley`
   - Contraseña: `voley2026` (la nueva)

## 📊 Estados de Usuario

Cada usuario tiene un estado `firstLogin`:

- `firstLogin: true` → Primera vez, debe cambiar contraseña
- `firstLogin: false` → Ya cambió contraseña, login normal

El sistema cambia automáticamente `firstLogin` de `true` a `false` después del primer cambio exitoso.

## 🛠️ Para Desarrolladores

### Estructura de Usuario en localStorage

```json
{
  "username": "voley",
  "password": "nueva_contraseña_encriptada",
  "role": "admin",
  "discipline": "Vóley",
  "firstLogin": false
}
```

### Archivos Clave

- `/src/app/hooks/useAuth.tsx` - Lógica de autenticación
- `/src/app/components/LoginModal.tsx` - Modal de login
- `/src/app/components/ChangePasswordModal.tsx` - Modal de cambio de contraseña

### Agregar Nuevo Administrador

Edita `/src/app/hooks/useAuth.tsx`:

```typescript
const defaultUsers: StoredUser[] = [
  // ... usuarios existentes
  { 
    username: 'nueva_disciplina', 
    password: 'nueva_disciplina', 
    role: 'admin', 
    discipline: 'Nueva Disciplina', 
    firstLogin: true 
  }
];
```

## ✅ Ventajas del Sistema

- ✅ Seguridad mejorada (contraseñas únicas por usuario)
- ✅ Forzar cambio en primer uso
- ✅ Validación de contraseñas
- ✅ Interfaz clara y fácil de usar
- ✅ Compatible con móviles
- ✅ Sin riesgo de usar contraseñas por defecto

---

**Sistema de Contraseñas - Olimpiadas 2026**
*Actualizado: Mayo 2026*
