import axios from "axios";

const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://job-application-tracker-4-r95q.onrender.com",
});

client.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default client;
