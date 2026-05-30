import { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Terminal, Activity, Wifi, Clock, ArrowDown, Sun, Moon } from 'lucide-react';
import { soundCtrl } from './utils/soundController';
import { AvatarCanvas } from './components/AvatarCanvas';
import { HeroSection } from './components/HeroSection';
import { AboutMe } from './components/AboutMe';
import { SpecSection } from './components/SpecSection';
import { ProjectsSection } from './components/ProjectsSection';
import { Education } from './components/Education';
import { TimelineSection } from './components/TimelineSection';
import { ContactTerminal } from './components/ContactTerminal';
import { Footer } from './components/Footer';
import { LoadingScreen } from './components/LoadingScreen';
import { CursorGlow } from './components/CursorGlow';
import { AiChatbot } from './components/AiChatbot';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState('');
  const [isMuted, setIsMuted] = useState(true);
  const [activeSection, setActiveSection] = useState('hero');
  const [ping, setPing] = useState(18);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  // References for scroll navigation targets
  const heroRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const specRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const educationRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  // Update clock & ping diagnostics
  useEffect(() => {
    const updateTime = () => {
      const date = new Date();
      setCurrentTime(date.toLocaleTimeString());
    };
    
    updateTime();
    const timeInterval = setInterval(updateTime, 1000);

    const pingInterval = setInterval(() => {
      setPing(Math.floor(Math.random() * 8) + 15);
    }, 4000);

    return () => {
      clearInterval(timeInterval);
      clearInterval(pingInterval);
    };
  }, []);

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) return;
      const progress = window.scrollY / scrollHeight;
      setScrollProgress(progress);

      // Determine active section based on scroll offsets
      const scrollPos = window.scrollY + window.innerHeight / 3;

      if (contactRef.current && scrollPos >= contactRef.current.offsetTop) {
        setActiveSection('contact');
      } else if (timelineRef.current && scrollPos >= timelineRef.current.offsetTop) {
        setActiveSection('timeline');
      } else if (educationRef.current && scrollPos >= educationRef.current.offsetTop) {
        setActiveSection('education');
      } else if (projectsRef.current && scrollPos >= projectsRef.current.offsetTop) {
        setActiveSection('projects');
      } else if (specRef.current && scrollPos >= specRef.current.offsetTop) {
        setActiveSection('spec');
      } else if (aboutRef.current && scrollPos >= aboutRef.current.offsetTop) {
        setActiveSection('about');
      } else {
        setActiveSection('hero');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAudioToggle = () => {
    const nextMuteState = soundCtrl.toggleMute();
    setIsMuted(nextMuteState);
    if (!nextMuteState) {
      soundCtrl.playSuccess();
    }
  };

  const handleNavClick = (ref: React.RefObject<HTMLDivElement | null>, name: string) => {
    soundCtrl.playClick();
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(name);
    }
  };

  const handleThemeToggle = () => {
    soundCtrl.playClick();
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    if (nextTheme === 'light') {
      document.body.classList.add('light-theme');
    } else {
      document.body.classList.remove('light-theme');
    }
  };

  const handleLoadingComplete = () => {
    setIsLoading(false);
    // Auto-unmute sound after explicit user entry gesture
    const nextMuteState = soundCtrl.toggleMute();
    setIsMuted(nextMuteState);
  };

  return (
    <>
      {/* 1. Loader screen overlay */}
      {isLoading && (
        <LoadingScreen onComplete={handleLoadingComplete} />
      )}

      {/* 2. Custom Cursor Glow */}
      <CursorGlow />

      {/* 3. Neural AI Chatbot Assistant */}
      <AiChatbot />

      {/* Cyberpunk HUD Atmosphere Overlays */}
      <div className="hud-scanlines"></div>
      <div className="hud-vignette"></div>
      <div className="hud-grid"></div>

      {/* R3F 3D Canvas Background */}
      <AvatarCanvas scrollProgress={scrollProgress} activeSection={activeSection} />

      {/* Global Top HUD Header */}
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '60px',
          background: 'rgba(5, 5, 8, 0.8)',
          borderBottom: '1px solid rgba(0, 240, 255, 0.15)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          zIndex: 100,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 2rem',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.8rem'
        }}
      >
        {/* Left branding */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', cursor: 'pointer' }} onClick={() => handleNavClick(heroRef, 'hero')}>
          <Terminal size={16} className="flicker-text" style={{ color: 'var(--neon-cyan)' }} />
          <span style={{ fontWeight: 700, letterSpacing: '0.1em', color: '#fff' }}>
            NEURAL_HUD <span style={{ color: 'var(--neon-pink)' }}>v4.2</span>
          </span>
        </div>

        {/* Center Diagnostics telemetry */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', color: 'var(--text-muted)' }} className="header-diagnostics">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Activity size={12} style={{ color: 'var(--neon-cyan)' }} />
            <span>GRAVITY_FLD: {(1.0 + scrollProgress * 2.5).toFixed(2)}G</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Wifi size={12} style={{ color: 'var(--neon-yellow)' }} />
            <span>PING: {ping}MS</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Clock size={12} style={{ color: 'var(--neon-pink)' }} />
            <span>SYS_TIME: {currentTime}</span>
          </div>
        </div>

        {/* Right utility buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          
          {/* Light/Dark mode switcher */}
          <button
            onClick={handleThemeToggle}
            className="cyber-btn"
            style={{
              padding: '0.4rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minWidth: '38px',
              height: '32px'
            }}
          >
            {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
          </button>

          {/* Audio volume controller */}
          <button
            onClick={handleAudioToggle}
            className={`cyber-btn ${isMuted ? 'pink' : ''}`}
            style={{
              padding: '0.4rem 0.8rem',
              fontSize: '0.7rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              minWidth: '100px',
              justifyContent: 'center',
              height: '32px'
            }}
          >
            {isMuted ? (
              <>
                <VolumeX size={12} />
                <span>AUDIO OFF</span>
              </>
            ) : (
              <>
                <Volume2 size={12} />
                <span>AUDIO ON</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* Left side scroll progress indicators */}
      <nav
        style={{
          position: 'fixed',
          left: '2rem',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 100,
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.7rem'
        }}
        className="sidebar-nav"
      >
        {[
          { key: 'hero', label: '01_CORE_SYS', ref: heroRef },
          { key: 'about', label: '02_BIO_ARCH', ref: aboutRef },
          { key: 'spec', label: '03_TECH_SPEC', ref: specRef },
          { key: 'projects', label: '04_ARCHIVES', ref: projectsRef },
          { key: 'education', label: '05_EDU_NET', ref: educationRef },
          { key: 'timeline', label: '06_GRID_NET', ref: timelineRef },
          { key: 'contact', label: '07_CONN_SEC', ref: contactRef }
        ].map((node) => (
          <div
            key={node.key}
            onClick={() => handleNavClick(node.ref, node.key)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.8rem',
              cursor: 'pointer',
              opacity: activeSection === node.key ? 1 : 0.4,
              transition: 'opacity var(--transition-fast)'
            }}
          >
            {/* Nav Node point */}
            <div
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: activeSection === node.key ? 'var(--neon-cyan)' : 'var(--text-dim)',
                boxShadow: activeSection === node.key ? 'var(--border-glow-cyan)' : 'none',
                transition: 'all var(--transition-fast)'
              }}
            />
            <span
              style={{
                color: activeSection === node.key ? '#fff' : 'var(--text-muted)',
                letterSpacing: '0.05em'
              }}
            >
              {node.label}
            </span>
          </div>
        ))}
      </nav>

      {/* Main Content Layout Sections */}
      <main style={{ position: 'relative', zIndex: 2 }}>
        <div ref={heroRef} id="hero">
          <HeroSection onScrollToNext={() => handleNavClick(aboutRef, 'about')} />
        </div>
        <div ref={aboutRef} id="about">
          <AboutMe />
        </div>
        <div ref={specRef} id="spec">
          <SpecSection />
        </div>
        <div ref={projectsRef} id="projects">
          <ProjectsSection />
        </div>
        <div ref={educationRef} id="education">
          <Education />
        </div>
        <div ref={timelineRef} id="timeline">
          <TimelineSection />
        </div>
        <div ref={contactRef} id="contact">
          <ContactTerminal />
        </div>
        <Footer />
      </main>

      {/* Global Scroll Down CTA on Hero page */}
      {activeSection === 'hero' && (
        <div
          onClick={() => handleNavClick(aboutRef, 'about')}
          style={{
            position: 'fixed',
            bottom: '2.5rem',
            right: '2.5rem',
            zIndex: 100,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            color: 'var(--neon-cyan)',
            opacity: 0.8,
            transition: 'opacity var(--transition-fast)'
          }}
          className="scroll-down-cta"
        >
          <span>SCROLL TO DECRYPT</span>
          <ArrowDown size={14} className="flicker-text" />
        </div>
      )}

      {/* Custom Styles for Responsive Hiding of HUD Elements */}
      <style>{`
        @media (max-width: 900px) {
          .header-diagnostics {
            display: none !important;
          }
          .sidebar-nav {
            display: none !important;
          }
          .scroll-down-cta {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}

export default App;
