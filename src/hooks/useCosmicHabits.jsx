import { useState, useEffect } from 'react';
import { getIcon } from '../utils/iconMap';

// helpers simples de data
const getToday = () => new Date().toISOString().split('T')[0];
const daysBetween = (d1, d2) =>
  Math.floor((new Date(d2) - new Date(d1)) / (1000 * 60 * 60 * 24));

export const useCosmicHabits = () => {
  // INICIALIZAÇÃO SEGURA
  const [habits, setHabits] = useState(() => {
    try {
      const saved = localStorage.getItem('my-cosmic-habits');
      if (!saved) return [];

      return JSON.parse(saved).map(habit => {
        const history = habit.history || [];
        const today = getToday();

        let status = 'active';

        if (history.length > 0) {
          const lastDay = history[history.length - 1];
          const diff = daysBetween(lastDay, today);

          if (diff >= 2) {
            status = 'lost';
          }
        }

        return {
          ...habit,
          history,
          status,
          icon: getIcon(habit.iconKey || 'rocket'),
          orbitOffset: habit.orbitOffset ?? Math.random() * 360
        };
      });
    } catch (err) {
      console.error('Erro ao carregar hábitos:', err);
      return [];
    }
  });

  // 💾 SALVAR NO LOCALSTORAGE
  useEffect(() => {
    const toSave = habits.map(({ icon, ...rest }) => rest);
    localStorage.setItem('my-cosmic-habits', JSON.stringify(toSave));
  }, [habits]);

  // ➕ ADICIONAR HÁBITO
  const addHabit = (name, gradient, iconKey) => {
    const newHabit = {
      id: Date.now(),
      name,
      iconKey,
      icon: getIcon(iconKey),
      gradient,
      streak: 0,
      history: [],
      status: 'active',

      // 🌍 ângulo fixo da órbita
      orbitOffset: Math.random() * 360
    };

    setHabits(prev => [...prev, newHabit]);
  };

  // ❌ DELETAR
  const deleteHabit = (id) => {
    setHabits(prev => prev.filter(h => h.id !== id));
  };

  // ✅ MARCAR / DESMARCAR
  const incrementStreak = (id) => {
    const today = getToday();

    setHabits(prev =>
      prev.map(habit => {
        if (habit.id !== id) return habit;

        const history = habit.history || [];
        const lastDay = history[history.length - 1];
        const isDoneToday = lastDay === today;

        // DESMARCAR
        if (isDoneToday) {
          return {
            ...habit,
            history: history.slice(0, -1),
            streak: Math.max(0, habit.streak - 1),
            status: 'active'
          };
        }

        // MARCAR
        let newStreak = 1;
        let newStatus = 'active';

        if (lastDay) {
          const diff = daysBetween(lastDay, today);

          if (diff === 1) {
            newStreak = habit.streak + 1;
          } else {
            newStreak = 1;
            if (habit.streak > 0) {
              newStatus = 'restarted';
            }
          }
        }

        return {
          ...habit,
          history: [...history, today],
          streak: newStreak,
          status: newStatus
        };
      })
    );
  };

  return {
    habits,
    addHabit,
    deleteHabit,
    incrementStreak
  };
};
