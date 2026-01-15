import { create } from "zustand";
import { api } from "../api/axios";

export const authStore = create((set) => ({
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuth: false,
  isLoading: false,
  error: null,
  profile: null,

  logout: async () => {
    const refreshToken = localStorage.getItem("refreshToken")
    if (!refreshToken) return

    try {
      await api.post("/auth/logout", { refreshToken })
      localStorage.removeItem("refreshToken")
      set({
        user: null,
        accessToken: null,
        refreshToken: null,
        isAuth: false,
        profile: null,

      })
    } catch (er) {
      console.log(er);
    }
  },

  getProfile: async () => {
    const res = await api.get("/profile")
    set({ profile: res.data })
  },

  login: async (data) => {
    try {
      set({ isLoading: true, error: null, })

      const res = await api.post("auth/login", data)

      set({
        user: res.data.user,
        accessToken: res.data.token.accessToken,
        refreshToken: res.data.token.refreshToken,
        isAuth: true
      })

      localStorage.setItem("accessToken", res.data.token.accessToken)
      localStorage.setItem("refreshToken", res.data.token.refreshToken)
    } catch (err) {
      set({ error: err.response?.data?.message || "Login failed" })
    } finally {
      set({ isLoading: false })
    }
  },

  registr: async (data) => {
    try {
      set({ isLoading: true, error: null, })

      await api.post("/auth/register", data)

    } catch (err) {
      set({ error: err.response?.data?.message || "Registration failed" })
    } finally {
      set({ isLoading: false })
    }
  }
}))