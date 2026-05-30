import React from 'react';

const coreSkills = [
  { name: "JavaScript / TS", level: "95%" },
  { name: "React / Next.js", level: "90%" },
  { name: "Three.js / WebGL", level: "85%" },
  { name: "GLSL Shaders", level: "70%" },
  { name: "Tailwind CSS", level: "95%" },
  { name: "GSAP Animation", level: "90%" },
];

export default function Skills() {
  return (
    <section id="skills" className="w-full min-h-screen flex flex-col justify-center px-6 md:px-24 py-20">
      <div className="mb-12">
        <p className="text-xs font-mono text-accent tracking-widest uppercase">// CAPABILITIES</p>
        <h2 className="text-4xl md:text-6xl font-black mt-2">SKILLS.</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
        {coreSkills.map((skill, i) => (
          <div key={i} className="flex flex-col gap-2">
            <div className="flex justify-between font-mono text-sm">
              <span className="text-white font-medium">{skill.name}</span>
              <span className="text-accent">{skill.level}</span>
            </div>
            <div className="w-full h-2 bg-tertiary rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-accent to-neonBlue rounded-full"
                style={{ width: skill.level }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}