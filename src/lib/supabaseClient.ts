"use client";

import { clientEnv } from "./clientEnv";

let _actualSupabase: any = null;
let _supabaseProxy: any = null;

export function getSupabaseClient() {
  if (typeof window === "undefined") {
    // Retornar un mock/placeholder seguro para SSR
    return {} as any;
  }

  if (!_supabaseProxy) {
    _supabaseProxy = new Proxy(
      {},
      {
        get(target, prop, receiver) {
          if (!_actualSupabase) {
            // Si se accede a alguna propiedad antes de cargar la librería,
            // interceptamos para evitar crashes.
            if (prop === "auth") {
              return new Proxy(
                {},
                {
                  get(t, p) {
                    return (...args: any[]) => {
                      if (_actualSupabase) {
                        return _actualSupabase.auth[p](...args);
                      }
                      console.warn(
                        `Supabase auth.${String(p)} called before initialization!`
                      );
                      return Promise.resolve({
                        data: { session: null, user: null },
                        error: null,
                      });
                    };
                  },
                }
              );
            }
            if (prop === "from") {
              return (...args: any[]) => {
                return new Proxy(
                  {},
                  {
                    get(t, p) {
                      return (...a: any[]) => {
                        if (_actualSupabase) {
                          return _actualSupabase.from(...args)[p](...a);
                        }
                        console.warn(
                          `Supabase from().${String(p)} called before initialization!`
                        );
                        return Promise.resolve({ data: [], error: null });
                      };
                    },
                  }
                );
              };
            }
            return (...args: any[]) => {
              if (_actualSupabase) {
                return typeof _actualSupabase[prop] === "function"
                  ? _actualSupabase[prop](...args)
                  : _actualSupabase[prop];
              }
              console.warn(
                `Supabase method ${String(prop)} called before initialization!`
              );
              return Promise.resolve({ data: null, error: null });
            };
          }
          return Reflect.get(_actualSupabase, prop, receiver);
        },
      }
    );

    // Carga diferida de Supabase en paralelo sin bloquear el rendering inicial
    import("@supabase/ssr")
      .then(({ createBrowserClient }) => {
        _actualSupabase = createBrowserClient(
          clientEnv.NEXT_PUBLIC_SUPABASE_URL,
          clientEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY
        );
      })
      .catch((err) => {
        console.error("Failed to load Supabase dynamically:", err);
      });
  }

  return _supabaseProxy;
}
