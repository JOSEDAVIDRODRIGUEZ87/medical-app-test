export default function PrescriptionsPage() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-slate-800">Recetas Médicas</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700">
          + Nueva Receta
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Paciente</th>
              <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Fecha</th>
              <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Estado</th>
              <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {/* Ejemplo de fila */}
            <tr>
              <td className="px-6 py-4 text-sm text-slate-700 font-medium">Juan Pérez</td>
              <td className="px-6 py-4 text-sm text-slate-500">14 Mayo, 2026</td>
              <td className="px-6 py-4">
                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">Enviada</span>
              </td>
              <td className="px-6 py-4 text-sm">
                <button className="text-blue-600 hover:text-blue-800">Ver detalle</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}