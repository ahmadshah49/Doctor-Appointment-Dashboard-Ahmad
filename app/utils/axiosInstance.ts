import axios from "axios";
export const BASE_URL = "https://doctor-appointment-dashboard-ahmad.vercel.app";
export const AxiosInstance = axios.create({
  baseURL: "https://doctor-appointment-dashboard-ahmad.vercel.app",
  headers: {
    "Content-Type": "application/json",
  },
});
