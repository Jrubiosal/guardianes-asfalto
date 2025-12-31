import { Home, PlusCircle, Sparkles } from 'lucide-react';

export default function BottomNav({ t, activeTab, setActiveTab, onAIClick }) {
    return (
        <nav className="fixed bottom-0 inset-x-0 bg-[#14161b]/95 backdrop-blur-md border-t border-slate-800 py-3 px-12 flex justify-between items-center z-40 pb-safe shadow-2xl">
            <button
                onClick={() => setActiveTab('home')}
                className={`flex flex-col items-center gap-1.5 transition-colors ${activeTab === 'home' ? 'text-orange-500' : 'text-slate-600 hover:text-slate-400'
                    }`}
            >
                <Home size={22} strokeWidth={2.5} />
                <span className="text-[9px] font-black uppercase tracking-tighter">{t.explorar}</span>
            </button>

            <div className="relative -top-6">
                <button
                    onClick={() => setActiveTab('add')}
                    className={`w-16 h-16 rounded-full shadow-2xl flex items-center justify-center text-white ring-[6px] ring-[#0f1115] active:scale-90 transition-all ${activeTab === 'add'
                            ? 'bg-indigo-600 shadow-indigo-500/40'
                            : 'bg-orange-600 shadow-orange-500/40'
                        }`}
                >
                    <PlusCircle size={28} strokeWidth={2.5} />
                </button>
            </div>

            <button
                onClick={onAIClick}
                className={`flex flex-col items-center gap-1.5 transition-colors ${activeTab === 'ai' ? 'text-orange-500' : 'text-slate-600 hover:text-slate-400'
                    }`}
            >
                <Sparkles size={22} strokeWidth={2.5} />
                <span className="text-[9px] font-black uppercase tracking-tighter">{t.aiAssistant}</span>
            </button>
        </nav>
    );
}
