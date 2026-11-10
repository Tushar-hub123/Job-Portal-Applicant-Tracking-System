
import axios from "axios";

const CHAT_API = axios.create({
  baseURL: "https://job-portal-applicant-tracking-system.onrender.com/api"
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
