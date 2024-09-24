import { create } from 'zustand';
import axios from 'axios';

export const useAuthStore = create((set) => ({
  user: null,
  error: null,
  isLoading: false,
  token: null,

  register: async (data) => {
    set({ isLoading: true, error: null });

    try {
      const res = await axios.post(
        'http://localhost:5000/api/users/register',
        data
      );

      set({
        user: res.data.user,
        error: null,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response.data.message || 'error',
        isLoading: false,
      });
      throw error;
    }
  },

  login: async (data) => {
    set({ isLoading: true, error: null });

    try {
      const res = await axios.post(
        'http://localhost:5000/api/users/login',
        data
      );

      set({
        user: res.data.user,
        error: null,
        isLoading: false,
        token: res.data.token,
      });
    } catch (error) {
      set({
        error: error.response.data.message || 'error',
        isLoading: false,
      });
      throw error;
    }
  },

  logout: () => {
    set({
      user: null,
      token: null,
    });
  },

  getUserByIdWithReservations: async (id) => {
    set({ isLoading: true, error: null });

    try {
      const res = await axios.get(`http://localhost:5000/api/users/${id}`);
      set({
        isLoading: false,
        error: null,
      });

      return res.data;
    } catch (error) {
      set({
        error: error.response.data.message || 'error',
        isLoading: false,
      });
      throw error;
    }
  },
}));
