import axios from "axios";
// const BASE_URL = "https://backend.unitec.edu.ve/api/";
const BASE_URL = "https://localhost:44332/api/";
//
export default axios.create({
  withCredentials: true,
  baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
  withCredentials: true,
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});
