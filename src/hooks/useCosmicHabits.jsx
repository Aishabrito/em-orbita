import { useState, useEffect } from 'react';
import {
  collection,
  doc,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy
} from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from './useAuth';
import { getIcon } from '../utils/iconMap';

// helpers de data
const getToday = () => new Date().toISOString().split('T')[0];
const daysBetween = (d1, d2) =>
  Math.floor((new Date(d2) - new Date(d1)) / (1000 * 60 * 60 * 24));

const calcStatus = (history) => {
  if (!history || history.length === 0) return 'active';
  const lastDay = history[history.length - 1];
  const diff = daysBetween(lastDay, getToday());
  return diff >= 2 ? 'lost' : 'active';
};

export const useCosmicHabits = () => {
  const { user } = useAuth();
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔥 ESCUTA EM TEMPO REAL OS HÁBITOS DO USUÁRIO
  useEffect(() => {
    if (!user) {
      setHabits([]);
      setLoading(false);
      return;
    }

    const habitsRef = collection(db, 'users', user.uid, 'habits');
    const q = query(habitsRef, orderBy('createdAt', 'asc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const loaded = snapshot.docs.map(docSnap => {
        const data = docSnap.data();
        const history = data.history || [];
        return {
          ...data,
          id: docSnap.id,
          history,
          status: calcStatus(history),
          icon: getIcon(data.iconKey || 'rocket'),
          orbitOffset: data.orbitOffset ?? Math.random() * 360
        };
      });
      setHabits(loaded);
      setLoading(false);
    });

    return unsubscribe;
  }, [user]);

  // ➕ ADICIONAR HÁBITO
  const addHabit = async (name, gradient, iconKey) => {
    if (!user) return;

    const habitsRef = collection(db, 'users', user.uid, 'habits');
    await addDoc(habitsRef, {
      name,
      iconKey,
      gradient,
      streak: 0,
      history: [],
      status: 'active',
      orbitOffset: Math.random() * 360,
      createdAt: Date.now()
    });
  };

  // ❌ DELETAR
  const deleteHabit = async (id) => {
    if (!user) return;
    const habitRef = doc(db, 'users', user.uid, 'habits', id);
    await deleteDoc(habitRef);
  };

  // ✅ MARCAR / DESMARCAR
  const incrementStreak = async (id) => {
    if (!user) return;
    const today = getToday();

    const habit = habits.find(h => h.id === id);
    if (!habit) return;

    const history = habit.history || [];
    const lastDay = history[history.length - 1];
    const isDoneToday = lastDay === today;

    const habitRef = doc(db, 'users', user.uid, 'habits', id);

    // DESMARCAR
    if (isDoneToday) {
      await updateDoc(habitRef, {
        history: history.slice(0, -1),
        streak: Math.max(0, habit.streak - 1),
        status: 'active'
      });
      return;
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
        if (habit.streak > 0) newStatus = 'restarted';
      }
    }

    await updateDoc(habitRef, {
      history: [...history, today],
      streak: newStreak,
      status: newStatus
    });
  };

  return {
    habits,
    loading,
    addHabit,
    deleteHabit,
    incrementStreak
  };
};