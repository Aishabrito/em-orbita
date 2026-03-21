import React, { useMemo } from 'react';
import fundoGalaxia from '../assets/fundogalaxia.png';

// Gera estrelas com posições e tamanhos aleatórios mas determinísticos
const generateStars = (count, seed = 1) => {
  const stars = [];
  let s = seed;
  const rand = () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
  for (let i = 0; i < count; i++) {
    stars.push({
      id: i,
      x: rand() * 100,
      y: rand() * 100,
      size: rand() * 2.2 + 0.4,
      opacity: rand() * 0.7 + 0.2,
      duration: rand() * 4 + 2,
      delay: rand() * 6,
      type: rand() > 0.92 ? 'bright' : rand() > 0.7 ? 'medium' : 'dim',
    });
  }
  return stars;
};

// Gera partículas flutuantes
const generateParticles = (count) => {
  const particles = [];
  let s = 42;
  const rand = () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
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
      color: ['rgba(100,180,255,0.4)', 'rgba(180,100,255,0.35)', 'rgba(100,255,180,0.3)', 'rgba(255,180,100,0.3)'][Math.floor(rand() * 4)],
    });
  }
  return particles;
};

export const FundoCosmico = () => {
  const stars = useMemo(() => generateStars(220, 12345), []);
  const brightStars = useMemo(() => stars.filter(s => s.type === 'bright'), [stars]);
  const particles = useMemo(() => generateParticles(18), []);

  return (
    <>
      <style>{`
        @keyframes star-twinkle {
          0%, 100% { opacity: var(--star-opacity); transform: scale(1); }
          50%       { opacity: calc(var(--star-opacity) * 0.2); transform: scale(0.7); }
        }
        @keyframes star-pulse {
          0%, 100% { opacity: var(--star-opacity); transform: scale(1); box-shadow: 0 0 3px rgba(255,255,255,0.4); }
          50%       { opacity: 1; transform: scale(1.6); box-shadow: 0 0 8px rgba(255,255,255,0.9), 0 0 14px rgba(200,220,255,0.5); }
        }
        @keyframes particle-float {
          0%   { transform: translate(0, 0) scale(1); opacity: 0; }
          15%  { opacity: 1; }
          85%  { opacity: 0.6; }
          100% { transform: translate(var(--drift-x), var(--drift-y)) scale(0.5); opacity: 0; }
        }
        @keyframes nebula-breathe {
          0%, 100% { opacity: 0.55; transform: scale(1) rotate(0deg); }
          50%       { opacity: 0.75; transform: scale(1.03) rotate(0.5deg); }
        }
        @keyframes nebula-breathe-2 {
          0%, 100% { opacity: 0.3; transform: scale(1) rotate(0deg); }
          50%       { opacity: 0.5; transform: scale(1.04) rotate(-0.5deg); }
        }
        @keyframes nebula-drift {
          0%, 100% { transform: translateX(0) translateY(0); opacity: 0.2; }
          33%       { transform: translateX(15px) translateY(-10px); opacity: 0.35; }
          66%       { transform: translateX(-10px) translateY(8px); opacity: 0.25; }
        }
      `}</style>

      {/* IMAGEM BASE */}
      <div
        className="absolute inset-0 bg-cover bg-center pointer-events-none"
        style={{
          backgroundImage: `url(${fundoGalaxia})`,
          opacity: 0.55,
          filter: 'saturate(1.3) brightness(0.9)',
        }}
      />

      {/* NEBULOSA ANIMADA — Camada 1 (azul-roxa) */}
      <div
        className="absolute pointer-events-none"
        style={{
          inset: '-10%',
          background: `
            radial-gradient(ellipse 70% 50% at 20% 30%, rgba(60,30,120,0.55) 0%, transparent 60%),
            radial-gradient(ellipse 50% 40% at 75% 65%, rgba(30,80,160,0.4) 0%, transparent 55%)
          `,
          animation: 'nebula-breathe 10s ease-in-out infinite',
        }}
      />

      {/* NEBULOSA — Camada 2 (laranja-avermelhada quente) */}
      <div
        className="absolute pointer-events-none"
        style={{
          inset: '-10%',
          background: `
            radial-gradient(ellipse 55% 35% at 80% 20%, rgba(120,50,20,0.4) 0%, transparent 55%),
            radial-gradient(ellipse 40% 30% at 15% 75%, rgba(80,30,100,0.35) 0%, transparent 50%)
          `,
          animation: 'nebula-breathe-2 14s ease-in-out infinite',
          animationDelay: '3s',
        }}
      />

      {/* NEBULOSA — Camada 3 (esverdeada sutil) */}
      <div
        className="absolute pointer-events-none"
        style={{
          inset: '-10%',
          background: `radial-gradient(ellipse 45% 30% at 50% 85%, rgba(20,80,60,0.3) 0%, transparent 55%)`,
          animation: 'nebula-drift 20s ease-in-out infinite',
          animationDelay: '7s',
        }}
      />

      {/* GRADIENTE ESCURECEDOR (vinheta) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 80% 80% at 50% 50%, transparent 30%, rgba(5,5,15,0.55) 100%),
            linear-gradient(to bottom, rgba(5,5,15,0.3) 0%, transparent 25%, transparent 75%, rgba(5,5,15,0.5) 100%)
          `,
        }}
      />

      {/* ESTRELAS — camada SVG para performance */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 1 }}
        xmlns="http://www.w3.org/2000/svg"
      >
        {stars.map((star) => (
          <circle
            key={star.id}
            cx={`${star.x}%`}
            cy={`${star.y}%`}
            r={star.size / 2}
            fill={star.type === 'bright' ? '#e8f0ff' : star.type === 'medium' ? '#ccd8ff' : '#aab8dd'}
            style={{
              '--star-opacity': star.opacity,
              opacity: star.opacity,
              animation: `star-twinkle ${star.duration}s ease-in-out infinite`,
              animationDelay: `${star.delay}s`,
            }}
          />
        ))}
        {/* Estrelas brilhantes com glow */}
        {brightStars.map((star) => (
          <circle
            key={`bright-${star.id}`}
            cx={`${star.x}%`}
            cy={`${star.y}%`}
            r={star.size * 0.6}
            fill="white"
            style={{
              '--star-opacity': star.opacity * 0.8,
              filter: 'blur(0.3px)',
              animation: `star-pulse ${star.duration * 1.5}s ease-in-out infinite`,
              animationDelay: `${star.delay * 0.7}s`,
            }}
          />
        ))}
      </svg>

      {/* PARTÍCULAS FLUTUANTES */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 2 }}>
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full blur-sm"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              background: p.color,
              '--drift-x': `${p.driftX}px`,
              '--drift-y': `${p.driftY}px`,
              animation: `particle-float ${p.duration}s ease-in-out infinite`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>
    </>
  );
};

export default FundoCosmico;