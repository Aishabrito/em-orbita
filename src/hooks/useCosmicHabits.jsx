import { useState, useEffect } from 'react';
import {
  collection,
  doc,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  query
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
  const lastDay = [...history].sort()[history.length - 1];
  const diff = daysBetween(lastDay, getToday());
  return diff >= 2 ? 'lost' : 'active';
};

// Calcula streak real sempre do histórico
const calcStreak = (history) => {
  if (!history || history.length === 0) return 0;
  const sorted = [...history].sort().reverse();
  let streak = 0;
  let expected = getToday();
  for (const day of sorted) {
    const diff = daysBetween(day, expected);
    if (diff === 0) {
      streak++;
      const d = new Date(expected);
      d.setDate(d.getDate() - 1);
      expected = d.toISOString().split('T')[0];
    } else if (diff < 0) {
      continue;
    } else {
      break;
    }
  }
  return streak;
};

export const useCosmicHabits = () => {
  const { user } = useAuth();
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      setHabits([]);
      return;
    }

    setLoading(true);

    const habitsRef = collection(db, 'users', user.uid, 'habits');
    const q = query(habitsRef);

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const loaded = snapshot.docs.map(docSnap => {
          const data = docSnap.data();
          const history = data.history || [];
          return {
            ...data,
            id: docSnap.id,
            history,
            streak: calcStreak(history),
            status: calcStatus(history),
            icon: getIcon(data.iconKey || 'rocket'),
            orbitOffset: data.orbitOffset ?? Math.random() * 360
          };
        });
        setHabits(loaded);
        setLoading(false);
      },
      (error) => {
        console.error('Firestore error:', error);
        setHabits([]);
        setLoading(false);
      }
    );

    const timeout = setTimeout(() => setLoading(false), 5000);

    return () => {
      unsubscribe();
      clearTimeout(timeout);
    };
  }, [user]);

  // ➕ ADICIONAR
  const addHabit = async (name, gradient, iconKey) => {
    if (!user) return;
    const habitsRef = collection(db, 'users', user.uid, 'habits');
    await addDoc(habitsRef, {
      name,
      iconKey,
      gradient,
      history: [],
      status: 'active',
      orbitOffset: Math.random() * 360,
      createdAt: Date.now()
    });
  };

  // ✏️ EDITAR
  const editHabit = async (id, name, gradient, iconKey) => {
    if (!user) return;
    const habitRef = doc(db, 'users', user.uid, 'habits', id);
    await updateDoc(habitRef, { name, gradient, iconKey });
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
    const isDoneToday = history.includes(today);
    const habitRef = doc(db, 'users', user.uid, 'habits', id);

    if (isDoneToday) {
      await updateDoc(habitRef, {
        history: history.filter(d => d !== today),
        status: 'active'
      });
    } else {
      await updateDoc(habitRef, {
        history: [...history, today],
        status: 'active'
      });
    }
  };

  return {
    habits,
    loading,
    addHabit,
    editHabit,
    deleteHabit,
    incrementStreak
  };
};