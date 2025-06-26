import axios from "axios";
import { useAuthStore } from "~/src/store/authStore";

const API = axios.create({
  baseURL: process.env.EXPO_PUBLIC_BACKEND_URL,
});

API.interceptors.request.use(
  async (config) => {
    const token = useAuthStore.getState().token;

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default API;
