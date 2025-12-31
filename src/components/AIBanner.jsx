import { Bike, Sparkles } from 'lucide-react';

export default function AIBanner({ t, onRecommend }) {
    return (
        <div className="bg-gradient-to-r from-orange-600/20 to-purple-600/20 border border-orange-500/20 rounded-3xl p-5 relative overflow-hidden shadow-lg shadow-orange-500/5">
            <div className="relative z-10">
                <h3 className="text-sm font-black uppercase italic mb-1 flex items-center gap-2 text-white">
                    <Sparkles size={16} className="text-orange-500" /> ✨ {t.capitanIa}
                </h3>
                <p className="text-xs text-slate-400 mb-4 font-medium">{t.noSapsOnAnar}</p>
                <button
                    onClick={onRecommend}
                    className="bg-orange-500 hover:bg-orange-600 text-white text-[10px] font-black px-4 py-2.5 rounded-xl uppercase tracking-widest transition-all active:scale-95 shadow-lg shadow-orange-500/20"
                >
                    {t.triaRuta}
                </button>
            </div>
            <Bike size={80} className="absolute -right-4 -bottom-4 text-orange-500/5 rotate-12" />
        </div>
    );
}
