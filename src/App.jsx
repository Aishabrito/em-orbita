import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Importando seus arquivos reais da pasta pages
// (Mantendo letras minúsculas no import para bater com seus arquivos)
import Universe from './pages/universe'; 
import HabitDetails from './pages/habitDetails';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Universe />} />
        
        <Route path="/detalhes/:id" element={<HabitDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;