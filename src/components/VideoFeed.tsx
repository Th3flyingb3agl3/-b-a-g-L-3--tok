import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Skull, MessageCircle, Share2, Music, UserPlus, Heart, Zap } from 'lucide-react';
import { Video } from '../types';
import { cn } from '../lib/utils';

interface VideoCardProps {
  video: Video;
  isActive: boolean;
}

const VideoCard: React.FC<VideoCardProps> = ({ video, isActive }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      if (isActive) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  }, [isActive]);

  return (
    <div className="relative h-full w-full bg-black flex items-center justify-center snap-start overflow-hidden">
      {/* VHS Glitch Overlay */}
      <div className="vhs-overlay" />
      
      <video
        ref={videoRef}
        src={video.videoUrl}
        className={cn(
          "h-full w-full object-cover transition-all duration-500",
          isActive ? "opacity-100 scale-100" : "opacity-40 scale-110 blur-sm"
        )}
        loop
        muted
        playsInline
      />
      
      {/* Overlay Content */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80 pointer-events-none" />
      
      {/* Right Side Actions */}
      <div className="absolute right-4 bottom-24 flex flex-col items-center gap-6 z-10">
        <div className="relative group">
          <div className="absolute inset-0 bg-toxic rounded-full blur-md opacity-0 group-hover:opacity-50 transition-opacity" />
          <img 
            src={video.author.avatar} 
            alt={video.author.name} 
            className="w-12 h-12 rounded-full border-2 border-toxic relative z-10"
            referrerPolicy="no-referrer"
          />
          <button className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-blood rounded-full p-0.5 text-white z-20 animate-pulse">
            <Zap size={14} />
          </button>
        </div>
        
        <button 
          onClick={() => setLiked(!liked)}
          className="flex flex-col items-center gap-1 group"
        >
          <div className={cn(
            "p-2 rounded-full transition-all duration-300",
            liked ? "text-blood scale-125 blood-glow" : "text-white group-hover:bg-white/10"
          )}>
            <Skull size={32} fill={liked ? "currentColor" : "none"} />
          </div>
          <span className="text-white text-xs font-mono font-bold">{video.likes + (liked ? 1 : 0)}</span>
        </button>

        <button className="flex flex-col items-center gap-1 group">
          <div className="p-2 rounded-full text-white group-hover:bg-toxic group-hover:text-black transition-all">
            <MessageCircle size={32} />
          </div>
          <span className="text-white text-xs font-mono font-bold">{video.comments}</span>
        </button>

        <button className="flex flex-col items-center gap-1 group">
          <div className="p-2 rounded-full text-white group-hover:bg-white/10 transition-colors">
            <Share2 size={32} />
          </div>
          <span className="text-white text-xs font-mono font-bold">{video.shares}</span>
        </button>
      </div>

      {/* Bottom Info */}
      <div className="absolute bottom-6 left-4 right-16 text-white z-10">
        <h3 className="font-black text-xl mb-1 toxic-glow tracking-tighter italic">@{video.author.username}</h3>
        <p className="text-sm mb-3 line-clamp-2 font-mono text-zinc-300">{video.caption}</p>
        <div className="flex items-center gap-2 text-xs bg-black/40 backdrop-blur-sm p-2 rounded-lg border border-white/10 w-fit">
          <Music size={14} className="flex-shrink-0 animate-spin-slow text-toxic" />
          <div className="whitespace-nowrap animate-marquee font-mono uppercase tracking-widest">
            {video.music} • {video.music} • {video.music}
          </div>
        </div>
      </div>
    </div>
  );
};

interface VideoFeedProps {
  videos: Video[];
}

export const VideoFeed: React.FC<VideoFeedProps> = ({ videos }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (containerRef.current) {
      const index = Math.round(containerRef.current.scrollTop / containerRef.current.clientHeight);
      setActiveIndex(index);
    }
  };

  return (
    <div 
      ref={containerRef}
      onScroll={handleScroll}
      className="h-full w-full overflow-y-scroll snap-y snap-mandatory no-scrollbar bg-black"
    >
      {videos.map((video, index) => (
        <VideoCard 
          key={video.id} 
          video={video} 
          isActive={index === activeIndex} 
        />
      ))}
    </div>
  );
};
