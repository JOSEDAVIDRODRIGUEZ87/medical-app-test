'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const registerSchema = z.object({
  name: z.string().min(3, 'El nombre es muy corto'),
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Mínimo 6 caracteres'),
  role: z.enum(['DOCTOR', 'PATIENT']),
  specialty: z.string().optional(),
  historyNumber: z.string().optional(),
}).refine((data) => {
  if (data.role === 'DOCTOR' && !data.specialty) return false;
  if (data.role === 'PATIENT' && !data.historyNumber) return false;
  return true;
}, {
  message: "Faltan campos requeridos para el rol seleccionado",
  path: ["role"],
});

type RegisterInput = z.infer<typeof registerSchema>;

export default function RegisterForm() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: { role: 'PATIENT' }
  });

  const selectedRole = watch('role');

  const onSubmit = (data: RegisterInput) => {
    console.log('Datos para NestJS:', data);
    // Aquí conectas con tu servicio de Axios: authService.register(data)
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="flex gap-4 p-1 bg-slate-100 rounded-lg">
        {['PATIENT', 'DOCTOR'].map((r) => (
          <label key={r} className={`flex-1 text-center py-2 rounded-md cursor-pointer text-sm transition ${selectedRole === r ? 'bg-white shadow-sm font-bold text-blue-600' : 'text-slate-500'}`}>
            <input type="radio" {...register('role')} value={r} className="hidden" />
            {r === 'DOCTOR' ? 'Médico' : 'Paciente'}
          </label>
        ))}
      </div>

      <input {...register('name')} placeholder="Nombre completo" className="w-full p-2 border rounded-md" />
      {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}

      <input {...register('email')} placeholder="Email" className="w-full p-2 border rounded-md" />
      
      <input type="password" {...register('password')} placeholder="Contraseña" className="w-full p-2 border rounded-md" />

      {/* Campos Condicionales */}
      {selectedRole === 'DOCTOR' ? (
        <input {...register('specialty')} placeholder="Especialidad (Ej: Cardiología)" className="w-full p-2 border border-blue-200 rounded-md bg-blue-50" />
      ) : (
        <input {...register('historyNumber')} placeholder="Nº de Historia Clínica" className="w-full p-2 border border-green-200 rounded-md bg-green-50" />
      )}

      <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
        Crear Cuenta
      </button>
    </form>
  );
}