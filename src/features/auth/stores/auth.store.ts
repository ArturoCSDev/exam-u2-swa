import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { User, AuthResponse, AuthState } from '../types/auth.types';

// Usuario admin predefinido
const ADMIN_USER = {
  id: 'admin-001',
  email: 'admin@nutrizone.com',
  password: '@adminNutrizone',
  name: 'Administrador NutriZone',
  role: 'admin' as const,
  createdAt: new Date().toISOString(),
  avatar: 'https://ui-avatars.com/api/?name=Admin&background=42A7A7&color=fff'
};

const DEFAULT_USERS = [ADMIN_USER];

interface AuthActions {
  login: (credentials: { email: string; password: string }) => Promise<AuthResponse>;
  register: (userData: { name: string; email: string; password: string }) => Promise<AuthResponse>;
  logout: () => void;
  clearError: () => void;
  setLoading: (loading: boolean) => void;
  getUserByEmail: (email: string) => (User & { password: string }) | undefined;
  isEmailTaken: (email: string) => boolean;
}

type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      // Estado inicial
      user: null,
      users: DEFAULT_USERS,
      isAuthenticated: false,
      loading: false,
      error: null,

      // Acciones
      login: async (credentials) => {
        set({ loading: true, error: null });

        try {
          await new Promise(resolve => setTimeout(resolve, 1500));

          const { users } = get();
          const foundUser = users.find(
            u => u.email.toLowerCase() === credentials.email.toLowerCase() && 
                 u.password === credentials.password
          );

          if (!foundUser) {
            const error = 'Email o contraseña incorrectos';
            set({ error, loading: false });
            return { success: false, error };
          }
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { password, ...userWithoutPassword } = foundUser;
          
          set({ 
            user: userWithoutPassword, 
            isAuthenticated: true, 
            loading: false,
            error: null
          });

          return { 
            success: true, 
            user: userWithoutPassword,
            token: `token-${foundUser.id}-${Date.now()}`
          };

        } catch (error) {
          console.error(error);
          const errorMessage = 'Error inesperado durante el login';
          set({ error: errorMessage, loading: false });
          return { success: false, error: errorMessage };
        }
      },

      register: async (userData) => {
        set({ loading: true, error: null });

        try {
          await new Promise(resolve => setTimeout(resolve, 2000));

          const { users, isEmailTaken } = get();

          if (isEmailTaken(userData.email)) {
            const error = 'Este email ya está registrado';
            set({ error, loading: false });
            return { success: false, error };
          }

          const newUser = {
            id: `user-${Date.now()}`,
            email: userData.email.toLowerCase(),
            name: userData.name.trim(),
            password: userData.password,
            role: 'user' as const,
            createdAt: new Date().toISOString(),
            avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.name)}&background=42A7A7&color=fff`
          };

          const updatedUsers = [...users, newUser];
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { password, ...userWithoutPassword } = newUser;
          
          set({ 
            users: updatedUsers,
            user: userWithoutPassword, 
            isAuthenticated: true, 
            loading: false,
            error: null
          });

          return { 
            success: true, 
            user: userWithoutPassword,
            token: `token-${newUser.id}-${Date.now()}`
          };

        } catch (error) {
          console.error(error);
          const errorMessage = 'Error inesperado durante el registro';
          set({ error: errorMessage, loading: false });
          return { success: false, error: errorMessage };
        }
      },

      logout: () => {
        set({ 
          user: null, 
          isAuthenticated: false, 
          error: null 
        });
      },

      clearError: () => {
        set({ error: null });
      },

      setLoading: (loading) => {
        set({ loading });
      },

      getUserByEmail: (email) => {
        const { users } = get();
        return users.find(u => u.email.toLowerCase() === email.toLowerCase());
      },

      isEmailTaken: (email) => {
        const { users } = get();
        return users.some(u => u.email.toLowerCase() === email.toLowerCase());
      },
    }),
    {
      name: 'nutrizone-auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        users: state.users,
        isAuthenticated: state.isAuthenticated,
      }),
      version: 1,
    }
  )
);