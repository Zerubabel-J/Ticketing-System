import axios from "axios";

// Set the base URL from environment variables
const baseURL =
  import.meta.env.VITE_API_BASE_URL ||
  "https://ticketing-system-g1mw.onrender.com/api";
console.log("Base env", import.meta.env);
console.log("Base urlllll", baseURL);
// Create an Axios instance with default configurations
const apiConfig = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to include the token in every request
apiConfig.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiConfig;
