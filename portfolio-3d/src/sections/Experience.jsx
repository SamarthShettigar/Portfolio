import React from 'react';

const timeline = [
  { year: "2024 - Present", role: "Senior Frontend Engineer", company: "Nexus Labs", desc: "Architecting WebGL infrastructure interfaces using React and Three.js." },
  { year: "2022 - 2024", role: "Creative Developer", company: "Vortex Agency", desc: "Engineered immersive interactive landing pages recognized with industry awards." },
  { year: "2020 - 2022", role: "UI Systems Engineer", company: "Quantum Tech", desc: "Maintained design system architectures using TailwindCSS across multiple enterprise projects." },
];

export default function Experience() {
  return (
    <section id="experience" className="w-full min-h-screen flex flex-col justify-center px-6 md:px-24 py-20">
      <div className="mb-12">
        <p className="text-xs font-mono text-accent tracking-widest uppercase">// JOURNEY</p>
        <h2 className="text-4xl md:text-6xl font-black mt-2">EXPERIENCE.</h2>
      </div>

      <div className="relative border-l border-accent/30 ml-4 md:ml-8 pl-8 md:pl-12 space-y-12 max-w-4xl">
        {timeline.map((item, i) => (
          <div key={i} className="relative group">
            <div className="absolute -left-[41px] md:-left-[57px] top-1 w-4 h-4 bg-primary border-4 border-accent rounded-full group-hover:scale-125 transition-transform" />
            <span className="text-xs font-mono text-accent">{item.year}</span>
            <h3 className="text-xl md:text-2xl font-bold text-white mt-1">{item.role}</h3>
            <h4 className="text-sm font-medium text-neonBlue">{item.company}</h4>
            <p className="mt-2 text-secondary text-sm md:text-base max-w-2xl">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}