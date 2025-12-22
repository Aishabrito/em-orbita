import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Rocket, ArrowRight, Lock, Mail } from 'lucide-react';
import fundoGalaxia from '../assets/fundogalaxia.png';

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/orbita');
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#0B0D17] text-white flex items-center justify-center font-orbita">
      
      {/* Background */}
      <div className="absolute inset-0 bg-cover bg-center opacity-40 pointer-events-none"
           style={{ backgroundImage: `url(${fundoGalaxia})` }}></div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B0D17] via-transparent to-[#0B0D17] pointer-events-none"></div>

      {/* Card de Login */}
      <div className="z-20 w-full max-w-md p-8 bg-[#161625]/60 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl animate-in fade-in slide-in-from-left duration-500">
        
        <div className="text-center mb-6">
          <div className="flex justify-center mb-4"><Rocket className="text-cyan-400 drop-shadow-lg" size={40} /></div>
          <h1 className="font-titulo text-3xl font-bold text-white tracking-widest drop-shadow-lg">LOGIN</h1>
          <p className="text-gray-400 text-sm font-light mt-1">Bem-vindo de volta, comandante.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative group">
            <Mail className="absolute left-4 top-3.5 text-gray-500 group-focus-within:text-cyan-400" size={18} />
            <input type="email" placeholder="seu@email.com" required
              className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white focus:border-cyan-500/50 focus:outline-none transition-all" />
          </div>

          <div className="relative group">
            <Lock className="absolute left-4 top-3.5 text-gray-500 group-focus-within:text-cyan-400" size={18} />
            <input type="password" placeholder="Sua senha" required
              className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white focus:border-cyan-500/50 focus:outline-none transition-all" />
          </div>

          <button type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-3.5 rounded-xl hover:scale-[1.02] transition-all shadow-lg flex items-center justify-center gap-2 uppercase tracking-widest text-sm">
            Decolar <ArrowRight size={16} />
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-400 text-sm">Ainda não tem cadastro? <button onClick={() => navigate('/cadastro')} className="text-purple-400 hover:text-white font-bold ml-1 transition-colors">Criar Conta</button></p>
        </div>
      </div>
    </div>
  );
};

export default Login;