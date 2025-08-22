// src/app/lib/api.ts
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000/api", // 👈 backend
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.error || "Erro inesperado. Tente novamente.";
    return Promise.reject(new Error(message));
  }
);

export default api;
