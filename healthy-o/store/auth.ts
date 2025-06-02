import { create } from 'zustand';

interface AuthState {
  isLoggedIn: boolean;
  token: string | null;
  user: any | null;
  setLoggedIn: (token: string, user: any) => void;
  setLoggedOut: () => void;
  checkAuthStatus: () => boolean;
}

export const useAuthStore = create<AuthState>((set, get) => ({
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
  },

  checkAuthStatus: () => {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');
    
    if (token && userStr) {
      try {
        const user = JSON.parse(userStr);
        set({ isLoggedIn: true, token, user });
        return true;
      } catch (error) {
        console.error('Failed to parse user data:', error);
        set({ isLoggedIn: false, token: null, user: null });
        return false;
      }
    }
    
    set({ isLoggedIn: false, token: null, user: null });
    return false;
  }
})); 