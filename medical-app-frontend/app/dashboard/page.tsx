export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Panel de Control</h1>
        <p className="text-slate-500">Bienvenido de nuevo a tu gestión médica.</p>
      </div>

      {/* Tarjetas de Resumen (Stats) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Citas Pendientes" value="12" icon="📅" color="bg-blue-500" />
        <StatCard title="Pacientes Atendidos" value="45" icon="👥" color="bg-green-500" />
        <StatCard title="Recetas Emitidas" value="128" icon="📄" color="bg-purple-500" />
      </div>

      {/* Espacio para Tablas o Gráficos */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Actividad Reciente</h2>
        <div className="h-40 flex items-center justify-center border-2 border-dashed border-slate-100 rounded-lg">
          <p className="text-slate-400 text-sm">Aquí aparecerán las últimas recetas o citas...</p>
        </div>
      </div>
    </div>
  );
}

// Componente pequeño interno para las tarjetas
function StatCard({ title, value, icon, color }: any) {
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-4">
      <div className={`w-12 h-12 ${color} text-white rounded-lg flex items-center justify-center text-xl`}>
        {icon}
      </div>
      <div>
        <p className="text-sm text-slate-500 font-medium">{title}</p>
        <p className="text-2xl font-bold text-slate-800">{value}</p>
      </div>
    </div>
  );
}