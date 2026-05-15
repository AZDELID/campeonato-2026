import { useState } from 'react';

export function DiagnosticoStorage() {
  const [output, setOutput] = useState('');

  const verificarStorage = () => {
    let resultado = '🔍 DIAGNÓSTICO DE LOCALSTORAGE\n\n';

    try {
      // Test de escritura/lectura
      localStorage.setItem('test', 'funciona');
      const test = localStorage.getItem('test');
      localStorage.removeItem('test');

      if (test === 'funciona') {
        resultado += '✅ LocalStorage funciona correctamente\n\n';
      } else {
        resultado += '❌ LocalStorage NO funciona\n\n';
        setOutput(resultado);
        return;
      }

      // Verificar datos existentes
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const members = JSON.parse(localStorage.getItem('members') || '[]');
      const attendances = JSON.parse(localStorage.getItem('attendances') || '[]');
      const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');

      resultado += '📊 USUARIOS DEL SISTEMA:\n';
      resultado += `Total: ${users.length}\n`;
      users.forEach((u: any) => {
        resultado += `  - ${u.username} (${u.role}) ${u.discipline ? '→ ' + u.discipline : ''}\n`;
      });

      resultado += '\n👤 USUARIO ACTUAL:\n';
      if (currentUser) {
        resultado += `  Usuario: ${currentUser.username}\n`;
        resultado += `  Rol: ${currentUser.role}\n`;
        resultado += `  Disciplina: ${currentUser.discipline || 'N/A'}\n`;
      } else {
        resultado += '  No hay sesión activa\n';
      }

      resultado += '\n👥 INTEGRANTES:\n';
      resultado += `Total: ${members.length}\n`;
      const byDiscipline = members.reduce((acc: any, m: any) => {
        acc[m.discipline] = (acc[m.discipline] || 0) + 1;
        return acc;
      }, {});
      Object.entries(byDiscipline).forEach(([disc, count]) => {
        resultado += `  - ${disc}: ${count}\n`;
      });

      resultado += '\n📅 ASISTENCIAS:\n';
      resultado += `Total: ${attendances.length}\n`;

      setOutput(resultado);
    } catch (e: any) {
      resultado += '❌ ERROR: ' + e.message;
      setOutput(resultado);
    }
  };

  const resetearDatos = () => {
    if (!confirm('⚠️ ¿Estás seguro? Esto BORRARÁ TODOS los datos y reseteará a valores iniciales.')) {
      return;
    }

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
    localStorage.setItem('users', JSON.stringify(defaultUsers));

    setOutput('✅ Datos reseteados a valores iniciales\n\nAhora inicia sesión con:\n  Usuario: pablo\n  Contraseña: pablo1');
  };

  const insertarJugadores = async () => {
    try {
      const response = await fetch('/football_players_data.json');
      const footballData = await response.json();

      const existingMembers = JSON.parse(localStorage.getItem('members') || '[]');
      const nonFootballMembers = existingMembers.filter((m: any) => m.discipline !== 'Futbol');
      const allMembers = [...nonFootballMembers, ...footballData];

      localStorage.setItem('members', JSON.stringify(allMembers));

      setOutput(`✅ ${footballData.length} jugadores de Fútbol insertados\n\nTotal integrantes: ${allMembers.length}\n  - Fútbol: ${footballData.length}\n  - Otras: ${nonFootballMembers.length}\n\nRecarga la página para ver los cambios.`);
    } catch (e: any) {
      setOutput('❌ Error al insertar jugadores: ' + e.message);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-br from-red-900/50 to-black border border-red-600/30 rounded-2xl p-6 mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-red-400 mb-4">
            🔧 Panel de Diagnóstico
          </h1>
          <p className="text-gray-400">
            Herramienta para verificar y reparar problemas de almacenamiento de datos
          </p>
        </div>

        <div className="space-y-4">
          <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-700 rounded-xl p-6">
            <h2 className="text-xl font-bold text-yellow-400 mb-4">Acciones</h2>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={verificarStorage}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-all"
              >
                🔍 Verificar Datos
              </button>
              <button
                onClick={resetearDatos}
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-lg transition-all"
              >
                🔄 Resetear Sistema
              </button>
              <button
                onClick={insertarJugadores}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition-all"
              >
                ⚽ Insertar Jugadores Fútbol
              </button>
            </div>
          </div>

          {output && (
            <div className="bg-gradient-to-br from-gray-900 to-black border border-green-600/30 rounded-xl p-6">
              <h2 className="text-xl font-bold text-green-400 mb-4">Resultado</h2>
              <pre className="text-sm text-gray-300 whitespace-pre-wrap font-mono bg-black/40 p-4 rounded-lg border border-gray-700">
                {output}
              </pre>
            </div>
          )}

          <div className="bg-gradient-to-br from-gray-900 to-black border border-purple-600/30 rounded-xl p-6">
            <h2 className="text-xl font-bold text-purple-400 mb-4">Instrucciones</h2>
            <ul className="space-y-2 text-gray-300">
              <li>1. Haz clic en "🔍 Verificar Datos" para ver el estado actual</li>
              <li>2. Si no hay usuarios o datos incorrectos, usa "🔄 Resetear Sistema"</li>
              <li>3. Para insertar los 32 jugadores de Fútbol, usa "⚽ Insertar Jugadores"</li>
              <li>4. Después de cualquier cambio, <strong className="text-yellow-400">recarga la página</strong></li>
              <li>5. Inicia sesión con <code className="bg-black/60 px-2 py-1 rounded">pablo</code> / <code className="bg-black/60 px-2 py-1 rounded">pablo1</code></li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-gray-900 to-black border border-yellow-600/30 rounded-xl p-6">
            <h2 className="text-xl font-bold text-yellow-400 mb-4">⚠️ Importante</h2>
            <p className="text-gray-300 mb-2">
              Para acceder a este panel de diagnóstico desde la app principal:
            </p>
            <ol className="space-y-1 text-gray-400 text-sm">
              <li>1. Ve a la URL: <code className="bg-black/60 px-2 py-1 rounded text-yellow-400">/diagnostico</code></li>
              <li>2. O agrega el link en el footer de la página principal</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
