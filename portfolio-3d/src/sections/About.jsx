import React, { useEffect } from 'react';
import gsap from 'gsap';
import { Layers, Shield, Cpu } from 'lucide-react';

const cards = [
  { icon: <Layers />, title: "Frontend Engine", desc: "Crafting beautiful interactive user paths with structural performance optimization." },
  { icon: <Cpu />, title: "3D Interaction", desc: "Bridging the gap between creative visual designs and high-performance WebGL frameworks." },
  { icon: <Shield />, title: "Robust Logic", desc: "Deploying secure, modern, clean React solutions designed for scalablity." },
];

export default function About() {
  useEffect(() => {
    gsap.fromTo(".about-card", 
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.2,
        scrollTrigger: { trigger: "#about", start: "top 70%" }
      }
    );
  }, []);

  return (
    <section id="about" className="w-full min-h-screen flex flex-col justify-center px-6 md:px-24 py-20">
      <div className="max-w-3xl mb-12">
        <p className="text-xs font-mono text-accent tracking-widest uppercase">// INTRODUCTION</p>
        <h2 className="text-4xl md:text-6xl font-black mt-2">OVERVIEW.</h2>
        <p className="mt-4 text-secondary text-base md:text-lg leading-relaxed">
          I specialize in blending technical development precision with interactive design paradigms. By transforming layout structures into spatial dimensions, your digital products instantly gain depth, presence, and impact.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card, i) => (
          <div key={i} className="about-card glassmorphism p-8 rounded-2xl flex flex-col gap-4 group hover:border-accent/40 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent group-hover:scale-110 transition-transform">
              {card.icon}
            </div>
            <h3 className="text-xl font-bold">{card.title}</h3>
            <p className="text-secondary text-sm leading-relaxed">{card.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}