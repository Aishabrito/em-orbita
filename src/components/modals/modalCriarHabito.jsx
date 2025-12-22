import React, { useState } from 'react';
import { X, Rocket } from 'lucide-react';

const COLOR_OPTIONS = {
  cyan: { gradient: 'from-cyan-300 via-cyan-500 to-blue-600', shadow: 'shadow-cyan-500/50' },
  purple: { gradient: 'from-fuchsia-300 via-purple-500 to-indigo-600', shadow: 'shadow-purple-500/50' },
  green: { gradient: 'from-emerald-300 via-emerald-500 to-green-700', shadow: 'shadow-emerald-500/50' },
  orange: { gradient: 'from-yellow-300 via-amber-500 to-orange-600', shadow: 'shadow-orange-500/50' },
  pink: { gradient: 'from-pink-300 via-rose-500 to-red-600', shadow: 'shadow-pink-500/50' }
};

const CreateHabitModal = ({ isOpen, onClose, onSave }) => {
  const [name, setName] = useState('');
  const [selectedColor, setSelectedColor] = useState('cyan');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSave(name, COLOR_OPTIONS[selectedColor].gradient);
    
    // Resetar
    setName('');
    setSelectedColor('cyan');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0B0D17]/80 backdrop-blur-sm p-4 animate-in fade-in duration-300 font-orbita">
      
      {/* Card do Modal */}
      <div className="relative w-full max-w-md bg-[#161625]/90 border border-white/10 rounded-3xl p-8 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        
        {/* Barra de Topo Colorida */}
        <div className={`absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r ${COLOR_OPTIONS[selectedColor].gradient} shadow-[0_0_20px_rgba(255,255,255,0.4)]`}></div>
        
        {/* Cabeçalho */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
             <div className={`p-2 rounded-lg bg-gradient-to-br ${COLOR_OPTIONS[selectedColor].gradient} bg-opacity-20`}>
                <Rocket className="text-white drop-shadow-md" size={20} />
             </div>
             <h2 className="text-2xl font-titulo font-bold text-white tracking-wide">Novo Hábito</h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Input Nome */}
          <div className="group">
            <label className="block text-xs font-bold text-gray-400 uppercase mb-2 tracking-widest pl-1">Nome da Missão</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Ler 10 páginas..." 
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-white/30 focus:bg-black/60 transition-all placeholder-gray-600 text-lg"
              autoFocus
            />
          </div>

          {/* Seleção de Cor */}
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-3 tracking-widest pl-1">Tipo de Energia</label>
            <div className="flex gap-4 justify-center bg-black/30 p-5 rounded-2xl border border-white/5">
              {Object.entries(COLOR_OPTIONS).map(([key, value]) => (
                <button
                  type="button" 
                  key={key}
                  onClick={() => setSelectedColor(key)}
                  className={`
                    w-10 h-10 rounded-full cursor-pointer transition-all duration-300 relative
                    bg-gradient-to-br ${value.gradient}
                    ${selectedColor === key 
                      ? `scale-125 ring-2 ring-white ring-offset-2 ring-offset-[#161625] ${value.shadow}` 
                      : 'opacity-40 hover:opacity-100 hover:scale-110'
                    }
                  `}
                />
              ))}
            </div>
          </div>

          {/* Botão Salvar */}
          <button 
            type="submit"
            disabled={!name.trim()}
            className={`
              w-full mt-4 bg-gradient-to-r ${COLOR_OPTIONS[selectedColor].gradient} 
              text-white font-bold py-4 rounded-xl shadow-[0_0_20px_rgba(0,0,0,0.3)] 
              transform active:scale-95 transition-all flex items-center justify-center gap-2 uppercase tracking-widest
              ${!name.trim() ? 'opacity-50 cursor-not-allowed grayscale' : 'hover:brightness-110 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]'}
            `}
          >
            Lançar em Órbita <Rocket size={18} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateHabitModal;