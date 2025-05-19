import AdminNavigation from "./AdminNavigation";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-[#0a0d14]">
      <Header />
      <div className="flex-grow flex pt-16">
        <AdminNavigation />
        <main className="flex-1 p-8">{children}</main>
      </div>
      <Footer />
    </div>
  );
}
