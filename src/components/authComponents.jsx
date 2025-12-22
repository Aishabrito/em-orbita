import React from 'react';
import fundoGalaxia from '../assets/fundogalaxia.png';

//  Layout Base (Fundo e Centralização)
export const AuthLayout = ({ children }) => {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#0B0D17] text-white flex items-center justify-center font-orbita">
      {/* Background */}
      <div className="absolute inset-0 bg-cover bg-center opacity-40 pointer-events-none"
           style={{ backgroundImage: `url(${fundoGalaxia})` }}></div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B0D17] via-transparent to-[#0B0D17] pointer-events-none"></div>
      
      {/* Conteúdo Central */}
      {children}
    </div>
  );
};

// Card de Vidro (Container)
export const AuthCard = ({ children, animation = "fade-in zoom-in-95" }) => {
  return (
    <div className={`z-20 w-full max-w-md p-8 bg-[#161625]/60 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl animate-in ${animation} duration-500`}>
      {children}
    </div>
  );
};

//  Input com Ícone
export const AuthInput = ({ icon: Icon, ...props }) => {
  return (
    <div className="relative group">
      {Icon && (
        <Icon className="absolute left-4 top-3.5 text-gray-500 group-focus-within:text-cyan-400 transition-colors" size={18} />
      )}
      <input 
        className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white focus:border-cyan-500/50 focus:outline-none transition-all placeholder:text-gray-600"
        {...props} 
      />
    </div>
  );
};

// Botão Principal
export const AuthButton = ({ children, variant = 'cyan', className = '', ...props }) => {
  const gradients = {
    cyan: 'from-cyan-600 to-blue-600 hover:shadow-[0_0_20px_rgba(8,145,178,0.4)]',
    purple: 'from-purple-600 to-indigo-600 hover:shadow-[0_0_20px_rgba(147,51,234,0.4)]',
    green: 'from-emerald-500 to-green-600 hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]'
  };

  return (
    <button 
      className={`w-full bg-gradient-to-r ${gradients[variant]} text-white font-bold py-3.5 rounded-xl hover:scale-[1.02] transition-all shadow-lg flex items-center justify-center gap-2 uppercase tracking-widest text-sm ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};