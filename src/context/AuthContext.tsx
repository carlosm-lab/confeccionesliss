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
import type {
  User,
  Session,
  AuthChangeEvent,
  AuthError,
} from "@supabase/supabase-js";
import { clientEnv } from "@/lib/clientEnv";
import { logger } from "@/lib/logger";

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

// Estado por defecto para cuando AuthProvider aún no se ha montado
// (durante la ventana de DeferredProviders antes del primer frame)
const AUTH_GUEST_DEFAULT: AuthContextValue = {
  user: null,
  session: null,
  profile: null,
  isAdmin: false,
  loading: false,
  signInWithGoogle: async () => {},
  signOut: async () => {},
  authModalContext: null,
  showAuthModal: () => {},
  hideAuthModal: () => {},
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const useAuth = (): AuthContextValue => {
  const ctx = useContext(AuthContext);
  // Null-safe: cuando DeferredProviders no ha montado AuthProvider aún,
  // devolvemos el estado guest en lugar de lanzar un error.
  return ctx ?? AUTH_GUEST_DEFAULT;
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
      const { getSupabaseClient } = await import("@/lib/supabaseClient");
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
    let subscription: any = null;

    const initSession = async () => {
      try {
        const { getSupabaseClient } = await import("@/lib/supabaseClient");
        const supabase = getSupabaseClient();

        const {
          data: { session: currentSession },
          error,
        } = await supabase.auth.getSession();

        // Token inválido (expirado, borrado del servidor, o Supabase reiniciado).
        // Limpiamos la sesión local silenciosamente para evitar el bucle de error.
        if (error) {
          const isInvalidToken =
            error.message?.toLowerCase().includes("refresh token") ||
            error.message?.toLowerCase().includes("invalid") ||
            (error as AuthError & { status?: number }).status === 400;

          if (isInvalidToken) {
            logger.warn(
              "Stale refresh token detected — clearing session silently."
            );
            await supabase.auth.signOut({ scope: "local" });
          } else {
            logger.error("Error getting initial session:", error);
          }
          if (mounted) {
            setSession(null);
            setUser(null);
            setProfile(null);
            setIsAdmin(false);
            try {
              sessionStorage.removeItem(PROFILE_CACHE_KEY);
              sessionStorage.removeItem(CACHE_TIME_KEY);
              sessionStorage.removeItem(USER_CACHE_KEY);
            } catch {
              /* ignore */
            }
          }
          return;
        }

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

        // Suscribirse a cambios después de obtener la sesión inicial
        const {
          data: { subscription: sub },
        } = supabase.auth.onAuthStateChange(
          (event: AuthChangeEvent, currentSession: Session | null) => {
            if (!mounted) return;

            if (
              event === "SIGNED_OUT" ||
              (event === "TOKEN_REFRESHED" && !currentSession)
            ) {
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
        subscription = sub;
      } catch (err) {
        // AuthApiError lanzado por supabase-js cuando el refresh falla completamente
        const msg = (err as Error)?.message ?? "";
        const isTokenError =
          msg.toLowerCase().includes("refresh token") ||
          msg.toLowerCase().includes("invalid");

        if (isTokenError) {
          logger.warn(
            "Caught stale refresh token exception — signing out locally."
          );
          try {
            const { getSupabaseClient } = await import("@/lib/supabaseClient");
            const supabase = getSupabaseClient();
            await supabase.auth.signOut({ scope: "local" });
          } catch {
            /* ignore */
          }
          if (mounted) {
            setSession(null);
            setUser(null);
            setProfile(null);
            setIsAdmin(false);
            try {
              sessionStorage.removeItem(PROFILE_CACHE_KEY);
              sessionStorage.removeItem(CACHE_TIME_KEY);
              sessionStorage.removeItem(USER_CACHE_KEY);
            } catch {
              /* ignore */
            }
          }
        } else {
          logger.error("Error getting initial session:", err);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };

    initSession();

    return () => {
      mounted = false;
      if (subscription) subscription.unsubscribe();
    };
  }, []);

  // Effect 2: Fetch perfil reactivo al cambio de user
  // user?.id como dep: solo re-corre cuando el ID cambia (login/logout),
  // no en cada refresco de token (que cambia el objeto user pero no el ID).
  useEffect(() => {
    if (user?.id) {
      fetchProfile(user.id);
    } else if (!user?.id && !loading) {
      setProfile(null);
      setIsAdmin(false);
      setProfileLoading(false);
    }
  }, [user?.id, fetchProfile, loading]);

  const signInWithGoogle = async () => {
    try {
      const { getSupabaseClient } = await import("@/lib/supabaseClient");
      const supabase = getSupabaseClient();
      // Usar URL explícita del env var — evita problemas con window.location.origin
      // y garantiza que coincida exactamente con el allowlist de Supabase.
      const callbackUrl = `${clientEnv.NEXT_PUBLIC_SITE_URL}/auth/callback`;
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
      const { getSupabaseClient } = await import("@/lib/supabaseClient");
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
