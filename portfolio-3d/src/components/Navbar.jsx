import React from 'react';
import { Menu, Terminal } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-40 glassmorphism py-4 px-6 md:px-16 flex justify-between items-center">
      <div className="flex items-center gap-2 text-white font-bold tracking-wider cursor-pointer">
        <Terminal className="text-accent w-5 h-5" />
        <span>DEV<span className="text-accent">.</span>IO</span>
      </div>
      
      <div className="hidden md:flex gap-8 text-secondary font-medium text-sm">
        {['About', 'Experience', 'Projects', 'Skills', 'Contact'].map((item) => (
          <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-white transition-colors">
            {item}
          </a>
        ))}
      </div>
      
      <button className="md:hidden text-white">
        <Menu className="w-6 h-6" />
      </button>
    </nav>
  );
}