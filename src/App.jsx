App · JSX
Copy

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';
import ProtectedRoute from './components/ProtectedRoute';
 
import Inicial from './pages/inicial';
import Login from './pages/login';
import Cadastro from './pages/cadastro';
import Universe from './pages/universe';
import HabitDetails from './pages/habitDetails';
import RecuperarSenha from './pages/recuperarSenha';
 
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Inicial />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/recuperar-senha" element={<RecuperarSenha />} />
 
          {/* Rotas protegidas */}
          <Route path="/orbita" element={
            <ProtectedRoute>
              <Universe />
            </ProtectedRoute>
          } />
          <Route path="/detalhes/:id" element={
            <ProtectedRoute>
              <HabitDetails />
            </ProtectedRoute>
          } />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
 
export default App;