import React from 'react';
import { Award, Compass, BookOpen, ExternalLink } from 'lucide-react';
import { soundCtrl } from '../utils/soundController';

interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  period: string;
  details: string;
  specialization: string;
}

export const Education: React.FC = () => {
  const items: EducationItem[] = [
    {
      id: 'EDU_NODE_01',
      degree: 'M.S. IN SOFTWARE SYSTEMS',
      institution: 'NEURAL INFRASTRUCTURE ACADEMY',
      period: '2018 - 2020',
      details: 'Deep dive into advanced computer networks, secure socket orchestration, high-throughput distributed database architecture, and compiler designs.',
      specialization: 'DISTRIBUTED ARCHITECTURE'
    },
    {
      id: 'EDU_NODE_02',
      degree: 'B.S. IN COMPUTER SCIENCE',
      institution: 'MATRIX STATE UNIVERSITY',
      period: '2014 - 2018',
      details: 'Focused on algorithms, design patterns, object-oriented concepts, and relational databases. Developed the university\'s first web-based virtual campus navigator.',
      specialization: 'COMPUTER SCIENCE CORE'
    },
    {
      id: 'EDU_NODE_03',
      degree: 'CERTIFICATION: FULL-STACK WEB R3F',
      institution: '3D GRAPHICS CONSOLE CERTIFICATION',
      period: '2021',
      details: 'Intensive developer training covering Three.js, React Three Fiber, Custom GLSL shaders, camera physics, and matrix mathematics.',
      specialization: 'CREATIVE TECHNOLOGIES'
    }
  ];

  const handleCardHover = () => {
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--neon-yellow)', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
          <BookOpen size={14} className="flicker-text" />
          <span>[EDUCATION_LEARNING_NET]</span>
        </div>
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 800, color: '#fff' }}>
          EDUCATION & <span style={{ color: 'var(--neon-cyan)', textShadow: 'var(--text-glow-cyan)' }}>CREDENTIALS</span>
        </h2>
        <div style={{ width: '60px', height: '3px', background: 'var(--neon-cyan)', marginTop: '0.5rem' }}></div>
      </div>

      {/* Grid of Education Cards */}
      <div 
        style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
          gap: '2rem' 
        }}
      >
        {items.map((item) => (
          <div
            key={item.id}
            className="cyber-card cyber-corners"
            onMouseEnter={handleCardHover}
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '1.2rem',
              background: 'rgba(8, 8, 12, 0.75)'
            }}
          >
            <div>
              {/* Node index details */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  color: 'var(--text-dim)',
                  marginBottom: '0.5rem'
                }}
              >
                <span>{item.id}</span>
                <span>{item.period}</span>
              </div>

              {/* Title & School */}
              <h3
                className="glitch-text"
                style={{
                  fontSize: '1.25rem',
                  color: '#fff',
                  letterSpacing: '0.05em',
                  marginBottom: '0.2rem'
                }}
              >
                {item.degree}
              </h3>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  color: 'var(--neon-pink)',
                  display: 'block',
                  marginBottom: '1rem',
                  letterSpacing: '0.05em'
                }}
              >
                {item.institution}
              </span>

              <p style={{ fontSize: '0.9rem', lineHeight: 1.5 }}>
                {item.details}
              </p>
            </div>

            {/* Bottom Specialization Specs */}
            <div
              style={{
                borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                paddingTop: '0.8rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: 'var(--text-muted)' }}>
                <Compass size={12} style={{ color: 'var(--neon-cyan)' }} />
                <span>ROUTE: {item.specialization}</span>
              </div>
              <span style={{ color: 'var(--neon-yellow)' }}>VERIFIED</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Education;
