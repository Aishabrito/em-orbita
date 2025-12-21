import React, { useState } from 'react';
import { X } from 'lucide-react';

const COLOR_OPTIONS = {
  cyan: { gradient: 'from-cyan-300 via-cyan-500 to-blue-600' },
  purple: { gradient: 'from-fuchsia-300 via-purple-500 to-indigo-600' },
  green: { gradient: 'from-emerald-300 via-emerald-500 to-green-700' },
  orange: { gradient: 'from-yellow-300 via-amber-500 to-orange-600' },
  pink: { gradient: 'from-pink-300 via-rose-500 to-red-600' }
};

const CreateHabitModal = ({ isOpen, onClose, onSave }) => {
  const [name, setName] = useState('');
  const [selectedColor, setSelectedColor] = useState('cyan');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSave(name, COLOR_OPTIONS[selectedColor].gradient);
    
    // Resetar campos
    setName('');
    setSelectedColor('cyan');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-[#0B0B15]/95 border border-white/10 rounded-2xl p-6 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Linha colorida no topo (Dinâmica) */}
        <div className={`absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r ${COLOR_OPTIONS[selectedColor].gradient} shadow-[0_0_15px_rgba(255,255,255,0.3)]`}></div>
        
        <div className="flex justify-between items-center mb-6 mt-2">
          <h2 className="text-xl font-bold text-white tracking-wide">Criar Novo Hábito</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10">
            <X size={22} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-2 tracking-wider">Nome da Missão</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Beber água, Meditar..." 
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all placeholder-gray-600"
              autoFocus
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-3 tracking-wider">Energia (Cor)</label>
            <div className="flex gap-3 justify-center bg-black/20 p-4 rounded-xl border border-white/5">
              {Object.entries(COLOR_OPTIONS).map(([key, value]) => (
                <button
                  type="button" 
                  key={key}
                  onClick={() => setSelectedColor(key)}
                  className={`
                    w-9 h-9 rounded-full cursor-pointer transition-all duration-300 relative
                    bg-gradient-to-br ${value.gradient}
                    ${selectedColor === key 
                      ? 'scale-125 ring-2 ring-white ring-offset-2 ring-offset-[#0B0B15] shadow-[0_0_15px_rgba(255,255,255,0.4)]' 
                      : 'opacity-50 hover:opacity-100 hover:scale-110'
                    }
                  `}
                />
              ))}
            </div>
          </div>

          <button 
            type="submit"
            disabled={!name.trim()}
            className={`
              w-full mt-2 bg-gradient-to-r ${COLOR_OPTIONS[selectedColor].gradient} 
              text-white font-bold py-3.5 rounded-xl shadow-lg transform active:scale-95 transition-all
              ${!name.trim() ? 'opacity-50 cursor-not-allowed grayscale' : 'hover:brightness-110 hover:shadow-purple-500/20'}
            `}
          >
            Lançar em Órbita 🚀
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateHabitModal;