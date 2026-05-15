# 🔐 Sistema de Autenticación Mejorado - Olimpiadas 2026

## 🆕 Nuevo Sistema de Contraseñas

### Primera Vez (Obligatorio Cambiar Contraseña)

Cuando un administrador ingresa **por primera vez**, debe usar:
- **Usuario:** Su nombre de usuario
- **Contraseña:** La misma que su usuario

**Ejemplo:**
- Usuario: `voley` → Contraseña: `voley`
- Usuario: `futbol` → Contraseña: `futbol`

Después del primer login, el sistema **obligará a cambiar la contraseña**.

### Siguientes Ingresos

Usar la contraseña que establecieron en el primer cambio.

---

## 👤 Super Usuario (Pablo)

### Credenciales Especiales
- **Usuario:** `pablo`
- **Contraseña:** `pablo1`
- **Rol:** Super Usuario
- **Permisos:** 
  - ✅ Ver todos los usuarios del sistema
  - ✅ Ver todas las contraseñas
  - ✅ Cambiar contraseñas de cualquier usuario
  - ✅ Control total del sistema

**El super usuario "pablo" NO necesita cambiar su contraseña** al primer login.

---

## 📋 Lista de Usuarios por Defecto

### Super Administrador
- **Usuario:** `superadmin`
- **Contraseña inicial:** `superadmin`
- **Permisos:** Acceso a todas las disciplinas
- **Primer login:** Debe cambiar contraseña ✓

### Administradores por Disciplina

| Disciplina | Usuario | Contraseña Inicial | Cambiar en 1er Login |
|------------|---------|-------------------|----------------------|
| Vóley | `voley` | `voley` | ✓ |
| Fútbol | `futbol` | `futbol` | ✓ |
| Ajedrez | `ajedrez` | `ajedrez` | ✓ |
| Drill | `drill` | `drill` | ✓ |
| Básquet | `basquet` | `basquet` | ✓ |
| Atletismo | `atletismo` | `atletismo` | ✓ |
| Karate | `karate` | `karate` | ✓ |

---

## 🔄 Proceso de Login

### Primera Vez
1. Ingresa con usuario y contraseña iguales (ej: `voley` / `voley`)
2. El sistema detecta que es tu primer login
3. **Obligatoriamente** debes establecer una nueva contraseña
4. Confirma la nueva contraseña
5. Ya puedes usar el sistema

### Siguientes Veces
1. Ingresa con tu usuario
2. Usa la contraseña que estableciste
3. Acceso directo al panel administrativo

---

## 🛠️ Panel del Super Usuario (Pablo)

### Funcionalidades Especiales

1. **Ver Usuarios:**
   - Lista completa de todos los usuarios
   - Roles asignados
   - Estado de primer login

2. **Gestión de Contraseñas:**
   - Ver contraseñas de todos los usuarios
   - Botón mostrar/ocultar para cada contraseña
   - Cambiar contraseña de cualquier usuario
   - Sin necesidad de conocer la contraseña anterior

3. **Indicadores Visuales:**
   - 🟣 Super Usuario (Pablo)
   - 🟡 Super Admin
   - 🔵 Administrador de disciplina
   - 🟠 "Primer Login" para usuarios que no han cambiado su contraseña

---

## ⚙️ Cambio de Contraseña

### Como Administrador

Los administradores pueden cambiar su propia contraseña desde su panel (función por implementar).

### Como Super Usuario (Pablo)

1. Login con `pablo` / `pablo1`
2. Ver la lista de usuarios
3. Hacer clic en "Cambiar Contraseña" del usuario deseado
4. Ingresar la nueva contraseña
5. Guardar

**La contraseña del usuario se actualiza inmediatamente.**

---

## 🔒 Seguridad

### Almacenamiento
- Las contraseñas se guardan en localStorage (navegador)
- Sistema de roles implementado
- Validación de permisos por acción

### Requisitos de Contraseña
- Mínimo 4 caracteres
- Debe coincidir en confirmación
- Sin restricciones adicionales (puede incluir letras, números, símbolos)

### Recomendaciones
- Cambiar contraseñas periódicamente
- No compartir credenciales
- El super usuario debe mantener su contraseña segura

---

## 📝 Notas Importantes

1. **Primer Login Obligatorio:**
   - Todos los administradores DEBEN cambiar su contraseña inicial
   - No pueden usar el sistema hasta cambiarla
   - Excepto el super usuario "pablo"

2. **Super Usuario Pablo:**
   - Único usuario con acceso total al sistema
   - Puede restablecer contraseñas olvidadas
   - No aparece en el panel de administradores normales

3. **Persistencia:**
   - Las contraseñas se guardan en localStorage
   - Se mantienen aunque cierres el navegador
   - Se perderán si borras el caché del navegador

---

## 🆘 Recuperación de Contraseña

Si un administrador **olvida su contraseña**:

1. Contactar al super usuario "pablo"
2. Pablo puede ver y cambiar la contraseña
3. El administrador recibe su nueva contraseña
4. Puede volver a cambiarla si lo desea

**No hay sistema de recuperación automática** - Todo pasa por el super usuario.

---

## 🎯 Acceso Rápido

### Para Administradores
```
Usuario: [tu_disciplina]
Contraseña: [establecida por ti]
```

### Para Super Usuario
```
Usuario: pablo
Contraseña: pablo1
```

---

**Sistema actualizado el 13 de Mayo, 2026**
*Olimpiadas 2026 - Gestión Administrativa*
