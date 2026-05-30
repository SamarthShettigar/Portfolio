import React, { useEffect, useState } from 'react';

export default function Loader({ onComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 600);
          return 100;
        }
        return prev + 1;
      });
    }, 20);
    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-primary z-50 flex flex-col justify-center items-center">
      <div className="mb-4 text-accent tracking-widest text-sm font-mono animate-pulse">
        INITIALIZING CORE ARCHITECTURE...
      </div>
      <div className="w-64 h-1 bg-tertiary rounded-full overflow-hidden relative">
        <div 
          className="h-full bg-gradient-to-r from-accent to-neonBlue transition-all duration-75"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="mt-2 text-white font-mono text-xs">{progress}%</div>
    </div>
  );
}