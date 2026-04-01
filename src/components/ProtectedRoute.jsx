import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  // Ainda carregando o estado de auth
  if (user === undefined) {
    return (
      <div className="min-h-screen bg-[#0B0B15] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Não logado → redireciona para login
  if (!user) return <Navigate to="/login" replace />;

  return children;
};

export default ProtectedRoute;