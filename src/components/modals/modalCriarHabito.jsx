import React, { useState } from 'react';
import { X, Rocket } from 'lucide-react';
import { ICON_MAP } from '../../utils/iconMap'; 

// Opções de Cores Turbinadas (com cores para bordas e fundos sutis)
const COLOR_OPTIONS = {
  cyan: { 
    gradient: 'from-cyan-400 to-blue-600', 
    shadow: 'shadow-cyan-500/40',
    ring: 'focus:ring-cyan-500/50 focus:border-cyan-400/50',
    bgLight: 'bg-cyan-500/10'
  },
  purple: { 
    gradient: 'from-fuchsia-400 to-indigo-600', 
    shadow: 'shadow-purple-500/40',
    ring: 'focus:ring-fuchsia-500/50 focus:border-fuchsia-400/50',
    bgLight: 'bg-purple-500/10'
  },
  green: { 
    gradient: 'from-emerald-400 to-green-600', 
    shadow: 'shadow-emerald-500/40',
    ring: 'focus:ring-emerald-500/50 focus:border-emerald-400/50',
    bgLight: 'bg-emerald-500/10'
  },
  orange: { 
    gradient: 'from-yellow-400 to-orange-600', 
    shadow: 'shadow-orange-500/40',
    ring: 'focus:ring-orange-500/50 focus:border-orange-400/50',
    bgLight: 'bg-orange-500/10'
  },
  pink: { 
    gradient: 'from-pink-400 to-rose-600', 
    shadow: 'shadow-pink-500/40',
    ring: 'focus:ring-pink-500/50 focus:border-pink-400/50',
    bgLight: 'bg-pink-500/10'
  }
};

const CreateHabitModal = ({ isOpen, onClose, onSave }) => {
  const [name, setName] = useState('');
  const [selectedColor, setSelectedColor] = useState('cyan');
  const [selectedIcon, setSelectedIcon] = useState('rocket');

  if (!isOpen) return null;

  const activeTheme = COLOR_OPTIONS[selectedColor];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    // Envia os dados para salvar
    onSave(name, activeTheme.gradient, selectedIcon);
    
    // Reseta o estado e fecha
    setName('');
    setSelectedColor('cyan');
    setSelectedIcon('rocket');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 font-orbita">
      {/* Backdrop com desfoque mais suave e fundo escuro */}
      <div 
        className="absolute inset-0 bg-[#06080F]/80 backdrop-blur-md animate-in fade-in duration-300" 
        onClick={onClose}
      />
      
      {/* Brilho radial atrás do modal baseado na cor escolhida */}
      <div className={`absolute w-3/4 h-3/4 bg-gradient-to-r ${activeTheme.gradient} rounded-full blur-[120px] opacity-20 animate-in zoom-in duration-500 pointer-events-none`} />

      {/* Card do Modal (Estilo Glassmorphism) */}
      <div className="relative w-full max-w-md bg-gradient-to-b from-[#1A1A2E]/90 to-[#121220]/95 border border-white/10 rounded-[2rem] p-7 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col max-h-[90vh] backdrop-blur-xl">
        
        {/* Barra de Topo com Glow */}
        <div className={`absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r ${activeTheme.gradient} ${activeTheme.shadow} shadow-[0_0_15px]`} />
        
        {/* Cabeçalho */}
        <div className="flex justify-between items-center mb-8 pt-2">
          <div className="flex items-center gap-4">
             <div className={`p-3 rounded-2xl bg-gradient-to-br ${activeTheme.gradient} shadow-lg ${activeTheme.shadow} transition-all duration-300`}>
                {ICON_MAP[selectedIcon] && React.cloneElement(ICON_MAP[selectedIcon], { 
                  size: 24, 
                  className: "text-white drop-shadow-md" 
                })}
             </div>
             <div>
               <h2 className="text-2xl font-titulo font-bold text-white tracking-wide">Nova Missão</h2>
               <p className="text-xs text-gray-400 mt-0.5 tracking-wider uppercase">Configurar parâmetros</p>
             </div>
          </div>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-white transition-all p-2.5 rounded-full hover:bg-white/10 active:scale-95"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-7 overflow-y-auto pr-2 custom-scrollbar">
          
          {/* Input Nome */}
          <div className="group">
            <label className="block text-[11px] font-bold text-gray-400 uppercase mb-2.5 tracking-[0.2em] pl-1">Identificação</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Treino de Força..." 
              className={`w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:bg-white/10 transition-all placeholder-gray-600 text-lg font-medium shadow-inner ${activeTheme.ring}`}
              autoFocus
            />
          </div>

          {/* Seleção de ÍCONES */}
          <div>
            <label className="block text-[11px] font-bold text-gray-400 uppercase mb-2.5 tracking-[0.2em] pl-1">Simbologia</label>
            <div className="bg-black/30 p-3.5 rounded-2xl border border-white/5 shadow-inner">
              <div className="grid grid-cols-5 gap-2 max-h-36 overflow-y-auto pr-1 custom-scrollbar">
                {Object.entries(ICON_MAP).map(([key, iconComponent]) => (
                  <button
                    type="button"
                    key={key}
                    onClick={() => setSelectedIcon(key)}
                    className={`
                      aspect-square rounded-xl flex items-center justify-center transition-all duration-300 relative group
                      ${selectedIcon === key 
                        ? `${activeTheme.bgLight} text-white ring-1 ring-white/30 scale-110 z-10 shadow-lg` 
                        : 'text-gray-500 hover:text-gray-300 hover:bg-white/5 hover:scale-105'
                      }
                    `}
                    title={key}
                  >
                    {React.cloneElement(iconComponent, { 
                      size: selectedIcon === key ? 24 : 20,
                      className: "transition-all duration-300"
                    })}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Seleção de Cores */}
          <div>
            <label className="block text-[11px] font-bold text-gray-400 uppercase mb-2.5 tracking-[0.2em] pl-1">Fonte de Energia</label>
            <div className="flex gap-4 justify-center bg-black/30 p-5 rounded-2xl border border-white/5 shadow-inner">
              {Object.entries(COLOR_OPTIONS).map(([key, value]) => (
                <button
                  type="button" 
                  key={key}
                  onClick={() => setSelectedColor(key)}
                  className={`
                    w-10 h-10 rounded-full cursor-pointer transition-all duration-300 relative
                    bg-gradient-to-br ${value.gradient}
                    ${selectedColor === key 
                      ? `scale-125 ring-4 ring-white/20 ring-offset-4 ring-offset-[#161625] ${value.shadow}` 
                      : 'opacity-50 hover:opacity-100 hover:scale-110 hover:shadow-lg'
                    }
                  `}
                />
              ))}
            </div>
          </div>

          {/* Botão Salvar */}
          <div className="pt-2">
            <button 
              type="submit"
              disabled={!name.trim()}
              className={`
                w-full bg-gradient-to-r ${activeTheme.gradient} 
                text-white font-bold py-4.5 rounded-2xl
                transform active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-3 uppercase tracking-widest text-sm
                ${!name.trim() 
                  ? 'opacity-40 cursor-not-allowed grayscale' 
                  : `hover:brightness-110 ${activeTheme.shadow} shadow-lg hover:shadow-xl`
                }
              `}
              style={{ padding: '1.125rem' }}
            >
              <span>Lançar em Órbita</span>
              <Rocket size={18} className={name.trim() ? "animate-bounce" : ""} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateHabitModal;