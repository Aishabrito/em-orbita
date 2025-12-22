import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Rocket, ArrowRight, ArrowLeft, Mail, CheckCircle } from 'lucide-react';
import fundoGalaxia from '../assets/fundogalaxia.png';

const RecuperarSenha = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isSent, setIsSent] = useState(false); // Controla se já enviou ou não

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui viria a lógica real de enviar o email
    // Vamos simular que deu certo:
    setIsSent(true);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#0B0D17] text-white flex items-center justify-center font-orbita">
      
      {/* --- BACKGROUND  --- */}
      <div className="absolute inset-0 bg-cover bg-center opacity-40 pointer-events-none"
           style={{ backgroundImage: `url(${fundoGalaxia})` }}></div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B0D17] via-transparent to-[#0B0D17] pointer-events-none"></div>

      {/* --- CARD DE RECUPERAÇÃO --- */}
      <div className="z-20 w-full max-w-md p-8 bg-[#161625]/60 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl animate-in fade-in zoom-in-95 duration-500">
        
        {/* Cabeçalho com Logo */}
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

        {/*  FORMULÁRIO DE EMAIL*/}
        {!isSent ? (
          <>
            <p className="text-gray-400 text-sm text-center mb-6 font-light">
              Perdido no espaço? Digite seu e-mail para realinharmos sua órbita.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="relative group">
                <Mail className="absolute left-4 top-3.5 text-gray-500 group-focus-within:text-cyan-400 transition-colors" size={18} />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com" 
                  required
                  className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white focus:border-cyan-500/50 focus:outline-none transition-all placeholder:text-gray-600"
                />
              </div>

              <button type="submit"
                className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold py-3.5 rounded-xl hover:shadow-[0_0_20px_rgba(8,145,178,0.4)] hover:scale-[1.02] transition-all flex items-center justify-center gap-2 uppercase tracking-widest text-sm">
                Enviar Link <ArrowRight size={16} />
              </button>
            </form>
          </>
        ) : (
          /* MENSAGEM DE SUCESSO */
          <div className="text-center animate-in fade-in slide-in-from-bottom duration-500">
            <div className="flex justify-center mb-4">
              <CheckCircle className="text-green-400 drop-shadow-[0_0_10px_rgba(74,222,128,0.5)]" size={50} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Link Enviado!</h3>
            <p className="text-gray-400 text-sm mb-6">
              Verifique a caixa de entrada de <span className="text-cyan-300">{email}</span> e siga as instruções para redefinir sua senha.
            </p>
            <button 
              onClick={() => navigate('/login')}
              className="w-full bg-white/10 border border-white/10 text-white font-bold py-3 rounded-xl hover:bg-white/20 transition-all uppercase tracking-widest text-xs"
            >
              Voltar ao Login
            </button>
          </div>
        )}

        {/* Rodapé: Voltar  */}
        {!isSent && (
          <div className="mt-8 text-center">
            <button 
              onClick={() => navigate('/login')} 
              className="text-gray-500 hover:text-white text-sm flex items-center justify-center gap-2 mx-auto transition-colors group"
            >
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Voltar para o Login
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default RecuperarSenha;