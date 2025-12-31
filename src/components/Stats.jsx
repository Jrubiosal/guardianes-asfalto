import { BarChart3, MapPin, Cloud } from 'lucide-react';

export default function Stats({ t, allRoutes, userRoutes, totalKm }) {
    return (
        <section className="flex gap-4 overflow-x-auto no-scrollbar -mx-4 px-4">
            <div className="min-w-[150px] bg-[#1a1d23] p-5 rounded-3xl border border-slate-800 shadow-xl">
                <BarChart3 size={20} className="text-orange-500 mb-3" />
                <div className="text-2xl font-black italic">{allRoutes.length}</div>
                <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{t.statsRutas}</div>
            </div>
            <div className="min-w-[150px] bg-[#1a1d23] p-5 rounded-3xl border border-slate-800 shadow-xl">
                <MapPin size={20} className="text-blue-500 mb-3" />
                <div className="text-2xl font-black italic">{totalKm.toLocaleString()}</div>
                <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{t.statsKm}</div>
            </div>
            <div className="min-w-[150px] bg-[#1a1d23] p-5 rounded-3xl border border-slate-800 shadow-xl">
                <Cloud size={20} className="text-emerald-500 mb-3" />
                <div className="text-2xl font-black italic">{userRoutes.length}</div>
                <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{t.syncing}</div>
            </div>
        </section>
    );
}
