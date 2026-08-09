import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

import { localAuth } from "./local-auth";
import type { AuthProviderApi, AuthUser, Credentials, RegisterInput } from "./types";

// Swap this single line for a FastAPI-backed implementation later.
const api: AuthProviderApi = localAuth;

type AuthContextValue = {
  user: AuthUser | null;
  loading: boolean;
  register: (input: RegisterInput) => Promise<AuthUser>;
  login: (input: Credentials) => Promise<AuthUser>;
  logout: () => Promise<void>;
  updateProfile: (patch: Partial<Omit<AuthUser, "id">>) => Promise<AuthUser>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    api
      .getCurrentUser()
      .then((u) => active && setUser(u))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, []);

  const register = useCallback(async (input: RegisterInput) => {
    const u = await api.register(input);
    setUser(u);
    return u;
  }, []);

  const login = useCallback(async (input: Credentials) => {
    const u = await api.login(input);
    setUser(u);
    return u;
  }, []);

  const logout = useCallback(async () => {
    await api.logout();
    setUser(null);
  }, []);

  const updateProfile = useCallback(async (patch: Partial<Omit<AuthUser, "id">>) => {
    const u = await api.updateProfile(patch);
    setUser(u);
    return u;
  }, []);

  const value = useMemo(
    () => ({ user, loading, register, login, logout, updateProfile }),
    [user, loading, register, login, logout, updateProfile],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
  return ctx;
}
