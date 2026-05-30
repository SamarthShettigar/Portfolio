import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Terminal, Send, CheckCircle2, ShieldAlert } from 'lucide-react';
import { soundCtrl } from '../utils/soundController';

export const ContactTerminal: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'transmitting' | 'success'>('idle');
  const [transmissionLogs, setTransmissionLogs] = useState<string[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Play keydown tick sound
    soundCtrl.playClick();
  };

  const validateForm = () => {
    const newErrors = { name: '', email: '', message: '' };
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = 'NAME FIELD IS MANDATORY';
      isValid = false;
    }
    if (!formData.email.trim()) {
      newErrors.email = 'EMAIL ROUTE REQUIRED';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'INVALID ROUTING PROTOCOL (EMAIL FORMAT)';
      isValid = false;
    }
    if (!formData.message.trim()) {
      newErrors.message = 'PAYLOAD MESSAGE IS EMPTY';
      isValid = false;
    }

    setErrors(newErrors);
    if (!isValid) soundCtrl.playGlitch();
    return isValid;
  };

  const appendLogs = (newLogs: string[], delay: number) => {
    newLogs.forEach((log, index) => {
      setTimeout(() => {
        setTransmissionLogs((prev) => [...prev, log]);
        soundCtrl.playClick();
      }, index * delay);
    });
  };

  const handleTransmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setStatus('transmitting');
    setTransmissionLogs([]);

    const logSequence = [
      'SYS: Initializing Secure Mail Protocol...',
      'ENCRYPT: Securing message payload via AES-256...',
      'ROUTER: Appending connection header metadata...',
      'TRANS: Transmitting packets to SMTP Node (G-Host)...',
    ];

    appendLogs(logSequence, 350);

    setTimeout(() => {
      setStatus('success');
      soundCtrl.playSuccess();
      
      // Cyberpunk-colored Neon Confetti Burst (Cyan & Magenta)
      const duration = 2 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1000 };

      const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

      const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        // Confetti colors
        const colors = ['#00f0ff', '#ff0055', '#ccff00'];
        
        confetti({ 
          ...defaults, 
          particleCount, 
          colors,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } 
        });
        confetti({ 
          ...defaults, 
          particleCount, 
          colors,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } 
        });
      }, 250);

    }, 1800);
  };

  const resetTerminal = () => {
    setFormData({ name: '', email: '', message: '' });
    setTransmissionLogs([]);
    setStatus('idle');
    soundCtrl.playClick();
  };

  const handleInputFocus = () => {
    soundCtrl.playClick();
  };

  return (
    <section 
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '6rem 2rem 4rem 2rem',
        position: 'relative',
        zIndex: 2,
        maxWidth: '850px',
        margin: '0 auto',
        width: '100%'
      }}
    >
      {/* Section Header */}
      <div style={{ marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--neon-cyan)', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
          <Terminal size={14} className="flicker-text" />
          <span>[CONNECTION_SECURE_PORT]</span>
        </div>
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 800, color: '#fff' }}>
          SECURED <span style={{ color: 'var(--neon-pink)', textShadow: 'var(--text-glow-pink)' }}>TERMINAL</span>
        </h2>
        <div style={{ width: '60px', height: '3px', background: 'var(--neon-cyan)', marginTop: '0.5rem' }}></div>
      </div>

      <div 
        className="cyber-card cyber-corners"
        style={{
          background: 'rgba(5, 5, 8, 0.9)',
          border: '1px solid rgba(0, 240, 255, 0.25)',
          padding: '2.5rem',
          position: 'relative'
        }}
      >
        {/* Terminal top header */}
        <div 
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '1px solid rgba(0, 240, 255, 0.15)',
            paddingBottom: '0.8rem',
            marginBottom: '2rem',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            color: 'var(--text-dim)'
          }}
        >
          <span>ROOT@TERMINAL:~$ CONNECT --TARGET DEVELOPER</span>
          <span>SSH: PORT_22</span>
        </div>

        {status === 'idle' && (
          <form onSubmit={handleTransmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Input Name */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <label 
                style={{ 
                  fontFamily: 'var(--font-mono)', 
                  fontSize: '0.85rem', 
                  color: 'var(--neon-yellow)' 
                }}
              >
                guest@terminal:~$ enter name --val
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                placeholder="INPUT IDENTIFICATION..."
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: errors.name ? '1px solid var(--neon-pink)' : '1px solid rgba(0, 240, 255, 0.15)',
                  borderRadius: '2px',
                  padding: '0.8rem 1rem',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.9rem',
                  color: '#fff',
                  outline: 'none',
                  transition: 'all 0.3s ease'
                }}
              />
              {errors.name && (
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--neon-pink)', display: 'flex', alignItems: 'center', gap: '0.3rem', marginTop: '0.2rem' }}>
                  <ShieldAlert size={10} /> {errors.name}
                </span>
              )}
            </div>

            {/* Input Email */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <label 
                style={{ 
                  fontFamily: 'var(--font-mono)', 
                  fontSize: '0.85rem', 
                  color: 'var(--neon-yellow)' 
                }}
              >
                guest@terminal:~$ enter email --route
              </label>
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                placeholder="INPUT CONTACT PATHWAY..."
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: errors.email ? '1px solid var(--neon-pink)' : '1px solid rgba(0, 240, 255, 0.15)',
                  borderRadius: '2px',
                  padding: '0.8rem 1rem',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.9rem',
                  color: '#fff',
                  outline: 'none',
                  transition: 'all 0.3s ease'
                }}
              />
              {errors.email && (
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--neon-pink)', display: 'flex', alignItems: 'center', gap: '0.3rem', marginTop: '0.2rem' }}>
                  <ShieldAlert size={10} /> {errors.email}
                </span>
              )}
            </div>

            {/* Input Message */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <label 
                style={{ 
                  fontFamily: 'var(--font-mono)', 
                  fontSize: '0.85rem', 
                  color: 'var(--neon-yellow)' 
                }}
              >
                guest@terminal:~$ enter message --msg
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                placeholder="INPUT CORRESPONDENCE DATA PACKET..."
                rows={5}
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: errors.message ? '1px solid var(--neon-pink)' : '1px solid rgba(0, 240, 255, 0.15)',
                  borderRadius: '2px',
                  padding: '0.8rem 1rem',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.9rem',
                  color: '#fff',
                  outline: 'none',
                  resize: 'none',
                  transition: 'all 0.3s ease'
                }}
              />
              {errors.message && (
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--neon-pink)', display: 'flex', alignItems: 'center', gap: '0.3rem', marginTop: '0.2rem' }}>
                  <ShieldAlert size={10} /> {errors.message}
                </span>
              )}
            </div>

            {/* Submit button */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
              <button
                type="submit"
                className="cyber-btn"
                onMouseEnter={handleInputFocus}
                style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}
              >
                <span>TRANSMIT_PACKET</span>
                <Send size={14} />
              </button>
            </div>
          </form>
        )}

        {status === 'transmitting' && (
          <div 
            style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '0.6rem',
              minHeight: '260px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.9rem'
            }}
          >
            {transmissionLogs.map((log, index) => (
              <div key={index} style={{ color: 'var(--neon-cyan)' }}>
                <span style={{ color: 'var(--text-dim)', marginRight: '0.5rem' }}>&gt;</span>
                {log}
              </div>
            ))}
            <div className="flicker-text" style={{ color: 'var(--neon-pink)', marginTop: '1rem' }}>
              &gt; UPLOADING PAYLOAD... PLEASE HOLD CONNECTION
            </div>
          </div>
        )}

        {status === 'success' && (
          <div 
            style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1.2rem',
              minHeight: '300px',
              textAlign: 'center'
            }}
          >
            <CheckCircle2 size={48} style={{ color: 'var(--neon-yellow)', filter: 'drop-shadow(0 0 5px var(--neon-yellow))' }} />
            <div>
              <h3 
                style={{ 
                  fontSize: '1.4rem', 
                  color: '#fff',
                  fontFamily: 'var(--font-title)',
                  marginBottom: '0.4rem'
                }}
              >
                TRANSMISSION SECURED
              </h3>
              <p 
                style={{ 
                  fontSize: '0.9rem', 
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--neon-cyan)',
                  maxWidth: '380px'
                }}
              >
                Your message has been successfully routed. The cryptographic response socket is pending activation.
              </p>
            </div>
            
            <button
              onClick={resetTerminal}
              className="cyber-btn"
              style={{ marginTop: '1.5rem', padding: '0.6rem 1.2rem', fontSize: '0.8rem' }}
            >
              ESTABLISH NEW CONNECTION
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ContactTerminal;
