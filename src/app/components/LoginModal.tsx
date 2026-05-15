import { useState } from 'react';
import { X, Lock, User } from 'lucide-react';
import { useAuthSupabase as useAuth } from '../hooks/useAuthSupabase';
import { ChangePasswordModal } from './ChangePasswordModal';
import { RegisterModal } from './RegisterModal';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [loggedUsername, setLoggedUsername] = useState('');
  const { login } = useAuth();

  if (!isOpen && !showPasswordChange && !showRegister) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const result = await login(username, password);
    if (result.success) {
      if (result.needsPasswordChange) {
        setLoggedUsername(username);
        setShowPasswordChange(true);
        setPassword('');
      } else {
        setUsername('');
        setPassword('');
        onClose();
      }
    } else {
      setError('Usuario o contraseña incorrectos');
    }
  };

  const handlePasswordChanged = () => {
    setShowPasswordChange(false);
    setUsername('');
    setLoggedUsername('');
    onClose();
  };

  if (showPasswordChange) {
    return (
      <ChangePasswordModal
        isOpen={showPasswordChange}
        onClose={handlePasswordChanged}
        username={loggedUsername}
        isFirstLogin={true}
      />
    );
  }

  if (showRegister) {
    return (
      <RegisterModal
        isOpen={showRegister}
        onClose={() => setShowRegister(false)}
        onSuccess={() => {
          setShowRegister(false);
          setError('');
          alert('¡Cuenta creada exitosamente! Ahora puedes iniciar sesión.');
        }}
      />
    );
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-gray-900 to-black border border-yellow-600/30 rounded-2xl p-8 max-w-md w-full shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-yellow-400 flex items-center gap-2">
            <Lock className="w-6 h-6" />
            Acceso Administrativo
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-300 mb-2 text-sm font-medium">
              Usuario
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-black/40 border border-gray-700 rounded-lg py-3 pl-11 pr-4 text-white focus:outline-none focus:border-yellow-500 transition-colors"
                placeholder="Ingresa tu usuario"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-300 mb-2 text-sm font-medium">
              Contraseña
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black/40 border border-gray-700 rounded-lg py-3 pl-11 pr-4 text-white focus:outline-none focus:border-yellow-500 transition-colors"
                placeholder="Ingresa tu contraseña"
                required
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 text-red-400 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-bold py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-yellow-500/50 active:scale-95"
          >
            Iniciar Sesión
          </button>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gradient-to-br from-gray-900 to-black text-gray-500">o</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowRegister(true)}
            className="mt-4 w-full bg-black/40 border border-yellow-600/30 hover:border-yellow-600/60 text-yellow-400 font-semibold py-3 rounded-lg transition-all duration-300 hover:bg-black/60"
          >
            Crear Cuenta de Encargado
          </button>
        </div>

        <div className="mt-6 text-center text-xs text-gray-500">
          Solo personal autorizado
        </div>
      </div>
    </div>
  );
}
