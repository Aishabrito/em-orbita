import React from 'react';
import { 
  Rocket, Droplets, BookOpen, Dumbbell, 
  Moon, Sun, Coffee, Music, Laptop, 
  DollarSign, Heart, Gamepad2, Briefcase, 
  GraduationCap, Utensils
} from 'lucide-react';

// Mapeia uma string para o Componente Visual
export const ICON_MAP = {
  rocket: <Rocket size={22} strokeWidth={2.5} />,
  water: <Droplets size={22} strokeWidth={2.5} />,
  book: <BookOpen size={22} strokeWidth={2.5} />,
  gym: <Dumbbell size={22} strokeWidth={2.5} />,
  sleep: <Moon size={22} strokeWidth={2.5} />,
  sun: <Sun size={22} strokeWidth={2.5} />,
  coffee: <Coffee size={22} strokeWidth={2.5} />,
  music: <Music size={22} strokeWidth={2.5} />,
  code: <Laptop size={22} strokeWidth={2.5} />,
  money: <DollarSign size={22} strokeWidth={2.5} />,
  health: <Heart size={22} strokeWidth={2.5} />,
  game: <Gamepad2 size={22} strokeWidth={2.5} />,
  work: <Briefcase size={22} strokeWidth={2.5} />,
  study: <GraduationCap size={22} strokeWidth={2.5} />,
  food: <Utensils size={22} strokeWidth={2.5} />,
};

// Helper para pegar o ícone com segurança (se não achar, devolve Rocket)
export const getIcon = (key) => {
  return ICON_MAP[key] || ICON_MAP['rocket'];
};