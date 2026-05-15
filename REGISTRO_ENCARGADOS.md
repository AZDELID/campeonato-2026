# 📝 Sistema de Registro de Encargados - Olimpiadas 2026

## 🎯 Descripción

Cada encargado puede crear su propia cuenta para administrar su disciplina deportiva. El sistema está diseñado para **garantizar que solo haya un encargado por disciplina**.

## 👤 Usuarios Predeterminados

### Super Usuario
- **Usuario:** `pablo`
- **Contraseña:** `pablo1`
- **Rol:** Super User (acceso especial)

### Super Administrador
- **Usuario:** `superadmin`
- **Contraseña:** `superadmin`
- **Rol:** Super Admin (acceso total a todas las disciplinas)
- **Primer login:** Requiere cambio de contraseña

## 📋 Cómo Registrarse como Encargado

### 1. Acceder al Formulario de Registro

1. Abre la página principal de Olimpiadas 2026
2. Haz clic en el ícono de login (🔑) en la esquina superior derecha
3. En el modal de login, haz clic en **"Crear Cuenta de Encargado"**

### 2. Completar el Formulario

Deberás proporcionar:

- **Disciplina:** Selecciona tu disciplina deportiva
  - Vóley
  - Futbol
  - Ajedrez
  - Drill
  - Básquet
  - Atletismos
  - Karate

- **Usuario:** Crea tu nombre de usuario
  - Mínimo 3 caracteres
  - Debe ser único

- **Contraseña:** Crea tu contraseña
  - Mínimo 6 caracteres
  - Debe ser segura

- **Confirmar Contraseña:** Repite tu contraseña

### 3. Validaciones del Sistema

El sistema verificará:

✅ **Una cuenta por disciplina:** Solo puede haber un encargado registrado por disciplina
✅ **Usuario único:** El nombre de usuario no puede estar duplicado
✅ **Contraseñas coinciden:** Ambas contraseñas deben ser iguales
✅ **Longitud mínima:** Usuario (3 caracteres), Contraseña (6 caracteres)

## ⚠️ Restricciones Importantes

### 1. Un Solo Encargado por Disciplina

Si intentas registrarte para una disciplina que **ya tiene un encargado**, recibirás el mensaje:

```
Ya existe un encargado registrado para [Disciplina]
```

**Solución:** Contacta al Super Administrador para:
- Eliminar la cuenta existente (si ya no es válida)
- Confirmar que eres el nuevo encargado oficial

### 2. Nombre de Usuario Único

Si el nombre de usuario ya está en uso:

```
Este nombre de usuario ya está en uso
```

**Solución:** Elige un nombre de usuario diferente

## 🔐 Después del Registro

1. **Cuenta creada exitosamente:** Verás un mensaje de confirmación
2. **Iniciar sesión:** Usa tu usuario y contraseña para acceder
3. **Panel administrativo:** Podrás gestionar:
   - Integrantes de tu disciplina
   - Registro de asistencias
   - Historial completo

## 🛡️ Seguridad

- ✅ Las contraseñas se almacenan localmente (localStorage)
- ✅ Solo puedes gestionar TU disciplina
- ✅ El Super Admin puede gestionar todas las disciplinas
- ✅ No puedes crear cuentas duplicadas

## 📞 Soporte

### Si ya existe un encargado para tu disciplina:

1. Verifica que seas el encargado oficial actual
2. Contacta al Super Administrador (`superadmin`)
3. El Super Admin puede eliminar cuentas antiguas si es necesario

### Si olvidaste tu contraseña:

Actualmente el sistema usa localStorage. Para recuperar acceso:
1. Contacta al Super Administrador
2. El Super Admin puede resetear tu contraseña desde el panel

## 🔄 Migración de Cuentas Antiguas

**Importante:** Las cuentas predeterminadas de encargados (voley, futbol, ajedrez, etc.) **han sido eliminadas**.

Cada encargado debe:
1. Crear su propia cuenta usando el formulario de registro
2. Elegir su propio usuario y contraseña
3. Garantizar que es el único encargado de su disciplina

## 💡 Preguntas Frecuentes

### ¿Puedo cambiar mi contraseña después?
Sí, desde el panel administrativo (función disponible).

### ¿Puedo tener múltiples cuentas?
No, solo puede haber un encargado por disciplina.

### ¿Qué pasa si la disciplina ya tiene encargado?
No podrás crear otra cuenta. Contacta al Super Admin.

### ¿El Super Admin también puede ser encargado?
Sí, el Super Admin tiene acceso a todas las disciplinas sin necesidad de cuenta de encargado.

---

**Sistema de Registro Activo desde:** Mayo 2026
**Versión:** 2.0
