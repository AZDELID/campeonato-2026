# 🔴 SOLUCIÓN: Los datos se borran al actualizar la página

## Diagnóstico del Problema

Si los datos se borran cada vez que actualizas la página, hay 3 posibles causas:

### Causa 1: Navegador en Modo Incógnito/Privado ❌

**Síntoma:** Los datos desaparecen al recargar

**Solución:**
1. Cierra la ventana de incógnito/privada
2. Abre el sitio en una ventana **NORMAL** del navegador
3. En modo incógnito, localStorage se borra al cerrar la pestaña

---

### Causa 2: Configuración del Navegador que Bloquea localStorage 🚫

**Síntoma:** Los datos no se guardan nunca

**Solución en Chrome:**
1. Ve a `chrome://settings/content/cookies`
2. Asegúrate que "Permitir que los sitios guarden y lean datos de cookies" esté **ACTIVADO**
3. Verifica que tu sitio NO esté en la lista de bloqueados

**Solución en Firefox:**
1. Ve a `about:preferences#privacy`
2. En "Cookies y datos del sitio", selecciona "Estándar" o "Personalizado"
3. NO selecciones "Borrar cookies y datos del sitio al cerrar Firefox"

**Solución en Edge:**
1. Ve a `edge://settings/content/cookies`
2. Activa "Permitir que los sitios guarden y lean datos de cookies"

---

### Causa 3: Error del Desarrollador (Vite/React en modo desarrollo) 🔥

**Síntoma:** Funciona en producción pero no en desarrollo

**Solución:**
1. Abre la consola del navegador (`F12`)
2. Ve a la pestaña **Application** (Chrome) o **Almacenamiento** (Firefox)
3. Mira **Local Storage** → selecciona tu URL
4. Verifica si hay datos guardados

**Si NO hay datos:**
```javascript
// Pega esto en la consola del navegador
console.log('Test localStorage:');
localStorage.setItem('test', 'funciona');
console.log('Guardado:', localStorage.getItem('test'));
localStorage.removeItem('test');
```

Si imprime `Guardado: funciona` → localStorage funciona
Si imprime `Guardado: null` → localStorage está bloqueado

---

## 🛠️ SOLUCIÓN PASO A PASO

### Paso 1: Verifica que NO estés en modo incógnito

Mira la esquina superior del navegador:
- Chrome: 🕵️ ícono de incógnito
- Firefox: 🎭 "Navegación privada"
- Edge: 🕵️ "InPrivate"

Si estás en modo privado → **Cierra y abre en ventana normal**

---

### Paso 2: Prueba localStorage manualmente

1. Presiona `F12` para abrir DevTools
2. Ve a la pestaña **Console**
3. Pega este código:

```javascript
// PASO 1: Limpiar todo
localStorage.clear();

// PASO 2: Configurar usuarios
const users = [
  { username: 'pablo', password: 'pablo1', role: 'super_user', firstLogin: false },
  { username: 'superadmin', password: 'superadmin', role: 'super_admin', firstLogin: true },
  { username: 'futbol', password: 'futbol', role: 'admin', discipline: 'Futbol', firstLogin: true },
  { username: 'voley', password: 'voley', role: 'admin', discipline: 'Vóley', firstLogin: true }
];

localStorage.setItem('users', JSON.stringify(users));
localStorage.setItem('members', JSON.stringify([]));
localStorage.setItem('attendances', JSON.stringify([]));

// PASO 3: Verificar que se guardó
console.log('Usuarios guardados:', JSON.parse(localStorage.getItem('users')).length);

// PASO 4: Recargar página
location.reload();
```

4. Después de recargar, abre la consola de nuevo y ejecuta:

```javascript
// Verificar si los datos siguen ahí
const users = JSON.parse(localStorage.getItem('users') || '[]');
console.log('Usuarios después de recargar:', users.length);

if (users.length > 0) {
  console.log('✅ localStorage funciona correctamente');
  console.log('Usuarios:', users.map(u => u.username).join(', '));
} else {
  console.log('❌ localStorage NO está guardando datos');
  console.log('Posible causa: modo incógnito o configuración del navegador');
}
```

---

### Paso 3: Si localStorage NO funciona

**Opción A: Cambiar de navegador**
- Prueba en Chrome (si estás en Firefox)
- Prueba en Firefox (si estás en Chrome)
- Prueba en Edge

**Opción B: Resetear configuración del navegador**

En Chrome:
```
chrome://settings/clearBrowserData
```
1. Selecciona "Configuración avanzada"
2. Marca solo "Cookies y otros datos de sitios"
3. Haz clic en "Borrar datos"

**Opción C: Migrar a Supabase (solución permanente)**

Si localStorage no funciona por restricciones del navegador, puedo migrar el sistema a usar **Supabase** que ya está configurado:

1. Los datos se guardarán en la nube
2. No dependerá del navegador
3. Persistencia garantizada

---

## 🧪 Script de Diagnóstico Automático

Pega este código en la consola para diagnóstico completo:

```javascript
console.clear();
console.log('🔍 DIAGNÓSTICO DE LOCALSTORAGE\n');

// Test 1: ¿Existe localStorage?
if (typeof(Storage) !== "undefined") {
  console.log('✅ Test 1: localStorage está disponible');
} else {
  console.log('❌ Test 1: localStorage NO está disponible');
  console.log('   Solución: Actualiza tu navegador');
}

// Test 2: ¿Podemos escribir?
try {
  localStorage.setItem('test_write', 'ok');
  console.log('✅ Test 2: Podemos escribir en localStorage');
} catch (e) {
  console.log('❌ Test 2: NO podemos escribir en localStorage');
  console.log('   Error:', e.message);
  console.log('   Solución: Verifica configuración de cookies');
}

// Test 3: ¿Podemos leer?
try {
  const val = localStorage.getItem('test_write');
  if (val === 'ok') {
    console.log('✅ Test 3: Podemos leer de localStorage');
  } else {
    console.log('❌ Test 3: Lectura incorrecta');
  }
} catch (e) {
  console.log('❌ Test 3: NO podemos leer de localStorage');
  console.log('   Error:', e.message);
}

// Test 4: ¿Los datos persisten después de recargar?
const testKey = 'persistence_test';
const testValue = Date.now().toString();
localStorage.setItem(testKey, testValue);
const lastTest = localStorage.getItem('last_test_value');

if (lastTest) {
  console.log('✅ Test 4: Los datos PERSISTEN entre recargas');
  console.log('   Última prueba:', new Date(parseInt(lastTest)).toLocaleString());
} else {
  console.log('⚠️ Test 4: Primera vez que se ejecuta esta prueba');
  console.log('   Recarga la página y ejecuta este script de nuevo');
}

localStorage.setItem('last_test_value', testValue);
localStorage.removeItem('test_write');

// Test 5: ¿Modo incógnito?
if (typeof navigator.storage !== 'undefined' && typeof navigator.storage.estimate === 'function') {
  navigator.storage.estimate().then(estimate => {
    const quota = estimate.quota || 0;
    if (quota < 120000000) { // < 120MB sugiere modo incógnito
      console.log('⚠️ Test 5: Posible modo incógnito detectado');
      console.log('   Cuota:', (quota / 1024 / 1024).toFixed(2), 'MB');
      console.log('   Solución: Abre en ventana normal');
    } else {
      console.log('✅ Test 5: NO estás en modo incógnito');
      console.log('   Cuota:', (quota / 1024 / 1024).toFixed(2), 'MB');
    }
  });
} else {
  console.log('⚠️ Test 5: No se puede detectar modo incógnito');
}

// Test 6: Estado actual de datos
console.log('\n📊 ESTADO ACTUAL DE DATOS:');
const users = JSON.parse(localStorage.getItem('users') || '[]');
const members = JSON.parse(localStorage.getItem('members') || '[]');
const attendances = JSON.parse(localStorage.getItem('attendances') || '[]');

console.log('Usuarios:', users.length);
console.log('Integrantes:', members.length);
console.log('Asistencias:', attendances.length);

if (users.length > 0) {
  console.log('\nUsuarios encontrados:');
  users.forEach(u => console.log(`  - ${u.username} (${u.role})`));
}

console.log('\n✅ Diagnóstico completo');
```

---

## 📝 Reporte de Resultados

Después de ejecutar el diagnóstico, dime:

1. ¿Qué dice el **Test 4**? (¿los datos persisten?)
2. ¿Qué dice el **Test 5**? (¿modo incógnito?)
3. ¿Cuántos usuarios/integrantes/asistencias encontró el **Test 6**?

Con esta información sabré exactamente cuál es el problema y cómo solucionarlo.

---

## 🚀 Solución Alternativa: Modo Desarrollo con Persistencia Forzada

Si estás en modo desarrollo y Vite está borrando los datos, puedo modificar el código para forzar la persistencia:

1. Guardar datos en `sessionStorage` también (backup)
2. Agregar un hook que detecte cuando se borran los datos
3. Restaurar automáticamente desde el backup

¿Quieres que implemente esta solución?
