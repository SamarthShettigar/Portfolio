import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Terminal, Zap, ShieldCheck } from 'lucide-react';
import { soundCtrl } from '../utils/soundController';

interface Skill {
  name: string;
  level: number;
  category: string;
  details: string[];
}

export const SpecSection: React.FC = () => {
  const [activeSkill, setActiveSkill] = useState<number | null>(null);

  const skills: Skill[] = [
    {
      name: 'REACT CORE ENGINE',
      level: 95,
      category: 'Architecture',
      details: ['React 19 Hooks & Suspense', 'TypeScript Type-Safety', 'State Management (Redux/Zustand)', 'Performance Optimization']
    },
    {
      name: '3D WEBGL GRAPHICS',
      level: 88,
      category: 'Visuals',
      details: ['Three.js Library', 'React Three Fiber & Drei', 'Custom GLSL Shaders', 'Procedural Mesh Manipulation']
    },
    {
      name: 'MOTION PHYSICS & GSAP',
      level: 90,
      category: 'Interaction',
      details: ['GSAP Timeline Animations', 'Framer Motion Gestures', 'Scroll-Triggered Parallax', 'FPS-Friendly Layouts']
    },
    {
      name: 'BACKEND SYSTEMS',
      level: 85,
      category: 'Core Node',
      details: ['Node.js & Express / NestJS', 'RESTful & GraphQL APIs', 'Database (MongoDB / PostgreSQL)', 'WebSockets (Real-time sync)']
    },
    {
      name: 'CYBER UI DESIGN & CSS',
      level: 92,
      category: 'Creative styling',
      details: ['Advanced Vanilla CSS Custom Variables', 'Responsive Viewports', 'Glassmorphism Effects', 'Interactive Keyframe FX']
    }
  ];

  const handleSkillClick = (index: number) => {
    soundCtrl.playSuccess();
    setActiveSkill(activeSkill === index ? null : index);
  };

  const handleHover = () => {
    soundCtrl.playClick();
  };

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
          <Zap size={14} className="flicker-text" />
          <span>[SYSTEM_DIAGNOSTICS]</span>
        </div>
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 800, color: '#fff' }}>
          TECHNICAL <span style={{ color: 'var(--neon-pink)', textShadow: 'var(--text-glow-pink)' }}>SPECIFICATIONS</span>
        </h2>
        <div style={{ width: '60px', height: '3px', background: 'var(--neon-pink)', marginTop: '0.5rem' }}></div>
      </div>

      {/* Grid Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: 'window.innerWidth > 900 ? "1fr 1fr" : "1fr"', gap: '3rem' }} className="grid-container">
        {/* Left column: Diagnostics HUD */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div 
            className="cyber-card cyber-corners"
            style={{
              background: 'rgba(10, 10, 16, 0.8)',
              border: '1px solid rgba(0, 240, 255, 0.15)',
              padding: '2rem'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.2rem' }}>
              <Cpu style={{ color: 'var(--neon-cyan)' }} size={24} />
              <h3 style={{ fontSize: '1.2rem', color: '#fff' }}>PROCESSOR CORE STATE</h3>
            </div>
            <p style={{ fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              We construct clean, lightning-fast interfaces using modular React components and scalable stylesheets. Click on any system sector to run sub-routine checks.
            </p>

            {/* Display active skill specs or default state */}
            <div 
              style={{
                background: 'rgba(5, 5, 8, 0.9)',
                border: '1px dashed rgba(255, 0, 85, 0.2)',
                borderRadius: '2px',
                padding: '1rem',
                minHeight: '130px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                gap: '0.3rem'
              }}
            >
              {activeSkill !== null ? (
                <>
                  <div style={{ color: 'var(--neon-pink)', fontWeight: 'bold', marginBottom: '0.3rem' }}>
                    &gt; DIAGNOSTICS FOR: {skills[activeSkill].name}
                  </div>
                  {skills[activeSkill].details.map((detail, dIdx) => (
                    <div key={dIdx} style={{ color: 'var(--neon-cyan)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <ShieldCheck size={12} style={{ color: 'var(--neon-yellow)' }} />
                      <span>{detail}</span>
                    </div>
                  ))}
                  <div style={{ color: 'var(--text-dim)', fontSize: '0.7rem', marginTop: '0.5rem' }}>
                    INTEGRITY CHECK: SECURED // STABILITY RATE: {skills[activeSkill].level}%
                  </div>
                </>
              ) : (
                <div style={{ textAlign: 'center', color: 'var(--text-dim)' }}>
                  <Terminal size={24} style={{ margin: '0 auto 0.5rem auto', display: 'block', opacity: 0.5 }} />
                  <span>SELECT SYSTEM SECTOR TO DECRYPT DETAILS</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right column: Skill bars */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {skills.map((skill, index) => (
            <div 
              key={index}
              onClick={() => handleSkillClick(index)}
              onMouseEnter={handleHover}
              style={{ cursor: 'pointer' }}
            >
              <div 
                style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  marginBottom: '0.4rem',
                  fontFamily: 'var(--font-title)',
                  fontSize: '0.85rem',
                  letterSpacing: '0.05em'
                }}
              >
                <span style={{ color: activeSkill === index ? 'var(--neon-cyan)' : 'var(--text-primary)', transition: 'color var(--transition-fast)' }}>
                  {skill.name}
                </span>
                <span style={{ color: activeSkill === index ? 'var(--neon-pink)' : 'var(--neon-yellow)', fontFamily: 'var(--font-mono)' }}>
                  {skill.level}%
                </span>
              </div>

              {/* Progress bar container */}
              <div 
                style={{ 
                  height: '14px', 
                  background: 'rgba(255, 255, 255, 0.05)', 
                  border: '1px solid rgba(0, 240, 255, 0.1)',
                  padding: '2px',
                  borderRadius: '1px',
                  position: 'relative'
                }}
              >
                {/* Neon progress filler */}
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: 'easeOut' }}
                  style={{ 
                    height: '100%', 
                    background: index % 2 === 0 
                      ? 'linear-gradient(90deg, var(--neon-cyan), rgba(0, 240, 255, 0.5))'
                      : 'linear-gradient(90deg, var(--neon-pink), rgba(255, 0, 85, 0.5))',
                    boxShadow: index % 2 === 0 ? 'var(--border-glow-cyan)' : 'var(--border-glow-pink)',
                    borderRadius: '1px',
                    position: 'relative'
                  }}
                />

                {/* Segments marks on top */}
                <div 
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundImage: 'linear-gradient(90deg, transparent 90%, var(--bg-dark) 90%)',
                    backgroundSize: '8px 100%',
                    pointerEvents: 'none'
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Quick CSS media query handler helper */}
      <style>{`
        .grid-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        }
      `}</style>
    </section>
  );
};

export default SpecSection;
