import { NavbarAdmin } from "@/components/layout/NavbarAdmin";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-brand-bg flex min-h-screen flex-col">
      <NavbarAdmin />
      <main className="flex-1">{children}</main>
    </div>
  );
}
