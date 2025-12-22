import { useState, useEffect } from 'react';
import { getIcon } from '../utils/iconMap'; 

export const useCosmicHabits = () => {
  // Inicialização segura
  const [habits, setHabits] = useState(() => {
    try {
      const saved = localStorage.getItem('my-cosmic-habits');
      if (saved) {
        return JSON.parse(saved).map(h => ({
          ...h,
          history: h.history || [], 
          // se nenhum icone for escolhido,usa rocket como padrao
          icon: getIcon(h.iconKey || 'rocket') 
        }));
      }
    } catch (error) {
      console.error("Erro ao carregar hábitos:", error);
    }
    return []; 
  });

  // Salvar no LocalStorage sempre que mudar
  useEffect(() => {
   
    const toSave = habits.map(({ icon: _unused, ...rest }) => rest);
    localStorage.setItem('my-cosmic-habits', JSON.stringify(toSave));
  }, [habits]);

  // Adicionar Hábito 
  const addHabit = (name, gradient, iconKey) => {
    const newHabit = {
      id: Date.now(),
      name,
      iconKey: iconKey, // Salva o ID do ícone (string)
      icon: getIcon(iconKey), 
      gradient,
      streak: 0,
      history: []
    };
    setHabits(prev => [...prev, newHabit]);
  };

  // Deletar Hábito
  const deleteHabit = (id) => {
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
          // DESFAZER
          newHistory = history.filter(date => date !== today);
          newStreak = Math.max(0, habit.streak - 1); 
        } else {
          // FAZER
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