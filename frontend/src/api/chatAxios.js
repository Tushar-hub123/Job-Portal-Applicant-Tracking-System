
import axios from "axios";

const CHAT_API = axios.create({
  baseURL:
    import.meta.env.VITE_CHAT_API_URL ||
    "http://localhost:5000/api"
});

CHAT_API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default CHAT_API;
