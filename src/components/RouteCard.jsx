import { MapPin, Clock } from 'lucide-react';

export default function RouteCard({ route, onClick }) {
    return (
        <div
            onClick={onClick}
            className="bg-[#1a1d23] rounded-3xl overflow-hidden border border-slate-800 active:scale-[0.98] transition-all flex flex-col shadow-md shadow-black/20 group cursor-pointer hover:border-orange-500/30"
        >
            <div className="p-6 relative flex-1">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-orange-600/30 group-hover:bg-orange-500 transition-all" />
                <div className="pl-2 text-left">
                    <div className="flex items-center gap-3 mb-3">
                        <span className="bg-orange-500/10 text-orange-500 px-2.5 py-0.5 rounded-lg text-[9px] font-black uppercase tracking-tighter">
                            {route.category}
                        </span>
                        <span className="text-[10px] font-black text-slate-600 italic">
                            GDL-AS-{String(route.id).slice(-3).padStart(3, '0')}
                        </span>
                    </div>
                    <h3 className="font-bold text-slate-100 line-clamp-2 text-base leading-tight group-hover:text-orange-400 transition-colors h-12">
                        {route.title}
                    </h3>
                    <div className="flex items-center gap-5 mt-4 text-slate-500 border-t border-slate-800/50 pt-4">
                        <span className="flex items-center gap-1.5 text-[10px] font-bold italic">
                            <MapPin size={12} className="text-orange-500/50" /> {route.dist} KM
                        </span>
                        <span className="flex items-center gap-1.5 text-[10px] font-bold italic">
                            <Clock size={12} className="text-orange-500/50" /> {route.time}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
