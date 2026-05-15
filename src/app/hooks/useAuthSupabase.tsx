import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { supabase, isSupabaseConfigured, DatabaseUser } from '../../lib/supabase';

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
  login: (username: string, password: string) => Promise<{ success: boolean; needsPasswordChange?: boolean }>;
  logout: () => void;
  changePassword: (username: string, newPassword: string) => Promise<void>;
  getAllUsers: () => Promise<StoredUser[]>;
  updateUserPassword: (username: string, newPassword: string) => Promise<void>;
  deleteUser: (username: string) => Promise<{ success: boolean; message?: string }>;
  register: (username: string, password: string, discipline: string) => Promise<{ success: boolean; message?: string }>;
  isAuthenticated: boolean;
  usingSupabase: boolean;
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

export function AuthProviderSupabase({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [usingSupabase, setUsingSupabase] = useState(false);

  useEffect(() => {
    // Verificar si Supabase está configurado
    const configured = isSupabaseConfigured();
    setUsingSupabase(configured);

    // Cargar usuario guardado
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // Funciones para localStorage (fallback)
  const getStoredUsersLocal = (): StoredUser[] => {
    const stored = localStorage.getItem('users');
    if (stored) {
      return JSON.parse(stored);
    }
    localStorage.setItem('users', JSON.stringify(defaultUsers));
    return defaultUsers;
  };

  // Funciones para Supabase
  const getUsersFromSupabase = async (): Promise<StoredUser[]> => {
    const { data, error } = await supabase
      .from('users')
      .select('*');

    if (error) {
      console.error('Error fetching users from Supabase:', error);
      return [];
    }

    return (data as DatabaseUser[]).map(u => ({
      username: u.username,
      password: u.password,
      role: u.role,
      discipline: u.discipline || undefined,
      firstLogin: u.first_login
    }));
  };

  const login = async (username: string, password: string): Promise<{ success: boolean; needsPasswordChange?: boolean }> => {
    if (usingSupabase) {
      // Login con Supabase
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('username', username)
        .eq('password', password)
        .single();

      if (error || !data) {
        return { success: false };
      }

      const foundUser = data as DatabaseUser;
      const userSession: User = {
        username: foundUser.username,
        role: foundUser.role,
        discipline: foundUser.discipline || undefined,
        needsPasswordChange: foundUser.first_login
      };
      setUser(userSession);
      localStorage.setItem('currentUser', JSON.stringify(userSession));

      return {
        success: true,
        needsPasswordChange: foundUser.first_login
      };
    } else {
      // Login con localStorage
      const users = getStoredUsersLocal();
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
    }
  };

  const changePassword = async (username: string, newPassword: string): Promise<void> => {
    if (usingSupabase) {
      await supabase
        .from('users')
        .update({ password: newPassword, first_login: false, updated_at: new Date().toISOString() })
        .eq('username', username);
    } else {
      const users = getStoredUsersLocal();
      const updatedUsers = users.map(u =>
        u.username === username
          ? { ...u, password: newPassword, firstLogin: false }
          : u
      );
      localStorage.setItem('users', JSON.stringify(updatedUsers));
    }

    if (user && user.username === username) {
      const updatedUser = { ...user, needsPasswordChange: false };
      setUser(updatedUser);
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    }
  };

  const getAllUsers = async (): Promise<StoredUser[]> => {
    if (usingSupabase) {
      return await getUsersFromSupabase();
    } else {
      return getStoredUsersLocal();
    }
  };

  const updateUserPassword = async (username: string, newPassword: string): Promise<void> => {
    await changePassword(username, newPassword);
  };

  const deleteUser = async (username: string): Promise<{ success: boolean; message?: string }> => {
    if (username === 'pablo' || username === 'superadmin') {
      return {
        success: false,
        message: 'No se puede eliminar este usuario protegido'
      };
    }

    if (usingSupabase) {
      const { error } = await supabase
        .from('users')
        .delete()
        .eq('username', username);

      if (error) {
        return {
          success: false,
          message: error.message
        };
      }

      return {
        success: true,
        message: 'Usuario eliminado exitosamente'
      };
    } else {
      const users = getStoredUsersLocal();
      const userExists = users.find(u => u.username === username);
      if (!userExists) {
        return {
          success: false,
          message: 'Usuario no encontrado'
        };
      }

      const updatedUsers = users.filter(u => u.username !== username);
      localStorage.setItem('users', JSON.stringify(updatedUsers));

      return {
        success: true,
        message: 'Usuario eliminado exitosamente'
      };
    }
  };

  const register = async (username: string, password: string, discipline: string): Promise<{ success: boolean; message?: string }> => {
    if (usingSupabase) {
      const { data: existing } = await supabase
        .from('users')
        .select('username')
        .eq('username', username)
        .single();

      if (existing) {
        return {
          success: false,
          message: 'El nombre de usuario ya existe'
        };
      }

      const { data: disciplineAdmin } = await supabase
        .from('users')
        .select('username')
        .eq('discipline', discipline)
        .eq('role', 'admin')
        .single();

      if (disciplineAdmin) {
        return {
          success: false,
          message: `Ya existe un encargado para ${discipline}`
        };
      }

      const { error } = await supabase
        .from('users')
        .insert({
          username,
          password,
          role: 'admin',
          discipline,
          first_login: true
        });

      if (error) {
        return {
          success: false,
          message: error.message
        };
      }

      return {
        success: true,
        message: 'Usuario registrado exitosamente'
      };
    } else {
      const users = getStoredUsersLocal();

      if (users.find(u => u.username === username)) {
        return {
          success: false,
          message: 'El nombre de usuario ya existe'
        };
      }

      if (users.find(u => u.discipline === discipline && u.role === 'admin')) {
        return {
          success: false,
          message: `Ya existe un encargado para ${discipline}`
        };
      }

      const newUser: StoredUser = {
        username,
        password,
        role: 'admin',
        discipline,
        firstLogin: true
      };

      const updatedUsers = [...users, newUser];
      localStorage.setItem('users', JSON.stringify(updatedUsers));

      return {
        success: true,
        message: 'Usuario registrado exitosamente'
      };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    changePassword,
    getAllUsers,
    updateUserPassword,
    deleteUser,
    register,
    isAuthenticated: !!user,
    usingSupabase
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthSupabase() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthSupabase must be used within AuthProviderSupabase');
  }
  return context;
}
