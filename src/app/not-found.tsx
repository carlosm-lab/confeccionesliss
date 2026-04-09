import Link from "next/link";

export default function NotFound() {
  return (
    <div className="bg-surface flex h-screen w-full flex-col items-center justify-center p-4 text-center">
      <h2 className="text-on-surface mb-2 text-4xl text-9xl font-extrabold">
        404
      </h2>
      <p className="text-on-surface-variant mb-6 text-lg font-medium">
        Página no encontrada.
      </p>
      <Link
        href="/"
        className="bg-primary text-on-primary hover:bg-primary-dim rounded-lg px-6 py-2.5 font-medium transition-colors"
      >
        Volver al inicio
      </Link>
    </div>
  );
}
