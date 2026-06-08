"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import {
  apiFetch,
  clearAuth,
  getRefreshToken,
  storeAuth,
  subscribeToAuth,
} from "@/lib/api";
import { ApiUser, AuthResult } from "@/types/api";

type AuthContextValue = {
  user: ApiUser | null;
  loading: boolean;
  setSession: (auth: AuthResult) => void;
  refreshUser: () => Promise<ApiUser | null>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<ApiUser | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = useCallback(async () => {
    try {
      const currentUser = await apiFetch<ApiUser>("/api/auth/me");
      setUser(currentUser);
      return currentUser;
    } catch {
      setUser(null);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => void refreshUser(), 0);
    const unsubscribe = subscribeToAuth(() => void refreshUser());
    return () => {
      window.clearTimeout(timer);
      unsubscribe();
    };
  }, [refreshUser]);

  const setSession = useCallback((auth: AuthResult) => {
    storeAuth(auth);
    setUser(auth.user);
    setLoading(false);
  }, []);

  const logout = useCallback(async () => {
    try {
      await apiFetch<void>(
        "/api/auth/logout",
        {
          method: "POST",
          body: JSON.stringify({ refreshToken: getRefreshToken() }),
        },
        false,
      );
    } finally {
      clearAuth();
      setUser(null);
      router.push("/login");
    }
  }, [router]);

  const value = useMemo(
    () => ({ user, loading, setSession, refreshUser, logout }),
    [loading, logout, refreshUser, setSession, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
