import { create } from 'zustand';
import axios from 'axios';

export const useBookStore = create((set) => ({
  books: [],
  searchedBooks: [],
  error: null,
  isLoading: false,

  getBooks: async () => {
    set({ isLoading: true, error: null });

    try {
      const res = await axios.get('http://localhost:5000/api/books');
      set({
        books: res.data,
        searchedBooks: res.data,
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

  searchBooks: async (searchTerm) => {
    set({ isLoading: true, error: null });

    try {
      const res = await axios.get('http://localhost:5000/api/books');

      const allBooks = res.data;
      const search = allBooks.filter((book) => {
        const lowerCaseTerm = searchTerm.toLowerCase();
        return (
          book.title.toLowerCase().includes(lowerCaseTerm) ||
          book.author.toLowerCase().includes(lowerCaseTerm)
        );
      });

      set({
        books: res.data,
        searchedBooks: search,
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

  getBook: async (id) => {
    set({ isLoading: true, error: null });

    try {
      const res = await axios.get(`http://localhost:5000/api/books/${id}`);
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

  updateBookStock: async (id, newStock) => {
    set({ isLoading: true, error: null });

    try {
      const res = await axios.patch(
        `http://localhost:5000/api/books/${id}/stock`,
        {
          new_stock: newStock,
        }
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
}));