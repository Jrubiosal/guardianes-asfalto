import {
    X, MapPin, Clock, ArrowUpRight, AlertTriangle,
    CheckSquare, HardHat, Coffee
} from 'lucide-react';

export default function RouteDetail({ t, route, onClose, onAIAction }) {
    if (!route) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-end">
            <div
                className="absolute inset-0 bg-black/80 backdrop-blur-md animate-fadeIn"
                onClick={onClose}
            />

            <div className="relative w-full bg-[#1a1d23] rounded-t-[40px] shadow-2xl animate-slideUp max-h-[92vh] overflow-y-auto border-t border-orange-500/20">
                <div className="sticky top-0 bg-[#1a1d23] pt-4 pb-4 z-10 flex flex-col items-center">
                    <div className="w-16 h-1.5 bg-slate-800 rounded-full mb-4" />
                    <button
                        onClick={onClose}
                        className="absolute right-6 top-6 bg-slate-800 p-2.5 rounded-2xl text-slate-400 border border-slate-700 active:scale-90 hover:text-white transition-colors"
                    >
                        <X size={22} />
                    </button>
                </div>

                <div className="px-8 pb-16 text-left">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="bg-orange-600 text-white px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest italic shadow-lg shadow-orange-600/20">
                            {route.category}
                        </span>
                        <span className="text-slate-600 font-black text-[11px] uppercase tracking-[0.2em]">Official Roadbook</span>
                    </div>

                    <h2 className="text-3xl font-black text-white leading-tight mb-8 italic tracking-tight">
                        {route.title}
                    </h2>

                    {/* AI Action Buttons */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10 text-left">
                        <button
                            onClick={() => onAIAction('briefing', route)}
                            className="bg-blue-600/10 border border-blue-500/30 text-blue-400 py-3.5 px-4 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 active:scale-95 transition-all hover:bg-blue-600/20"
                        >
                            <AlertTriangle size={14} /> {t.briefing}
                        </button>
                        <button
                            onClick={() => onAIAction('checklist', route)}
                            className="bg-emerald-600/10 border border-emerald-500/30 text-emerald-400 py-3.5 px-4 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 active:scale-95 transition-all hover:bg-emerald-600/20"
                        >
                            <CheckSquare size={14} /> {t.checklist}
                        </button>
                        <button
                            onClick={() => onAIAction('safety', route)}
                            className="bg-orange-600/10 border border-orange-500/30 text-orange-400 py-3.5 px-4 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 active:scale-95 transition-all hover:bg-orange-600/20"
                        >
                            <HardHat size={14} /> {t.seguridad}
                        </button>
                        <button
                            onClick={() => onAIAction('stops', route)}
                            className="bg-purple-600/10 border border-purple-500/30 text-purple-400 py-3.5 px-4 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 active:scale-95 transition-all hover:bg-purple-600/20"
                        >
                            <Coffee size={14} /> {t.paradas}
                        </button>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-8">
                        <div className="bg-[#242933] p-5 rounded-3xl border border-slate-800 shadow-sm transition-transform hover:scale-[1.02] text-left">
                            <MapPin size={22} className="text-orange-500 mb-2" />
                            <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{t.distancia}</div>
                            <div className="text-xl font-black text-white italic">{route.dist} <span className="text-xs text-slate-400 not-italic">KM</span></div>
                        </div>
                        <div className="bg-[#242933] p-5 rounded-3xl border border-slate-800 shadow-sm transition-transform hover:scale-[1.02] text-left">
                            <Clock size={22} className="text-orange-500 mb-2" />
                            <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{t.duracion}</div>
                            <div className="text-xl font-black text-white italic">{route.time}</div>
                        </div>
                    </div>

                    <div className="space-y-4 mb-10 text-left">
                        <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] flex items-center gap-3">
                            {t.instrucciones} <div className="h-[1px] flex-1 bg-slate-800" />
                        </h4>
                        <p className="text-slate-300 leading-relaxed text-sm font-medium border-l-2 border-orange-500 pl-6 py-2">
                            {route.desc}
                        </p>
                    </div>

                    <a
                        href={route.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-orange-600 text-white py-5 rounded-3xl font-black flex items-center justify-center gap-4 shadow-2xl shadow-orange-600/30 active:scale-95 transition-all text-sm uppercase tracking-widest italic hover:bg-orange-700"
                    >
                        {t.sincronizar} <ArrowUpRight size={20} />
                    </a>
                </div>
            </div>
        </div>
    );
}
