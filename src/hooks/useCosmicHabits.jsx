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
  // Inicialização segura
  const [habits, setHabits] = useState(() => {
    try {
      const saved = localStorage.getItem('my-cosmic-habits');
      if (saved) {
        return JSON.parse(saved).map(h => ({
          ...h,
          history: h.history || [], 
          icon: getIconForName(h.name) // Recria o componente do ícone
        }));
      }
    } catch (error) {
      console.error("Erro ao carregar hábitos:", error);
    }
    // Retorna array vazio [] para permitir o "Estado Vazio" aparecer
    return []; 
  });

  // Salvar no LocalStorage sempre que mudar
  useEffect(() => {
    const toSave = habits.map(({ icon: _unused, ...rest }) => rest);
    localStorage.setItem('my-cosmic-habits', JSON.stringify(toSave));
  }, [habits]);

  // Adicionar Hábito
  const addHabit = (name, gradient) => {
    const newHabit = {
      id: Date.now(),
      name,
      icon: getIconForName(name),
      gradient,
      streak: 0,
      history: []
    };
    setHabits(prev => [...prev, newHabit]);
  };

  // Deletar Hábito (Sem window.confirm para evitar travamentos visuais)
  const deleteHabit = (id) => {
    // Filtra e cria um novo array sem o item deletado
    setHabits(prev => prev.filter(h => h.id !== id));
  };

  // Marcar ou Desmarcar (Toggle)
  const incrementStreak = (id) => {
    const today = new Date().toISOString().split('T')[0];

    setHabits(prev => prev.map(habit => {
      if (habit.id === id) {
        const history = habit.history || [];
        const isDoneToday = history.includes(today);
        
        let newHistory;
        let newStreak;

        if (isDoneToday) {
          // DESFAZER: Remove hoje da lista e diminui streak
          newHistory = history.filter(date => date !== today);
          newStreak = Math.max(0, habit.streak - 1); // Nunca menor que 0
        } else {
          // FAZER: Adiciona hoje e aumenta streak
          newHistory = [...history, today];
          newStreak = habit.streak + 1;
        }

        return { ...habit, history: newHistory, streak: newStreak };
      }
      return habit;
    }));
  };

  return { habits, addHabit, deleteHabit, incrementStreak };
};