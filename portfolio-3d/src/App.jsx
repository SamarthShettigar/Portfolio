import React, { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Loader from './components/Loader';
import Navbar from './components/Navbar';
import CustomCursor from './components/CustomCursor';
import CanvasContainer from './components/CanvasContainer';
import ErrorBoundary from './components/ErrorBoundary';

import Hero from './sections/Hero';
import About from './sections/About';
import Experience from './sections/Experience';
import Projects from './sections/Projects';
import Skills from './sections/Skills';
import Contact from './sections/Contact';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [loading, setLoading] = useState(true);
  const scrollContainerRef = useRef(null);
  const timelineRef = useRef(null);

  useLayoutEffect(() => {
    if (loading) return;

    // Orchestrate 3D camera/model positions based on active scroll section
    timelineRef.current = gsap.timeline({
      scrollTrigger: {
        trigger: scrollContainerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
      }
    });

    // Capture changes across screen steps to mutate standard global updates
    timelineRef.current
      // To About Section
      .to(".character-target", { x: window.innerWidth > 768 ? -2 : 0, y: -1, z: 0, duration: 1 })
      // To Experience Section
      .to(".character-target", { x: window.innerWidth > 768 ? 2 : 0, y: -2, rotationY: Math.PI * 0.5, duration: 1 })
      // To Projects Section
      .to(".character-target", { x: 0, y: 0, z: -2, rotationY: Math.PI * 2, duration: 1 })
      // To Skills Section
      .to(".character-target", { x: window.innerWidth > 768 ? -2.5 : 0, y: -0.5, z: 1, duration: 1 })
      // To Contact Section
      .to(".character-target", { x: 0, y: -1, z: 0, rotationY: Math.PI * 1, duration: 1 });

    return () => {
      if (ScrollTrigger.getById("main-scroll")) ScrollTrigger.getById("main-scroll").kill();
    };
  }, [loading]);

  return (
    <main className="relative bg-primary overflow-x-hidden select-none">
      {loading && <Loader onComplete={() => setLoading(false)} />}
      
      {!loading && (
        <>
          <CustomCursor />
          <Navbar />
          
          {/* WebGL Layer - Fixed behind DOM elements */}
          <div className="fixed top-0 left-0 w-full h-screen z-0 pointer-events-none">
            <ErrorBoundary>
              <CanvasContainer />
            </ErrorBoundary>
          </div>

          {/* DOM Elements UI Layer */}
          <div ref={scrollContainerRef} className="relative z-10 w-full">
            <Hero />
            <About />
            <Experience />
            <Projects />
            <Skills />
            <Contact />
          </div>
        </>
      )}
    </main>
  );
}