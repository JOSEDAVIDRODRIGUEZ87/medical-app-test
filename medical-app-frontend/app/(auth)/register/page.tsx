'use client';

import Link from 'next/link';

export default function RegisterPage() {
  return (
    <form className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <button type="button" className="p-3 border-2 border-blue-100 rounded-lg hover:border-blue-500 text-sm">Soy Doctor</button>
        <button type="button" className="p-3 border-2 border-blue-100 rounded-lg hover:border-blue-500 text-sm">Soy Paciente</button>
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700">Nombre Completo</label>
        <input type="text" className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md" />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700">Email</label>
        <input type="email" className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md" />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700">Contraseña</label>
        <input type="password" className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md" />
      </div>
      <button className="w-full py-2 px-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg">
        Crear Cuenta
      </button>
      <p className="text-center text-sm text-slate-600 mt-4">
        <Link href="/login" className="text-blue-600 hover:underline">Volver al login</Link>
      </p>
    </form>
  );
}