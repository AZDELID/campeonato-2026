import { useState, useEffect, createContext, useContext, ReactNode } from 'react';

export interface User {
  username: string;
  role: 'super_admin' | 'admin' | 'super_user';
  discipline?: string;
  needsPasswordChange?: boolean;
}

export interface StoredUser {
  username: string;
  password: string;
  role: 'super_admin' | 'admin' | 'super_user';
  discipline?: string;
  firstLogin: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => { success: boolean; needsPasswordChange?: boolean };
  logout: () => void;
  changePassword: (username: string, newPassword: string) => void;
  getAllUsers: () => StoredUser[];
  updateUserPassword: (username: string, newPassword: string) => void;
  deleteUser: (username: string) => { success: boolean; message?: string };
  register: (username: string, password: string, discipline: string) => { success: boolean; message?: string };
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const defaultUsers: StoredUser[] = [
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

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const getStoredUsers = (): StoredUser[] => {
    const stored = localStorage.getItem('users');
    if (stored) {
      return JSON.parse(stored);
    }
    localStorage.setItem('users', JSON.stringify(defaultUsers));
    return defaultUsers;
  };

  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (username: string, password: string): { success: boolean; needsPasswordChange?: boolean } => {
    const users = getStoredUsers();
    const foundUser = users.find(
      u => u.username === username && u.password === password
    );

    if (foundUser) {
      const userSession: User = {
        username: foundUser.username,
        role: foundUser.role,
        discipline: foundUser.discipline,
        needsPasswordChange: foundUser.firstLogin
      };
      setUser(userSession);
      localStorage.setItem('currentUser', JSON.stringify(userSession));

      return {
        success: true,
        needsPasswordChange: foundUser.firstLogin
      };
    }
    return { success: false };
  };

  const changePassword = (username: string, newPassword: string) => {
    const users = getStoredUsers();
    const updatedUsers = users.map(u =>
      u.username === username
        ? { ...u, password: newPassword, firstLogin: false }
        : u
    );
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    if (user && user.username === username) {
      const updatedUser = { ...user, needsPasswordChange: false };
      setUser(updatedUser);
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    }
  };

  const getAllUsers = (): StoredUser[] => {
    return getStoredUsers();
  };

  const updateUserPassword = (username: string, newPassword: string) => {
    const users = getStoredUsers();
    const updatedUsers = users.map(u =>
      u.username === username
        ? { ...u, password: newPassword, firstLogin: false }
        : u
    );
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  const deleteUser = (username: string): { success: boolean; message?: string } => {
    const users = getStoredUsers();

    // No permitir eliminar usuarios protegidos
    if (username === 'pablo' || username === 'superadmin') {
      return {
        success: false,
        message: 'No se puede eliminar este usuario protegido'
      };
    }

    // Verificar si el usuario existe
    const userExists = users.find(u => u.username === username);
    if (!userExists) {
      return {
        success: false,
        message: 'Usuario no encontrado'
      };
    }

    // Eliminar usuario
    const updatedUsers = users.filter(u => u.username !== username);
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    return {
      success: true,
      message: 'Usuario eliminado exitosamente'
    };
  };

  const register = (username: string, password: string, discipline: string): { success: boolean; message?: string } => {
    const users = getStoredUsers();

    // Verificar si ya existe un encargado para esta disciplina
    const disciplineExists = users.find(
      u => u.role === 'admin' && u.discipline === discipline
    );

    if (disciplineExists) {
      return {
        success: false,
        message: `Ya existe un encargado registrado para ${discipline}`
      };
    }

    // Verificar si el nombre de usuario ya existe
    const usernameExists = users.find(u => u.username === username);

    if (usernameExists) {
      return {
        success: false,
        message: 'Este nombre de usuario ya está en uso'
      };
    }

    // Crear nuevo usuario
    const newUser: StoredUser = {
      username,
      password,
      role: 'admin',
      discipline,
      firstLogin: false
    };

    const updatedUsers = [...users, newUser];
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    return {
      success: true,
      message: 'Cuenta creada exitosamente'
    };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      changePassword,
      getAllUsers,
      updateUserPassword,
      deleteUser,
      register,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
