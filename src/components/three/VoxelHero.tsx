'use client';

import { useFrame } from '@react-three/fiber';
import { useGSAP } from '../../lib/gsap';
import gsap from 'gsap';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

const GRID_SIZE = 12;

export default function VoxelHero() {
  const meshRef = useRef<THREE.InstancedMesh>(null!);
  const groupRef = useRef<THREE.Group>(null!);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const positions = useMemo(() => {
    const pos = [];
    let i = 0;
    for (let x = 0; x < GRID_SIZE; x++) {
      for (let y = 0; y < GRID_SIZE; y++) {
        for (let z = 0; z < GRID_SIZE; z++) {
          const dist = Math.sqrt(
            Math.pow(x - GRID_SIZE / 2, 2) + 
            Math.pow(y - GRID_SIZE / 2, 2) + 
            Math.pow(z - GRID_SIZE / 2, 2)
          );
          
          if (dist < 6 && (x + y + z + i++) % 2 === 0) {
            pos.push({
              x: (x - GRID_SIZE / 2) * 0.8,
              y: (y - GRID_SIZE / 2) * 0.8,
              z: (z - GRID_SIZE / 2) * 0.8,
              phase: ((x * y * z + i) % 100) / 100 * Math.PI * 2
            });
          }
        }
      }
    }
    return pos;
  }, []);

  useGSAP(() => {
    if (!meshRef.current) return;
    const v = { progress: 0 };
    
    gsap.to(v, {
      progress: 1,
      duration: 3,
      delay: 0.5,
      ease: 'elastic.out(1, 0.4)',
      onUpdate: () => {
        positions.forEach((pos, i) => {
          const factor = 1 - v.progress;
          dummy.position.set(
            pos.x + Math.sin(i * 0.1) * 20 * factor,
            pos.y + Math.cos(i * 0.1) * 20 * factor,
            pos.z + Math.tan(i * 0.1) * 10 * factor
          );
          dummy.rotation.set(
            factor * Math.PI * 4,
            factor * Math.PI * 4,
            0
          );
          dummy.scale.setScalar(v.progress);
          dummy.updateMatrix();
          meshRef.current.setMatrixAt(i, dummy.matrix);
        });
        meshRef.current.instanceMatrix.needsUpdate = true;
      },
    });

    gsap.from(groupRef.current.scale, {
      x: 0, y: 0, z: 0,
      duration: 1.5,
      ease: 'expo.out'
    });
  }, [positions]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // Idle animation
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(time * 0.4) * 0.5;
      groupRef.current.rotation.z = Math.sin(time * 0.2) * 0.1;
      groupRef.current.rotation.y += 0.002;
    }

    // Interactive Mouse Movement
    // Using state.pointer (normalized -1 to 1) instead of state.mouse for better cross-platform support
    const { x, y } = state.pointer;
    
    if (meshRef.current) {
        meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, x * 2, 0.1);
        meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, y * 2, 0.1);
        
        meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, -y * 0.5, 0.1);
        meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, x * 0.5, 0.1);
    }
  });

  return (
    <group ref={groupRef} scale={1.2}>
      <instancedMesh ref={meshRef} args={[undefined, undefined, positions.length]}>
        <boxGeometry args={[0.12, 0.12, 0.12]} />
        <meshPhysicalMaterial 
          color="#3b82f6" 
          emissive="#3b82f6" 
          emissiveIntensity={2} 
          roughness={0} 
          metalness={1} 
          transmission={0.5}
          thickness={0.5}
        />
      </instancedMesh>
    </group>
  );
}