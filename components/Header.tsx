import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="flex flex-col md:flex-row items-start md:items-center gap-6">
      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-radio-accent to-teal-400 flex items-center justify-center shadow-lg shadow-radio-accent/20 shrink-0">
        <span className="text-2xl font-black text-[#071023]">WR</span>
      </div>
      <div className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">WebRádio — Sua Estação</h1>
        <p className="text-lg text-slate-400 max-w-2xl leading-relaxed">
          Ouça ao vivo, peça músicas pelo WhatsApp e acompanhe a nossa programação diária.
        </p>
      </div>
    </header>
  );
};