import React, { useEffect, useState } from 'react';
import { Terminal, Cpu } from 'lucide-react';
import { soundCtrl } from '../utils/soundController';

interface HeroSectionProps {
  onScrollToNext: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onScrollToNext }) => {
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  const [logIndex, setLogIndex] = useState(0);

  const logs = [
    'SYS_BOOT: Initializing cyberpunk-mesh-v4.0.0...',
    'NET_CONN: Establishing secure socket tunnel... DONE',
    'CORE_LOAD: Syncing 3D Hologram Avatar Matrix... SUCCESS',
    'DECRYPT: Parsing structural portfolio spec...',
    'SECURE_SHELL: Authorized Guest. Access granted.'
  ];

  useEffect(() => {
    if (logIndex < logs.length) {
      const delay = logIndex === 0 ? 300 : Math.random() * 400 + 200;
      const timer = setTimeout(() => {
        setTerminalLogs((prev) => [...prev, logs[logIndex]]);
        setLogIndex(logIndex + 1);
        soundCtrl.playClick();
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [logIndex]);

  const handleBtnHover = () => {
    soundCtrl.playClick();
  };

  const handleStartClick = () => {
    soundCtrl.playSuccess();
    onScrollToNext();
  };

  return (
    <section 
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '2rem',
        position: 'relative',
        zIndex: 2,
        maxWidth: '1200px',
        margin: '0 auto',
        width: '100%'
      }}
    >
      <div style={{ maxWidth: '800px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {/* Subheader Badge */}
        <div 
          style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '0.5rem',
            color: 'var(--neon-yellow)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.85rem',
            background: 'rgba(204, 255, 0, 0.05)',
            border: '1px solid rgba(204, 255, 0, 0.2)',
            padding: '0.3rem 0.8rem',
            borderRadius: '2px',
            width: 'fit-content'
          }}
        >
          <Cpu size={14} className="flicker-text" />
          <span>SYS_STATUS: ACTIVE // SYSTEM OVERRIDE</span>
        </div>

        {/* Title */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <h1 
            className="glitch-text"
            style={{ 
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', 
              fontWeight: 900,
              lineHeight: 1.1,
              color: 'var(--text-primary)',
              textShadow: '0 0 10px rgba(255, 255, 255, 0.1)',
              letterSpacing: '0.02em'
            }}
          >
            NEURAL<br />
            <span style={{ color: 'var(--neon-cyan)', textShadow: 'var(--text-glow-cyan)' }}>PORTFOLIO</span>
          </h1>
          <h3 
            style={{ 
              fontFamily: 'var(--font-mono)', 
              color: 'var(--neon-pink)', 
              fontSize: '1rem',
              marginTop: '0.5rem',
              letterSpacing: '0.2em'
            }}
          >
            STYLIZED 3D DATA INTERFACE
          </h3>
        </div>

        {/* Simulated System Boot Terminal */}
        <div 
          className="cyber-card cyber-corners"
          style={{ 
            marginTop: '1rem',
            background: 'rgba(5, 5, 8, 0.8)',
            border: '1px solid rgba(0, 240, 255, 0.15)',
            boxShadow: 'inset 0 0 20px rgba(0, 240, 255, 0.05)',
            padding: '1.2rem',
            minHeight: '160px',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.4rem'
          }}
        >
          <div 
            style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              borderBottom: '1px solid rgba(0, 240, 255, 0.1)',
              paddingBottom: '0.4rem',
              marginBottom: '0.5rem',
              color: 'var(--text-dim)',
              fontSize: '0.75rem',
              fontFamily: 'var(--font-mono)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Terminal size={12} />
              <span>TERMINAL COMMAND LOGGER</span>
            </div>
            <span>LOC_IP: 127.0.0.1</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
            {terminalLogs.map((log, index) => (
              <div 
                key={index} 
                className="terminal-line"
                style={{ 
                  color: index === logs.length - 1 ? 'var(--neon-cyan)' : 'var(--neon-yellow)',
                  opacity: 0.9
                }}
              >
                <span style={{ color: 'var(--text-dim)', marginRight: '0.5rem' }}>&gt;</span>
                {log}
              </div>
            ))}
            {logIndex < logs.length && (
              <div className="terminal-line flicker-text" style={{ color: '#ff0055' }}>
                <span style={{ color: 'var(--text-dim)', marginRight: '0.5rem' }}>&gt;</span>
                CONNECTING...
              </div>
            )}
          </div>
        </div>

        {/* Description & Action */}
        <div 
          style={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            alignItems: 'center', 
            gap: '2rem', 
            marginTop: '1.5rem' 
          }}
        >
          <button 
            className="cyber-btn"
            onMouseEnter={handleBtnHover}
            onClick={handleStartClick}
          >
            <span>INITIALIZE DECRYPT</span>
          </button>
          
          <p 
            style={{ 
              maxWidth: '360px', 
              fontSize: '0.9rem',
              lineHeight: 1.4,
              borderLeft: '2px solid var(--neon-pink)',
              paddingLeft: '1rem',
              color: 'var(--text-muted)'
            }}
          >
            Interactive web console engineered with Three.js, Custom Shaders, and Web Audio API. Move cursor to disrupt the mesh gravity field.
          </p>
        </div>
      </div>
      
      {/* Decrypt bottom status */}
      <div 
        style={{ 
          position: 'absolute', 
          bottom: '2.5rem', 
          left: '2rem',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.75rem',
          color: 'var(--text-dim)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}
      >
        <span className="flicker-text" style={{ color: 'var(--neon-cyan)' }}>●</span>
        <span>HUD STABILITY: 99.82% // CLOCK_SYNC</span>
      </div>
    </section>
  );
};

export default HeroSection;
