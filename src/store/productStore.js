import { create } from "zustand"
import { api } from "../api/axios"

export const useProductStore = create((set) => ({
  products: [],
  productDetail: [],
  isLoading: false,

  getProducts: async () => {
    set({ isLoading: true })

    const res = await api.get("/products")
    set({ products: res.data, isLoading: false })
  },
  getProductId: async (productId) => {
    set({ isLoading: true })

    const res = await api.get(`/products/${productId}`)
    set({ productDetail: res.data, isLoading: false })
  }
}))