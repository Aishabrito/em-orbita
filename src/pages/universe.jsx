import React, { useState } from 'react';
import { useCosmicHabits } from '../hooks/useCosmicHabits';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import Planet from '../components/planet.jsx';
import ModalCriarHabito from '../components/modals/modalCriarHabito.jsx';
import EstrelaCentral from '../components/estrelaCentral';
import { getToday } from '../utils/date';
import {
  FundoCosmico,
  CabecalhoUniverso,
  ControlesUniverso,
  EstadoVazio,
  BotaoNovoHabito
} from '../components/componentsUniverse';
import successSfx from '../assets/success.mp3';
import clickSfx from '../assets/click.mp3';
import { LogOut } from 'lucide-react';

const Universe = () => {
  const { habits, loading, addHabit, deleteHabit, incrementStreak } = useCosmicHabits();
  
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  // audios
  const playSuccess = new Audio(successSfx);
  const playClick = new Audio(clickSfx);
  playSuccess.volume = 0.5;
  playClick.volume = 0.3;

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  const handleInteraction = (id) => {
    if (isEditMode) {
      deleteHabit(id);
      playClick.currentTime = 0;
      playClick.play();
      return;
    }

    const habit = habits.find(h => h.id === id);
    const today = getToday();
    const isDoneToday = habit.history.includes(today);

    if (!isDoneToday) {
      playSuccess.currentTime = 0;
      playSuccess.play().catch(e => console.log("Audio blocked:", e));
    } else {
      playClick.currentTime = 0;
      playClick.play().catch(e => console.log("Audio blocked:", e));
    }

    incrementStreak(id);
  };

  const totalStreak = habits ? habits.reduce((acc, h) => acc + h.streak, 0) : 0;
  const temHabitos = habits && habits.length > 0;

  // Loading enquanto busca dados do Firestore
  if (loading) {
    return (
      <div className="relative flex items-center justify-center w-full h-screen bg-[#0B0B15]">
        <FundoCosmico />
        <div className="z-10 flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-400 text-sm tracking-widest uppercase font-light">Carregando sua galáxia...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex items-center justify-center w-full h-screen overflow-hidden bg-[#0B0B15] text-white z-0">

      {/* Visual Estático */}
      <FundoCosmico />
      <CabecalhoUniverso />

      {/* Botão de Logout */}
      <button
        onClick={handleLogout}
        title="Sair da conta"
        className="absolute top-6 right-20 z-50 flex items-center gap-2 text-gray-400 hover:text-red-400 transition-colors bg-white/5 hover:bg-red-500/10 border border-white/10 hover:border-red-500/30 px-4 py-2.5 rounded-full backdrop-blur-md text-xs uppercase tracking-widest font-bold"
      >
        <LogOut size={14} />
        Sair
      </button>

      {/* Controles de Interface */}
      <ControlesUniverso
        isEditMode={isEditMode}
        toggleEdit={() => setIsEditMode(!isEditMode)}
      />

      {/* O Usuário (Centro) */}
      <EstrelaCentral isEditMode={isEditMode} totalStreak={totalStreak} />

      {/* Se não tiver hábitos, mostra mensagem */}
      {!temHabitos && <EstadoVazio />}

      {/* Renderiza os Planetas */}
      {temHabitos && habits.map((habit, index) => (
        <Planet
          key={habit.id}
          habit={habit}
          index={index}
          totalHabits={habits.length}
          isEditMode={isEditMode}
          onInteract={handleInteraction}
        />
      ))}

      {/* Botão de Ação */}
      {!isEditMode && (
        <BotaoNovoHabito onClick={() => setIsModalOpen(true)} />
      )}

      {/* Modal de Criação */}
      <ModalCriarHabito
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={addHabit}
      />
    </div>
  );
};

export default Universe;