import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Stream } from '../types';
import { PlayIcon, PauseIcon, SpeakerWaveIcon, SpeakerXMarkIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/solid';

interface PlayerControlsProps {
  stream: Stream;
}

export const PlayerControls: React.FC<PlayerControlsProps> = ({ stream }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const [volume, setVolume] = useState(1.0);
  const [error, setError] = useState<string | null>(null);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Handle stream changes
  useEffect(() => {
    if (audioRef.current) {
      // Reset state on stream change
      setError(null);
      setIsBuffering(true);

      // If we were playing, try to auto-play the new stream
      if (isPlaying && hasInteracted) {
         audioRef.current.play().catch((e) => {
            console.warn("Autoplay blocked on stream change", e);
            setIsPlaying(false);
         });
      } else {
        setIsPlaying(false);
        setIsBuffering(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stream.url]);

  // Handle volume changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlay = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;

    setHasInteracted(true);
    setError(null);

    try {
      if (isPlaying) {
        audio.pause();
      } else {
        setIsBuffering(true);
        await audio.play();
      }
    } catch (err) {
      console.error("Playback error:", err);
      setError("Não foi possível iniciar a reprodução. Verifique sua conexão.");
      setIsPlaying(false);
      setIsBuffering(false);
    }
  }, [isPlaying]);

  const openInNewTab = () => {
    window.open(stream.url, '_blank');
  };

  return (
    <div className="space-y-6">
      <audio
        ref={audioRef}
        src={stream.url}
        preload="none"
        crossOrigin="anonymous"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onWaiting={() => setIsBuffering(true)}
        onPlaying={() => setIsBuffering(false)}
        onError={(e) => {
          console.error("Audio error native:", e);
          setIsBuffering(false);
          setIsPlaying(false);
          setError("Erro ao carregar transmissão.");
        }}
      />

      {/* Status Display */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
           <div className={`text-sm font-medium flex items-center gap-2 ${error ? 'text-red-400' : 'text-radio-accent'}`}>
              {error ? (
                <span>Error</span>
              ) : isBuffering ? (
                 <>
                  <span className="block w-2 h-2 rounded-full bg-radio-accent animate-pulse"/>
                  Carregando...
                 </>
              ) : isPlaying ? (
                 <>
                   <span className="flex h-3 w-3 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-radio-accent opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-radio-accent"></span>
                    </span>
                   No Ar — Ao Vivo
                 </>
              ) : (
                <span className="text-slate-400">Pronto para tocar</span>
              )}
           </div>
           <div className="text-white font-semibold text-lg md:text-xl truncate">
             {error || stream.label}
           </div>
        </div>
        
         <button 
           onClick={openInNewTab}
           className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
           title="Abrir stream em nova aba"
         >
           <ArrowTopRightOnSquareIcon className="w-5 h-5" />
         </button>
      </div>

      {/* Main Controls */}
      <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
        {/* Play/Pause Button */}
        <button
          onClick={togglePlay}
          disabled={!!error && !hasInteracted}
          className={`w-full md:w-auto flex-1 md:flex-none flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300
            ${isPlaying 
              ? 'bg-radio-accent/10 text-radio-accent border-2 border-radio-accent/50 hover:bg-radio-accent/20' 
              : 'bg-radio-accent text-[#071023] hover:bg-radio-accent/90 shadow-lg shadow-radio-accent/20 hover:scale-[1.02] active:scale-[0.98]'
            } disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100`}
        >
          {isBuffering ? (
             <svg className="animate-spin h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
               <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
               <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
             </svg>
          ) : isPlaying ? (
             <>
               <PauseIcon className="w-6 h-6" />
               Pausar
             </>
          ) : (
             <>
               <PlayIcon className="w-6 h-6" />
               Ouvir Agora
             </>
          )}
        </button>

        {/* Volume Control */}
        <div className="w-full md:w-64 flex items-center gap-3 bg-black/20 px-4 py-3 rounded-xl border border-white/5">
          <button 
             onClick={() => setVolume(v => v === 0 ? 1 : 0)}
             className="text-slate-400 hover:text-white transition-colors"
             aria-label="Mute toggle"
          >
            {volume === 0 ? (
              <SpeakerXMarkIcon className="w-5 h-5" />
            ) : (
              <SpeakerWaveIcon className="w-5 h-5" />
            )}
          </button>
          
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-radio-accent hover:accent-radio-accent/80"
            aria-label="Volume"
          />
          <div className="text-xs text-slate-500 w-8 text-right font-medium tabular-nums">
             {Math.round(volume * 100)}%
          </div>
        </div>
      </div>
    </div>
  );
};