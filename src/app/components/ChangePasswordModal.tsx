import { useState } from 'react';
import { X, Lock, Key } from 'lucide-react';
import { useAuthSupabase as useAuth } from '../hooks/useAuthSupabase';

interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  username: string;
  isFirstLogin?: boolean;
}

export function ChangePasswordModal({ isOpen, onClose, username, isFirstLogin = false }: ChangePasswordModalProps) {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const { changePassword } = useAuth();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (newPassword.length < 4) {
      setError('La contraseña debe tener al menos 4 caracteres');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    await changePassword(username, newPassword);
    setNewPassword('');
    setConfirmPassword('');
    onClose();
  };

  const handleCancel = () => {
    if (!isFirstLogin) {
      setNewPassword('');
      setConfirmPassword('');
      setError('');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-gray-900 to-black border border-yellow-600/30 rounded-2xl p-8 max-w-md w-full shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-yellow-400 flex items-center gap-2">
            <Key className="w-6 h-6" />
            {isFirstLogin ? 'Cambiar Contraseña Obligatorio' : 'Cambiar Contraseña'}
          </h2>
          {!isFirstLogin && (
            <button
              onClick={handleCancel}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          )}
        </div>

        {isFirstLogin && (
          <div className="bg-yellow-500/20 border border-yellow-500/50 rounded-lg p-4 mb-6">
            <p className="text-yellow-400 text-sm">
              Es tu primer ingreso. Debes cambiar tu contraseña para continuar.
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-300 mb-2 text-sm font-medium">
              Usuario
            </label>
            <div className="relative">
              <input
                type="text"
                value={username}
                disabled
                className="w-full bg-black/40 border border-gray-700 rounded-lg py-3 px-4 text-gray-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-300 mb-2 text-sm font-medium">
              Nueva Contraseña
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full bg-black/40 border border-gray-700 rounded-lg py-3 pl-11 pr-4 text-white focus:outline-none focus:border-yellow-500 transition-colors"
                placeholder="Ingresa tu nueva contraseña"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-300 mb-2 text-sm font-medium">
              Confirmar Contraseña
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-black/40 border border-gray-700 rounded-lg py-3 pl-11 pr-4 text-white focus:outline-none focus:border-yellow-500 transition-colors"
                placeholder="Confirma tu nueva contraseña"
                required
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 text-red-400 text-sm">
              {error}
            </div>
          )}

          <div className="flex gap-3">
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-bold py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-yellow-500/50 active:scale-95"
            >
              Cambiar Contraseña
            </button>
            {!isFirstLogin && (
              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 rounded-lg transition-all duration-300 active:scale-95"
              >
                Cancelar
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
