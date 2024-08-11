import axios from "axios";

export const AxiosInstance = axios.create({
  baseURL: "https://doctor-appointment-dashboard-ahmad-3yr77d2pa.vercel.app",
  headers: {
    "Content-Type": "application/json",
  },
});
