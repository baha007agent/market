import { create } from "zustand";
import { api } from "../api/axios";

export const useCategoryStore = create((set) => ({
  categories: [],
  isloading: false,

  getCategories: async () => {
    set({ isloading: true })

    try {
      const res = await api.get('/categories');
      set({ categories: res.data, isLoading: false });
    } catch (err) {
      console.log(err);
      set({ isloading: false })
    }
  },

  createCategory: async (title) => {
    const res = await api.post("/categories/create", { title })

    set((state) => ({
      categories: [...state.categories, res.data]
    }))
  },
}))