/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Play } from 'lucide-react';

interface VslPlayerProps {
  onUnlock: () => void;
}

export default function VslPlayer({ onUnlock }: VslPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [sdkLoaded, setSdkLoaded] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const playerRef = useRef<any>(null);

  const startVideo = () => {
    setIsPlaying(true);
  };

  // 1. Dynamically load Vimeo Player SDK
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if ((window as any).Vimeo) {
      setSdkLoaded(true);
      return;
    }
    const script = document.createElement('script');
    script.src = "https://player.vimeo.com/api/player.js";
    script.async = true;
    script.onload = () => setSdkLoaded(true);
    document.body.appendChild(script);
  }, []);

  // 2. Initialize player and listen to events when video is playing
  useEffect(() => {
    if (sdkLoaded && isPlaying && iframeRef.current) {
      const VimeoPlayer = (window as any).Vimeo.Player;
      if (VimeoPlayer) {
        // Instantiate Player targeting the iframe element
        const player = new VimeoPlayer(iframeRef.current);
        playerRef.current = player;

        const handleTimeUpdate = (data: { seconds: number; duration: number }) => {
          const remaining = data.duration - data.seconds;
          // When 30 seconds or less are left to the video end, unlock
          if (remaining <= 30) {
            onUnlock();
          }
        };

        player.on('timeupdate', handleTimeUpdate);
        player.on('ended', () => {
          onUnlock();
        });

        return () => {
          player.off('timeupdate', handleTimeUpdate);
          player.off('ended');
        };
      }
    }
  }, [sdkLoaded, isPlaying, onUnlock]);

  // 3. Absolute Failsafe: After starting the video, if 90s pass, auto-unlock in case Vimeo event fires fail cross-domain style
  useEffect(() => {
    if (isPlaying) {
      const timer = setTimeout(() => {
        onUnlock();
      }, 90000); // 90 seconds failsafe
      return () => clearTimeout(timer);
    }
  }, [isPlaying, onUnlock]);

  return (
    <div className="flex flex-col items-center justify-center space-y-6">
      
      {/* Visual Header Indicator */}
      <div className="flex items-center gap-2 bg-rose-50 border border-rose-100 text-rose-700 text-xs font-semibold px-4 py-1.5 rounded-full uppercase tracking-wider animate-pulse">
        <Sparkles className="w-3.5 h-3.5" /> Assista à Mini VSL Abaixo
      </div>

      {/* Phone Frame - TikTok Format Wrapper (9:16 Aspect Ratio) */}
      <div 
        id="tiktok-vsl-frame" 
        className="w-full max-w-[340px] sm:max-w-[360px] aspect-[9/16] bg-stone-950 rounded-[36px] overflow-hidden border-[12px] border-stone-900 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] relative"
      >
        {/* Dynamic Mobile Phone Notch Decoration */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-stone-900 rounded-b-2xl z-30 flex items-center justify-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-stone-800"></div>
          <div className="w-8 h-1 rounded-full bg-stone-800"></div>
        </div>

        {/* Video Embed Container */}
        <div className="w-full h-full relative z-10">
          {!isPlaying ? (
            /* Attention-Grabbing Alert Thumbnail Overlay */
            <div 
              onClick={startVideo}
              className="absolute inset-0 w-full h-full bg-gradient-to-b from-stone-900 via-stone-950 to-stone-900 flex flex-col justify-between p-6 cursor-pointer select-none group"
            >
              {/* Alert Top Bar */}
              <div className="pt-6 space-y-1 text-center">
                <span className="inline-flex items-center gap-1 bg-red-600 text-[10px] text-white font-black px-2.5 py-1 rounded-full uppercase tracking-wider animate-bounce">
                  🚨 ALERTA IMPORTANTE
                </span>
                <p className="text-white font-black text-sm sm:text-base leading-tight mt-3">
                  Como desbloquear mais de 10 catálogos ainda HOJE?
                </p>
                <p className="text-red-400 text-[10px] uppercase tracking-widest font-extrabold font-mono">
                  Assista antes de sair da página
                </p>
              </div>

              {/* Glowing Interactive Big Play Button */}
              <div className="flex flex-col items-center justify-center space-y-3 my-auto">
                <div className="relative">
                  {/* Pulsing rings */}
                  <div className="absolute inset-0 rounded-full bg-rose-600/40 animate-ping"></div>
                  <div className="absolute -inset-4 rounded-full bg-rose-600/25 animate-pulse"></div>
                  
                  <div className="relative w-20 h-20 rounded-full bg-rose-600 hover:bg-rose-500 flex items-center justify-center shadow-[0_0_30px_rgba(225,29,72,0.8)] transition-all group-hover:scale-110 active:scale-95 duration-300">
                    <Play className="w-10 h-10 text-white fill-white ml-1.5" />
                  </div>
                </div>
                <span className="text-rose-400 font-extrabold text-[11px] animate-pulse uppercase tracking-wider pt-2">
                  Toque para Assistir (Vídeo Rápido)
                </span>
              </div>
            </div>
          ) : (
            /* Actual Video Embed with parameters to hide titles / byline / portrait information */
            <iframe
              ref={iframeRef}
              src="https://player.vimeo.com/video/1195736123?badge=0&autopause=0&player_id=0&app_id=58479&title=0&byline=0&portrait=0&autoplay=1"
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write; text-share-sheet"
              className="absolute top-0 left-0 w-full h-full"
              style={{ width: '100%', height: '100%' }}
              title="Mini VSL TikTok format"
              referrerPolicy="no-referrer"
            ></iframe>
          )}
        </div>

        {/* TikTok Interactive Decorative Dots / Overlays */}
        <div className="absolute bottom-16 right-3.5 z-20 flex flex-col gap-5 items-center pointer-events-none opacity-80">
          {/* Heart/Like */}
          <div className="flex flex-col items-center">
            <div className="w-11 h-11 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white text-lg">
              ❤️
            </div>
            <span className="text-[10px] text-white font-extrabold font-sans mt-1 shadow-sm">1.8K</span>
          </div>

          {/* Share */}
          <div className="flex flex-col items-center">
            <div className="w-11 h-11 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white text-lg">
              ➡️
            </div>
            <span className="text-[10px] text-white font-extrabold font-sans mt-1 shadow-sm font-medium font-mono">108</span>
          </div>
        </div>

        {/* Bottom indicator line on smartphones */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-24 h-1 bg-white/45 rounded-full z-20"></div>

      </div>

      {/* Action Prompt */}
      <p className="text-stone-500 text-xs sm:text-sm font-semibold flex items-center gap-2">
        <span>▶ Clique para assistir direto pelo reprodutor</span>
      </p>

    </div>
  );
}
