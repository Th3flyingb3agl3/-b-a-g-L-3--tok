import React from 'react';
import { Home, Compass, Users, PlusSquare, MessageCircle, User, Dog, Skull, Zap, Ghost, Biohazard } from 'lucide-react';
import { cn } from '../lib/utils';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'feed', icon: Ghost, label: 'Toxic Feed' },
    { id: 'live', icon: Biohazard, label: 'Mutant Live' },
    { id: 'explore', icon: Compass, label: 'Wasteland' },
    { id: 'following', icon: Users, label: 'The Pack' },
  ];

  return (
    <div className="w-20 md:w-64 h-full border-r border-toxic/20 flex flex-col bg-black text-white relative overflow-hidden">
      <div className="vhs-overlay opacity-10" />
      
      <div className="p-6 flex items-center gap-2 relative z-10">
        <div className="w-8 h-8 bg-toxic rounded-none flex items-center justify-center animate-glitch">
          <Skull className="text-black" size={20} />
        </div>
        <span className="hidden md:block font-black text-xl tracking-tighter toxic-glow italic uppercase">ToxicTok</span>
      </div>

      <nav className="flex-1 px-2 py-4 space-y-2 relative z-10">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={cn(
              "w-full flex items-center gap-4 p-3 rounded-none transition-all duration-200 uppercase font-black italic tracking-widest text-xs",
              activeTab === item.id 
                ? "text-toxic bg-toxic/10 border-r-4 border-toxic toxic-glow" 
                : "text-zinc-600 hover:bg-zinc-900 hover:text-white"
            )}
          >
            <item.icon size={20} />
            <span className="hidden md:block">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-toxic/10 space-y-4 relative z-10">
        <div className="hidden md:block text-[10px] text-zinc-600 font-black px-2 uppercase tracking-[0.2em]">
          Top Mutants
        </div>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-3 px-2 group cursor-pointer">
              <img 
                src={`https://picsum.photos/seed/mutant-sug-${i}/100/100?grayscale`} 
                className="w-8 h-8 rounded-none object-cover border border-zinc-800 group-hover:border-toxic transition-colors"
                alt="Suggested"
                referrerPolicy="no-referrer"
              />
              <div className="hidden md:block overflow-hidden">
                <p className="text-[10px] font-black truncate group-hover:text-toxic transition-colors uppercase italic">mutant_beagle_{i}</p>
                <p className="text-[8px] text-zinc-700 truncate font-mono">Contaminated</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
