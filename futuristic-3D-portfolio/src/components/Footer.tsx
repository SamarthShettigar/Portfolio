import React from 'react';
import { Github, Linkedin, Twitter, Terminal, ShieldAlert } from 'lucide-react';
import { soundCtrl } from '../utils/soundController';

export const Footer: React.FC = () => {
  const handleHover = () => {
    soundCtrl.playClick();
  };

  const socials = [
    { icon: <Github size={16} />, url: 'https://github.com', label: 'GITHUB' },
    { icon: <Linkedin size={16} />, url: 'https://linkedin.com', label: 'LINKEDIN' },
    { icon: <Twitter size={16} />, url: 'https://twitter.com', label: 'X_NET' }
  ];

  return (
    <footer
      style={{
        borderTop: '1px solid rgba(0, 240, 255, 0.12)',
        background: 'rgba(5, 5, 8, 0.9)',
        backdropFilter: 'blur(10px)',
        padding: '3rem 2rem',
        position: 'relative',
        zIndex: 2,
        fontFamily: 'var(--font-mono)',
        fontSize: '0.75rem',
        color: 'var(--text-muted)'
      }}
    >
      <div 
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '2rem'
        }}
      >
        {/* Left: Brand copyright */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#fff', fontWeight: 'bold' }}>
            <Terminal size={14} style={{ color: 'var(--neon-cyan)' }} />
            <span>NEURAL_LINK_GRID // v4.2</span>
          </div>
          <div>
            © {new Date().getFullYear()} AGENT_DEVELOPER. ALL RIGHTS RESERVED.
          </div>
        </div>

        {/* Center: Social links */}
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.url}
              target="_blank"
              rel="noreferrer"
              onMouseEnter={handleHover}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                color: 'var(--text-muted)',
                textDecoration: 'none',
                transition: 'color var(--transition-fast)'
              }}
              className="social-footer-link"
            >
              {social.icon}
              <span>{social.label}</span>
            </a>
          ))}
        </div>

        {/* Right: Server latency telemetry */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', color: 'var(--text-dim)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <ShieldAlert size={12} style={{ color: 'var(--neon-yellow)' }} />
            <span>ENCRYPTION: SHIELD_ACTIVE</span>
          </div>
          <span>|</span>
          <span>FPS: 60.00hz</span>
        </div>
      </div>

      <style>{`
        .social-footer-link:hover {
          color: var(--neon-cyan) !important;
          text-shadow: var(--text-glow-cyan);
        }
      `}</style>
    </footer>
  );
};

export default Footer;
