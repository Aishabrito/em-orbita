import React, { useMemo } from 'react';
import { Rocket, Settings, X, Plus, Star } from 'lucide-react';
import fundoGalaxia from '../assets/fundogalaxia.png';

// ─── Geração determinística ───────────────────────────────────────────────────
const generateStars = (count, seed = 1) => {
  const stars = [];
  let s = seed;
  const rand = () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; };
  for (let i = 0; i < count; i++) {
    stars.push({
      id: i,
      x: rand() * 100,
      y: rand() * 100,
      size: rand() * 2.2 + 0.4,
      opacity: rand() * 0.7 + 0.2,
      duration: rand() * 4 + 2,
      delay: rand() * 6,
      bright: rand() > 0.92,
    });
  }
  return stars;
};

const generateParticles = (count) => {
  const particles = [];
  let s = 42;
  const rand = () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; };
  const colors = [
    'rgba(100,180,255,0.4)', 'rgba(180,100,255,0.35)',
    'rgba(100,255,180,0.3)', 'rgba(255,180,100,0.3)',
  ];
  for (let i = 0; i < count; i++) {
    particles.push({
      id: i,
      x: rand() * 100,
      y: rand() * 100,
      size: rand() * 3 + 1,
      duration: rand() * 15 + 10,
      delay: rand() * 10,
      driftX: (rand() - 0.5) * 60,
      driftY: (rand() - 0.5) * 40,
      color: colors[Math.floor(rand() * 4)],
    });
  }
  return particles;
};

// ─── Fundo Cósmico ────────────────────────────────────────────────────────────
export const FundoCosmico = () => {
  const stars     = useMemo(() => generateStars(220, 12345), []);
  const bright    = useMemo(() => stars.filter(s => s.bright),  [stars]);
  const particles = useMemo(() => generateParticles(18), []);

  return (
    <>
      <style>{`
        @keyframes star-twinkle {
          0%,100% { opacity: var(--so); transform: scale(1); }
          50%      { opacity: calc(var(--so) * 0.2); transform: scale(0.7); }
        }
        @keyframes star-pulse {
          0%,100% { opacity: var(--so); transform: scale(1); }
          50%      { opacity: 1; transform: scale(1.7);
                     filter: drop-shadow(0 0 4px rgba(255,255,255,0.9)); }
        }
        @keyframes particle-float {
          0%   { transform: translate(0,0) scale(1); opacity: 0; }
          15%  { opacity: 1; }
          85%  { opacity: 0.6; }
          100% { transform: translate(var(--dx),var(--dy)) scale(0.5); opacity: 0; }
        }
        @keyframes nebula-breathe {
          0%,100% { opacity: 0.55; transform: scale(1)   rotate(0deg); }
          50%      { opacity: 0.75; transform: scale(1.03) rotate(.5deg); }
        }
        @keyframes nebula-breathe-2 {
          0%,100% { opacity: 0.3;  transform: scale(1)    rotate(0deg); }
          50%      { opacity: 0.5;  transform: scale(1.04)  rotate(-.5deg); }
        }
        @keyframes nebula-drift {
          0%,100% { transform: translate(0,0);      opacity: 0.2;  }
          33%      { transform: translate(15px,-10px); opacity: 0.35; }
          66%      { transform: translate(-10px,8px);  opacity: 0.25; }
        }
      `}</style>

      {/* Imagem base */}
      <div
        className="absolute inset-0 bg-cover bg-center pointer-events-none"
        style={{ backgroundImage: `url(${fundoGalaxia})`, opacity: 0.55, filter: 'saturate(1.3) brightness(0.9)' }}
      />

      {/* Nebulosa — azul-roxa */}
      <div className="absolute pointer-events-none" style={{
        inset: '-10%',
        background: `
          radial-gradient(ellipse 70% 50% at 20% 30%, rgba(60,30,120,0.55) 0%, transparent 60%),
          radial-gradient(ellipse 50% 40% at 75% 65%, rgba(30,80,160,0.4)  0%, transparent 55%)`,
        animation: 'nebula-breathe 10s ease-in-out infinite',
      }} />

      {/* Nebulosa — laranja quente */}
      <div className="absolute pointer-events-none" style={{
        inset: '-10%',
        background: `
          radial-gradient(ellipse 55% 35% at 80% 20%, rgba(120,50,20,0.4)  0%, transparent 55%),
          radial-gradient(ellipse 40% 30% at 15% 75%, rgba(80,30,100,0.35) 0%, transparent 50%)`,
        animation: 'nebula-breathe-2 14s ease-in-out infinite',
        animationDelay: '3s',
      }} />

      {/* Nebulosa — esverdeada sutil */}
      <div className="absolute pointer-events-none" style={{
        inset: '-10%',
        background: `radial-gradient(ellipse 45% 30% at 50% 85%, rgba(20,80,60,0.3) 0%, transparent 55%)`,
        animation: 'nebula-drift 20s ease-in-out infinite',
        animationDelay: '7s',
      }} />

      {/* Vinheta */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: `
          radial-gradient(ellipse 80% 80% at 50% 50%, transparent 30%, rgba(5,5,15,0.55) 100%),
          linear-gradient(to bottom, rgba(5,5,15,0.3) 0%, transparent 25%, transparent 75%, rgba(5,5,15,0.5) 100%)`,
      }} />

      {/* Estrelas SVG */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
        {stars.map(s => (
          <circle key={s.id} cx={`${s.x}%`} cy={`${s.y}%`} r={s.size / 2}
            fill={s.bright ? '#e8f0ff' : '#aab8dd'}
            style={{
              '--so': s.opacity, opacity: s.opacity,
              animation: `star-twinkle ${s.duration}s ease-in-out infinite`,
              animationDelay: `${s.delay}s`,
            }}
          />
        ))}
        {bright.map(s => (
          <circle key={`b-${s.id}`} cx={`${s.x}%`} cy={`${s.y}%`} r={s.size * 0.5}
            fill="white"
            style={{
              '--so': s.opacity * 0.8,
              filter: 'blur(0.3px)',
              animation: `star-pulse ${s.duration * 1.5}s ease-in-out infinite`,
              animationDelay: `${s.delay * 0.7}s`,
            }}
          />
        ))}
      </svg>

      {/* Partículas flutuantes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 2 }}>
        {particles.map(p => (
          <div key={p.id} className="absolute rounded-full blur-sm" style={{
            left: `${p.x}%`, top: `${p.y}%`,
            width: p.size, height: p.size,
            background: p.color,
            '--dx': `${p.driftX}px`, '--dy': `${p.driftY}px`,
            animation: `particle-float ${p.duration}s ease-in-out infinite`,
            animationDelay: `${p.delay}s`,
          }} />
        ))}
      </div>
    </>
  );
};

// ─── Cabeçalho ────────────────────────────────────────────────────────────────
export const CabecalhoUniverso = () => (
  <div className="absolute top-6 left-6 z-50 flex items-center gap-3 pointer-events-none select-none">
    <div className="relative">
      <div className="absolute -inset-2 bg-cyan-500/25 blur-lg rounded-full" />
      <Rocket
        className="text-cyan-400 relative z-10 drop-shadow-[0_0_10px_rgba(34,211,238,0.9)]"
        size={26} strokeWidth={1.5}
      />
    </div>
    <h1 className="font-titulo text-xl font-bold text-white tracking-[0.2em] drop-shadow-[0_0_12px_rgba(255,255,255,0.25)]">
      EM ÓRBITA
    </h1>
  </div>
);

// ─── Controles ────────────────────────────────────────────────────────────────
export const ControlesUniverso = ({ isEditMode, toggleEdit }) => (
  <>
    <button
      onClick={toggleEdit}
      className={`absolute top-6 right-6 z-50 p-3 rounded-full transition-all duration-300 border backdrop-blur-md
        ${isEditMode
          ? 'bg-red-500/20 border-red-500/60 text-red-400 rotate-90 shadow-[0_0_20px_rgba(239,68,68,0.3)] hover:bg-red-500/30'
          : 'bg-white/5 border-white/10 text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/20'
        }`}
    >
      {isEditMode ? <X size={22} /> : <Settings size={22} />}
    </button>

    {isEditMode && (
      <div className="absolute top-[4.5rem] right-6 z-50 flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
        <span className="text-red-400 text-[10px] font-bold uppercase tracking-[0.25em]">
          Modo de Destruição
        </span>
      </div>
    )}
  </>
);

// ─── Estado Vazio ─────────────────────────────────────────────────────────────
export const EstadoVazio = ({ onAddHabit }) => (
  <div className="absolute inset-0 flex flex-col items-center justify-center z-20 select-none">
    <div className="translate-y-36 flex flex-col items-center gap-5 animate-in fade-in slide-in-from-bottom duration-1000">
      <p className="font-titulo text-2xl text-white/30 tracking-[0.3em] uppercase">
        Universo Vazio
      </p>
      <p className="text-white/20 font-orbita text-sm tracking-wider text-center">
        Sua galáxia está esperando pelo primeiro planeta.
      </p>
      <button
        onClick={onAddHabit}
        className="mt-2 group flex items-center gap-3 px-8 py-4 rounded-full border border-cyan-400/30 bg-cyan-500/10 hover:bg-cyan-500/20 hover:border-cyan-400/60 backdrop-blur-xl transition-all duration-300 hover:scale-105 shadow-[0_0_30px_rgba(34,211,238,0.1)]"
      >
        <Plus
          size={18}
          className="text-cyan-400 group-hover:rotate-90 transition-transform duration-300"
        />
        <span className="bg-gradient-to-r from-cyan-300 to-purple-400 bg-clip-text text-transparent font-bold text-sm tracking-widest uppercase font-titulo">
          Criar Primeiro Hábito
        </span>
      </button>
    </div>
  </div>
);

// ─── Botão Novo Hábito ────────────────────────────────────────────────────────
export const BotaoNovoHabito = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute bottom-10 z-50 group flex items-center gap-2.5 px-8 py-3.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl hover:bg-white/10 hover:border-white/20 hover:scale-105 transition-all duration-300 shadow-lg"
  >
    <Plus
      size={16}
      className="text-cyan-300 group-hover:rotate-90 transition-transform duration-300"
    />
    <span className="bg-gradient-to-r from-cyan-300 to-purple-400 bg-clip-text text-transparent font-bold text-sm tracking-widest uppercase">
      Novo Hábito
    </span>
  </button>
);

// ─── Painel de Progresso Diário ───────────────────────────────────────────────
export const PainelDiario = ({ habits }) => {
  const today = new Date().toISOString().split('T')[0];
  const total = habits.length;
  const completed = habits.filter(h => h.history?.includes(today)).length;
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0;
  const maxStreak = habits.reduce((max, h) => Math.max(max, h.streak || 0), 0);

  return (
    <div className="absolute bottom-10 left-6 z-50 flex flex-col gap-2 backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl px-4 py-3 min-w-[160px] shadow-lg">
      <div className="flex items-center justify-between gap-4">
        <span className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Hoje</span>
        <span className="text-[10px] font-bold text-cyan-300">{completed}/{total}</span>
      </div>

      {/* Barra de progresso */}
      <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{
            width: `${pct}%`,
            background: pct === 100
              ? 'linear-gradient(to right, #4ade80, #22d3ee)'
              : 'linear-gradient(to right, #22d3ee, #a855f7)',
          }}
        />
      </div>

      <div className="flex items-center gap-1.5 mt-0.5">
        <Star size={10} className="text-yellow-400" fill="currentColor" />
        <span className="text-[10px] text-yellow-300/70 font-bold tracking-wider">
          Melhor streak: {maxStreak}
        </span>
      </div>
    </div>
  );
};