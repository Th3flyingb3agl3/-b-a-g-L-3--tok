import React, { useState, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Users, Dog, MessageSquare, Skull, Zap, Ghost } from 'lucide-react';
import { Beagle, Bark } from '../types';
import { cn } from '../lib/utils';

interface LivestreamProps {
  currentBeagle: Beagle;
}

export const Livestream: React.FC<LivestreamProps> = ({ currentBeagle }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [barks, setBarks] = useState<Bark[]>([]);
  const [message, setMessage] = useState('');
  const [liveBeagles, setLiveBeagles] = useState<Beagle[]>([]);
  const [notification, setNotification] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const newSocket = io();
    setSocket(newSocket);

    newSocket.emit('join-live', currentBeagle);

    newSocket.on('beagle-list-update', (list: Beagle[]) => {
      setLiveBeagles(list);
    });

    newSocket.on('beagle-joined', (msg: string) => {
      setNotification(msg);
      setTimeout(() => setNotification(null), 3000);
    });

    newSocket.on('new-bark', (bark: Bark) => {
      setBarks(prev => [...prev.slice(-50), bark]);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [currentBeagle]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [barks]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && socket) {
      socket.emit('send-bark', message.trim());
      setMessage('');
    }
  };

  return (
    <div className="flex flex-col h-full bg-black text-white overflow-hidden relative">
      <div className="vhs-overlay opacity-20" />
      
      {/* Header */}
      <div className="p-4 border-b border-toxic/30 flex items-center justify-between bg-black/80 backdrop-blur-md sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-toxic flex items-center justify-center border-2 border-toxic animate-glitch">
              <Skull size={24} className="text-black" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-red-600 border-2 border-black rounded-full animate-pulse" />
          </div>
          <div>
            <h2 className="font-black text-sm toxic-glow uppercase tracking-tighter italic">Toxic Beagle Hub</h2>
            <div className="flex items-center gap-1 text-[10px] text-zinc-500 font-mono">
              <Users size={12} />
              <span>{liveBeagles.length} mutants online</span>
            </div>
          </div>
        </div>
      </div>

      {/* Live Video Placeholder */}
      <div className="relative aspect-video bg-zinc-900 flex items-center justify-center group overflow-hidden">
        <img 
          src="https://picsum.photos/seed/beagle-horror-live/800/450?grayscale" 
          alt="Live Stream" 
          className="w-full h-full object-cover opacity-40 grayscale contrast-150"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-4 left-4 bg-toxic text-black text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider animate-pulse">
          Mutating
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-toxic font-black text-center px-4 drop-shadow-lg uppercase tracking-widest animate-glitch">
            Watching {liveBeagles[0]?.name || 'a mutant'} gurgle...
          </p>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]">
        <AnimatePresence>
          {notification && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="bg-toxic/20 border border-toxic/50 text-toxic text-[10px] py-2 px-3 rounded-lg text-center font-black uppercase tracking-widest"
            >
              {notification}
            </motion.div>
          )}
        </AnimatePresence>

        {barks.map((bark) => (
          <motion.div
            key={bark.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col gap-1"
          >
            <div className="flex items-baseline gap-2">
              <span className="font-black text-toxic text-xs uppercase italic">{bark.beagleName}</span>
              <span className="text-[9px] text-zinc-600 font-mono">
                {new Date(bark.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
            <div className="bg-zinc-900/80 border-l-2 border-blood rounded-r-xl px-3 py-2 text-sm max-w-[90%] inline-block font-mono text-zinc-300">
              {bark.message}
            </div>
          </motion.div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Input Area */}
      <form onSubmit={handleSend} className="p-4 bg-black border-t border-toxic/20 flex gap-2 relative z-10">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Gurgle something..."
          className="flex-1 bg-zinc-900 border border-toxic/30 rounded-none px-4 py-2 text-sm font-mono focus:border-toxic focus:ring-1 focus:ring-toxic outline-none text-toxic"
        />
        <button
          type="submit"
          disabled={!message.trim()}
          className="w-10 h-10 bg-toxic flex items-center justify-center text-black disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white transition-all active:scale-90"
        >
          <Zap size={18} />
        </button>
      </form>
    </div>
  );
};
