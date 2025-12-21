import { useState, useEffect } from 'react';
import { Droplets, BookOpen, Rocket } from 'lucide-react';

// Helper para recuperar ícones
export const getIconForName = (name) => {
  const lower = name.toLowerCase();
  if (lower.includes('água') || lower.includes('agua')) return <Droplets size={22} strokeWidth={2.5} />;
  if (lower.includes('ler') || lower.includes('livro')) return <BookOpen size={22} strokeWidth={2.5} />;
  return <Rocket size={22} strokeWidth={2.5} />;
};

export const useCosmicHabits = () => {
  const [habits, setHabits] = useState(() => {
    const saved = localStorage.getItem('my-cosmic-habits');
    if (saved) {
      return JSON.parse(saved).map(h => ({
        ...h,
        // Garante que existe um array de histórico
        history: h.history || [], 
        icon: getIconForName(h.name) 
      }));
    }
    // Dados iniciais
    return [
        { id: 1, name: 'Beber Água', icon: <Droplets size={22} strokeWidth={2.5} />, gradient: 'from-cyan-300 via-cyan-500 to-blue-600', streak: 0, history: [] },
        { id: 2, name: 'Ler Livro', icon: <BookOpen size={22} strokeWidth={2.5} />, gradient: 'from-fuchsia-300 via-purple-500 to-indigo-600', streak: 0, history: [] },
    ];
  });

  useEffect(() => {
    // Salva sem o ícone
    const toSave = habits.map(({ icon, ...rest }) => rest);
    localStorage.setItem('my-cosmic-habits', JSON.stringify(toSave));
  }, [habits]);

  const addHabit = (name, gradient) => {
    const newHabit = {
      id: Date.now(),
      name,
      icon: getIconForName(name),
      gradient,
      streak: 0,
      history: [] // Novo hábito começa com histórico vazio
    };
    setHabits([...habits, newHabit]);
  };

  const deleteHabit = (id) => {
    if (window.confirm("Tem certeza que deseja destruir este hábito?")) {
      setHabits(habits.filter(h => h.id !== id));
    }
  };

  const incrementStreak = (id) => {
    // 1. Pega a data de hoje no formato YYYY-MM-DD
    const today = new Date().toISOString().split('T')[0];

    setHabits(habits.map(h => {
      if (h.id === id) {
        // Verifica se já tem histórico, se não, cria array vazio
        const currentHistory = h.history || [];

        // 2. Se a data de hoje JÁ está no histórico, não faz nada (evita clique duplo)
        if (currentHistory.includes(today)) {
          return h; 
        }

        // 3. Adiciona streak e salva a data no histórico
        return { 
          ...h, 
          streak: h.streak + 1,
          history: [...currentHistory, today] 
        };
      }
      return h;
    }));
  };

  return { habits, addHabit, deleteHabit, incrementStreak };
};