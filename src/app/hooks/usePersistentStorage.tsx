import { useState, useEffect } from 'react';

/**
 * Hook mejorado para persistencia de datos con backup automático
 * Usa localStorage + sessionStorage para mayor seguridad
 */
export function usePersistentStorage<T>(key: string, defaultValue: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      // Intentar leer de localStorage primero
      const storedValue = localStorage.getItem(key);
      if (storedValue) {
        console.log(`✅ [${key}] Cargado desde localStorage`);
        return JSON.parse(storedValue);
      }

      // Si no hay en localStorage, intentar sessionStorage
      const sessionValue = sessionStorage.getItem(key);
      if (sessionValue) {
        console.log(`⚠️ [${key}] Recuperado desde sessionStorage (backup)`);
        const parsed = JSON.parse(sessionValue);
        // Restaurar en localStorage
        localStorage.setItem(key, sessionValue);
        return parsed;
      }

      // Si no hay nada, usar valor por defecto
      console.log(`🆕 [${key}] Inicializando con valor por defecto`);
      const defaultStr = JSON.stringify(defaultValue);
      localStorage.setItem(key, defaultStr);
      sessionStorage.setItem(key, defaultStr);
      return defaultValue;
    } catch (error) {
      console.error(`❌ Error al cargar [${key}]:`, error);
      return defaultValue;
    }
  });

  // Sincronizar cambios en ambos storages
  useEffect(() => {
    try {
      const valueStr = JSON.stringify(value);
      localStorage.setItem(key, valueStr);
      sessionStorage.setItem(key, valueStr);
      console.log(`💾 [${key}] Guardado en localStorage y sessionStorage`);
    } catch (error) {
      console.error(`❌ Error al guardar [${key}]:`, error);
    }
  }, [key, value]);

  // Verificar integridad cada 5 segundos
  useEffect(() => {
    const intervalId = setInterval(() => {
      try {
        const stored = localStorage.getItem(key);
        if (!stored) {
          console.warn(`⚠️ [${key}] localStorage vacío, restaurando desde sessionStorage`);
          const sessionValue = sessionStorage.getItem(key);
          if (sessionValue) {
            localStorage.setItem(key, sessionValue);
          }
        }
      } catch (error) {
        console.error(`❌ Error en verificación de integridad [${key}]:`, error);
      }
    }, 5000);

    return () => clearInterval(intervalId);
  }, [key]);

  return [value, setValue] as const;
}

/**
 * Función para verificar si localStorage funciona correctamente
 */
export function testLocalStorage(): boolean {
  try {
    const testKey = '__test_storage__';
    const testValue = 'test';

    localStorage.setItem(testKey, testValue);
    const retrieved = localStorage.getItem(testKey);
    localStorage.removeItem(testKey);

    if (retrieved === testValue) {
      console.log('✅ localStorage funciona correctamente');
      return true;
    } else {
      console.error('❌ localStorage no está guardando correctamente');
      return false;
    }
  } catch (error) {
    console.error('❌ localStorage no está disponible:', error);
    return false;
  }
}

/**
 * Función para diagnosticar problemas de persistencia
 */
export function diagnoseStorage() {
  console.clear();
  console.log('🔍 DIAGNÓSTICO DE PERSISTENCIA\n');

  // Test 1: Disponibilidad
  const hasLocalStorage = typeof(Storage) !== "undefined";
  console.log(`${hasLocalStorage ? '✅' : '❌'} localStorage disponible:`, hasLocalStorage);

  // Test 2: Modo incógnito
  try {
    localStorage.setItem('__test__', '1');
    localStorage.removeItem('__test__');
    console.log('✅ Modo normal (NO incógnito)');
  } catch (e) {
    console.log('❌ Posible modo incógnito o storage bloqueado');
  }

  // Test 3: Datos actuales
  const users = localStorage.getItem('users');
  const members = localStorage.getItem('members');
  const attendances = localStorage.getItem('attendances');

  console.log('\n📊 DATOS ACTUALES:');
  console.log('Users:', users ? JSON.parse(users).length : 0);
  console.log('Members:', members ? JSON.parse(members).length : 0);
  console.log('Attendances:', attendances ? JSON.parse(attendances).length : 0);

  // Test 4: Backup en sessionStorage
  const sessionUsers = sessionStorage.getItem('users');
  const sessionMembers = sessionStorage.getItem('members');

  console.log('\n💾 BACKUP (sessionStorage):');
  console.log('Users backup:', sessionUsers ? JSON.parse(sessionUsers).length : 0);
  console.log('Members backup:', sessionMembers ? JSON.parse(sessionMembers).length : 0);

  // Test 5: Cuota de almacenamiento
  if (navigator.storage && navigator.storage.estimate) {
    navigator.storage.estimate().then(estimate => {
      const quota = estimate.quota || 0;
      const usage = estimate.usage || 0;
      console.log('\n💽 ALMACENAMIENTO:');
      console.log('Cuota:', (quota / 1024 / 1024).toFixed(2), 'MB');
      console.log('Usado:', (usage / 1024).toFixed(2), 'KB');
      console.log('Disponible:', ((quota - usage) / 1024 / 1024).toFixed(2), 'MB');
    });
  }

  console.log('\n✅ Diagnóstico completo');
}

// Exponer funciones globalmente para debug
if (typeof window !== 'undefined') {
  (window as any).diagnoseStorage = diagnoseStorage;
  (window as any).testLocalStorage = testLocalStorage;
}
