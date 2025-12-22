import React, { useState } from 'react';
import { useCosmicHabits } from '../hooks/useCosmicHabits';
import Planet from '../components/planet';
import ModalCriarHabito from '../components/modals/modalCriarHabito.jsx';
import EstrelaCentral from '../components/estrelaCentral';
import { 
  FundoCosmico, 
  CabecalhoUniverso, 
  ControlesUniverso, 
  EstadoVazio, 
  BotaoNovoHabito 
} from '../components/componentsUniverse';

const Universe = () => {
  // Lógica e Estado
  const { habits, addHabit, deleteHabit, incrementStreak } = useCosmicHabits();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  // Handlers
  const handleInteraction = (id) => {
    if (isEditMode) deleteHabit(id);
    else incrementStreak(id);
  };

  const totalStreak = habits ? habits.reduce((acc, h) => acc + h.streak, 0) : 0;
  const temHabitos = habits && habits.length > 0;

  return (
    <div className="relative flex items-center justify-center w-full h-screen overflow-hidden bg-[#0B0B15] text-white">
      
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

      {/* Botão de Ação  */}
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