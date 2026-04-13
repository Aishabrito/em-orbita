import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Rocket, Globe, Star, ArrowLeft } from 'lucide-react';
import fundoGalaxia from '../assets/fundogalaxia.png';
import Footer from '../components/footer'; // Ajuste o caminho se salvou em outra pasta

const FeatureCard = ({ icon, step, title, description, color }) => {
  const IconComponent = icon; 

  return (
    <div className="bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-md hover:bg-white/[0.08] transition-all group">
      <div 
        className="w-12 h-12 rounded-lg flex items-center justify-center mb-6 border transition-transform group-hover:scale-110"
        style={{ backgroundColor: `${color}22`, borderColor: `${color}44` }}
      >
        <IconComponent size={24} color={color} />
      </div>
      <span className="text-[10px] font-bold tracking-[0.2em] uppercase mb-2 block font-orbita" style={{ color }}>
        {step}
      </span>
      <h3 className="text-xl font-bold text-white mb-4 uppercase tracking-tight font-titulo">{title}</h3>
      <p className="text-gray-400 leading-relaxed text-sm font-light tracking-wide font-orbita">
        {description}
      </p>
    </div>
  );
};

const ComoFunciona = () => {
  const navigate = useNavigate();

  return (
    <div className="relative h-screen w-full bg-[#050505] text-white selection:bg-cyan-500/30 overflow-y-auto overflow-x-hidden">
      
      {/* Background persistente */}
      <div className="fixed inset-0 bg-cover bg-center opacity-40 z-0 pointer-events-none"
           style={{ backgroundImage: `url(${fundoGalaxia})` }}></div>
      <div className="fixed inset-0 bg-black/60 z-0 pointer-events-none"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-20 pb-8">
        
        {/* Voltar */}
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors mb-16 uppercase text-xs font-bold tracking-widest font-orbita"
        >
          <ArrowLeft size={16} /> Voltar para a galáxia
        </button>

        <header className="mb-20">
          <h2 className="text-4xl md:text-6xl font-bold uppercase leading-tight mb-6 font-titulo">
            A ciência por trás <br /> 
            <span className="text-cyan-400">da órbita</span>
          </h2>
          <p className="text-gray-400 max-w-xl text-lg font-light font-orbita">
            O Em Órbita utiliza gamificação e feedback visual para transformar 
            a disciplina em uma experiência sensorial e astronômica.
          </p>
        </header>

        {/* Grid de Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard 
            icon={Rocket}
            step="01. Ignição"
            title="Materialize Hábitos"
            description="Cada novo hábito é um planeta. Defina o nome e a cor. Ao criar, você inicia uma nova órbita no seu sistema solar pessoal."
            color="#22d3ee"
          />
          <FeatureCard 
            icon={Globe}
            step="02. Sustentação"
            title="Mantenha a Velocidade"
            description="Ao completar um hábito hoje, seu planeta brilha e a órbita se torna vibrante. A consistência realimenta o núcleo do seu planeta."
            color="#a855f7"
          />
          <FeatureCard 
            icon={Star}
            step="03. Gravidade"
            title="Cuidado com o Vácuo"
            description="A ausência de ação por mais de 48h faz o planeta perder cor e desacelerar. Se não for cuidado, ele se apaga na imensidão."
            color="#f59e0b"
          />
        </div>

        {/* Seção: Métricas e Tech */}
        <div className="mt-32 flex flex-col md:flex-row gap-12 items-center">
          <div className="flex-1">
            <span className="text-cyan-400 font-bold tracking-[0.2em] uppercase text-xs mb-4 block font-orbita">
              Telemetria Avançada
            </span>
            <h2 className="text-3xl md:text-4xl font-bold uppercase leading-tight mb-6 font-titulo">
              Seu progresso <br/> mapeado em dados
            </h2>
            <p className="text-gray-400 text-base font-light font-orbita leading-relaxed mb-6">
              Acompanhe suas sequências de sucesso (streaks) e analise o histórico do seu universo. 
              Tudo salvo em nuvem com segurança, garantindo que sua galáxia seja única e intransferível.
            </p>
            
            <div className="flex flex-wrap gap-3 mt-8">
              <span className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-xs text-gray-300 font-bold tracking-widest uppercase font-orbita">React.js</span>
              <span className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-xs text-gray-300 font-bold tracking-widest uppercase font-orbita">Firebase</span>
              <span className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-xs text-gray-300 font-bold tracking-widest uppercase font-orbita">Tailwind CSS</span>
            </div>
          </div>

          <div className="flex-1 w-full bg-gradient-to-br from-white/5 to-transparent border border-white/10 p-8 rounded-3xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            
            <div className="relative z-10 flex flex-col gap-6">
              <div className="bg-black/40 border border-white/5 p-6 rounded-2xl flex justify-between items-center backdrop-blur-md">
                <div>
                  <div className="text-[10px] text-gray-500 font-bold tracking-[0.2em] uppercase mb-1 font-orbita">Maior Sequência</div>
                  <div className="text-2xl font-black text-cyan-400 font-titulo">12 Dias</div>
                </div>
                <Rocket size={24} className="text-gray-600" />
              </div>

              <div className="bg-black/40 border border-white/5 p-6 rounded-2xl flex justify-between items-center backdrop-blur-md translate-x-8">
                <div>
                  <div className="text-[10px] text-gray-500 font-bold tracking-[0.2em] uppercase mb-1 font-orbita">Planetas Vivos</div>
                  <div className="text-2xl font-black text-purple-400 font-titulo">4 Órbitas</div>
                </div>
                <Globe size={24} className="text-gray-600" />
              </div>
            </div>
          </div>
        </div>

        {/* CTA Final */}
        <div className="mt-32 p-12 rounded-3xl border border-white/5 bg-gradient-to-b from-white/[0.02] to-transparent text-center">
          <h3 className="text-2xl font-bold uppercase mb-6 font-titulo">Pronta para sua primeira viagem?</h3>
          <button 
            onClick={() => navigate('/cadastro')}
            className="px-10 py-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-black uppercase tracking-widest transition-all hover:scale-105 font-orbita"
          >
            Começar a construir
          </button>
        </div>

        {/* FOOTER INSERIDO AQUI */}
        <Footer />
        
      </div>
    </div>
  );
};

export default ComoFunciona;