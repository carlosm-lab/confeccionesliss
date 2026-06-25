export default function DisputasLoading() {
  return (
    <div className="mx-auto max-w-4xl space-y-6 px-6 py-24">
      {[...Array(10)].map((_, i) => (
        <div
          key={i}
          className="animate-pulse rounded-lg bg-white/5"
          style={{ height: "1.25rem", width: `${70 + ((i * 7) % 30)}%` }}
        />
      ))}
    </div>
  );
}
