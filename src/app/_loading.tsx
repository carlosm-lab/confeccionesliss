export default function Loading() {
  return (
    <div className="bg-background flex h-screen w-full flex-col items-center justify-center gap-6">
      {/* Branded shimmer bars */}
      <div className="flex w-64 flex-col items-center gap-3">
        <div className="h-2 w-full animate-pulse rounded-full bg-gray-200" />
        <div
          className="h-2 w-5/6 animate-pulse rounded-full bg-gray-200"
          style={{ animationDelay: "150ms" }}
        />
        <div
          className="h-2 w-4/6 animate-pulse rounded-full bg-gray-200"
          style={{ animationDelay: "300ms" }}
        />
      </div>
      <p className="text-muted-foreground text-xs font-medium tracking-widest uppercase opacity-60">
        Confecciones Liss
      </p>
    </div>
  );
}
