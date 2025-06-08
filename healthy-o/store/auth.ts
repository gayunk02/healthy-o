import { create } from 'zustand';

interface IUser {
  id: number;
  email: string;
  name: string;
  tokenInfo?: {
    name: string;
    email: string;
  };
}

interface AuthState {
  isLoggedIn: boolean;
  token: string | null;
  user: IUser | null;
  setLoggedIn: (token: string, user: IUser) => void;
  setLoggedOut: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  token: null,
  user: null,

  setLoggedIn: (token, user) => {
    if (!user?.name) {
      console.error('[Auth Store] Invalid user data:', user);
      return;
    }

    try {
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      set({ isLoggedIn: true, token, user });
    } catch (error) {
      console.error('[Auth Store] Failed to save auth state:', error);
    }
  },

  setLoggedOut: () => {
    try {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      set({ isLoggedIn: false, token: null, user: null });
    } catch (error) {
      console.error('[Auth Store] Failed to clear auth state:', error);
    }
  }
})); 