import { useState, useEffect } from 'react';
import { CheckCircle, XCircle, AlertTriangle, RefreshCw } from 'lucide-react';

export function TestPersistencia() {
  const [testResults, setTestResults] = useState<{
    disponible: boolean | null;
    escritura: boolean | null;
    lectura: boolean | null;
    persistencia: boolean | null;
    modoIncognito: boolean | null;
    datosActuales: { users: number; members: number; attendances: number };
  }>({
    disponible: null,
    escritura: null,
    lectura: null,
    persistencia: null,
    modoIncognito: null,
    datosActuales: { users: 0, members: 0, attendances: 0 }
  });

  const ejecutarTests = () => {
    const results = { ...testResults };

    // Test 1: ¿Está disponible localStorage?
    results.disponible = typeof(Storage) !== "undefined";

    // Test 2: ¿Podemos escribir?
    try {
      localStorage.setItem('__test_write__', 'ok');
      results.escritura = true;
    } catch (e) {
      results.escritura = false;
    }

    // Test 3: ¿Podemos leer?
    try {
      const val = localStorage.getItem('__test_write__');
      results.lectura = val === 'ok';
      localStorage.removeItem('__test_write__');
    } catch (e) {
      results.lectura = false;
    }

    // Test 4: ¿Hay datos del último test?
    const lastTest = localStorage.getItem('__last_test_time__');
    results.persistencia = lastTest !== null;
    localStorage.setItem('__last_test_time__', Date.now().toString());

    // Test 5: ¿Modo incógnito? (aproximado)
    results.modoIncognito = false;
    if (navigator.storage && navigator.storage.estimate) {
      navigator.storage.estimate().then(estimate => {
        const quota = estimate.quota || 0;
        const esPosibleIncognito = quota < 120000000; // < 120MB
        setTestResults(prev => ({ ...prev, modoIncognito: esPosibleIncognito }));
      });
    }

    // Test 6: Datos actuales
    try {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const members = JSON.parse(localStorage.getItem('members') || '[]');
      const attendances = JSON.parse(localStorage.getItem('attendances') || '[]');
      results.datosActuales = {
        users: users.length,
        members: members.length,
        attendances: attendances.length
      };
    } catch (e) {
      results.datosActuales = { users: 0, members: 0, attendances: 0 };
    }

    setTestResults(results);
  };

  useEffect(() => {
    ejecutarTests();
  }, []);

  const resetearDatos = () => {
    if (confirm('¿Resetear todos los datos a valores iniciales?')) {
      const defaultUsers = [
        { username: 'pablo', password: 'pablo1', role: 'super_user', firstLogin: false },
        { username: 'superadmin', password: 'superadmin', role: 'super_admin', firstLogin: true },
        { username: 'voley', password: 'voley', role: 'admin', discipline: 'Vóley', firstLogin: true },
        { username: 'futbol', password: 'futbol', role: 'admin', discipline: 'Futbol', firstLogin: true },
        { username: 'ajedrez', password: 'ajedrez', role: 'admin', discipline: 'Ajedrez', firstLogin: true },
        { username: 'drill', password: 'drill', role: 'admin', discipline: 'Drill', firstLogin: true },
        { username: 'basquet', password: 'basquet', role: 'admin', discipline: 'Básquet', firstLogin: true },
        { username: 'atletismo', password: 'atletismo', role: 'admin', discipline: 'Atletismos', firstLogin: true },
        { username: 'karate', password: 'karate', role: 'admin', discipline: 'Karate', firstLogin: true }
      ];

      localStorage.clear();
      sessionStorage.clear();
      localStorage.setItem('users', JSON.stringify(defaultUsers));
      sessionStorage.setItem('users', JSON.stringify(defaultUsers));
      localStorage.setItem('members', JSON.stringify([]));
      sessionStorage.setItem('members', JSON.stringify([]));
      localStorage.setItem('attendances', JSON.stringify([]));
      sessionStorage.setItem('attendances', JSON.stringify([]));

      alert('✅ Datos reseteados. Recarga la página para ver los cambios.');
      ejecutarTests();
    }
  };

  const renderStatus = (status: boolean | null) => {
    if (status === null) return <AlertTriangle className="w-5 h-5 text-gray-400" />;
    if (status) return <CheckCircle className="w-5 h-5 text-green-400" />;
    return <XCircle className="w-5 h-5 text-red-400" />;
  };

  const getStatusText = (status: boolean | null) => {
    if (status === null) return { text: 'Pendiente', color: 'text-gray-400' };
    if (status) return { text: 'OK', color: 'text-green-400' };
    return { text: 'ERROR', color: 'text-red-400' };
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-br from-blue-900/50 to-black border border-blue-600/30 rounded-2xl p-6 mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-blue-400 mb-2">
            🧪 Test de Persistencia de Datos
          </h1>
          <p className="text-gray-400">
            Herramienta para diagnosticar problemas con el guardado de datos
          </p>
        </div>

        {/* Resultados de Tests */}
        <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-700 rounded-xl p-6 mb-6">
          <h2 className="text-xl font-bold text-white mb-4">Resultados de Pruebas</h2>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-black/40 rounded-lg border border-gray-700">
              <span className="text-gray-300">1. LocalStorage disponible</span>
              <div className="flex items-center gap-2">
                {renderStatus(testResults.disponible)}
                <span className={getStatusText(testResults.disponible).color}>
                  {getStatusText(testResults.disponible).text}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-black/40 rounded-lg border border-gray-700">
              <span className="text-gray-300">2. Puede escribir datos</span>
              <div className="flex items-center gap-2">
                {renderStatus(testResults.escritura)}
                <span className={getStatusText(testResults.escritura).color}>
                  {getStatusText(testResults.escritura).text}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-black/40 rounded-lg border border-gray-700">
              <span className="text-gray-300">3. Puede leer datos</span>
              <div className="flex items-center gap-2">
                {renderStatus(testResults.lectura)}
                <span className={getStatusText(testResults.lectura).color}>
                  {getStatusText(testResults.lectura).text}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-black/40 rounded-lg border border-gray-700">
              <span className="text-gray-300">4. Datos persisten entre recargas</span>
              <div className="flex items-center gap-2">
                {renderStatus(testResults.persistencia)}
                <span className={testResults.persistencia ? 'text-green-400' : 'text-orange-400'}>
                  {testResults.persistencia ? 'SÍ' : 'Primera ejecución'}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-black/40 rounded-lg border border-gray-700">
              <span className="text-gray-300">5. Modo incógnito detectado</span>
              <div className="flex items-center gap-2">
                {testResults.modoIncognito === null ? (
                  <AlertTriangle className="w-5 h-5 text-gray-400" />
                ) : testResults.modoIncognito ? (
                  <XCircle className="w-5 h-5 text-red-400" />
                ) : (
                  <CheckCircle className="w-5 h-5 text-green-400" />
                )}
                <span className={testResults.modoIncognito ? 'text-red-400' : 'text-green-400'}>
                  {testResults.modoIncognito === null ? 'Verificando...' : testResults.modoIncognito ? 'SÍ (Problema)' : 'NO (OK)'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Datos Actuales */}
        <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-700 rounded-xl p-6 mb-6">
          <h2 className="text-xl font-bold text-white mb-4">Datos Guardados Actualmente</h2>

          <div className="grid grid-cols-3 gap-4">
            <div className="bg-black/40 rounded-lg p-4 border border-purple-600/30">
              <p className="text-sm text-gray-400">Usuarios</p>
              <p className="text-3xl font-bold text-purple-400">{testResults.datosActuales.users}</p>
            </div>
            <div className="bg-black/40 rounded-lg p-4 border border-blue-600/30">
              <p className="text-sm text-gray-400">Integrantes</p>
              <p className="text-3xl font-bold text-blue-400">{testResults.datosActuales.members}</p>
            </div>
            <div className="bg-black/40 rounded-lg p-4 border border-green-600/30">
              <p className="text-sm text-gray-400">Asistencias</p>
              <p className="text-3xl font-bold text-green-400">{testResults.datosActuales.attendances}</p>
            </div>
          </div>
        </div>

        {/* Acciones */}
        <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-700 rounded-xl p-6 mb-6">
          <h2 className="text-xl font-bold text-white mb-4">Acciones</h2>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={ejecutarTests}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg flex items-center gap-2 transition-all"
            >
              <RefreshCw className="w-4 h-4" />
              Ejecutar Tests de Nuevo
            </button>

            <button
              onClick={resetearDatos}
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-lg transition-all"
            >
              🔄 Resetear Datos
            </button>

            <button
              onClick={() => location.reload()}
              className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-lg transition-all"
            >
              ↻ Recargar Página
            </button>
          </div>
        </div>

        {/* Diagnóstico */}
        {(testResults.escritura === false || testResults.lectura === false || testResults.modoIncognito === true) && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6">
            <h2 className="text-xl font-bold text-red-400 mb-4">⚠️ Problemas Detectados</h2>

            <div className="space-y-3 text-sm text-gray-300">
              {testResults.modoIncognito && (
                <div className="bg-black/40 p-3 rounded-lg">
                  <p className="font-bold text-red-400 mb-1">🕵️ Modo Incógnito Detectado</p>
                  <p>Estás navegando en modo privado/incógnito. Los datos se borrarán al cerrar la pestaña.</p>
                  <p className="mt-2 text-yellow-400">✅ Solución: Abre el sitio en una ventana normal del navegador.</p>
                </div>
              )}

              {(testResults.escritura === false || testResults.lectura === false) && (
                <div className="bg-black/40 p-3 rounded-lg">
                  <p className="font-bold text-red-400 mb-1">🚫 LocalStorage Bloqueado</p>
                  <p>El navegador está bloqueando el acceso a localStorage.</p>
                  <p className="mt-2 text-yellow-400">✅ Solución: Verifica la configuración de cookies y privacidad del navegador.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Instrucciones */}
        <div className="bg-gradient-to-br from-gray-900 to-black border border-yellow-600/30 rounded-xl p-6">
          <h2 className="text-xl font-bold text-yellow-400 mb-4">📖 Instrucciones</h2>

          <ol className="space-y-2 text-sm text-gray-300">
            <li>1. Revisa los resultados de las pruebas arriba</li>
            <li>2. Si todos los tests están ✅ OK, localStorage funciona correctamente</li>
            <li>3. Si hay ❌ ERROR, sigue las soluciones sugeridas</li>
            <li>4. Después de hacer cambios, haz clic en "Ejecutar Tests de Nuevo"</li>
            <li>5. Si el problema persiste, lee el archivo <code className="bg-black/60 px-2 py-1 rounded text-yellow-400">SOLUCION_DATOS_SE_BORRAN.md</code></li>
          </ol>
        </div>
      </div>
    </div>
  );
}
