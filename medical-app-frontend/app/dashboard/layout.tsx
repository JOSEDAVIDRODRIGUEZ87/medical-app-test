import Sidebar from '@/components/shared/Sidebar';
import Navbar from '@/components/shared/Navbar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-slate-50">
      {/* Menú Lateral Fijo */}
      <aside className="w-64 bg-white border-r border-slate-200 hidden md:block">
        <Sidebar />
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Barra Superior */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center px-6">
          <Navbar />
        </header>

        {/* Contenido Dinámico */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}