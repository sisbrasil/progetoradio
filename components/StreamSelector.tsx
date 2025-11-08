import React from 'react';
import { Stream } from '../types';
import { STREAMS } from '../constants';

interface StreamSelectorProps {
  currentStream: Stream;
  onStreamSelect: (stream: Stream) => void;
}

export const StreamSelector: React.FC<StreamSelectorProps> = ({
  currentStream,
  onStreamSelect,
}) => {
  return (
    <div className="flex flex-wrap gap-3">
      {STREAMS.map((stream) => {
        const isActive = currentStream.id === stream.id;
        return (
          <button
            key={stream.id}
            onClick={() => onStreamSelect(stream)}
            className={`px-4 py-2.5 rounded-xl font-medium transition-all duration-200 ease-out flex items-center gap-2
              ${isActive 
                ? 'bg-radio-accent text-white shadow-lg shadow-radio-accent/25 ring-2 ring-radio-accent/50' 
                : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white'
              }`}
            aria-pressed={isActive}
          >
            {isActive && (
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
              </span>
            )}
            {stream.label}
          </button>
        );
      })}
    </div>
  );
};