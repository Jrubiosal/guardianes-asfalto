import { Search, Shield, Globe } from 'lucide-react';
import { categories, getCategoryMap } from '../lib/translations';

export default function Header({
    t,
    lang,
    setLang,
    user,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    activeTab
}) {
    const catMap = getCategoryMap(t);

    return (
        <header className="bg-[#1a1d23] border-b border-orange-500/20 p-5 sticky top-0 z-30 shadow-2xl">
            <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-orange-600 to-orange-400 rounded-xl flex items-center justify-center text-white shadow-lg shadow-orange-500/20 ring-2 ring-orange-500/50">
                        <Shield size={24} />
                    </div>
                    <div>
                        <h1 className="text-lg font-black tracking-tighter uppercase italic">
                            {t.title} <span className="text-orange-500">{t.subtitle}</span>
                        </h1>
                        <div className="flex items-center gap-1.5 -mt-1">
                            <div className={`w-1.5 h-1.5 ${user ? 'bg-green-500 animate-pulse' : 'bg-red-500'} rounded-full`} />
                            <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">
                                {user ? t.clubOnline : 'OFFLINE'}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setLang(lang === 'es' ? 'ca' : 'es')}
                        className="px-3 py-1.5 bg-slate-800 rounded-xl text-[10px] font-black uppercase text-slate-400 border border-slate-700 active:scale-95 flex items-center gap-2 transition-all hover:bg-slate-700"
                    >
                        <Globe size={14} className="text-orange-500" />
                        {lang === 'es' ? 'Castellano' : 'Català'}
                    </button>
                </div>
            </div>

            {activeTab === 'home' && (
                <>
                    <div className="relative mb-5 group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                        <input
                            type="text"
                            placeholder={t.searchPlaceholder}
                            className="w-full bg-[#242933] border border-transparent focus:border-orange-500/30 rounded-2xl py-3.5 pl-12 pr-4 text-sm focus:ring-4 focus:ring-orange-500/10 transition-all outline-none placeholder:text-slate-600 text-slate-200"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="flex gap-2.5 overflow-x-auto no-scrollbar pb-1">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`whitespace-nowrap px-5 py-2 rounded-xl text-[11px] font-black transition-all uppercase tracking-wider ${selectedCategory === cat
                                        ? 'bg-orange-500 text-white shadow-xl shadow-orange-500/20 scale-105'
                                        : 'bg-slate-800/50 text-slate-500 border border-slate-700/50 hover:bg-slate-800'
                                    }`}
                            >
                                {catMap[cat]}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </header>
    );
}
