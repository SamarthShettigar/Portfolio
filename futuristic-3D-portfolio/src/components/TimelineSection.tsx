import React from 'react';
import { Award, Calendar } from 'lucide-react';
import { soundCtrl } from '../utils/soundController';

interface TimelineItem {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  status: string;
}

export const TimelineSection: React.FC = () => {
  const items: TimelineItem[] = [
    {
      id: 'NODE_03',
      role: 'LEAD SYSTEM ENGINEER',
      company: 'CYBERNET CORP',
      period: '2024 - PRESENT',
      description: 'Engineering high-throughput React dashboard clusters, optimizing WebGL graphics nodes, and structuring custom procedural 3D elements for data monitoring networks.',
      status: 'LINK_ESTABLISHED'
    },
    {
      id: 'NODE_02',
      role: 'SENIOR WEB ARCHITECT',
      company: 'TECHVOID LABS',
      period: '2022 - 2024',
      description: 'Maintained low-latency WebSockets pipelines, implemented REST/GraphQL APIs in NestJS/PostgreSQL, and managed high-concurrency microservices clusters.',
      status: 'LINK_ARCHIVED'
    },
    {
      id: 'NODE_01',
      role: 'CREATIVE DEV SPECIALIST',
      company: 'SYNTHETIX INC',
      period: '2020 - 2022',
      description: 'Crafted interactive landing nodes incorporating Web Audio synthesizer interfaces, canvas vector graphs, and responsive layout architectures.',
      status: 'LINK_ARCHIVED'
    }
  ];

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
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--neon-yellow)', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
          <Award size={14} className="flicker-text" />
          <span>[CORE_HISTORY_GRID]</span>
        </div>
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 800, color: '#fff' }}>
          SYSTEM <span style={{ color: 'var(--neon-pink)', textShadow: 'var(--text-glow-pink)' }}>CHRONOLOGY</span>
        </h2>
        <div style={{ width: '60px', height: '3px', background: 'var(--neon-yellow)', marginTop: '0.5rem' }}></div>
      </div>

      {/* Vertical Timeline container */}
      <div 
        style={{
          position: 'relative',
          paddingLeft: '2rem',
          borderLeft: '2px solid rgba(0, 240, 255, 0.15)',
          display: 'flex',
          flexDirection: 'column',
          gap: '2.5rem',
          marginLeft: '0.5rem'
        }}
      >
        {/* Glow Line Overlay */}
        <div 
          style={{
            position: 'absolute',
            top: 0,
            left: '-2px',
            width: '2px',
            height: '100%',
            background: 'linear-gradient(to bottom, var(--neon-cyan), var(--neon-pink), transparent)',
            boxShadow: 'var(--border-glow-cyan)',
            pointerEvents: 'none'
          }}
        />

        {items.map((item) => (
          <div 
            key={item.id}
            onMouseEnter={handleHover}
            className="timeline-item-container"
            style={{ position: 'relative' }}
          >
            {/* Timeline Node Point Indicator */}
            <div 
              className="timeline-node"
              style={{
                position: 'absolute',
                left: 'calc(-2rem - 6px)',
                top: '6px',
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: item.status === 'LINK_ESTABLISHED' ? 'var(--neon-cyan)' : 'var(--neon-pink)',
                boxShadow: item.status === 'LINK_ESTABLISHED' ? 'var(--border-glow-cyan)' : 'var(--border-glow-pink)',
                border: '2px solid var(--bg-darker)',
                transition: 'all 0.3s ease',
                zIndex: 5
              }}
            />

            {/* Content card */}
            <div 
              className="cyber-card cyber-corners"
              style={{
                background: 'rgba(10, 10, 16, 0.7)',
                border: '1px solid rgba(0, 240, 255, 0.15)',
                transition: 'all 0.3s ease'
              }}
            >
              {/* Header details */}
              <div 
                style={{ 
                  display: 'flex', 
                  flexWrap: 'wrap', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  marginBottom: '0.8rem',
                  gap: '0.5rem'
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <h3 style={{ fontSize: '1.15rem', color: '#fff', letterSpacing: '0.05em' }}>
                    {item.role}
                  </h3>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--neon-cyan)' }}>
                    {item.company}
                  </span>
                </div>

                <div 
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '0.4rem',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    color: 'var(--text-muted)',
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    padding: '0.2rem 0.6rem',
                    borderRadius: '2px'
                  }}
                >
                  <Calendar size={12} />
                  <span>{item.period}</span>
                </div>
              </div>

              {/* Description */}
              <p style={{ fontSize: '0.9rem', lineHeight: 1.5, marginBottom: '1rem' }}>
                {item.description}
              </p>

              {/* Status footer inside card */}
              <div 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.5rem', 
                  fontFamily: 'var(--font-mono)', 
                  fontSize: '0.7rem',
                  borderTop: '1px dashed rgba(255, 255, 255, 0.05)',
                  paddingTop: '0.6rem'
                }}
              >
                <span style={{ color: 'var(--text-dim)' }}>SECTOR:</span>
                <span style={{ color: 'var(--text-muted)' }}>{item.id}</span>
                <span style={{ color: 'var(--text-dim)', marginLeft: '1rem' }}>NODE_NET:</span>
                <span style={{ color: item.status === 'LINK_ESTABLISHED' ? 'var(--neon-yellow)' : 'var(--text-muted)' }}>
                  {item.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Node expansion animations on hover */}
      <style>{`
        .timeline-item-container:hover .timeline-node {
          transform: scale(1.4);
          background: var(--neon-yellow) !important;
          box-shadow: 0 0 10px var(--neon-yellow) !important;
        }
        .timeline-item-container:hover .cyber-card {
          border-color: rgba(255, 0, 85, 0.35);
          box-shadow: 0 0 15px rgba(255, 0, 85, 0.1);
        }
      `}</style>
    </section>
  );
};

export default TimelineSection;
