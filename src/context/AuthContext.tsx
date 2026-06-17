"use client";
// ──────────────────────────────────────────────────────────────
// CONTEXTO DE AUTENTICACIÓN
// ──────────────────────────────────────────────────────────────
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useRef,
  ReactNode,
} from "react";
import type { User, Session, AuthChangeEvent } from "@supabase/supabase-js";
import { getSupabaseClient } from "@/lib/supabaseClient";
import { logger } from "@/lib/logger";
import { env } from "@/env";

interface Profile {
  id: string;
  role: "admin" | "user";
  email?: string;
}

interface AuthContextValue {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  isAdmin: boolean;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  // ── Auth Modal contextual ─────────────────────────────────────
  // null = cerrado, string = contexto ('cart', 'favorites', 'contact', 'generic')
  authModalContext: string | null;
  showAuthModal: (context?: string) => void;
  hideAuthModal: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

// Cache keys
const PROFILE_CACHE_KEY = "liss_profile";
const USER_CACHE_KEY = "liss_user";
const CACHE_TIME_KEY = "liss_auth_cache_time";
const CACHE_TTL = 3600000; // 1 hora

const checkCacheValidity = (): boolean => {
  try {
    const timestamp = sessionStorage.getItem(CACHE_TIME_KEY);
    if (!timestamp) return false;
    if (Date.now() - parseInt(timestamp, 10) > CACHE_TTL) {
      sessionStorage.removeItem(PROFILE_CACHE_KEY);
      sessionStorage.removeItem(CACHE_TIME_KEY);
      return false;
    }
    return true;
  } catch {
    return false;
  }
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const cached = sessionStorage.getItem(USER_CACHE_KEY);
      return cached ? JSON.parse(cached) : null;
    } catch {
      return null;
    }
  });

  const [session, setSession] = useState<Session | null>(null);

  const [profile, setProfile] = useState<Profile | null>(() => {
    try {
      if (!checkCacheValidity()) return null;
      const cached = sessionStorage.getItem(PROFILE_CACHE_KEY);
      return cached ? JSON.parse(cached) : null;
    } catch {
      return null;
    }
  });

  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    try {
      if (!checkCacheValidity()) return false;
      const cached = sessionStorage.getItem(PROFILE_CACHE_KEY);
      const parsed = cached ? JSON.parse(cached) : null;
      return parsed?.role === "admin";
    } catch {
      return false;
    }
  });

  const [loading, setLoading] = useState<boolean>(() => {
    try {
      return !sessionStorage.getItem(USER_CACHE_KEY);
    } catch {
      return true;
    }
  });

  const [profileLoading, setProfileLoading] = useState<boolean>(() => {
    try {
      return !(
        checkCacheValidity() && sessionStorage.getItem(PROFILE_CACHE_KEY)
      );
    } catch {
      return true;
    }
  });

  const currentUserIdRef = useRef<string | null>(null);

  // ── Auth Modal ──────────────────────────────────────────────────
  const [authModalContext, setAuthModalContext] = useState<string | null>(null);

  const showAuthModal = useCallback((context = "generic") => {
    setAuthModalContext(context);
  }, []);

  const hideAuthModal = useCallback(() => {
    setAuthModalContext(null);
  }, []);

  const fetchProfile = useCallback(async (userId: string) => {
    if (!userId) {
      setProfile(null);
      setIsAdmin(false);
      return;
    }

    currentUserIdRef.current = userId;
    setProfileLoading(true);

    try {
      const supabase = getSupabaseClient();

      // Verificar rol desde JWT app_metadata (sin queries a la BD — sin recursión)
      const {
        data: { session },
      } = await supabase.auth.getSession();
      const jwtRole = session?.user?.app_metadata?.role as string | undefined;

      const { data, error } = await supabase
        .from("profiles")
        .select("id, role, email")
        .eq("id", userId)
        .single();

      if (currentUserIdRef.current !== userId) return;

      if (error) {
        if (error.code !== "PGRST116") {
          logger.warn(
            "Profile DB fetch failed, using JWT role fallback:",
            error.code
          );
        }
        // Fallback: usar rol del JWT si la BD falla
        if (jwtRole) {
          const adminStatus = jwtRole === "admin";
          setProfile({
            id: userId,
            role: adminStatus ? "admin" : "user",
            email: session?.user?.email,
          });
          setIsAdmin(adminStatus);
          try {
            sessionStorage.setItem(
              PROFILE_CACHE_KEY,
              JSON.stringify({
                id: userId,
                role: jwtRole,
                email: session?.user?.email,
              })
            );
            sessionStorage.setItem(CACHE_TIME_KEY, Date.now().toString());
          } catch {
            /* ignore */
          }
        } else {
          setProfile(null);
          setIsAdmin(false);
        }
        return;
      }

      // Usar rol del perfil, con JWT como confirmación secundaria
      const dbRole = data?.role ?? jwtRole ?? "user";
      const adminStatus = dbRole === "admin";
      setProfile({
        ...(data as Profile),
        role: adminStatus ? "admin" : "user",
      });
      setIsAdmin(adminStatus);

      try {
        sessionStorage.setItem(PROFILE_CACHE_KEY, JSON.stringify(data));
        sessionStorage.setItem(CACHE_TIME_KEY, Date.now().toString());
      } catch {
        /* ignore */
      }
    } catch (err) {
      if (currentUserIdRef.current !== userId) return;
      logger.error("Exception fetching profile:", err);
      setProfile(null);
      setIsAdmin(false);
    } finally {
      if (currentUserIdRef.current === userId) {
        setProfileLoading(false);
      }
    }
  }, []);

  // Effect 1: Inicializar sesión + escuchar cambios
  useEffect(() => {
    let mounted = true;
    const supabase = getSupabaseClient();

    const initSession = async () => {
      try {
        const {
          data: { session: currentSession },
        } = await supabase.auth.getSession();
        if (!mounted) return;

        if (currentSession?.user) {
          setSession(currentSession);
          setUser(currentSession.user);
          try {
            sessionStorage.setItem(
              USER_CACHE_KEY,
              JSON.stringify(currentSession.user)
            );
          } catch {
            /* ignore */
          }
        } else {
          setSession(null);
          setUser(null);
          setProfile(null);
          setIsAdmin(false);
          sessionStorage.removeItem(PROFILE_CACHE_KEY);
          sessionStorage.removeItem(CACHE_TIME_KEY);
          sessionStorage.removeItem(USER_CACHE_KEY);
        }
      } catch (err) {
        logger.error("Error getting initial session:", err);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    initSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (event: AuthChangeEvent, currentSession: Session | null) => {
        if (!mounted) return;

        if (event === "SIGNED_OUT") {
          setSession(null);
          setUser(null);
          setProfile(null);
          setIsAdmin(false);
          setLoading(false);
          sessionStorage.removeItem(PROFILE_CACHE_KEY);
          sessionStorage.removeItem(CACHE_TIME_KEY);
          sessionStorage.removeItem(USER_CACHE_KEY);
          return;
        }

        if (currentSession) {
          setSession(currentSession);
          setUser(currentSession.user ?? null);
          if (currentSession.user) {
            try {
              sessionStorage.setItem(
                USER_CACHE_KEY,
                JSON.stringify(currentSession.user)
              );
            } catch {
              /* ignore */
            }
          }
          setLoading(false);
        }
      }
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  // Effect 2: Fetch perfil reactivo al cambio de user
  useEffect(() => {
    if (user?.id) {
      fetchProfile(user.id);
    } else if (user === null && !loading) {
      setProfile(null);
      setIsAdmin(false);
      setProfileLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id, fetchProfile, loading]);

  const signInWithGoogle = async () => {
    try {
      const supabase = getSupabaseClient();
      // Usar URL explícita del env var — evita problemas con window.location.origin
      // y garantiza que coincida exactamente con el allowlist de Supabase.
      const callbackUrl = `${env.NEXT_PUBLIC_SITE_URL}/auth/callback`;
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: callbackUrl,
          // prompt=consent garantiza la pantalla completa de permisos en cada login
          queryParams: { prompt: "consent" },
        },
      });
      if (error) throw error;
    } catch (error) {
      logger.error("Error logging in with Google:", error);
    }
  };

  const signOut = async () => {
    setUser(null);
    setSession(null);
    setProfile(null);
    setIsAdmin(false);
    currentUserIdRef.current = null;

    try {
      sessionStorage.clear();
    } catch {
      /* ignore */
    }

    try {
      const supabase = getSupabaseClient();
      await supabase.auth.signOut();
    } catch (err) {
      logger.warn("signOut failed:", err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        profile,
        isAdmin,
        loading: loading || profileLoading,
        signInWithGoogle,
        signOut,
        authModalContext,
        showAuthModal,
        hideAuthModal,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
