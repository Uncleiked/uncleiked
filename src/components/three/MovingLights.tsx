'use client';

import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

export default function MovingLights() {
  const lightRef1 = useRef<THREE.PointLight>(null!);
  const lightRef2 = useRef<THREE.PointLight>(null!);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // Orbiting primary light
    if (lightRef1.current) {
        lightRef1.current.position.x = Math.sin(time * 0.7) * 12;
        lightRef1.current.position.y = Math.cos(time * 0.5) * 8;
        lightRef1.current.position.z = Math.sin(time * 0.4) * 10;
    }

    // Secondary rim light
    if (lightRef2.current) {
        lightRef2.current.position.x = Math.cos(time * 0.6) * 15;
        lightRef2.current.position.y = Math.sin(time * 0.8) * 10;
        lightRef2.current.position.z = Math.cos(time * 0.3) * 5;
    }
  });

  return (
    <>
      <ambientLight intensity={1} />
      <pointLight ref={lightRef1} intensity={3} color="#3b82f6" />
      <pointLight ref={lightRef2} intensity={2} color="#8b5cf6" />
      <spotLight 
        position={[20, 20, 20]} 
        angle={0.15} 
        penumbra={1} 
        intensity={2} 
        color="#ffffff" 
        castShadow 
      />
    </>
  );
}
