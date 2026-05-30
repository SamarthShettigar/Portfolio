import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, X, GitBranch } from 'lucide-react';
import { soundCtrl } from '../utils/soundController';

interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  longDescription: string;
  tech: string[];
  systemLoad: string;
  date: string;
}

export const ProjectsSection: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projects: Project[] = [
    {
      id: '01',
      title: 'PROJECT AETHER',
      tagline: '3D PROCEDURAL SHADER GRAPHICS ENGINE',
      description: 'An interactive WebGL simulation rendering custom procedural noise meshes, responsive to real-time pointer interactions.',
      longDescription: 'Project Aether is a high-performance WebGL environment leveraging React Three Fiber and customized vertex/fragment shaders. It handles fluid grid dynamics, particle physics simulations, and custom shader materials that synchronize vertex deformation to dynamic scroll positions.',
      tech: ['React Three Fiber', 'GLSL Shaders', 'Three.js', 'GSAP'],
      systemLoad: '0.04 FPS_LAG',
      date: '2026.04'
    },
    {
      id: '02',
      title: 'NEXUS MATRIX',
      tagline: 'SECURE DECENTRALIZED MONITOR HUD',
      description: 'A cybersecurity terminal monitoring server nodes, packet speeds, and intrusion logs in real-time.',
      longDescription: 'Nexus Matrix functions as a secure diagnostic panel utilizing React and Tailwind-inspired styling structures. It fetches data dynamically via WebSockets, parses system integrity, and updates responsive canvas charts on critical alerts.',
      tech: ['React', 'WebSockets', 'Canvas API', 'Node.js'],
      systemLoad: '12.4 MB/S',
      date: '2026.02'
    },
    {
      id: '03',
      title: 'COSMOS SHELL',
      tagline: 'SYNTHESIZER SOUNDSCAPE CONTROLLER',
      description: 'Web Audio API ambient synthesizer generating procedural cinematic sounds based on user interaction nodes.',
      longDescription: 'Cosmos Shell is a procedural audio terminal synthesizing sound waves, low-pass filters, and delay nodes entirely client-side. It maps cursor movements to pitch frequency, generating immersive soundscapes.',
      tech: ['Web Audio API', 'TypeScript', 'Vite', 'Vanilla CSS'],
      systemLoad: '0.015 AUD_THD',
      date: '2025.11'
    }
  ];

  const handleCardHover = () => {
    soundCtrl.playClick();
  };

  const handleOpenDetails = (project: Project) => {
    soundCtrl.playSuccess();
    setSelectedProject(project);
  };

  const handleCloseDetails = () => {
    soundCtrl.playClick();
    setSelectedProject(null);
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--neon-pink)', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
          <GitBranch size={14} className="flicker-text" />
          <span>[PROJECT_FILES]</span>
        </div>
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 800, color: '#fff' }}>
          CORE <span style={{ color: 'var(--neon-cyan)', textShadow: 'var(--text-glow-cyan)' }}>ARCHIVES</span>
        </h2>
        <div style={{ width: '60px', height: '3px', background: 'var(--neon-cyan)', marginTop: '0.5rem' }}></div>
      </div>

      {/* Projects Grid */}
      <div 
        style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
          gap: '2rem' 
        }}
      >
        {projects.map((project) => (
          <div
            key={project.id}
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
            {/* Top info */}
            <div>
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
                <span>SECTOR_{project.id}</span>
                <span>{project.date}</span>
              </div>

              <h3 
                className="glitch-text"
                style={{ 
                  fontSize: '1.3rem', 
                  color: '#fff', 
                  letterSpacing: '0.05em',
                  marginBottom: '0.2rem'
                }}
              >
                {project.title}
              </h3>
              
              <span 
                style={{ 
                  fontFamily: 'var(--font-mono)', 
                  fontSize: '0.7rem', 
                  color: 'var(--neon-yellow)',
                  display: 'block',
                  marginBottom: '1rem',
                  letterSpacing: '0.1em'
                }}
              >
                {project.tagline}
              </span>

              <p style={{ fontSize: '0.9rem', lineHeight: 1.5 }}>
                {project.description}
              </p>
            </div>

            {/* Tech tags */}
            <div>
              <div 
                style={{ 
                  display: 'flex', 
                  flexWrap: 'wrap', 
                  gap: '0.5rem',
                  marginBottom: '1.2rem'
                }}
              >
                {project.tech.map((tag) => (
                  <span 
                    key={tag}
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.65rem',
                      color: 'var(--neon-cyan)',
                      border: '1px solid rgba(0, 240, 255, 0.2)',
                      padding: '0.1rem 0.5rem',
                      borderRadius: '1px',
                      background: 'rgba(0, 240, 255, 0.02)'
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Action Button */}
              <div 
                style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                  paddingTop: '0.8rem'
                }}
              >
                <span 
                  style={{ 
                    fontFamily: 'var(--font-mono)', 
                    fontSize: '0.65rem', 
                    color: 'var(--text-dim)' 
                  }}
                >
                  LOAD: {project.systemLoad}
                </span>

                <button
                  className="cyber-btn pink"
                  onClick={() => handleOpenDetails(project)}
                  style={{ padding: '0.5rem 1rem', fontSize: '0.75rem' }}
                >
                  DECRYPT_
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Modal Overlay */}
      <AnimatePresence>
        {selectedProject && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              zIndex: 999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1.5rem',
              background: 'rgba(4, 4, 6, 0.85)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)'
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="cyber-card cyber-corners"
              style={{
                width: '100%',
                maxWidth: '650px',
                background: 'var(--bg-panel-solid)',
                border: '1px solid var(--neon-cyan)',
                boxShadow: 'var(--border-glow-cyan)',
                padding: '2.5rem',
                position: 'relative'
              }}
            >
              {/* Close Button */}
              <button
                onClick={handleCloseDetails}
                onMouseEnter={handleCardHover}
                style={{
                  position: 'absolute',
                  top: '1.5rem',
                  right: '1.5rem',
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--neon-pink)',
                  cursor: 'pointer',
                  padding: '0.2rem'
                }}
              >
                <X size={20} />
              </button>

              {/* Title & Metadata */}
              <div style={{ marginBottom: '1.5rem' }}>
                <span 
                  style={{ 
                    fontFamily: 'var(--font-mono)', 
                    fontSize: '0.75rem', 
                    color: 'var(--text-dim)' 
                  }}
                >
                  SECTOR_{selectedProject.id} // DECRYPTED_CORE_DATA
                </span>
                <h3 
                  style={{ 
                    fontSize: '1.8rem', 
                    color: '#fff', 
                    marginTop: '0.2rem',
                    textShadow: '0 0 10px rgba(255, 255, 255, 0.1)'
                  }}
                >
                  {selectedProject.title}
                </h3>
                <span 
                  style={{ 
                    fontFamily: 'var(--font-mono)', 
                    fontSize: '0.8rem', 
                    color: 'var(--neon-yellow)' 
                  }}
                >
                  {selectedProject.tagline}
                </span>
              </div>

              {/* Project Body */}
              <div 
                style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: '1.5rem',
                  marginBottom: '2rem'
                }}
              >
                <p style={{ fontSize: '0.95rem', lineHeight: 1.6, color: 'var(--text-primary)' }}>
                  {selectedProject.longDescription}
                </p>

                {/* System Stats Block */}
                <div 
                  style={{
                    background: 'rgba(5, 5, 8, 0.7)',
                    border: '1px dashed rgba(0, 240, 255, 0.2)',
                    padding: '1rem',
                    borderRadius: '2px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.8rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.4rem'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-dim)' }}>INTEGRITY STATUS:</span>
                    <span style={{ color: 'var(--neon-yellow)' }}>100% EXCELLENT</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-dim)' }}>NETWORK IO LOAD:</span>
                    <span style={{ color: 'var(--neon-pink)' }}>{selectedProject.systemLoad}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-dim)' }}>ARCHIVE VERSION:</span>
                    <span style={{ color: 'var(--neon-cyan)' }}>v1.0.4a-release</span>
                  </div>
                </div>
              </div>

              {/* Actions Footer */}
              <div 
                style={{ 
                  display: 'flex', 
                  justifyContent: 'flex-end', 
                  gap: '1rem',
                  borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                  paddingTop: '1.5rem'
                }}
              >
                <button
                  className="cyber-btn"
                  onClick={handleCloseDetails}
                  style={{ padding: '0.6rem 1.2rem', fontSize: '0.8rem' }}
                >
                  DISMISS
                </button>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  className="cyber-btn pink"
                  onMouseEnter={handleCardHover}
                  style={{ 
                    padding: '0.6rem 1.2rem', 
                    fontSize: '0.8rem', 
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem'
                  }}
                >
                  <span>SOURCE_DIR</span>
                  <ExternalLink size={12} />
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProjectsSection;
