'use client';

import { useFrame } from '@react-three/fiber';
import { useRef, useState } from 'react';
import * as THREE from 'three';
import { Text, Float } from '@react-three/drei';

const TECH_ITEMS = [
  { name: 'Next.js', color: '#000000' },
  { name: 'React', color: '#61dafb' },
  { name: 'TypeScript', color: '#3178c6' },
  { name: 'GSAP', color: '#88ce02' },
  { name: 'Tailwind', color: '#38bdf8' },
  { name: 'JavaScript', color: '#f7df1e' },
  { name: 'Three.js', color: '#ffffff' },
  { name: 'Neon', color: '#00e599' },
  { name: 'Prisma', color: '#2d3748' },
  { name: 'Sanity', color: '#f03e2f' },
  { name: 'WordPress', color: '#21759b' },
];

function TechObject({ name, color, index, total }: { name: string, color: string, index: number, total: number }) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHovered] = useState(false);

  // Smaller radius to ensure visibility in view
  const angle = (index / total) * Math.PI * 2;
  const radius = 3.5;
  const x = Math.cos(angle) * radius;
  const y = Math.sin(angle) * radius;

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.position.y = y + Math.sin(time + index) * 0.15;
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.015;
      
      const targetScale = hovered ? 1.4 : 1;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }
  });

  return (
    <group position={[x, y, 0]}>
      <Float speed={2} rotationIntensity={1.5} floatIntensity={1.5}>
        <mesh
          ref={meshRef}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          <boxGeometry args={[0.7, 0.7, 0.7]} />
          <meshPhysicalMaterial 
            color={color} 
            emissive={color} 
            emissiveIntensity={hovered ? 2.5 : 1}
            roughness={0.1}
            metalness={0.8}
            transmission={0.5}
            thickness={0.5}
          />
        </mesh>
        <Text
          position={[0, -0.9, 0]}
          fontSize={0.25}
          color={color}
          anchorX="center"
          anchorY="middle"
          fillOpacity={hovered ? 1 : 0.4}
        >
          {name}
        </Text>
      </Float>
    </group>
  );
}

export default function TechGrid() {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;
      groupRef.current.rotation.z = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {TECH_ITEMS.map((tech, i) => (
        <TechObject 
          key={tech.name} 
          name={tech.name} 
          color={tech.color} 
          index={i} 
          total={TECH_ITEMS.length} 
        />
      ))}
      {/* Grid Floor for depth */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -5, 0]}>
        <gridHelper args={[20, 20, 0x444444, 0x222222]} />
      </mesh>
    </group>
  );
}
