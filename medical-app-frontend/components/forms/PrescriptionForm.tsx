'use client';

import { useForm, useFieldArray } from 'react-hook-form';

export default function PrescriptionForm() {
  const { register, control, handleSubmit } = useForm({
    defaultValues: {
      patientId: '',
      items: [{ medicineName: '', dosage: '' }]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items"
  });

  const onSubmit = (data: any) => console.log('Enviando receta:', data);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-xl border space-y-6">
      <h3 className="font-bold text-lg text-slate-800">Generar Nueva Receta</h3>
      
      <div>
        <label className="text-sm font-medium">Seleccionar Paciente</label>
        <select {...register('patientId')} className="w-full mt-1 p-2 border rounded-md">
          <option value="">Seleccione un paciente...</option>
          <option value="1">Juan Pérez</option>
          <option value="2">Maria Garcia</option>
        </select>
      </div>

      <div className="space-y-4">
        <label className="text-sm font-medium">Medicamentos</label>
        {fields.map((field, index) => (
          <div key={field.id} className="flex gap-2 items-end animate-in fade-in duration-300">
            <div className="flex-1">
              <input 
                {...register(`items.${index}.medicineName` as const)} 
                placeholder="Medicamento" 
                className="w-full p-2 border rounded-md text-sm"
              />
            </div>
            <div className="flex-1">
              <input 
                {...register(`items.${index}.dosage` as const)} 
                placeholder="Dosis (Ej: 500mg cada 8h)" 
                className="w-full p-2 border rounded-md text-sm"
              />
            </div>
            <button 
              type="button" 
              onClick={() => remove(index)}
              className="p-2 text-red-500 hover:bg-red-50 rounded-md"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <button 
        type="button" 
        onClick={() => append({ medicineName: '', dosage: '' })}
        className="text-sm text-blue-600 font-medium hover:underline"
      >
        + Añadir otro medicamento
      </button>

      <div className="pt-4 border-t">
        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded-md font-bold">
          Emitir Receta Médica
        </button>
      </div>
    </form>
  );
}