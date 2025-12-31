import { PlusCircle, AlertTriangle, Sparkles, Loader2, Save } from 'lucide-react';
import { categories } from '../lib/translations';

export default function AddRouteForm({
    t,
    user,
    newRouteForm,
    setNewRouteForm,
    onMagicFill,
    onSave,
    aiLoading
}) {
    return (
        <div className="space-y-6 pb-20 max-w-xl mx-auto">
            <div className="text-center space-y-2 py-4">
                <PlusCircle size={48} className="text-orange-500 mx-auto" />
                <h2 className="text-2xl font-black uppercase italic">{t.nuevaRuta}</h2>
            </div>

            <div className="space-y-4">
                {!user && (
                    <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-2xl flex items-center gap-3 text-red-400 text-xs font-bold">
                        <AlertTriangle size={18} /> No estás conectado al club. Espera un momento...
                    </div>
                )}

                <div className="bg-[#1a1d23] rounded-3xl p-6 border border-slate-800 space-y-4 shadow-xl">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{t.urlMapy}</label>
                        <input
                            type="text"
                            placeholder="https://mapy.cz/s/..."
                            className="w-full bg-[#0f1115] border border-slate-800 rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-orange-500 outline-none text-slate-200 transition-all"
                            value={newRouteForm.link}
                            onChange={(e) => setNewRouteForm({ ...newRouteForm, link: e.target.value })}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Títol</label>
                        <input
                            type="text"
                            placeholder={t.titlePlace}
                            className="w-full bg-[#0f1115] border border-slate-800 rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-orange-500 outline-none text-slate-200 transition-all"
                            value={newRouteForm.title}
                            onChange={(e) => setNewRouteForm({ ...newRouteForm, title: e.target.value })}
                        />
                    </div>

                    <button
                        onClick={onMagicFill}
                        disabled={!newRouteForm.title || !newRouteForm.link || aiLoading}
                        className="w-full bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-indigo-600/30 transition-all disabled:opacity-30 active:scale-95 shadow-lg shadow-indigo-600/10"
                    >
                        {aiLoading ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />}
                        {t.magicBtn}
                    </button>
                </div>

                <div className="bg-[#1a1d23] rounded-3xl p-6 border border-slate-800 space-y-4 shadow-xl">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Categoria</label>
                        <select
                            className="w-full bg-[#0f1115] border border-slate-800 rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-orange-500 outline-none text-slate-200 transition-all"
                            value={newRouteForm.category}
                            onChange={(e) => setNewRouteForm({ ...newRouteForm, category: e.target.value })}
                        >
                            {categories.filter(c => c !== "Todas").map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Distància</label>
                            <input
                                type="number"
                                placeholder={t.distPlace}
                                className="w-full bg-[#0f1115] border border-slate-800 rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-orange-500 outline-none text-slate-200 transition-all"
                                value={newRouteForm.dist}
                                onChange={(e) => setNewRouteForm({ ...newRouteForm, dist: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Temps</label>
                            <input
                                type="text"
                                placeholder={t.timePlace}
                                className="w-full bg-[#0f1115] border border-slate-800 rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-orange-500 outline-none text-slate-200 transition-all"
                                value={newRouteForm.time}
                                onChange={(e) => setNewRouteForm({ ...newRouteForm, time: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="space-y-2 text-left">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Descripció</label>
                        <textarea
                            rows="3"
                            placeholder={t.descPlace}
                            className="w-full bg-[#0f1115] border border-slate-800 rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-orange-500 outline-none text-slate-200 resize-none transition-all"
                            value={newRouteForm.desc}
                            onChange={(e) => setNewRouteForm({ ...newRouteForm, desc: e.target.value })}
                        />
                    </div>

                    <button
                        onClick={onSave}
                        disabled={!newRouteForm.title || !newRouteForm.link || !user || aiLoading}
                        className="w-full bg-orange-600 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs italic shadow-xl shadow-orange-600/20 active:scale-95 transition-all disabled:opacity-50 flex items-center justify-center gap-2 hover:bg-orange-700"
                    >
                        {aiLoading ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                        {t.guardar}
                    </button>
                </div>
            </div>
        </div>
    );
}
