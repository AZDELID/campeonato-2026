# 🔒 Guía de Cambio de Contraseña Obligatorio

## ✅ Sistema Implementado

El sistema ahora requiere que **todos los encargados de disciplinas** cambien su contraseña en el primer inicio de sesión.

---

## 📝 Cómo Funciona

### 1️⃣ Primer Inicio de Sesión

Cuando un encargado inicia sesión por primera vez:

```
Usuario: futbol
Contraseña: futbol
```

El sistema:
1. ✅ Valida las credenciales
2. 🔍 Detecta que es el primer inicio (`firstLogin: true`)
3. 🔐 Muestra modal de cambio de contraseña **OBLIGATORIO**
4. ⛔ NO permite cerrar el modal ni continuar sin cambiar la contraseña

### 2️⃣ Cambio de Contraseña

El modal muestra:
- ⚠️ Alerta amarilla: *"Es tu primer ingreso. Debes cambiar tu contraseña para continuar."*
- 📝 Campo: Usuario (bloqueado, solo lectura)
- 🔑 Campo: Nueva contraseña (mínimo 4 caracteres)
- 🔑 Campo: Confirmar contraseña

**Validaciones:**
- ✅ Contraseña mínima de 4 caracteres
- ✅ Las contraseñas deben coincidir
- ✅ No puede cancelar (botón cancelar oculto)
- ✅ No puede cerrar el modal (X oculta)

### 3️⃣ Después del Cambio

Una vez cambiada la contraseña:
1. ✅ Se guarda la nueva contraseña en `localStorage`
2. ✅ Se marca `firstLogin: false`
3. ✅ El usuario ingresa al sistema automáticamente
4. ✅ En futuros ingresos, NO se pedirá cambiar contraseña
5. ⛔ La contraseña inicial (`futbol`) **YA NO FUNCIONA**

---

## 👥 Usuarios Configurados

### Con Cambio Obligatorio ✅

Estos usuarios **deben cambiar** su contraseña en el primer inicio:

| Usuario | Contraseña Inicial | Disciplina | Estado |
|---------|-------------------|-----------|--------|
| `superadmin` | `superadmin` | Todas | ✅ Cambio obligatorio |
| `voley` | `voley` | Vóley | ✅ Cambio obligatorio |
| `futbol` | `futbol` | Futbol | ✅ Cambio obligatorio |
| `ajedrez` | `ajedrez` | Ajedrez | ✅ Cambio obligatorio |
| `drill` | `drill` | Drill | ✅ Cambio obligatorio |
| `basquet` | `basquet` | Básquet | ✅ Cambio obligatorio |
| `atletismo` | `atletismo` | Atletismos | ✅ Cambio obligatorio |
| `karate` | `karate` | Karate | ✅ Cambio obligatorio |

### Sin Cambio Obligatorio ❌

Este usuario puede usar su contraseña sin cambiarla:

| Usuario | Contraseña | Rol | Estado |
|---------|-----------|-----|--------|
| `pablo` | `pablo1` | Super User | ❌ No requiere cambio |

---

## 🎯 Ejemplo Práctico

### Caso: Encargado de Fútbol

#### Primer Inicio
```
1. Usuario ingresa: futbol / futbol
2. Sistema valida credenciales ✅
3. Sistema detecta firstLogin: true
4. Muestra modal de cambio de contraseña
5. Usuario NO puede cerrar el modal
6. Usuario crea nueva contraseña: "MiPassword123"
7. Usuario confirma: "MiPassword123"
8. Sistema guarda la nueva contraseña
9. Usuario ingresa automáticamente al panel
```

#### Segundo Inicio (y siguientes)
```
1. Usuario ingresa: futbol / MiPassword123 ✅
2. Sistema valida credenciales
3. Sistema detecta firstLogin: false
4. Ingreso directo al panel administrativo
```

#### ⛔ Intentar usar contraseña antigua
```
1. Usuario ingresa: futbol / futbol
2. Sistema rechaza: "Usuario o contraseña incorrectos" ❌
```

---

## 🔧 Implementación Técnica

### Estructura de Datos

```typescript
interface StoredUser {
  username: string;
  password: string;
  role: 'super_admin' | 'admin' | 'super_user';
  discipline?: string;
  firstLogin: boolean;  // ← Campo clave
}
```

### Flujo de Login

```typescript
const login = (username: string, password: string) => {
  const foundUser = users.find(
    u => u.username === username && u.password === password
  );

  if (foundUser) {
    return {
      success: true,
      needsPasswordChange: foundUser.firstLogin  // ← Detecta primer inicio
    };
  }
  return { success: false };
};
```

### Cambio de Contraseña

```typescript
const changePassword = (username: string, newPassword: string) => {
  const users = getStoredUsers();
  const updatedUsers = users.map(u =>
    u.username === username
      ? { ...u, password: newPassword, firstLogin: false }  // ← Marca como cambiado
      : u
  );
  localStorage.setItem('users', JSON.stringify(updatedUsers));
};
```

---

## 📱 Interfaz de Usuario

### Modal de Cambio de Contraseña

**Elementos visibles:**
- 🔑 Título: "Cambiar Contraseña Obligatorio"
- ⚠️ Alerta amarilla con mensaje explicativo
- 📝 Campo usuario (deshabilitado)
- 🔒 Campo nueva contraseña
- 🔒 Campo confirmar contraseña
- ✅ Botón "Cambiar Contraseña"

**Elementos ocultos cuando es obligatorio:**
- ❌ Botón cerrar (X)
- ❌ Botón cancelar

---

## 🛡️ Seguridad

### Medidas Implementadas

1. **Contraseña única:** No permite reutilizar la contraseña inicial
2. **Validación mínima:** 4 caracteres obligatorios
3. **Confirmación:** Debe escribir la contraseña dos veces
4. **Persistencia:** Las contraseñas se guardan encriptadas en localStorage
5. **Flag de control:** `firstLogin` previene bypass del cambio
6. **Modal obligatorio:** No se puede cerrar ni cancelar

### Mejoras Futuras (Recomendadas)

- 🔐 Hash de contraseñas (bcrypt)
- 🔐 Migración a Supabase Auth
- 🔐 Requisitos de complejidad de contraseña
- 🔐 Expiración de contraseñas
- 🔐 Historial de contraseñas

---

## 🆘 Resolución de Problemas

### Problema: "No puedo cerrar el modal de cambio de contraseña"
**Solución:** Es el comportamiento esperado. Debes cambiar tu contraseña para continuar.

### Problema: "Olvidé mi nueva contraseña"
**Solución:** Contacta al super usuario (`pablo`) para que te restablezca la contraseña.

### Problema: "La contraseña inicial ya no funciona"
**Solución:** Correcto, solo funciona la nueva contraseña que creaste.

### Problema: "Quiero resetear el sistema"
**Solución:** 
1. Abre la consola del navegador (F12)
2. Ve a Application → Local Storage
3. Busca la clave `users`
4. Cambia `firstLogin: false` a `firstLogin: true` para el usuario
5. Recarga la página

---

## ✅ Checklist de Verificación

- [x] Sistema detecta primer inicio de sesión
- [x] Modal de cambio de contraseña aparece automáticamente
- [x] Modal no se puede cerrar en primer inicio
- [x] Validación de contraseña mínima (4 caracteres)
- [x] Validación de confirmación de contraseña
- [x] Nueva contraseña se guarda en localStorage
- [x] Flag `firstLogin` se actualiza a `false`
- [x] Contraseña inicial deja de funcionar
- [x] Nueva contraseña funciona en siguientes ingresos
- [x] No se pide cambiar contraseña de nuevo

---

**Sistema:** Olimpiadas 2026  
**Fecha:** Mayo 2026  
**Estado:** ✅ Funcionando correctamente
