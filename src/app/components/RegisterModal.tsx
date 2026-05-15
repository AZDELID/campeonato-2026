import { useState } from 'react';
import { X, Lock, User, UserPlus } from 'lucide-react';
import { useAuthSupabase as useAuth } from '../hooks/useAuthSupabase';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const disciplines = ['Vóley', 'Futbol', 'Ajedrez', 'Drill', 'Básquet', 'Atletismos', 'Karate'];

export function RegisterModal({ isOpen, onClose, onSuccess }: RegisterModalProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [discipline, setDiscipline] = useState('');
  const [error, setError] = useState('');
  const { register } = useAuth();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validaciones
    if (!username || !password || !confirmPassword || !discipline) {
      setError('Todos los campos son obligatorios');
      return;
    }

    if (username.length < 3) {
      setError('El usuario debe tener al menos 3 caracteres');
      return;
    }

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    const result = await register(username, password, discipline);

    if (result.success) {
      setUsername('');
      setPassword('');
      setConfirmPassword('');
      setDiscipline('');
      onSuccess();
    } else {
      setError(result.message || 'Error al crear la cuenta');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-gray-900 to-black border border-yellow-600/30 rounded-2xl p-8 max-w-md w-full shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-yellow-400 flex items-center gap-2">
            <UserPlus className="w-6 h-6" />
            Registrar Encargado
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
              Disciplina
            </label>
            <select
              value={discipline}
              onChange={(e) => setDiscipline(e.target.value)}
              className="w-full bg-black/40 border border-gray-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-yellow-500 transition-colors"
              required
            >
              <option value="">Selecciona tu disciplina</option>
              {disciplines.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

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
                placeholder="Crea tu nombre de usuario"
                required
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">Mínimo 3 caracteres</p>
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
                placeholder="Crea tu contraseña"
                required
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">Mínimo 6 caracteres</p>
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
                placeholder="Confirma tu contraseña"
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
            Crear Cuenta
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-gray-500">
          <p>Solo puede haber un encargado por disciplina</p>
        </div>
      </div>
    </div>
  );
}
