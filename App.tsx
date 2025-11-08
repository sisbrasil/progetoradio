import React, { useState } from 'react';
import { Header } from './components/Header';
import { StreamSelector } from './components/StreamSelector';
import { PlayerControls } from './components/PlayerControls';
import { WhatsAppButton } from './components/WhatsAppButton';
import { Footer } from './components/Footer';
import { STREAMS } from './constants';
import { Stream } from './types';

export default function App() {
  // Default to the first stream
  const [currentStream, setCurrentStream] = useState<Stream>(STREAMS[0]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-radio-bg to-[#071023] flex items-center justify-center p-6">
      <div className="w-full max-w-4xl space-y-8">
        <Header />

        <main className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl backdrop-blur-sm" role="main">
          <section aria-label="Player" className="space-y-8">
            
            <div className="space-y-3">
              <h2 className="text-sm font-medium text-slate-400 uppercase tracking-wider">Transmissões Disponíveis</h2>
              <StreamSelector 
                currentStream={currentStream} 
                onStreamSelect={setCurrentStream} 
              />
            </div>

            <div className="p-6 bg-black/20 rounded-2xl border border-white/5">
              <PlayerControls stream={currentStream} />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/5">
              <div className="text-sm text-slate-400">
                Gostando da programação? Peça sua música!
              </div>
              <WhatsAppButton />
            </div>

          </section>
        </main>

        <Footer />
      </div>
    </div>
  );
}