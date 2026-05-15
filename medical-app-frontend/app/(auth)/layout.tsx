export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg border border-slate-200">
        <div className="flex flex-col items-center mb-8">
          <h1 className="text-2xl font-bold text-blue-600">MedicalApp</h1>
          <p className="text-slate-500 text-sm">Bienvenido al portal médico</p>
        </div>
        {children}
      </div>
    </div>
  );
}