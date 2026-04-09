export default function Loading() {
  return (
    <div className="bg-surface flex h-screen w-full items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="border-primary h-8 w-8 animate-spin rounded-full border-4 border-t-transparent"></div>
        <p className="text-on-surface-variant text-sm font-medium">
          Cargando...
        </p>
      </div>
    </div>
  );
}
