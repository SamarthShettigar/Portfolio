import React from 'react';
import { motion } from 'framer-motion';
import { User, ShieldAlert, Cpu, Orbit } from 'lucide-react';
import { soundCtrl } from '../utils/soundController';

export const AboutMe: React.FC = () => {
  const handleHover = () => {
    soundCtrl.playClick();
  };

  const bioStats = [
    { label: 'COGNITIVE LEVEL', value: 'SENIOR DEVELOPMENT ENGINEER' },
    { label: 'WebGL EXPOSURE', value: '4+ YEARS IMMERSIVE GRAPHICS' },
    { label: 'STACK SPECIALIZATION', value: 'REACT 19 / TYPESCRIPT / NODE' },
    { label: 'ACTIVE GRID STATUS', value: 'AVAILABLE FOR LINK OVERRIDES' }
  ];

  return (
    <section
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '6rem 2rem 2rem 2rem',
        position: 'relative',
        zIndex: 2,
        maxWidth: '1200px',
        margin: '0 auto',
        width: '100%'
      }}
    >
      {/* Section Header */}
      <div style={{ marginBottom: '3rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--neon-cyan)', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
          <User size={14} className="flicker-text" />
          <span>[AGENT_BIO_DOSSIER]</span>
        </div>
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 800, color: '#fff' }}>
          ABOUT <span style={{ color: 'var(--neon-pink)', textShadow: 'var(--text-glow-pink)' }}>MY SYSTEM</span>
        </h2>
        <div style={{ width: '60px', height: '3px', background: 'var(--neon-pink)', marginTop: '0.5rem' }}></div>
      </div>

      <div className="grid-container" style={{ gap: '2.5rem' }}>
        
        {/* Left Column: Biography Narrative */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div 
            className="cyber-card cyber-corners"
            onMouseEnter={handleHover}
            style={{
              background: 'rgba(10, 10, 16, 0.75)',
              padding: '2.2rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.2rem'
            }}
          >
            <h3 style={{ fontSize: '1.2rem', color: '#fff', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <Cpu size={18} style={{ color: 'var(--neon-cyan)' }} />
              NEURAL ORIGINS
            </h3>
            
            <p style={{ fontSize: '0.95rem', lineHeight: 1.6 }}>
              I am a creative full-stack engineer operating at the convergence of high-performance architecture and cinematic web animation. My core directive is transforming complex datasets into fluid, 3D spatial interfaces.
            </p>
            
            <p style={{ fontSize: '0.95rem', lineHeight: 1.6 }}>
              By merging robust backend systems (Node, WebSockets, NestJS) with lightweight client-side 3D engines (Three.js, R3F, Custom Shaders), I deliver web experiences that perform at a consistent 60FPS while maintaining modern typography and glassmorphic HUD styling.
            </p>

            <div 
              style={{
                background: 'rgba(255, 0, 85, 0.03)',
                border: '1px dashed rgba(255, 0, 85, 0.25)',
                padding: '1rem',
                borderRadius: '2px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.8rem',
                marginTop: '0.5rem'
              }}
            >
              <ShieldAlert size={18} style={{ color: 'var(--neon-pink)', marginTop: '0.1rem' }} className="flicker-text" />
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                <span style={{ color: 'var(--neon-pink)', fontWeight: 'bold' }}>SYSTEM MISSION:</span> Engineered to build accessible, SEO-optimized Web3 grids. Zero tolerance for lag, broken linkages, or generic layouts.
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Telemetry Specs Grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          <div 
            className="cyber-card cyber-corners pink"
            onMouseEnter={handleHover}
            style={{
              background: 'rgba(5, 5, 8, 0.85)',
              padding: '2rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem'
            }}
          >
            <h3 style={{ fontSize: '1.2rem', color: '#fff', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <Orbit size={18} style={{ color: 'var(--neon-pink)' }} />
              AGENT METRICS
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {bioStats.map((stat, i) => (
                <div 
                  key={i} 
                  style={{
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: '0.2rem',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                    paddingBottom: '0.6rem'
                  }}
                >
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-dim)' }}>
                    {stat.label}_
                  </span>
                  <span style={{ fontSize: '0.9rem', color: 'var(--neon-yellow)', fontWeight: 600 }}>
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.7rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: 'var(--neon-cyan)' }}>
                <span className="flicker-text">●</span> COGNITIVE OK
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: 'var(--neon-yellow)' }}>
                <span className="flicker-text">●</span> MEMORY OPTIMAL
              </div>
            </div>

          </div>
        </div>

      </div>

      <style>{`
        .grid-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        }
      `}</style>
    </section>
  );
};

export default AboutMe;
