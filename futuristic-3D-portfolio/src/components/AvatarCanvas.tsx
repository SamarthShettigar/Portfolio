import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { CyberAvatar } from './CyberAvatar';

interface AvatarCanvasProps {
  scrollProgress: number;
  activeSection: string;
}

export const AvatarCanvas: React.FC<AvatarCanvasProps> = ({ scrollProgress, activeSection }) => {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 1,
        pointerEvents: 'none', // Allows clicking through to UI elements
        transition: 'opacity 0.5s ease'
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ pointerEvents: 'auto' }} // Allow mouse events on the canvas itself for mouse tracking
      >
        <Suspense fallback={null}>
          <CyberAvatar scrollProgress={scrollProgress} activeSection={activeSection} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default AvatarCanvas;
