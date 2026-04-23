export default function SettingsPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Sozlamalar</h1>
        <p className="text-sm text-slate-500 mt-1">Ilova sozlamalarini boshqaring.</p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
        <p className="text-slate-400 text-sm text-center py-16">Sozlamalar tez orada qo'shiladi.</p>
      </div>
    </div>
  );
}
