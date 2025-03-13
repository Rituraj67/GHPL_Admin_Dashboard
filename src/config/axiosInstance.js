import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_ADDRESS,
  withCredentials: true, // 👈 This sets it by default for all requests
});

export default axiosInstance;
