import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Shield } from 'lucide-react';
import { soundCtrl } from '../utils/soundController';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [bootCompleted, setBootCompleted] = useState(false);

  const bootLogs = [
    'SYS_INIT: Booting Neural HUD Core v4.2...',
    'NET_DIAG: Pinging secure WebGL socket cluster... OK',
    '3D_CORE: Parsing humanoid vertex configurations... DONE',
    'GLSL_LOAD: Calibrating neon glow fragment shaders... SUCCESS',
    'AUDIO_INIT: Configuring procedural synthesizer notes... ACTIVE',
    'SEC_CHECK: Initializing AES-256 decryption matrices... OK',
    'SYS_BOOT: System integrity verified. Ready.'
  ];

  // Simulating progress bar load
  useEffect(() => {
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.floor(Math.random() * 8) + 3;
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(interval);
        setBootCompleted(true);
        soundCtrl.playSuccess();
      }
      setProgress(currentProgress);
    }, 120);

    return () => clearInterval(interval);
  }, []);

  // Simulating log addition based on progress milestones
  useEffect(() => {
    const logIndex = Math.min(Math.floor((progress / 100) * bootLogs.length), bootLogs.length - 1);
    const currentLog = bootLogs[logIndex];
    if (currentLog && !logs.includes(currentLog)) {
      setLogs((prev) => [...prev, currentLog]);
      soundCtrl.playClick();
    }
  }, [progress, logs]);

  const handleEnterMatrix = () => {
    soundCtrl.playSuccess();
    onComplete();
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: '#040406',
        color: '#f0f0f5',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 99999, // Ensure it is above absolutely everything
        fontFamily: 'var(--font-mono)',
        padding: '2rem',
        overflow: 'hidden'
      }}
    >
      {/* Background Matrix Grid */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: 
            'linear-gradient(rgba(0, 240, 255, 0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 240, 255, 0.015) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          backgroundPosition: 'center center',
          pointerEvents: 'none'
        }}
      />

      <div style={{ maxWidth: '580px', width: '100%', display: 'flex', flexDirection: 'column', gap: '2rem', zIndex: 10 }}>
        
        {/* Header Icon Branding */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', justifyContent: 'center' }}>
          <Shield size={32} style={{ color: 'var(--neon-pink)', filter: 'drop-shadow(0 0 5px var(--neon-pink))' }} className="flicker-text" />
          <h2 style={{ fontFamily: 'var(--font-title)', fontSize: '1.25rem', letterSpacing: '0.15em', fontWeight: 900 }}>
            NEURAL_CORE_LINK
          </h2>
        </div>

        {/* Loading details HUD */}
        <div 
          className="cyber-card cyber-corners"
          style={{
            background: 'rgba(5, 5, 8, 0.95)',
            border: '1px solid rgba(0, 240, 255, 0.2)',
            padding: '1.5rem',
            minHeight: '220px',
            boxShadow: 'inset 0 0 20px rgba(0, 240, 255, 0.05)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.4rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '1px solid rgba(0, 240, 255, 0.1)', paddingBottom: '0.5rem', marginBottom: '0.6rem', color: 'var(--text-dim)', fontSize: '0.7rem' }}>
            <Terminal size={12} />
            <span>BOOT DIAGNOSTIC SEQUENCE IN PROGRESS...</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem', overflowY: 'hidden', flex: 1, fontSize: '0.75rem' }}>
            {logs.map((log, index) => (
              <div 
                key={index} 
                className="terminal-line"
                style={{ 
                  color: index === bootLogs.length - 1 ? 'var(--neon-cyan)' : 'var(--neon-yellow)',
                  opacity: 0.9
                }}
              >
                <span style={{ color: 'var(--text-dim)', marginRight: '0.5rem' }}>&gt;</span>
                {log}
              </div>
            ))}
            {!bootCompleted && (
              <div className="terminal-line flicker-text" style={{ color: 'var(--neon-pink)' }}>
                <span style={{ color: 'var(--text-dim)', marginRight: '0.5rem' }}>&gt;</span>
                DOWNLINKING QUANTUM PACKETS... {progress}%
              </div>
            )}
          </div>
        </div>

        {/* Neon Progress Bar HUD */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            <span>SECTOR_DECRYPT_STATUS:</span>
            <span style={{ color: 'var(--neon-cyan)' }}>{progress}%</span>
          </div>
          <div 
            style={{ 
              height: '16px', 
              background: 'rgba(255, 255, 255, 0.05)', 
              border: '1px solid rgba(0, 240, 255, 0.15)',
              padding: '2px',
              borderRadius: '2px',
              position: 'relative'
            }}
          >
            <motion.div
              style={{
                height: '100%',
                background: 'linear-gradient(90deg, var(--neon-pink), var(--neon-cyan))',
                boxShadow: 'var(--border-glow-cyan)',
                borderRadius: '1px',
                width: `${progress}%`
              }}
            />
            <div 
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundImage: 'linear-gradient(90deg, transparent 85%, #040406 85%)',
                backgroundSize: '12px 100%',
                pointerEvents: 'none'
              }}
            />
          </div>
        </div>

        {/* Enter Button */}
        <div style={{ display: 'flex', justifyContent: 'center', height: '50px' }}>
          <AnimatePresence>
            {bootCompleted && (
              <motion.button
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                onClick={handleEnterMatrix}
                className="cyber-btn"
                style={{
                  padding: '0.8rem 2.2rem',
                  fontSize: '0.9rem',
                  boxShadow: 'var(--border-glow-cyan)'
                }}
              >
                <span>ENTER COGNITIVE NET</span>
              </motion.button>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
};

export default LoadingScreen;
