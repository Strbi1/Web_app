import { create } from 'zustand';
import axios from 'axios';

export const useReservationStore = create((set) => ({
  error: null,
  isLoading: false,

  createReservation: async (data) => {
    set({ isLoading: true, error: null });

    try {
      const res = await axios.post(
        'http://localhost:5000/api/reservations',
        data
      );
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

  getReservations: async () => {
    set({ isLoading: true, error: null });

    try {
      const res = await axios.get('http://localhost:5000/api/reservations');
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

  deleteReservation: async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/reservations/${id}`);
      set({
        isLoading: false,
        error: null,
      });
    } catch (error) {
      set({
        error: error.response.data.message || 'error',
        isLoading: false,
      });
      throw error;
    }
  },
}));