import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Lock, Mail, ArrowRight } from 'lucide-react';
import { AuthLayout, AuthCard, AuthInput, AuthButton } from '../components/authComponents';

const Cadastro = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name) localStorage.setItem('cosmicUser', formData.name);
    navigate('/orbita');
  };

  return (
    <AuthLayout>
      <AuthCard animation="slide-in-from-right">
        <div className="text-center mb-6">
          <h1 className="font-titulo text-3xl font-bold text-white tracking-widest drop-shadow-lg mb-1">CRIAR CONTA</h1>
          <p className="text-gray-400 text-sm font-light">Prepare-se para o lançamento.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <AuthInput icon={User} type="text" name="name" placeholder="Nome do Astronauta" required onChange={handleChange} />
          <AuthInput icon={Mail} type="email" name="email" placeholder="seu@email.com" required onChange={handleChange} />
          <AuthInput icon={Lock} type="password" name="password" placeholder="Crie uma senha forte" required onChange={handleChange} />

          <AuthButton type="submit">
            Registrar <ArrowRight size={16} />
          </AuthButton>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-400 text-sm">
            Já tem uma conta? <button onClick={() => navigate('/login')} className="text-cyan-400 hover:text-white font-bold ml-1 transition-colors">Entrar</button>
          </p>
        </div>
      </AuthCard>
    </AuthLayout>
  );
};

export default Cadastro;