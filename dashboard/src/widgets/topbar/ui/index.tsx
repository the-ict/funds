"use client";

import { Bell, HelpCircle, RefreshCcw, Search } from "lucide-react";
import { usePathname } from "next/navigation";

const TopBar = () => {
    const pathname = usePathname();
    const title = pathname === '/' ? 'Asosiy' : pathname === '/transactions' ? 'Amallar' : pathname === '/analytics' ? 'Hisobotlar' : 'Mablag';

    return (
        <header className="h-20 w-full flex items-center justify-between px-8 bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-0 z-40" >
            <div className="flex items-center gap-4 flex-1" >
                <div className="relative w-96" >
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                        type="text"
                        placeholder="Qidiruv..."
                        className="w-full bg-slate-50 border-none rounded-full pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500/20"
                    />
                </div>
            </div>

            < div className="flex items-center gap-6" >
                <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-xs font-semibold" >
                    <RefreshCcw size={14} className="animate-spin-slow" />
                    <span>Sinxronizatsiya: Faol </span>
                </div>
                < div className="flex items-center gap-3" >
                    <button className="text-slate-600 hover:text-indigo-600 transition-colors" >
                        <Bell size={20} />
                    </button>
                    < button className="text-slate-600 hover:text-indigo-600 transition-colors" >
                        <HelpCircle size={20} />
                    </button>
                    < div className="h-10 w-10 rounded-full overflow-hidden border-2 border-indigo-100" >
                        <img
                            src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=100"
                            alt="Profile"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default TopBar;