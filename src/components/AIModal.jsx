import { Sparkles, Loader2 } from 'lucide-react';

export default function AIModal({ t, aiLoading, aiResponse, onClose }) {
    if (!aiLoading && !aiResponse) return null;

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 text-left">
            <div
                className="absolute inset-0 bg-black/90 backdrop-blur-xl animate-fadeIn"
                onClick={() => !aiLoading && onClose()}
            />
            <div className="relative w-full max-w-md bg-[#1a1d23] border border-orange-500/30 rounded-[40px] shadow-2xl overflow-hidden animate-zoomIn">
                <div className="p-8 text-center md:text-left">
                    <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
                        <div className="w-14 h-14 bg-orange-500/20 rounded-2xl flex items-center justify-center text-orange-500 shadow-inner">
                            {aiLoading ? <Loader2 size={30} className="animate-spin" /> : <Sparkles size={30} />}
                        </div>
                        <div>
                            <h3 className="text-xl font-black italic uppercase tracking-tighter">{t.capitanIa} ✨</h3>
                            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{t.loading}</p>
                        </div>
                    </div>

                    <div className="bg-[#0f1115] rounded-3xl p-6 border border-slate-800 max-h-[50vh] overflow-y-auto custom-scrollbar shadow-inner text-left">
                        {aiLoading ? (
                            <div className="space-y-4 py-4">
                                <div className="h-4 bg-slate-800 rounded-full w-3/4 animate-pulse mx-auto md:mx-0" />
                                <div className="h-4 bg-slate-800 rounded-full w-full animate-pulse mx-auto md:mx-0" />
                                <div className="h-4 bg-slate-800 rounded-full w-2/3 animate-pulse mx-auto md:mx-0" />
                            </div>
                        ) : (
                            <div className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap font-medium">
                                {aiResponse}
                            </div>
                        )}
                    </div>

                    {!aiLoading && (
                        <button
                            onClick={onClose}
                            className="w-full mt-8 bg-orange-600 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-[11px] italic shadow-lg shadow-orange-600/30 active:scale-95 transition-transform hover:bg-orange-700"
                        >
                            {t.entendido}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
