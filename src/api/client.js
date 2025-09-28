import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8000",
});

export function setAuth(access) {
  if (access) {
    api.defaults.headers.common.Authorization = `Bearer ${access}`;
  } else {
    delete api.defaults.headers.common.Authorization;
  }
}
