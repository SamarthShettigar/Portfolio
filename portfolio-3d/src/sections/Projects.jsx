import { ExternalLink } from 'lucide-react';

const Github = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const projects = [
  { title: "Metaverse Workspace", tech: ["React", "Three.js", "GSAP"], link: "#", git: "#" },
  { title: "E-Commerce Fluid Engine", tech: ["Next.js", "WebGL", "Tailwind"], link: "#", git: "#" },
  { title: "AI Analytics Platform", tech: ["TypeScript", "Python", "D3.js"], link: "#", git: "#" },
];

export default function Projects() {
  return (
    <section id="projects" className="w-full min-h-screen flex flex-col justify-center px-6 md:px-24 py-20">
      <div className="mb-12">
        <p className="text-xs font-mono text-accent tracking-widest uppercase">// MY REALIZED IDEAS</p>
        <h2 className="text-4xl md:text-6xl font-black mt-2">PROJECTS.</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {projects.map((proj, i) => (
          <div key={i} className="glassmorphism rounded-2xl overflow-hidden group hover:translate-y-[-8px] transition-all duration-300">
            <div className="h-48 bg-gradient-to-br from-tertiary to-primary p-6 flex flex-col justify-between border-b border-white/5 relative overflow-hidden">
              <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="flex justify-end gap-3 text-secondary z-10">
                <a href={proj.git} className="hover:text-white"><Github className="w-5 h-5" /></a>
                <a href={proj.link} className="hover:text-white"><ExternalLink className="w-5 h-5" /></a>
              </div>
              <h3 className="text-2xl font-bold tracking-tight z-10 text-white">{proj.title}</h3>
            </div>
            <div className="p-6 flex flex-wrap gap-2">
              {proj.tech.map((t) => (
                <span key={t} className="text-xs font-mono px-3 py-1 bg-white/5 rounded-full text-secondary">
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}