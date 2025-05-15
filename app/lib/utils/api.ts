import axios from "axios";

const api = axios.create({
  baseURL: process.env.BASE_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default api;
