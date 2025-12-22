import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Inicial from './pages/inicial';     
import Login from './pages/login';         
import Cadastro from './pages/cadastro';    
import Universe from './pages/universe'; 
import HabitDetails from './pages/habitdetails';
import RecuperarSenha from './pages/recuperarSenha';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<Inicial />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} /> 
        <Route path="/orbita" element={<Universe />} />
        <Route path="/detalhes/:id" element={<HabitDetails />} />
        <Route path="/recuperar-senha" element={<RecuperarSenha />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;