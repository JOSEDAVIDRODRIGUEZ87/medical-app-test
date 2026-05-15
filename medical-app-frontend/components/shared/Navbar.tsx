'use client';

import { Bell, Search, User } from 'lucide-react';

export default function Navbar() {
  return (
    <div className="flex items-center justify-between w-full">
      {/* Buscador rápido */}
      <div className="relative w-96 hidden sm:block">
        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
          <Search size={18} />
        </span>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-md leading-5 bg-slate-50 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-1 focus:ring-blue-500 sm:text-sm transition-all"
          placeholder="Buscar pacientes o recetas..."
        />
      </div>

      {/* Acciones de Usuario */}
      <div className="flex items-center gap-4">
        <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors relative">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        
        <div className="h-8 w-px bg-slate-200 mx-2"></div>

        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-slate-800 leading-none">Dr. José Rodríguez</p>
            <p className="text-xs text-slate-500 mt-1">Sistemas & Salud</p>
          </div>
          <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center text-slate-600 border border-slate-300">
            <User size={20} />
          </div>
        </div>
      </div>
    </div>
  );
}