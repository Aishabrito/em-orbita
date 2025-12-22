import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Rocket, ArrowRight, Lock, Mail } from 'lucide-react';
import { AuthLayout, AuthCard, AuthInput, AuthButton } from '../components/authComponents';

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/orbita');
  };

  return (
    <AuthLayout>
      <AuthCard animation="slide-in-from-left">
        <div className="text-center mb-6">
          <div className="flex justify-center mb-4"><Rocket className="text-cyan-400 drop-shadow-lg" size={40} /></div>
          <h1 className="font-titulo text-3xl font-bold text-white tracking-widest drop-shadow-lg">LOGIN</h1>
          <p className="text-gray-400 text-sm font-light mt-1">Bem-vindo de volta, comandante.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <AuthInput icon={Mail} type="email" placeholder="seu@email.com" required />
          <AuthInput icon={Lock} type="password" placeholder="Sua senha" required />

          <div className="flex justify-end">
            <button type="button" onClick={() => navigate('/recuperar-senha')} className="text-xs text-gray-400 hover:text-cyan-400 transition-colors font-light">
              Esqueceu a senha?
            </button>
          </div>
          
          <AuthButton type="submit" variant="purple">
            Decolar <ArrowRight size={16} />
          </AuthButton>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-400 text-sm">
            Ainda não tem cadastro? <button onClick={() => navigate('/cadastro')} className="text-purple-400 hover:text-white font-bold ml-1 transition-colors">Criar Conta</button>
          </p>
        </div>
      </AuthCard>
    </AuthLayout>
  );
};

export default Login;