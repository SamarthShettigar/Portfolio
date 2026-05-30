import React, { useState } from 'react';
import confetti from 'canvas-confetti';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Trigger burst of celebration confetti upon successful form validation
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 }, colors: ['#915EFF', '#00C6FF'] });
    alert("Message sent cleanly via mock endpoint implementation!");
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="w-full min-h-screen flex flex-col justify-center px-6 md:px-24 py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center w-full max-w-6xl mx-auto">
        
        <div>
          <p className="text-xs font-mono text-accent tracking-widest uppercase">// CONNECT</p>
          <h2 className="text-4xl md:text-6xl font-black mt-2">GET IN TOUCH.</h2>
          <p className="mt-4 text-secondary leading-relaxed max-w-md">
            Have an exciting vision or an enterprise web application project that needs interactive implementation? Let's discuss building something remarkable.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="glassmorphism p-8 rounded-2xl flex flex-col gap-6">
          <label className="flex flex-col gap-2">
            <span className="text-sm font-mono text-white">Your Name</span>
            <input 
              type="text" required value={form.name} onChange={(e)=>setForm({...form, name:e.target.value})}
              className="bg-primary border border-white/10 rounded-xl p-4 text-white outline-none focus:border-accent"
            />
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-sm font-mono text-white">Your Email</span>
            <input 
              type="email" required value={form.email} onChange={(e)=>setForm({...form, email:e.target.value})}
              className="bg-primary border border-white/10 rounded-xl p-4 text-white outline-none focus:border-accent"
            />
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-sm font-mono text-white">Message</span>
            <textarea 
              rows={4} required value={form.message} onChange={(e)=>setForm({...form, message:e.target.value})}
              className="bg-primary border border-white/10 rounded-xl p-4 text-white outline-none focus:border-accent resize-none"
            />
          </label>
          
          <button type="submit" className="w-full py-4 bg-accent text-white font-bold tracking-wider rounded-xl hover:bg-opacity-90 transition-all">
            SEND MESSAGE
          </button>
        </form>

      </div>
    </section>
  );
}