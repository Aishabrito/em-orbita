import React from 'react';
import { Rocket } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full border-t border-white/5 mt-20 py-8 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
      <div className="flex items-center gap-2">
        <Rocket size={16} className="text-cyan-400" />
        <span className="text-[10px] md:text-xs text-gray-500 tracking-[0.2em] uppercase font-bold font-orbita">
          Em Órbita — Aísha Brito
        </span>
      </div>
      
      <div className="flex gap-6 text-[10px] md:text-xs tracking-[0.2em] text-gray-500 uppercase font-bold font-orbita">
        <a 
          href="https://github.com/Aishabrito" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="hover:text-cyan-400 transition-colors"
        >
          GitHub
        </a>
        <a 
          href="https://www.linkedin.com/in/aishabrito/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="hover:text-purple-400 transition-colors"
        >
          LinkedIn
        </a>
        <span className="text-gray-800 hidden md:inline">/ / 2026</span>
      </div>
    </footer>
  );
};

export default Footer;