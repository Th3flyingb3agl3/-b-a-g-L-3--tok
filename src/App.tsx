import React, { useState } from 'react';
import { VideoFeed } from './components/VideoFeed';
import { Livestream } from './components/Livestream';
import { Sidebar } from './components/Sidebar';
import { VIDEOS, BEAGLES } from './types';
import { Dog, Plus, Search, MessageCircle, User, Skull, Zap, Biohazard, Ghost } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('feed');
  const currentBeagle = BEAGLES[0]; // Mocking logged in beagle

  return (
    <div className="flex h-screen w-full bg-black overflow-hidden font-sans selection:bg-toxic selection:text-black">
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative h-full">
        {/* Top Navigation */}
        <header className="h-14 border-b border-toxic/20 flex items-center justify-between px-4 bg-black/80 backdrop-blur-md z-30">
          <div className="flex items-center gap-4 flex-1 max-w-xl">
            <div className="relative flex-1 hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" size={18} />
              <input 
                type="text" 
                placeholder="Search for contaminated beagles..." 
                className="w-full bg-zinc-900 border border-toxic/10 rounded-none py-2 pl-10 pr-4 text-sm text-toxic focus:border-toxic focus:ring-1 focus:ring-toxic outline-none font-mono"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 bg-blood hover:bg-red-700 text-white px-4 py-1.5 rounded-none font-black text-xs uppercase italic tracking-widest transition-all">
              <Plus size={18} />
              <span className="hidden sm:inline">Infect</span>
            </button>
            <div className="w-8 h-8 rounded-none bg-toxic flex items-center justify-center cursor-pointer animate-glitch">
              <Skull size={18} className="text-black" />
            </div>
          </div>
        </header>

        {/* Content View */}
        <div className="flex-1 relative overflow-hidden">
          {activeTab === 'feed' && <VideoFeed videos={VIDEOS} />}
          {activeTab === 'live' && <Livestream currentBeagle={currentBeagle} />}
          
          {(activeTab === 'explore' || activeTab === 'following') && (
            <div className="h-full flex flex-col items-center justify-center text-zinc-700 p-8 text-center bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')]">
              <div className="w-20 h-20 bg-zinc-900 rounded-none flex items-center justify-center mb-4 border-2 border-toxic/20 animate-pulse">
                <Biohazard size={40} className="text-toxic" />
              </div>
              <h2 className="text-xl font-black text-white mb-2 uppercase italic tracking-tighter">Scavenging the wasteland...</h2>
              <p className="max-w-xs font-mono text-xs">Our mutant beagles are currently digging through the rubble for this feature. Stay contaminated.</p>
            </div>
          )}
        </div>

        {/* Mobile Bottom Nav */}
        <nav className="sm:hidden h-16 border-t border-toxic/20 bg-black flex items-center justify-around px-2 z-30">
          <button onClick={() => setActiveTab('feed')} className={activeTab === 'feed' ? 'text-toxic toxic-glow' : 'text-zinc-700'}>
            <Ghost size={24} />
          </button>
          <button onClick={() => setActiveTab('live')} className={activeTab === 'live' ? 'text-toxic toxic-glow' : 'text-zinc-700'}>
            <div className="relative">
              <Biohazard size={24} />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-blood rounded-full animate-pulse" />
            </div>
          </button>
          <div className="w-12 h-8 bg-toxic rounded-none flex items-center justify-center text-black animate-glitch">
            <Plus size={24} />
          </div>
          <button className="text-zinc-700">
            <MessageCircle size={24} />
          </button>
          <button className="text-zinc-700">
            <Skull size={24} />
          </button>
        </nav>
      </main>
    </div>
  );
}
