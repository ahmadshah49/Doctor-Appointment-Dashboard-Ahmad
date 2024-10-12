import axios from "axios";

export const BASE_URL = "http://localhost:3000";
// export const BASE_URL = "https://doctor-appointment-dashboard-ahmad.vercel.app";
export const axiosInstance = axios.create({
  baseURL: BASE_URL,
});
