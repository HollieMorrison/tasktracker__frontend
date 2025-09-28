import { create } from "zustand";
import { api, setAuth } from "../api/client";

const REFRESH_KEY = "refresh_token"; // your localStorage key

const getRefresh = () => localStorage.getItem(REFRESH_KEY);
const setRefresh = (t) => localStorage.setItem(REFRESH_KEY, t);
const clearRefresh = () => localStorage.removeItem(REFRESH_KEY);

export const useAuth = create((set, get) => ({
  user: null,
  access: null,
  loading: true,

  // called from Login page
  login: async (username, password) => {
    const { data } = await api.post("/user/login/", { username, password });
    // backend returns { access, refresh, user }
    setRefresh(data.refresh);
    setAuth(data.access);
    set({ access: data.access, user: data.user, loading: false });
  },

  // 1) refresh using token in localStorage, 2) fetch /me, else throw
  ensureSession: async () => {
    const refresh = getRefresh();
    if (!refresh) throw new Error("no refresh");
    const r = await api.post("/user/refresh/", { refresh }); // expects { access } (and maybe { refresh } if rotation on)
    const newAccess = r.data.access;
    setAuth(newAccess);
    if (r.data.refresh) setRefresh(r.data.refresh); // handles ROTATE_REFRESH_TOKENS=True
    const me = await api.get("/user/me/");
    set({ access: newAccess, user: me.data });
    return me.data;
  },

  // boot-time helper; sets loading=false at the end
  hydrate: async () => {
    try {
      await get().ensureSession();
    } catch {
      clearRefresh();
      setAuth(null);
      set({ user: null, access: null });
    } finally {
      set({ loading: false });
    }
  },

  logout: async () => {
    try { await api.post("/user/logout/"); } catch {}
    clearRefresh();
    setAuth(null);
    set({ user: null, access: null });
  },
}));
