'use client';

import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

export default function SignalWaves() {
  const meshRef = useRef<THREE.InstancedMesh>(null!);
  const count = 60;
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const rings = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
        temp.push({
            phase: (i / count) * Math.PI * 4,
            speed: 0.8 + (i % 5) / 10,
            colorOffset: (i * 0.123) % 1,
        });
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    rings.forEach((ring, i) => {
      const { phase, speed } = ring;
      const t = time * speed + phase;
      
      // Expanding and contracting signal effect
      const expandProgress = (t % (Math.PI * 2)) / (Math.PI * 2);
      const scale = expandProgress * 15;
      
      dummy.position.set(0, 0, 0);
      dummy.scale.set(scale, scale, 0.1);
      dummy.rotation.z = t * 0.2;
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
      
      // We can't easily change color per instance without vertex colors or data texture, 
      // but we can vary scale/opacity
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <ringGeometry args={[0.98, 1, 64]} />
      <meshStandardMaterial 
        color="#3b82f6" 
        emissive="#3b82f6" 
        emissiveIntensity={2} 
        transparent 
        depthWrite={false}
        toneMapped={false} 
      />
    </instancedMesh>
  );
}
