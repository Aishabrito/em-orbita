import React, { useState, useEffect } from 'react';
import { X, Pencil } from 'lucide-react';
import { ICON_MAP } from '../../utils/iconMap';

const COLOR_OPTIONS = {
  cyan: { gradient: 'from-cyan-300 via-cyan-500 to-blue-600', shadow: 'shadow-cyan-500/50' },
  purple: { gradient: 'from-fuchsia-300 via-purple-500 to-indigo-600', shadow: 'shadow-purple-500/50' },
  green: { gradient: 'from-emerald-300 via-emerald-500 to-green-700', shadow: 'shadow-green-500/50' },
  orange: { gradient: 'from-yellow-300 via-amber-500 to-orange-600', shadow: 'shadow-orange-500/50' },
  pink: { gradient: 'from-pink-300 via-rose-500 to-red-600', shadow: 'shadow-pink-500/50' }
};

const getColorKey = (gradient) => {
  return Object.entries(COLOR_OPTIONS).find(([, v]) => v.gradient === gradient)?.[0] || 'cyan';
};

const ModalEditarHabito = ({ isOpen, onClose, habit, onSave }) => {
  const [name, setName] = useState('');
  const [selectedColor, setSelectedColor] = useState('cyan');
  const [selectedIcon, setSelectedIcon] = useState('rocket');

  useEffect(() => {
    if (habit && isOpen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setName(habit.name || '');
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelectedColor(getColorKey(habit.gradient));
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelectedIcon(habit.iconKey || 'rocket');
    }
  }, [habit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSave(name, COLOR_OPTIONS[selectedColor].gradient, selectedIcon);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0B0D17]/80 backdrop-blur-sm p-4 animate-in fade-in duration-300 font-orbita">
      <div className="relative w-full max-w-md bg-[#161625]/95 border border-white/10 rounded-3xl p-6 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col max-h-[90vh]">

        <div className={`absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r ${COLOR_OPTIONS[selectedColor].gradient} shadow-[0_0_20px_rgba(255,255,255,0.4)]`}></div>

        <div className="flex justify-between items-center mb-6 pt-2">
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-xl bg-gradient-to-br ${COLOR_OPTIONS[selectedColor].gradient} bg-opacity-20`}>
              {ICON_MAP[selectedIcon] && React.cloneElement(ICON_MAP[selectedIcon], { size: 22, className: "text-white drop-shadow-md" })}
            </div>
            <h2 className="text-xl font-titulo font-bold text-white tracking-wide">Editar Hábito</h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 overflow-y-auto pr-2 custom-scrollbar">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-2 tracking-widest pl-1">Nome da Missão</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Treino Pesado..."
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-white/30 focus:bg-black/60 transition-all placeholder-gray-600 text-lg"
              autoFocus
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-3 tracking-widest pl-1">Identificação Visual</label>
            <div className="bg-black/20 p-3 rounded-2xl border border-white/5">
              <div className="grid grid-cols-5 gap-2 max-h-32 overflow-y-auto pr-1">
                {Object.entries(ICON_MAP).map(([key, iconComponent]) => (
                  <button
                    type="button"
                    key={key}
                    onClick={() => setSelectedIcon(key)}
                    className={`aspect-square rounded-xl flex items-center justify-center transition-all duration-200 ${
                      selectedIcon === key
                        ? 'bg-white/10 text-white ring-1 ring-white/50 scale-105'
                        : 'text-gray-500 hover:text-white hover:bg-white/5 hover:scale-110'
                    }`}
                  >
                    {React.cloneElement(iconComponent, { size: 20 })}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-3 tracking-widest pl-1">Tipo de Energia</label>
            <div className="flex gap-3 justify-center bg-black/20 p-4 rounded-2xl border border-white/5">
              {Object.entries(COLOR_OPTIONS).map(([key, value]) => (
                <button
                  type="button"
                  key={key}
                  onClick={() => setSelectedColor(key)}
                  className={`w-9 h-9 rounded-full cursor-pointer transition-all duration-300 bg-gradient-to-br ${value.gradient} ${
                    selectedColor === key
                      ? `scale-125 ring-2 ring-white ring-offset-2 ring-offset-[#161625] ${value.shadow}`
                      : 'opacity-40 hover:opacity-100 hover:scale-110'
                  }`}
                />
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={!name.trim()}
            className={`w-full mt-2 bg-gradient-to-r ${COLOR_OPTIONS[selectedColor].gradient} text-white font-bold py-4 rounded-xl transform active:scale-95 transition-all flex items-center justify-center gap-2 uppercase tracking-widest ${
              !name.trim() ? 'opacity-50 cursor-not-allowed grayscale' : 'hover:brightness-110'
            }`}
          >
            Salvar Alterações <Pencil size={16} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalEditarHabito;