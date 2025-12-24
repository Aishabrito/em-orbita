import React, { useState } from 'react';
import { useCosmicHabits } from '../hooks/useCosmicHabits';
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

const Universe = () => {
  // Lógica e Estado
  const { habits, addHabit, deleteHabit, incrementStreak } = useCosmicHabits();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  // audios
  const playSuccess = new Audio(successSfx);
  const playClick = new Audio(clickSfx);
  playSuccess.volume = 0.5; 
  playClick.volume = 0.3;

  const handleInteraction = (id) => {
    // MODO DESTRUIÇÃO 
    if (isEditMode) {
      deleteHabit(id);
      playClick.currentTime = 0;
      playClick.play();
      return;
    }

    // MODO NORMAL (Verifica o que vai acontecer antes de atualizar)
    const habit = habits.find(h => h.id === id);
    const today = getToday();
    const isDoneToday = habit.history.includes(today);

    if (!isDoneToday) {
      // --> Vai Completar: Toca som de VITÓRIA 🔊
      playSuccess.currentTime = 0;
      playSuccess.play().catch(e => console.log("Audio blocked:", e));
    } else {
      // --> Vai Desmarcar: Clique simples 🔊
      playClick.currentTime = 0;
      playClick.play().catch(e => console.log("Audio blocked:", e));
    }

    //  Executa a lógica original
    incrementStreak(id);
  };

  const totalStreak = habits ? habits.reduce((acc, h) => acc + h.streak, 0) : 0;
  const temHabitos = habits && habits.length > 0;

  return (
    <div className="relative flex items-center justify-center w-full h-screen overflow-hidden bg-[#0B0B15] text-white z-0">
      
      {/* Visual Estático */}
      <FundoCosmico />
      <CabecalhoUniverso />
      
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