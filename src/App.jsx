import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// IMPORTS DAS PÁGINAS
// Certifique-se de que os nomes dos arquivos na pasta 'pages' estão iguais a estes:
import Inicial from './pages/inicial';       // A nova Capa (Landing Page)
import Login from './pages/login';           // O formulário de Login/Cadastro (Antigo Inicial)
import Universe from './pages/universe';     // O Sistema Solar de Hábitos
import HabitDetails from './pages/habitdetails'; // Detalhes do Hábito

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Inicial />} />

        <Route path="/login" element={<Login />} />

        <Route path="/orbita" element={<Universe />} />

        <Route path="/detalhes/:id" element={<HabitDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;