import { api } from "./axios"

export const getProducts = async () => {
  const res = await api.get("/products")
  return res.data
}

export const getProductId = async (productId) => {
  const res = await api.get(`/products/${productId}`)
  return res.data
}