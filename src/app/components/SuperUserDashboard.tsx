import { useState, useEffect } from 'react';
import { LogOut, Users, Trash2, Key, Eye, EyeOff, Shield, UserPlus } from 'lucide-react';
import { useAuthSupabase as useAuth } from '../hooks/useAuthSupabase';
import { ChangePasswordModal } from './ChangePasswordModal';
import { insertFootballPlayers } from '../../utils/insertFootballPlayers';
import { SupabaseSetupBanner, SupabaseStatusIndicator } from './SupabaseSetupBanner';

export function SuperUserDashboard() {
  const { user, logout, getAllUsers, deleteUser, updateUserPassword } = useAuth();
  const [users, setUsers] = useState<any[]>([]);
  const [showPasswords, setShowPasswords] = useState<{ [key: string]: boolean }>({});
  const [changingPasswordFor, setChangingPasswordFor] = useState<string | null>(null);

  useEffect(() => {
    const loadUsers = async () => {
      const loadedUsers = await getAllUsers();
      setUsers(loadedUsers);
    };
    loadUsers();
  }, []);

  const handleInsertFootballPlayers = async () => {
    if (confirm('¿Estás seguro de insertar los 32 jugadores de Fútbol?\n\nEsto reemplazará todos los jugadores de Fútbol existentes.')) {
      try {
        const count = await insertFootballPlayers();
        alert(`✅ Se insertaron ${count} jugadores de Fútbol exitosamente.\n\nRecarga la página para ver los cambios.`);
      } catch (error) {
        alert(`❌ Error al insertar jugadores: ${error}`);
      }
    }
  };

  const refreshUsers = async () => {
    const loadedUsers = await getAllUsers();
    setUsers(loadedUsers);
  };

  const handleDeleteUser = async (username: string) => {
    if (confirm(`¿Estás seguro de eliminar el usuario "${username}"?\n\nEsta acción no se puede deshacer.`)) {
      const result = await deleteUser(username);
      if (result.success) {
        alert('✅ Usuario eliminado exitosamente');
        await refreshUsers();
      } else {
        alert(`❌ Error: ${result.message}`);
      }
    }
  };

  const togglePasswordVisibility = (username: string) => {
    setShowPasswords(prev => ({
      ...prev,
      [username]: !prev[username]
    }));
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'super_user':
        return <span className="bg-purple-500/20 text-purple-400 border border-purple-500/50 px-3 py-1 rounded-full text-xs font-semibold">🟣 Super Usuario</span>;
      case 'super_admin':
        return <span className="bg-yellow-500/20 text-yellow-400 border border-yellow-500/50 px-3 py-1 rounded-full text-xs font-semibold">🟡 Super Admin</span>;
      case 'admin':
        return <span className="bg-blue-500/20 text-blue-400 border border-blue-500/50 px-3 py-1 rounded-full text-xs font-semibold">🔵 Administrador</span>;
      default:
        return <span className="bg-gray-500/20 text-gray-400 border border-gray-500/50 px-3 py-1 rounded-full text-xs font-semibold">Usuario</span>;
    }
  };

  const handlePasswordChangeComplete = () => {
    setChangingPasswordFor(null);
    refreshUsers();
  };

  return (
    <>
      {changingPasswordFor && (
        <ChangePasswordModal
          isOpen={true}
          onClose={handlePasswordChangeComplete}
          username={changingPasswordFor}
          isFirstLogin={false}
        />
      )}

      <div className="min-h-screen bg-black text-white p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          {/* Supabase Status Indicator */}
          <SupabaseStatusIndicator />

          {/* Header */}
          <div className="bg-gradient-to-br from-purple-900/50 to-black border border-purple-600/30 rounded-2xl p-6 mb-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-purple-400 flex items-center gap-2">
                  <Shield className="w-8 h-8" />
                  Panel de Super Usuario
                </h1>
                <p className="text-gray-400 mt-1">
                  Usuario: <span className="text-purple-400 font-semibold">{user?.username}</span>
                </p>
              </div>
              <button
                onClick={logout}
                className="bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 text-red-400 px-4 py-2 rounded-lg flex items-center gap-2 transition-all"
              >
                <LogOut className="w-4 h-4" />
                Salir
              </button>
            </div>
          </div>

          {/* Supabase Setup Banner */}
          <SupabaseSetupBanner />

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-gradient-to-br from-gray-900 to-black border border-purple-600/30 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <Users className="w-8 h-8 text-purple-400" />
                <div>
                  <p className="text-gray-400 text-sm">Total Usuarios</p>
                  <p className="text-2xl font-bold text-white">{users.length}</p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-gray-900 to-black border border-blue-600/30 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <Shield className="w-8 h-8 text-blue-400" />
                <div>
                  <p className="text-gray-400 text-sm">Administradores</p>
                  <p className="text-2xl font-bold text-white">
                    {users.filter(u => u.role === 'admin').length}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-gray-900 to-black border border-yellow-600/30 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <Key className="w-8 h-8 text-yellow-400" />
                <div>
                  <p className="text-gray-400 text-sm">Primer Login</p>
                  <p className="text-2xl font-bold text-white">
                    {users.filter(u => u.firstLogin).length}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Users List */}
          <div className="bg-gradient-to-br from-gray-900 to-black border border-purple-600/30 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-purple-400 mb-6 flex items-center gap-2">
              <Users className="w-6 h-6" />
              Gestión de Usuarios
            </h2>

            <div className="space-y-4">
              {users.map((userData) => (
                <div
                  key={userData.username}
                  className="bg-black/40 border border-gray-700 rounded-xl p-5 hover:border-purple-600/50 transition-all"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    {/* User Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-bold text-white">{userData.username}</h3>
                        {getRoleBadge(userData.role)}
                        {userData.firstLogin && (
                          <span className="bg-orange-500/20 text-orange-400 border border-orange-500/50 px-2 py-1 rounded text-xs font-semibold">
                            🟠 Primer Login
                          </span>
                        )}
                      </div>

                      {userData.discipline && (
                        <p className="text-sm text-gray-400 mb-2">
                          Disciplina: <span className="text-blue-400">{userData.discipline}</span>
                        </p>
                      )}

                      {/* Password Display */}
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-400">Contraseña:</span>
                        <code className="bg-black/60 border border-gray-600 px-3 py-1 rounded text-sm font-mono text-yellow-400">
                          {showPasswords[userData.username] ? userData.password : '••••••••'}
                        </code>
                        <button
                          onClick={() => togglePasswordVisibility(userData.username)}
                          className="text-gray-400 hover:text-white transition-colors p-1"
                          title={showPasswords[userData.username] ? 'Ocultar' : 'Mostrar'}
                        >
                          {showPasswords[userData.username] ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => setChangingPasswordFor(userData.username)}
                        className="bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/50 text-blue-400 px-3 py-2 rounded-lg flex items-center gap-2 transition-all text-sm"
                        title="Cambiar contraseña"
                      >
                        <Key className="w-4 h-4" />
                        <span>Cambiar Contraseña</span>
                      </button>

                      {userData.username !== 'pablo' && userData.username !== 'superadmin' ? (
                        <button
                          onClick={() => handleDeleteUser(userData.username)}
                          className="bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 text-red-400 px-3 py-2 rounded-lg flex items-center gap-2 transition-all text-sm hover:bg-red-500/40"
                          title="Eliminar usuario"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span>Eliminar</span>
                        </button>
                      ) : (
                        <div className="bg-gray-700/20 border border-gray-600/50 text-gray-500 px-3 py-2 rounded-lg flex items-center gap-2 text-sm">
                          <Shield className="w-4 h-4" />
                          <span>Protegido</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Info */}
          <div className="mt-6 space-y-4">
            {/* Insert Football Players Button */}
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-green-300 font-semibold">
                    ⚽ Insertar Jugadores de Fútbol
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Carga los 32 jugadores iniciales del equipo de Fútbol (reemplaza existentes)
                  </p>
                </div>
                <button
                  onClick={handleInsertFootballPlayers}
                  className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-2 px-4 rounded-lg flex items-center gap-2 transition-all whitespace-nowrap"
                >
                  <UserPlus className="w-5 h-5" />
                  Insertar Jugadores
                </button>
              </div>
            </div>

            {/* Warning */}
            <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-4">
              <p className="text-sm text-purple-300 text-center">
                ⚠️ Ten cuidado al eliminar usuarios. Esta acción no se puede deshacer.
              </p>
              <p className="text-xs text-gray-500 text-center mt-2">
                Los usuarios "pablo" y "superadmin" están protegidos y no se pueden eliminar.
              </p>
            </div>

            {/* Diagnostic Link */}
            <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-3 text-center">
              <a
                href="#diagnostico"
                onClick={(e) => {
                  e.preventDefault();
                  const DiagnosticoStorage = require('./DiagnosticoStorage').DiagnosticoStorage;
                  // This is a placeholder - the actual implementation would need routing
                }}
                className="text-xs text-gray-500 hover:text-gray-400 transition-colors"
              >
                🔧 Panel de Diagnóstico (si hay problemas con los datos)
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
