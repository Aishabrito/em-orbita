import React from 'react';
import { Rocket, Settings, X, Plus } from 'lucide-react';
import fundoGalaxia from '../assets/fundogalaxia.png';

// Fundo e Overlay
export const FundoCosmico = () => (
  <>
    <div className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none opacity-60"
         style={{ backgroundImage: `url(${fundoGalaxia})` }}></div>
    <div className="absolute inset-0 bg-black/40 pointer-events-none"></div>
  </>
);

// Logotipo 
export const CabecalhoUniverso = () => (
  <div className="absolute top-6 left-6 z-50 flex items-center gap-3 pointer-events-none select-none">
    <div className="relative">
      <div className="absolute -inset-2 bg-blue-500/30 blur-lg rounded-full"></div>
      <Rocket className="text-cyan-400 relative z-10 drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]" size={28} strokeWidth={1.5} />
    </div>
    <h1 className="font-titulo text-2xl font-bold text-white tracking-widest drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
      EM ÓRBITA
    </h1>
  </div>
);

// Botão de Configuração e Aviso de Destruição
export const ControlesUniverso = ({ isEditMode, toggleEdit }) => (
  <>
    <button 
      onClick={toggleEdit}
      className={`absolute top-6 right-6 z-50 p-3 rounded-full transition-all duration-300 border backdrop-blur-md
        ${isEditMode 
          ? 'bg-red-500/20 border-red-500 text-red-400 rotate-180 hover:bg-red-500/30' 
          : 'bg-white/5 border-white/10 text-gray-400 hover:text-white hover:bg-white/10'
        }`}
      title="Gerenciar Hábitos"
    >
      {isEditMode ? <X size={24} /> : <Settings size={24} />}
    </button>

    {isEditMode && (
      <div className="absolute top-20 right-6 text-red-400 text-xs font-bold uppercase tracking-widest animate-pulse z-50">
        Modo de Destruição Ativo
      </div>
    )}
  </>
);

//  Mensagem de Universo Vazio
export const EstadoVazio = () => (
  <div className="absolute inset-0 flex flex-col items-center justify-center z-0 pointer-events-none select-none">
    <div className="translate-y-32 flex flex-col items-center animate-in fade-in slide-in-from-bottom duration-1000">
      <h2 className="font-titulo text-lg text-white/40 tracking-[0.2em] uppercase text-center mb-1">
        Universo Vazio
      </h2>
      <p className="text-cyan-400/60 font-orbita text-xs tracking-wider animate-pulse">
        Adicione um novo hábito para começar.
      </p>
    </div>
  </div>
);

//  Botão Principal "Novo Hábito"
export const BotaoNovoHabito = ({ onClick }) => (
  <button 
    onClick={onClick}
    className="absolute bottom-10 px-8 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full hover:bg-white/10 hover:scale-105 transition-all text-sm font-bold tracking-wide shadow-lg group z-50"
  >
    <span className="bg-gradient-to-r from-cyan-300 to-purple-400 bg-clip-text text-transparent group-hover:text-white transition-colors flex items-center gap-2">
      <Plus size={18} className="text-cyan-300 group-hover:text-white" /> NOVO HÁBITO
    </span>
  </button>
);