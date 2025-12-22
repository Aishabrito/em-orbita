import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Rocket } from 'lucide-react'; 
import fundoGalaxia from '../assets/fundogalaxia.png';

const Inicial = () => {
  const navigate = useNavigate();

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#050505] text-white selection:bg-cyan-500/30">
      
      {/* Imagem de fundo */}
      <div className="absolute inset-0 bg-cover bg-center opacity-80"
           style={{ backgroundImage: `url(${fundoGalaxia})` }}></div>
    
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#000000_90%)] pointer-events-none"></div>


      {/* BOTÕES DO TOPO */}
      <div className="absolute top-10 right-10 z-50 flex items-center gap-6">
        
        {/* Botão ENTRAR  */}
        <button 
          onClick={() => navigate('/login')} 
          className="px-8 py-2.5 rounded-lg border border-gray-500/50 bg-black/20 backdrop-blur-sm text-gray-200 hover:text-white hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(34,211,238,0.5)] transition-all duration-300 tracking-widest uppercase text-sm font-bold font-orbita"
        >
          Entrar
        </button>

        {/* Botão CADASTRE-SE  */}
        <button 
           onClick={() => navigate('/cadastro')} 
           className="group relative px-8 py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-[0_0_20px_rgba(34,211,238,0.4)] hover:shadow-[0_0_35px_rgba(147,51,234,0.6)] hover:scale-105 transition-all duration-300"
        >
           <span className="relative z-10 flex items-center gap-2 tracking-widest uppercase text-sm font-bold font-orbita">
             Cadastre-se <Rocket size={16} className="text-white fill-white" />
           </span>
        </button>
      </div>
      <main className="absolute top-1/2 left-16 md:left-24 -translate-y-1/2 max-w-4xl z-10 pr-4">
        
        {/* Logo  "EM ÓRBITA" */}
        <div className="flex items-center gap-3 mb-6 animate-in fade-in slide-in-from-left duration-700">
           <Rocket className="text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]" size={28} />
           <span className="font-titulo text-xl tracking-[0.1em] text-gray-200 uppercase font-bold drop-shadow-md">
             Em Órbita
           </span>
        </div>
        
        <h1 className="font-titulo text-5xl md:text-7xl lg:text-[5rem] font-bold text-white leading-[1.1] mb-6 drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)] animate-in fade-in slide-in-from-bottom duration-1000 delay-200 uppercase">
          Transforme <br />
          Pequenos Hábitos <br />
          Em Constância.
        </h1>
        
        {/* Subtítulo */}
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl leading-relaxed font-orbita font-light tracking-wide animate-in fade-in slide-in-from-bottom duration-1000 delay-500">
          Em Órbita, cada novo hábito é um planeta que você adiciona <br className="hidden md:block"/>
          à sua galáxia pessoal. Comece a construir seu universo hoje.
        </p>

      </main>

    </div>
  );
};

export default Inicial;