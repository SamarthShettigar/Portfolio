import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Preload, Stars } from '@react-three/drei';
import Scene from './Scene';
import ErrorBoundary from './ErrorBoundary';

function FallbackMesh() {
  const meshRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.4;
      meshRef.current.rotation.x = t * 0.2;
      meshRef.current.position.y = -1 + Math.sin(t * 1.5) * 0.1;
    }
  });

  return (
    <group scale={[1.3, 1.3, 1.3]} position={[0, -1, 0]}>
      <mesh ref={meshRef}>
        <torusKnotGeometry args={[0.8, 0.25, 100, 16]} />
        <meshStandardMaterial 
          color="#915EFF" 
          wireframe
          roughness={0.1}
          metalness={1}
        />
      </mesh>
      <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
    </group>
  );
}

export default function CanvasContainer() {
  return (
    <Canvas
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 5], fov: 45, near: 0.1, far: 1000 }}
      shadows
    >
      <ambientLight intensity={0.6} />
      <directionalLight 
        position={[5, 10, 5]} 
        intensity={1.5} 
        castShadow 
        shadow-mapSize={2048}
      />
      <pointLight position={[-5, 5, -5]} intensity={1} color="#00C6FF" />
      <spotLight position={[0, 10, 2]} angle={0.4} penumbra={1} intensity={2} color="#915EFF" castShadow />
      
      <Suspense fallback={null}>
        <ErrorBoundary fallback={<FallbackMesh />}>
          <Scene />
        </ErrorBoundary>
      </Suspense>

      <Preload all />
    </Canvas>
  );
}