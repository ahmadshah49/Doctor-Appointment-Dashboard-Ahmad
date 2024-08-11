import axios from "axios";
export const BASE_URL =
  "https://doctor-appointment-dashboard-ahmad-422z5jreq.vercel.app";
export const AxiosInstance = axios.create({
  baseURL: "https://doctor-appointment-dashboard-ahmad-3yr77d2pa.vercel.app",
  headers: {
    "Content-Type": "application/json",
  },
});
