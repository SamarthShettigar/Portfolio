import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface CyberAvatarProps {
  scrollProgress: number; // 0 to 1
  activeSection: string; // 'hero' | 'about' | 'spec' | 'projects' | 'education' | 'timeline' | 'contact'
}

// Custom GLSL Shader for Holographic cyber-grid lines on armor parts
const CyberArmorShader = {
  vertexShader: `
    varying vec3 vNormal;
    varying vec3 vPosition;
    void main() {
      vNormal = normalize(normalMatrix * normal);
      vPosition = position;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform float uTime;
    uniform vec3 uColorCyan;
    uniform vec3 uColorPink;
    varying vec3 vNormal;
    varying vec3 vPosition;
    void main() {
      vec3 normal = normalize(vNormal);
      float fresnel = pow(1.0 - dot(normal, vec3(0.0, 0.0, 1.0)), 2.0);
      
      // Animated scanlines
      float scanline = sin(vPosition.y * 15.0 + uTime * 6.0) * 0.5 + 0.5;
      
      vec3 finalColor = mix(uColorCyan, uColorPink, (vPosition.y + 0.5));
      finalColor += uColorCyan * scanline * 0.2;
      
      float alpha = fresnel * 0.85 + scanline * 0.15;
      gl_FragColor = vec4(finalColor, alpha);
    }
  `
};

export const CyberAvatar: React.FC<CyberAvatarProps> = ({ scrollProgress, activeSection }) => {
  // Main group ref
  const mainGroupRef = useRef<THREE.Group>(null);
  
  // Humanoid joint and part refs
  const torsoRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);
  
  // Arms
  const leftShoulderRef = useRef<THREE.Group>(null);
  const rightShoulderRef = useRef<THREE.Group>(null);
  const leftElbowRef = useRef<THREE.Group>(null);
  const rightElbowRef = useRef<THREE.Group>(null);
  
  // Legs
  const leftHipRef = useRef<THREE.Group>(null);
  const rightHipRef = useRef<THREE.Group>(null);

  // Core & Rings
  const coreRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const pointsRef = useRef<THREE.Points>(null);

  // Shader Uniforms
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uColorCyan: { value: new THREE.Color('#00f0ff') },
    uColorPink: { value: new THREE.Color('#ff0055') }
  }), []);

  // Particle positions
  const particlePositions = useMemo(() => {
    const count = 250;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 1.8 + Math.random() * 0.8;
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    return positions;
  }, []);

  // Material settings for metallic armor parts
  const cyberMetalMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#08080f',
    roughness: 0.15,
    metalness: 0.95,
    bumpScale: 0.05
  }), []);

  const visorMaterial = useMemo(() => new THREE.MeshBasicMaterial({
    color: '#00f0ff',
    transparent: true,
    opacity: 0.9
  }), []);

  const jointMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#ff0055',
    roughness: 0.3,
    metalness: 0.8,
    emissive: '#330011'
  }), []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    uniforms.uTime.value = time;

    // 1. Idle animations (floating + chest breathing)
    const breathing = Math.sin(time * 2.0) * 0.03;
    const floating = Math.sin(time * 1.2) * 0.1;

    // Apply breathing to chest and head bobbing
    if (torsoRef.current) {
      torsoRef.current.position.y = breathing;
    }
    if (headRef.current) {
      headRef.current.position.y = 0.82 + breathing * 0.4;
    }

    // 2. Define layout targets for each section
    // Target position, overall Y rotation, overall scale
    let targetX = 1.3;
    let targetY = -0.2 + floating;
    let targetZ = 0.5;
    let targetRotY = -Math.PI / 6;
    let targetRotX = 0;
    let targetScale = 1.0;

    // Arm angle targets (in radians)
    let leftShoulderZ = -Math.PI / 12; // left arm slightly away from body
    let rightShoulderZ = Math.PI / 12; // right arm slightly away from body
    let leftShoulderX = 0;
    let rightShoulderX = 0;
    let leftElbowX = Math.PI / 16;
    let rightElbowX = Math.PI / 16;

    // Leg angle targets
    let leftHipX = 0;
    let rightHipX = 0;

    switch (activeSection) {
      case 'hero':
        // Character on the right, looking forward
        targetX = window.innerWidth < 900 ? 0 : 1.3;
        targetY = -0.15 + floating;
        targetZ = 0.5;
        targetRotY = -Math.PI / 7;
        targetScale = window.innerWidth < 768 ? 0.75 : 1.0;
        break;

      case 'about':
        // Character shunted to the left, turned slightly towards details
        targetX = window.innerWidth < 900 ? 0 : -1.3;
        targetY = -0.25 + floating;
        targetZ = 0.6;
        targetRotY = Math.PI / 6;
        targetScale = window.innerWidth < 768 ? 0.75 : 1.0;
        
        // Right hand greeting pose (raised arm)
        rightShoulderX = -Math.PI / 4;
        rightShoulderZ = Math.PI / 5;
        rightElbowX = Math.PI / 4;
        break;

      case 'spec':
        // Shunted to the right, arms extended displaying tech specs
        targetX = window.innerWidth < 900 ? 0 : 1.2;
        targetY = -0.1 + floating;
        targetZ = 0.6;
        targetRotY = -Math.PI / 8;
        targetScale = window.innerWidth < 768 ? 0.8 : 1.05;

        // Display tech pose (arms out)
        leftShoulderZ = -Math.PI / 3;
        rightShoulderZ = Math.PI / 3;
        leftShoulderX = -Math.PI / 6;
        rightShoulderX = -Math.PI / 6;
        break;

      case 'projects':
        // Moved back as a structural system core, rotating slowly
        targetX = 0;
        targetY = 0.6 + floating;
        targetZ = -2.2;
        // Slow constant rotation
        targetRotY = time * 0.15;
        targetRotX = Math.PI / 18;
        targetScale = window.innerWidth < 768 ? 1.0 : 1.45;

        // Relaxed floating arm pose
        leftShoulderZ = -Math.PI / 4;
        rightShoulderZ = Math.PI / 4;
        leftElbowX = Math.PI / 8;
        rightElbowX = Math.PI / 8;
        break;

      case 'education':
        // Shifted left, meditative floating pose
        targetX = window.innerWidth < 900 ? 0 : -1.2;
        targetY = 0.0 + floating;
        targetZ = 0.4;
        targetRotY = Math.PI / 5;
        targetScale = window.innerWidth < 768 ? 0.75 : 1.0;

        // Meditative crossed-leg target simulation
        leftHipX = -Math.PI / 6;
        rightHipX = -Math.PI / 6;
        leftShoulderZ = -Math.PI / 10;
        rightShoulderZ = Math.PI / 10;
        break;

      case 'timeline':
        // Floating on the right
        targetX = window.innerWidth < 900 ? 0 : 1.2;
        targetY = -0.2 + floating;
        targetZ = 0.5;
        targetRotY = -Math.PI / 6;
        targetScale = window.innerWidth < 768 ? 0.75 : 1.0;
        break;

      case 'contact':
        // Zoomed in close up, visor glowing
        targetX = 0;
        targetY = 0.3 + floating;
        targetZ = 2.4; // very close to camera
        targetRotY = 0;
        targetScale = window.innerWidth < 768 ? 0.9 : 1.25;

        // Arms down
        leftShoulderZ = -Math.PI / 16;
        rightShoulderZ = Math.PI / 16;
        leftShoulderX = Math.PI / 8;
        rightShoulderX = Math.PI / 8;
        break;

      default:
        break;
    }

    // 3. Lerp positions, rotations, scales of main group
    if (mainGroupRef.current) {
      const pos = mainGroupRef.current.position;
      pos.x = THREE.MathUtils.lerp(pos.x, targetX, 0.06);
      pos.y = THREE.MathUtils.lerp(pos.y, targetY, 0.06);
      pos.z = THREE.MathUtils.lerp(pos.z, targetZ, 0.06);

      // Rotate group smoothly
      mainGroupRef.current.rotation.x = THREE.MathUtils.lerp(mainGroupRef.current.rotation.x, targetRotX, 0.06);
      
      // Prevent snapping when rotating infinitely in projects section
      if (activeSection === 'projects') {
        mainGroupRef.current.rotation.y = targetRotY;
      } else {
        mainGroupRef.current.rotation.y = THREE.MathUtils.lerp(mainGroupRef.current.rotation.y, targetRotY, 0.06);
      }

      // Scale group smoothly
      const currentScale = mainGroupRef.current.scale.x;
      const lerpedScale = THREE.MathUtils.lerp(currentScale, targetScale, 0.06);
      mainGroupRef.current.scale.set(lerpedScale, lerpedScale, lerpedScale);
    }

    // 4. Lerp arm and leg joint rotations
    if (leftShoulderRef.current) {
      leftShoulderRef.current.rotation.z = THREE.MathUtils.lerp(leftShoulderRef.current.rotation.z, leftShoulderZ, 0.08);
      leftShoulderRef.current.rotation.x = THREE.MathUtils.lerp(leftShoulderRef.current.rotation.x, leftShoulderX, 0.08);
    }
    if (rightShoulderRef.current) {
      rightShoulderRef.current.rotation.z = THREE.MathUtils.lerp(rightShoulderRef.current.rotation.z, rightShoulderZ, 0.08);
      rightShoulderRef.current.rotation.x = THREE.MathUtils.lerp(rightShoulderRef.current.rotation.x, rightShoulderX, 0.08);
    }
    if (leftElbowRef.current) {
      leftElbowRef.current.rotation.x = THREE.MathUtils.lerp(leftElbowRef.current.rotation.x, leftElbowX, 0.08);
    }
    if (rightElbowRef.current) {
      rightElbowRef.current.rotation.x = THREE.MathUtils.lerp(rightElbowRef.current.rotation.x, rightElbowX, 0.08);
    }
    if (leftHipRef.current) {
      leftHipRef.current.rotation.x = THREE.MathUtils.lerp(leftHipRef.current.rotation.x, leftHipX, 0.08);
    }
    if (rightHipRef.current) {
      rightHipRef.current.rotation.x = THREE.MathUtils.lerp(rightHipRef.current.rotation.x, rightHipX, 0.08);
    }

    // 5. Mouse tracking - head reacts to cursor pointer coordinates
    if (headRef.current && activeSection !== 'projects') {
      const targetHeadY = state.pointer.x * 0.45;
      const targetHeadX = -state.pointer.y * 0.3;
      headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, targetHeadY, 0.1);
      headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, targetHeadX, 0.1);
    }

    // 6. Pulse Core chest light
    if (coreRef.current) {
      const corePulse = 1.0 + Math.sin(time * 3.0) * 0.25;
      coreRef.current.scale.set(corePulse, corePulse, corePulse);
      
      // Visor glowing intensity (simulate by modifying material color intensity slightly if needed, or simply scaling)
      if (activeSection === 'contact') {
        // Fast visor flicker in contact
        visorMaterial.opacity = 0.7 + Math.sin(time * 12.0) * 0.2;
      } else {
        visorMaterial.opacity = 0.85 + Math.sin(time * 2.0) * 0.1;
      }
    }

    // 7. Ambient elements rotations
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z = time * 0.45;
      ring1Ref.current.rotation.y = Math.sin(time * 0.3) * 0.1;
      // Scroll scales telemetry ring
      const rScale = 1.0 + scrollProgress * 0.6;
      ring1Ref.current.scale.set(rScale, rScale, rScale);
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z = -time * 0.6;
      ring2Ref.current.rotation.x = Math.PI / 4 + Math.cos(time * 0.2) * 0.15;
    }
    if (pointsRef.current) {
      pointsRef.current.rotation.y = time * 0.06 + scrollProgress * 0.4;
    }
  });

  return (
    <group ref={mainGroupRef}>
      
      {/* 3D Humanoid Body Model */}
      <group ref={torsoRef}>
        
        {/* A. Torso Core Spine */}
        <mesh material={cyberMetalMaterial}>
          <cylinderGeometry args={[0.08, 0.08, 1.1, 16]} />
        </mesh>

        {/* B. Chest Armor Shell */}
        <group position={[0, 0.2, 0]}>
          <mesh material={cyberMetalMaterial}>
            <boxGeometry args={[0.72, 0.52, 0.32]} />
          </mesh>
          {/* Cyber Armor Holographic grid overlay */}
          <mesh position={[0, 0, 0.01]}>
            <boxGeometry args={[0.73, 0.53, 0.31]} />
            <shaderMaterial
              vertexShader={CyberArmorShader.vertexShader}
              fragmentShader={CyberArmorShader.fragmentShader}
              uniforms={uniforms}
              transparent={true}
              depthWrite={false}
              blending={THREE.AdditiveBlending}
            />
          </mesh>

          {/* C. Glowing Heart Core */}
          <mesh ref={coreRef} position={[0, 0.08, 0.18]}>
            <sphereGeometry args={[0.11, 16, 16]} />
            <meshBasicMaterial color="#00f0ff" />
          </mesh>
        </group>

        {/* D. Pelvis Armor Plate */}
        <group position={[0, -0.32, 0]}>
          <mesh material={cyberMetalMaterial}>
            <boxGeometry args={[0.62, 0.22, 0.28]} />
          </mesh>
          <mesh position={[0, 0, 0.01]}>
            <boxGeometry args={[0.63, 0.23, 0.27]} />
            <shaderMaterial
              vertexShader={CyberArmorShader.vertexShader}
              fragmentShader={CyberArmorShader.fragmentShader}
              uniforms={uniforms}
              transparent={true}
              depthWrite={false}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        </group>

        {/* E. Joint Spheres (Shoulders & Hips) */}
        {/* Left Shoulder */}
        <group ref={leftShoulderRef} position={[-0.45, 0.35, 0]}>
          <mesh material={jointMaterial}>
            <sphereGeometry args={[0.1, 16, 16]} />
          </mesh>
          {/* Upper Arm Segment */}
          <group position={[-0.2, -0.22, 0]}>
            <mesh material={cyberMetalMaterial}>
              <cylinderGeometry args={[0.07, 0.06, 0.44, 12]} />
            </mesh>
            {/* Left Elbow Joint */}
            <group ref={leftElbowRef} position={[0, -0.24, 0]}>
              <mesh material={jointMaterial}>
                <sphereGeometry args={[0.08, 12, 12]} />
              </mesh>
              {/* Forearm Segment */}
              <group position={[0, -0.22, 0]}>
                <mesh material={cyberMetalMaterial}>
                  <cylinderGeometry args={[0.05, 0.04, 0.4, 12]} />
                </mesh>
                {/* Hand Plate */}
                <mesh position={[0, -0.22, 0]} material={jointMaterial}>
                  <boxGeometry args={[0.08, 0.08, 0.04]} />
                </mesh>
              </group>
            </group>
          </group>
        </group>

        {/* Right Shoulder */}
        <group ref={rightShoulderRef} position={[0.45, 0.35, 0]}>
          <mesh material={jointMaterial}>
            <sphereGeometry args={[0.1, 16, 16]} />
          </mesh>
          {/* Upper Arm Segment */}
          <group position={[0.2, -0.22, 0]}>
            <mesh material={cyberMetalMaterial}>
              <cylinderGeometry args={[0.07, 0.06, 0.44, 12]} />
            </mesh>
            {/* Right Elbow Joint */}
            <group ref={rightElbowRef} position={[0, -0.24, 0]}>
              <mesh material={jointMaterial}>
                <sphereGeometry args={[0.08, 12, 12]} />
              </mesh>
              {/* Forearm Segment */}
              <group position={[0, -0.22, 0]}>
                <mesh material={cyberMetalMaterial}>
                  <cylinderGeometry args={[0.05, 0.04, 0.4, 12]} />
                </mesh>
                {/* Hand Plate */}
                <mesh position={[0, -0.22, 0]} material={jointMaterial}>
                  <boxGeometry args={[0.08, 0.08, 0.04]} />
                </mesh>
              </group>
            </group>
          </group>
        </group>

        {/* F. Legs Joint structure */}
        {/* Left Hip & Leg */}
        <group ref={leftHipRef} position={[-0.22, -0.45, 0]}>
          <mesh material={jointMaterial}>
            <sphereGeometry args={[0.09, 16, 16]} />
          </mesh>
          {/* Thigh Cylinder */}
          <group position={[0, -0.3, 0]}>
            <mesh material={cyberMetalMaterial}>
              <cylinderGeometry args={[0.08, 0.06, 0.54, 12]} />
            </mesh>
            {/* Knee Joint */}
            <group position={[0, -0.3, 0]}>
              <mesh material={jointMaterial}>
                <sphereGeometry args={[0.075, 12, 12]} />
              </mesh>
              {/* Calf Cylinder */}
              <group position={[0, -0.28, 0]}>
                <mesh material={cyberMetalMaterial}>
                  <cylinderGeometry args={[0.055, 0.045, 0.5, 12]} />
                </mesh>
                {/* Foot Segment */}
                <mesh position={[0, -0.27, 0.06]} material={cyberMetalMaterial}>
                  <boxGeometry args={[0.09, 0.06, 0.22]} />
                </mesh>
              </group>
            </group>
          </group>
        </group>

        {/* Right Hip & Leg */}
        <group ref={rightHipRef} position={[0.22, -0.45, 0]}>
          <mesh material={jointMaterial}>
            <sphereGeometry args={[0.09, 16, 16]} />
          </mesh>
          {/* Thigh Cylinder */}
          <group position={[0, -0.3, 0]}>
            <mesh material={cyberMetalMaterial}>
              <cylinderGeometry args={[0.08, 0.06, 0.54, 12]} />
            </mesh>
            {/* Knee Joint */}
            <group position={[0, -0.3, 0]}>
              <mesh material={jointMaterial}>
                <sphereGeometry args={[0.075, 12, 12]} />
              </mesh>
              {/* Calf Cylinder */}
              <group position={[0, -0.28, 0]}>
                <mesh material={cyberMetalMaterial}>
                  <cylinderGeometry args={[0.055, 0.045, 0.5, 12]} />
                </mesh>
                {/* Foot Segment */}
                <mesh position={[0, -0.27, 0.06]} material={cyberMetalMaterial}>
                  <boxGeometry args={[0.09, 0.06, 0.22]} />
                </mesh>
              </group>
            </group>
          </group>
        </group>

      </group>

      {/* G. Head & visor node */}
      <group ref={headRef} position={[0, 0.82, 0]}>
        
        {/* Head Shell */}
        <mesh material={cyberMetalMaterial}>
          <sphereGeometry args={[0.26, 32, 32]} />
        </mesh>
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.265, 16, 16]} />
          <shaderMaterial
            vertexShader={CyberArmorShader.vertexShader}
            fragmentShader={CyberArmorShader.fragmentShader}
            uniforms={uniforms}
            transparent={true}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>

        {/* Cyber Glowing Visor (Cyborg Eyes) */}
        <mesh position={[0, 0.04, 0.195]} material={visorMaterial}>
          <boxGeometry args={[0.34, 0.08, 0.1]} />
        </mesh>
        
        {/* Visor Side Antenna Connector Pins */}
        <mesh position={[-0.26, 0, 0]} material={jointMaterial} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.03, 0.02, 0.1, 8]} />
        </mesh>
        <mesh position={[0.26, 0, 0]} material={jointMaterial} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.03, 0.02, 0.1, 8]} />
        </mesh>
      </group>

      {/* 2. Outer Diagnostic Hologram Rings */}
      <mesh ref={ring1Ref} position={[0, 0, 0]}>
        <ringGeometry args={[1.4, 1.44, 64]} />
        <meshBasicMaterial
          color="#00f0ff"
          side={THREE.DoubleSide}
          wireframe={true}
          transparent={true}
          opacity={0.35}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      <mesh ref={ring2Ref} position={[0, 0, 0]}>
        <ringGeometry args={[1.7, 1.72, 8]} />
        <meshBasicMaterial
          color="#ff0055"
          side={THREE.DoubleSide}
          wireframe={true}
          transparent={true}
          opacity={0.25}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* 3. Orbiting Data Particles */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particlePositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#00f0ff"
          size={0.035}
          sizeAttenuation={true}
          transparent={true}
          opacity={0.7}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* Lighting components for R3F canvas */}
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={1.5} color="#00f0ff" />
      <pointLight position={[-5, -5, -5]} intensity={0.8} color="#ff0055" />
      <directionalLight position={[0, 10, 0]} intensity={1.0} color="#fff" />
    </group>
  );
};

export default CyberAvatar;
