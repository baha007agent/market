import { api } from "./axios"

export const getCart = async () => {
  const res = await api.get("/cart")
  return res.data
}

export const addToCart = async (productId) => {
  const res = await api.post("/cart", { productId })
  return res.data
}

export const removeFromCart = async (productId) => {
  const res = await api.delete(`/cart/${productId}`)
  return res.data
}