import React from 'react';
// 👇 A CORREÇÃO ESTÁ NESTA LINHA: Adicionamos o 'Route'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Universe from './pages/universe';
import HabitDetails from './pages/habitdetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Universe />} />
        <Route path="/detalhes/:id" element={<HabitDetails />} />
      </Routes>
    </Router>
  );
}

export default App;