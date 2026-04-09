import Link from "next/link";

export default function NotFound() {
  return (
    <div className="bg-background flex h-screen w-full flex-col items-center justify-center p-4 text-center">
      <h2 className="text-foreground mb-2 text-9xl font-extrabold">404</h2>
      <p className="text-muted-foreground mb-6 text-lg font-medium">
        Página no encontrada.
      </p>
      <Link
        href="/"
        className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg px-6 py-2.5 font-medium transition-colors"
      >
        Volver al inicio
      </Link>
    </div>
  );
}
