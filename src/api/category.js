import { api } from "./axios";

export const getCategories = async () => {
  const res = await api.get('/categories');
  return res.data
}

export const createCategory = async (title) => {
  const res = await api.post("/categories/create", { title })
  return res.data
}