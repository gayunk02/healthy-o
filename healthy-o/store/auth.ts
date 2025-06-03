import { create } from 'zustand';

interface AuthState {
  isLoggedIn: boolean;
  token: string | null;
  user: any | null;
  setLoggedIn: (token: string, user: any) => void;
  setLoggedOut: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  token: null,
  user: null,

  setLoggedIn: (token, user) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    set({ isLoggedIn: true, token, user });
  },

  setLoggedOut: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    set({ isLoggedIn: false, token: null, user: null });
  }
})); 