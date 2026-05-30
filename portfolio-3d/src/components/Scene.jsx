import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, useAnimations, Stars } from '@react-three/drei';
import gsap from 'gsap';

export default function Scene() {
  const groupRef = useRef();
  
  // Replace this placeholder link with your self-hosted GLB model later if needed
  const { scene, animations } = useGLTF('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/mikael/model.gltf');
  const { actions } = useAnimations(animations, groupRef);

  useEffect(() => {
    // Play idle animation on load if available, or fall back to first animation track
    const actionKey = Object.keys(actions)[0];
    if (actions[actionKey]) {
      actions[actionKey].fadeIn(0.5).play();
    }
  }, [actions]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    
    if (groupRef.current) {
      const target = document.querySelector(".character-target");
      if (target) {
        // Read GSAP-animated values from the DOM proxy
        const x = gsap.getProperty(target, "x") ?? 0;
        const y = gsap.getProperty(target, "y") ?? -1;
        const z = gsap.getProperty(target, "z") ?? 0;
        const rotY = gsap.getProperty(target, "rotationY") ?? 0;

        // Interpolate position smoothly to the animated scroll targets, adding floating motion to Y
        groupRef.current.position.x = gsap.utils.interpolate(groupRef.current.position.x, x, 0.1);
        groupRef.current.position.y = gsap.utils.interpolate(groupRef.current.position.y, y + Math.sin(t * 1.5) * 0.1, 0.1);
        groupRef.current.position.z = gsap.utils.interpolate(groupRef.current.position.z, z, 0.1);
        
        // Combine scroll-based rotation with subtle mouse pointer tracking
        const mouseX = (state.pointer.x * 0.3);
        groupRef.current.rotation.y = gsap.utils.interpolate(groupRef.current.rotation.y, rotY + mouseX, 0.1);
      } else {
        // Fallback animation if the target is not rendered
        groupRef.current.position.y = -1 + Math.sin(t * 1.5) * 0.1;
        const mouseX = (state.pointer.x * 0.3);
        groupRef.current.rotation.y = gsap.utils.interpolate(groupRef.current.rotation.y, mouseX, 0.1);
      }
    }
  });

  return (
    <group ref={groupRef} scale={[1.3, 1.3, 1.3]} position={[0, -1, 0]} dispose={null}>
      <primitive object={scene} />
      {/* Background Star System particles */}
      <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
    </group>
  );
}