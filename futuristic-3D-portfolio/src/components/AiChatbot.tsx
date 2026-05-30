import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Terminal, Play } from 'lucide-react';
import { soundCtrl } from '../utils/soundController';

interface Message {
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}

export const AiChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'ai',
      text: 'SYSTEM_BOOT: Neural AI assistant active. Select command protocol or enter query.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Typewriter effect state
  const [currentlyTypingText, setCurrentlyTypingText] = useState('');

  const quickCommands = [
    { label: '/diagnostics', val: 'diagnostics', desc: 'System integrity check' },
    { label: '/bio', val: 'bio', desc: 'Retrieve agent info' },
    { label: '/stack', val: 'stack', desc: 'Query compiled stack' },
    { label: '/contact', val: 'contact', desc: 'Connection channels' }
  ];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, currentlyTypingText]);

  const toggleChat = () => {
    soundCtrl.playClick();
    setIsOpen(!isOpen);
  };

  const triggerAiResponse = (userQuery: string) => {
    setIsTyping(true);
    let aiText = '';

    const cleanQuery = userQuery.toLowerCase().trim();

    if (cleanQuery.includes('diag') || cleanQuery.includes('integrity') || cleanQuery.includes('check')) {
      aiText = `INTEGRITY_CHECK:
- CORE TEMPERATURE: 38.4°C
- PROCESSOR LOAD: 14.8%
- 3D MESH MATRIX: COMPILING
- SYS_STATUS: 100% EXCELLENT. ALL SYNC NODES COMPATIBLE.`;
    } else if (cleanQuery.includes('bio') || cleanQuery.includes('about') || cleanQuery.includes('who')) {
      aiText = `DECRYPTING BIO_ARCHIVE:
Agent is a senior full-stack developer and creative technologist specializing in premium WebGL/R3F experiences, custom shader models, and high-throughput React clusters. Currently active in Node.js architectures and low-latency API engineering.`;
    } else if (cleanQuery.includes('stack') || cleanQuery.includes('skill') || cleanQuery.includes('tech')) {
      aiText = `COMPUTING STACK SCHEMA:
- Front: React 19, TypeScript, Vite
- Graphics: Three.js, React Three Fiber, Drei, custom GLSL Shaders
- Animation: GSAP, Framer Motion
- Styling: Advanced CSS Custom Variables, Custom HUD grids
- Back: Node.js, WebSockets, NestJS, REST/GraphQL`;
    } else if (cleanQuery.includes('contact') || cleanQuery.includes('mail') || cleanQuery.includes('hire') || cleanQuery.includes('talk')) {
      aiText = `CONNECTION SOCKET ROUTE:
To establish secure communications, navigate to Sector 05 (CONN_SEC) at the bottom. Fill the AES-256 SMTP payload form or trigger mail links directly.`;
    } else if (cleanQuery.includes('hello') || cleanQuery.includes('hi ') || cleanQuery === 'hi') {
      aiText = `Connection established. Authorization: GUEST. Welcome to Neural Net. Input query commands: /diagnostics, /bio, /stack, /contact.`;
    } else if (cleanQuery.includes('project') || cleanQuery.includes('work')) {
      aiText = `DECRYPTING ARCHIVES:
- Sector_01: Project Aether (3D GLSL Shader engine)
- Sector_02: Nexus Matrix (Diagnostic HUD console)
- Sector_03: Cosmos Shell (Web Audio synthesizer)
Scroll to ARCHIVES sector to trigger active decryption previews.`;
    } else {
      aiText = `Query unassigned. Command parser unable to identify "${userQuery}". Please invoke standard protocols: /diagnostics, /bio, /stack, /contact.`;
    }

    // Typewriter emulation
    let currentIdx = 0;
    setCurrentlyTypingText('');
    
    const interval = setInterval(() => {
      if (currentIdx < aiText.length) {
        setCurrentlyTypingText((prev) => prev + aiText.charAt(currentIdx));
        currentIdx++;
        // Play very quiet clicks during text generation
        if (currentIdx % 2 === 0) {
          soundCtrl.playClick();
        }
      } else {
        clearInterval(interval);
        setMessages((prev) => [
          ...prev,
          {
            sender: 'ai',
            text: aiText,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
        setCurrentlyTypingText('');
        setIsTyping(false);
        soundCtrl.playSuccess();
      }
    }, 18);
  };

  const handleSend = (textToSend?: string) => {
    const finalMsg = (textToSend || inputValue).trim();
    if (!finalMsg || isTyping) return;

    soundCtrl.playClick();
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    setMessages((prev) => [...prev, { sender: 'user', text: finalMsg, timestamp }]);
    setInputValue('');
    
    setTimeout(() => {
      triggerAiResponse(finalMsg);
    }, 400);
  };

  return (
    <>
      {/* 1. Floating Action HUD Button (Trigger) */}
      <div
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          zIndex: 999,
          display: 'flex',
          alignItems: 'center',
          gap: '0.8rem'
        }}
      >
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 0.8, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                color: 'var(--neon-cyan)',
                background: 'rgba(5, 5, 8, 0.9)',
                border: '1px solid rgba(0, 240, 255, 0.3)',
                padding: '0.4rem 0.8rem',
                borderRadius: '2px',
                pointerEvents: 'none',
                boxShadow: 'var(--border-glow-cyan)'
              }}
            >
              NEURAL_CHAT_v1.0
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={toggleChat}
          className={`cyber-btn ${isOpen ? 'pink' : ''}`}
          style={{
            width: '46px',
            height: '46px',
            borderRadius: '50%',
            padding: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minWidth: 'auto',
            clipPath: 'none',
            boxShadow: isOpen ? 'var(--border-glow-pink)' : 'var(--border-glow-cyan)',
            borderColor: isOpen ? 'var(--neon-pink)' : 'var(--neon-cyan)'
          }}
        >
          {isOpen ? <X size={18} /> : (
            <div style={{ position: 'relative' }}>
              <MessageSquare size={18} />
              {/* Notification ping */}
              <span
                style={{
                  position: 'absolute',
                  top: '-4px',
                  right: '-4px',
                  width: '6px',
                  height: '6px',
                  background: 'var(--neon-yellow)',
                  borderRadius: '50%',
                  boxShadow: '0 0 5px var(--neon-yellow)'
                }}
                className="flicker-text"
              />
            </div>
          )}
        </button>
      </div>

      {/* 2. Expanding Terminal Chatbox */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="chatbot-panel cyber-corners"
            style={{
              position: 'fixed',
              bottom: '5.8rem',
              right: '2rem',
              width: '90%',
              maxWidth: '380px',
              height: '460px',
              background: 'rgba(5, 5, 8, 0.95)',
              backdropFilter: 'blur(15px)',
              WebkitBackdropFilter: 'blur(15px)',
              borderRadius: '4px',
              display: 'flex',
              flexDirection: 'column',
              zIndex: 999,
              fontFamily: 'var(--font-mono)'
            }}
          >
            {/* Header info */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0.8rem 1rem',
                borderBottom: '1px solid rgba(0, 240, 255, 0.2)',
                color: 'var(--neon-cyan)',
                fontSize: '0.75rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Terminal size={14} className="flicker-text" />
                <span>SYS_AI: NEURAL_INTERFACE</span>
              </div>
              <span className="flicker-text" style={{ color: 'var(--neon-yellow)' }}>● ONLINE</span>
            </div>

            {/* Message Area */}
            <div
              ref={scrollRef}
              className="custom-scrollbar"
              style={{
                flex: 1,
                padding: '1rem',
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                fontSize: '0.8rem',
                background: 'rgba(0, 0, 0, 0.15)'
              }}
            >
              {messages.map((msg, index) => (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                    maxWidth: '85%',
                    alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start'
                  }}
                >
                  <div
                    style={{
                      padding: '0.5rem 0.8rem',
                      borderRadius: '2px',
                      background: msg.sender === 'user' ? 'rgba(255, 0, 85, 0.1)' : 'rgba(0, 240, 255, 0.05)',
                      border: msg.sender === 'user' ? '1px solid rgba(255, 0, 85, 0.25)' : '1px solid rgba(0, 240, 255, 0.2)',
                      color: msg.sender === 'user' ? '#fff' : 'var(--text-primary)',
                      whiteSpace: 'pre-line',
                      lineHeight: '1.4'
                    }}
                  >
                    {msg.text}
                  </div>
                  <span style={{ fontSize: '0.6rem', color: 'var(--text-dim)', marginTop: '0.2rem' }}>
                    {msg.sender === 'user' ? 'GUEST' : 'SYS_AI'} // {msg.timestamp}
                  </span>
                </div>
              ))}

              {/* Stream typed response */}
              {isTyping && currentlyTypingText && (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    maxWidth: '85%',
                    alignSelf: 'flex-start'
                  }}
                >
                  <div
                    style={{
                      padding: '0.5rem 0.8rem',
                      borderRadius: '2px',
                      background: 'rgba(0, 240, 255, 0.05)',
                      border: '1px solid rgba(0, 240, 255, 0.2)',
                      color: 'var(--neon-cyan)',
                      whiteSpace: 'pre-line',
                      lineHeight: '1.4'
                    }}
                  >
                    {currentlyTypingText}
                    <span style={{ display: 'inline-block', width: '2px', height: '12px', background: 'var(--neon-cyan)', marginLeft: '2px' }} className="flicker-text" />
                  </div>
                </div>
              )}
            </div>

            {/* Quick Commands Options */}
            <div
              style={{
                padding: '0.5rem',
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.4rem',
                borderTop: '1px dashed rgba(255, 255, 255, 0.05)',
                background: 'rgba(5, 5, 8, 0.5)'
              }}
            >
              {quickCommands.map((cmd) => (
                <button
                  key={cmd.val}
                  onClick={() => handleSend(cmd.label)}
                  disabled={isTyping}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.65rem',
                    color: 'var(--neon-yellow)',
                    background: 'rgba(204, 255, 0, 0.03)',
                    border: '1px solid rgba(204, 255, 0, 0.15)',
                    padding: '0.2rem 0.4rem',
                    cursor: 'pointer',
                    borderRadius: '1px',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={() => soundCtrl.playClick()}
                >
                  {cmd.label}
                </button>
              ))}
            </div>

            {/* Chat Input form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              style={{
                display: 'flex',
                borderTop: '1px solid rgba(0, 240, 255, 0.2)',
                background: 'rgba(5, 5, 8, 0.95)'
              }}
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                disabled={isTyping}
                placeholder="Enter command or query..."
                style={{
                  flex: 1,
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: '#fff',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  padding: '0.8rem 1rem'
                }}
              />
              <button
                type="submit"
                disabled={isTyping}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--neon-cyan)',
                  padding: '0 1rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: isTyping ? 0.3 : 1
                }}
              >
                <Send size={14} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AiChatbot;
