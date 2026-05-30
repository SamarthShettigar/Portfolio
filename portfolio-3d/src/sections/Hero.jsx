import React from 'react';
import { ArrowDown } from 'lucide-react';

export default function Hero() {
  return (
    <section id="hero" className="w-full h-screen relative flex items-center px-6 md:px-24">
      {/* Invisible proxy element tracking transform constraints via GSAP global updates */}
      <div className="character-target hidden" />
      
      <div className="max-w-4xl z-10">
        <h1 className="text-5xl md:text-8xl font-black tracking-tight text-white">
          HI, I'M <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-neonBlue">ALEX</span>
        </h1>
        <p className="mt-4 text-lg md:text-2xl text-secondary max-w-xl font-light leading-relaxed">
          Building high-fidelity 3D user interfaces, production web applications, and interactive creative experiences.
        </p>
        <div className="mt-8 flex gap-4">
          <a href="#projects" className="px-6 py-3 bg-accent text-white font-medium rounded-lg shadow-lg hover:bg-opacity-80 transition-all">
            View Work
          </a>
          <a href="#contact" className="px-6 py-3 border border-secondary text-white font-medium rounded-lg hover:bg-white/5 transition-all">
            Contact Me
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce opacity-60">
        <span className="text-xs font-mono text-secondary tracking-widest">SCROLL TO EXPLORE</span>
        <ArrowDown className="w-4 h-4 text-accent" />
      </div>
    </section>
  );
}