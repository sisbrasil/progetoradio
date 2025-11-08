import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="text-center text-sm text-slate-500/80 py-4">
      <p>© {new Date().getFullYear()} WebRádio. Todos os direitos reservados.</p>
    </footer>
  );
};