"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { signUpAction } from "@/actions/auth";
import { createClient } from "@/lib/supabase/client";
import { GoogleIcon } from "@/components/ui/icons/GoogleIcon";

export default function RegistroPage() {
  const router = useRouter();
  const [passwordValue, setPasswordValue] = useState("");

  const getPasswordStrength = (pw: string) => {
    if (!pw) return { level: 0, label: "", color: "" };
    let score = 0;
    if (pw.length >= 6) score++;
    if (pw.length >= 10) score++;
    if (/[A-Z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;

    if (score <= 2) return { level: 1, label: "Débil", color: "bg-error" };
    if (score <= 3) return { level: 2, label: "Media", color: "bg-amber-500" };
    return { level: 3, label: "Fuerte", color: "bg-green-500" };
  };

  const strength = getPasswordStrength(passwordValue);
  const [authError, setAuthError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAuthError(null);

    const formData = new FormData(e.currentTarget);
    const nombre = formData.get("nombre") as string;
    const apellidos = formData.get("apellidos") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;
    const acceptTerms = formData.get("acceptTerms") as string;

    if (!acceptTerms) {
      setAuthError("Debes aceptar los términos y condiciones.");
      return;
    }

    if (password !== confirmPassword) {
      setAuthError("Las contraseñas no coinciden.");
      return;
    }

    setIsLoading(true);

    const result = await signUpAction({ nombre, apellidos, email, password });

    if (result?.data) {
      router.push("/verificar");
    } else if (result?.serverError) {
      setAuthError(result.serverError);
      setIsLoading(false);
    } else if (result?.validationErrors) {
      setAuthError("Revisa los datos ingresados.");
      setIsLoading(false);
    } else {
      setAuthError("Ocurrió un error inesperado.");
      setIsLoading(false);
    }
  };

  const handleOAuth = async () => {
    setIsLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/callback?next=/onboarding/perfil`,
      },
    });

    if (error) {
      setAuthError(error.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-surface text-on-surface font-body flex min-h-screen flex-col antialiased">
      {/* Header */}
      <header className="bg-surface-container-lowest/85 font-headline sticky top-0 z-50 flex w-full items-center justify-between px-8 py-4 font-bold tracking-tight shadow-sm backdrop-blur-md">
        <Link
          href="/"
          className="text-primary-container text-xl font-extrabold"
        >
          Confecciones Liss
        </Link>
        <Link
          className="text-on-surface-variant hover:text-primary-container font-label text-sm transition-colors"
          href="/login"
        >
          ¿Ya tienes cuenta? Inicia sesión
        </Link>
      </header>

      <main className="flex flex-grow flex-col md:flex-row">
        {/* Left Column (Image & Benefits) */}
        <div className="bg-primary-container text-on-primary relative hidden flex-col justify-between p-12 md:flex md:w-1/2">
          <div className="absolute inset-0 z-0">
            <Image
              width={960}
              height={1080}
              alt="Taller de confección"
              className="h-full w-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDM_1z8gnFt1XKoT38O4NANaFLBop6NTOQOrY_lu3TJtAO9JM5v8MyKszb2lP3yq54PKKG3Q1oWHYW8wOPuoBQXlIskTOl8a6nVwNLNErCuufnNRuSGCUnoEuReUfvYIP107drc1iZ8qohja0_uz7xf3F3xViSlwUajbuRFiMNXkzIjkGqPr7LKriWJAVgUMGtIfDDOB4Ny6e_pCTu_Q9pRGLiq9wTRYoQZGA_8ZV56Id6EeJNDs0qP_M6vxON8wGuarZiyvzBYzJ-t"
            />
            <div className="bg-primary-container/65 absolute inset-0"></div>
          </div>
          <div className="relative z-10 flex h-full flex-col justify-center">
            <div className="mb-12">
              <h1 className="font-headline mb-4 text-4xl font-extrabold tracking-tight">
                Confecciones Liss
              </h1>
              <p className="font-body text-secondary-fixed-dim text-lg">
                Precisión en cada puntada. Calidad para el profesional de la
                salud.
              </p>
            </div>
            <ul className="font-body mb-12 space-y-6">
              <li className="flex items-center space-x-4">
                <span className="material-symbols-outlined text-3xl">
                  favorite
                </span>
                <span className="text-lg">Guarda tus favoritos</span>
              </li>
              <li className="flex items-center space-x-4">
                <span className="material-symbols-outlined text-3xl">
                  local_shipping
                </span>
                <span className="text-lg">Seguimiento de pedidos</span>
              </li>
              <li className="flex items-center space-x-4">
                <span className="material-symbols-outlined text-3xl">
                  styler
                </span>
                <span className="text-lg">
                  Catálogo personalizado según tu institución
                </span>
              </li>
            </ul>
            <div className="mt-auto">
              <p className="text-secondary-fixed-dim mb-4 text-sm">
                ¿Ya tienes cuenta?
              </p>
              <Link
                href="/login"
                className="border-on-primary text-on-primary hover:bg-on-primary hover:text-primary-container font-label inline-block rounded border-2 px-8 py-3 text-sm font-bold tracking-wider uppercase transition-colors"
              >
                Iniciar sesión
              </Link>
            </div>
          </div>
        </div>

        {/* Right Column (Registration Form) */}
        <div className="bg-surface-bright flex w-full items-center justify-center p-8 md:w-1/2 md:p-12">
          <div className="w-full max-w-[400px]">
            <h2 className="font-headline text-primary-container mb-2 text-3xl font-bold tracking-tight">
              Crea tu cuenta
            </h2>
            <p className="font-body text-on-surface-variant mb-8">
              Es rápido y completamente gratis.
            </p>
            {authError && (
              <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">
                {authError}
              </div>
            )}
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="flex gap-4">
                <div className="w-1/2">
                  <label
                    className="font-label text-on-surface-variant mb-2 block text-sm"
                    htmlFor="reg-nombre"
                  >
                    Nombre
                  </label>
                  <input
                    className="bg-surface-container-low focus:bg-surface-container-highest focus:border-primary text-on-surface w-full rounded border-b-2 border-none border-transparent p-3 transition-all focus:ring-0"
                    id="reg-nombre"
                    name="nombre"
                    required
                    type="text"
                  />
                </div>
                <div className="w-1/2">
                  <label
                    className="font-label text-on-surface-variant mb-2 block text-sm"
                    htmlFor="reg-apellidos"
                  >
                    Apellidos
                  </label>
                  <input
                    className="bg-surface-container-low focus:bg-surface-container-highest focus:border-primary text-on-surface w-full rounded border-b-2 border-none border-transparent p-3 transition-all focus:ring-0"
                    id="reg-apellidos"
                    name="apellidos"
                    required
                    type="text"
                  />
                </div>
              </div>
              <div>
                <label
                  className="font-label text-on-surface-variant mb-2 block text-sm"
                  htmlFor="reg-email"
                >
                  Correo electrónico
                </label>
                <input
                  className="bg-surface-container-low focus:bg-surface-container-highest focus:border-primary text-on-surface w-full rounded border-b-2 border-none border-transparent p-3 transition-all focus:ring-0"
                  id="reg-email"
                  name="email"
                  required
                  type="email"
                />
              </div>
              <div>
                <label
                  className="font-label text-on-surface-variant mb-2 block text-sm"
                  htmlFor="reg-password"
                >
                  Contraseña
                </label>
                <input
                  className="bg-surface-container-low focus:bg-surface-container-highest focus:border-primary text-on-surface mb-2 w-full rounded border-b-2 border-none border-transparent p-3 transition-all focus:ring-0"
                  id="reg-password"
                  name="password"
                  required
                  type="password"
                  minLength={6}
                  value={passwordValue}
                  onChange={(e) => setPasswordValue(e.target.value)}
                />
                {passwordValue && (
                  <>
                    <div className="flex h-1 w-full space-x-1">
                      <div
                        className={`w-1/3 rounded-l ${strength.level >= 1 ? strength.color : "bg-surface-variant"}`}
                      ></div>
                      <div
                        className={`w-1/3 ${strength.level >= 2 ? strength.color : "bg-surface-variant"}`}
                      ></div>
                      <div
                        className={`w-1/3 rounded-r ${strength.level >= 3 ? strength.color : "bg-surface-variant"}`}
                      ></div>
                    </div>
                    <p className="text-on-surface-variant mt-1 text-right text-xs">
                      {strength.label}
                    </p>
                  </>
                )}
              </div>
              <div>
                <label
                  className="font-label text-on-surface-variant mb-2 block text-sm"
                  htmlFor="reg-confirmPassword"
                >
                  Confirmar contraseña
                </label>
                <input
                  className="bg-surface-container-low focus:bg-surface-container-highest focus:border-primary text-on-surface w-full rounded border-b-2 border-none border-transparent p-3 transition-all focus:ring-0"
                  id="reg-confirmPassword"
                  name="confirmPassword"
                  required
                  type="password"
                  minLength={6}
                />
              </div>
              <div className="space-y-3">
                <label className="group flex cursor-pointer items-start space-x-3">
                  <input
                    className="form-checkbox text-primary-container border-outline-variant focus:ring-primary-container mt-1 h-5 w-5 rounded"
                    required
                    name="acceptTerms"
                    type="checkbox"
                  />
                  <span className="font-body text-on-surface-variant group-hover:text-on-surface text-sm transition-colors">
                    Acepto los{" "}
                    <Link
                      className="text-primary-container hover:underline"
                      href="/legal?tab=terminos"
                    >
                      Términos de uso
                    </Link>{" "}
                    y{" "}
                    <Link
                      className="text-primary-container hover:underline"
                      href="/legal"
                    >
                      Política de privacidad
                    </Link>
                  </span>
                </label>
                <label className="group flex cursor-pointer items-start space-x-3">
                  <input
                    className="form-checkbox text-primary-container border-outline-variant focus:ring-primary-container mt-1 h-5 w-5 rounded"
                    name="receiveNews"
                    type="checkbox"
                  />
                  <span className="font-body text-on-surface-variant group-hover:text-on-surface text-sm transition-colors">
                    Quiero recibir novedades y promociones
                  </span>
                </label>
              </div>
              <button
                className="bg-primary-container text-on-primary font-label hover:bg-primary mt-4 w-full rounded py-3 text-center text-sm font-bold tracking-wider uppercase transition-colors disabled:opacity-50"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Creando cuenta..." : "Crear cuenta"}
              </button>
              <div className="relative flex items-center py-5">
                <div className="border-surface-variant flex-grow border-t"></div>
                <span className="text-on-surface-variant font-body mx-4 flex-shrink-0 text-sm">
                  o continúa con
                </span>
                <div className="border-surface-variant flex-grow border-t"></div>
              </div>
              <button
                className="bg-surface-container-lowest border-outline-variant text-on-surface font-label hover:bg-surface-container-low flex w-full items-center justify-center space-x-3 rounded border py-3 font-bold transition-colors disabled:opacity-50"
                type="button"
                onClick={handleOAuth}
                disabled={isLoading}
              >
                <GoogleIcon />
                <span>Continuar con Google</span>
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
