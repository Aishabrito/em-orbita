import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Rocket, ArrowRight, ArrowLeft, Mail, CheckCircle } from 'lucide-react';
import { AuthLayout, AuthCard, AuthInput, AuthButton } from '../components/authComponents';

const RecuperarSenha = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSent(true);
  };

  return (
    <AuthLayout>
      <AuthCard animation="fade-in zoom-in-95">
        
        {/* Cabeçalho */}
        <div className="text-center mb-6">
          <div className="flex justify-center mb-4">
             <div className="relative">
                <div className="absolute -inset-2 bg-blue-500/20 blur-lg rounded-full"></div>
                <Rocket className="text-cyan-400 relative z-10 drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]" size={40} />
             </div>
          </div>
          <h1 className="font-titulo text-2xl font-bold text-white tracking-widest drop-shadow-lg uppercase">
            Recuperar Acesso
          </h1>
        </div>

        {!isSent ? (
          <>
            <p className="text-gray-400 text-sm text-center mb-6 font-light">
              Perdido no espaço? Digite seu e-mail para realinharmos sua órbita.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <AuthInput 
                icon={Mail} 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com" 
                required
              />

              <AuthButton type="submit">
                Enviar Link <ArrowRight size={16} />
              </AuthButton>
            </form>

            <div className="mt-8 text-center">
              <button 
                onClick={() => navigate('/login')} 
                className="text-gray-500 hover:text-white text-sm flex items-center justify-center gap-2 mx-auto transition-colors group"
              >
                <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Voltar para o Login
              </button>
            </div>
          </>
        ) : (
          /* Estado de Sucesso */
          <div className="text-center animate-in fade-in slide-in-from-bottom duration-500">
            <div className="flex justify-center mb-4">
              <CheckCircle className="text-green-400 drop-shadow-[0_0_10px_rgba(74,222,128,0.5)]" size={50} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Link Enviado!</h3>
            <p className="text-gray-400 text-sm mb-6">
              Verifique a caixa de entrada de <span className="text-cyan-300">{email}</span>.
            </p>
            
            <button 
              onClick={() => navigate('/login')}
              className="w-full bg-white/10 border border-white/10 text-white font-bold py-3 rounded-xl hover:bg-white/20 transition-all uppercase tracking-widest text-xs"
            >
              Voltar ao Login
            </button>
          </div>
        )}

      </AuthCard>
    </AuthLayout>
  );
};

export default RecuperarSenha;