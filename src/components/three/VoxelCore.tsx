'use client';

import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Float } from '@react-three/drei';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useGSAP } from '@/lib/gsap';
import { useTheme } from 'next-themes';
import gsap from 'gsap';


export default function VoxelCore() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const { theme } = useTheme();
  const isLight = theme === 'light';
  // Standard centralized refs
  const groupRef = useRef<THREE.Group>(null!);
  const particlesRef = useRef<THREE.Points>(null!);

  // Particle Data Points
  const particles = useMemo(() => {
    const count = 200;
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    for (let i = 0; i < count; i++) {
        const theta = (i / count) * Math.PI * 2 * (1 + i * 0.1);
        const phi = Math.acos(2 * (i / count) - 1);
        const r = 2.0 + ((i * 3) % 4) * 0.5; // Slightly smaller radius to fit view

        positions[i * 3] = r * Math.sin(phi) * Math.cos(theta); // x
        positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta); // y
        positions[i * 3 + 2] = r * Math.cos(phi); // z
        
        sizes[i] = (i % 10) / 10;
    }
    return { positions, sizes };
  }, []);

  useGSAP(() => {
      // Entrance Animation
      gsap.from(groupRef.current.scale, {
          x: 0, y: 0, z: 0,
          duration: 2,
          ease: 'elastic.out(1, 0.75)'
      });

      // Simple rotation on scroll
      gsap.to(groupRef.current.rotation, {
          y: Math.PI * 2,
          scrollTrigger: {
              trigger: '#about',
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
          }
      });
  }, []);

  useFrame((state) => {
    const { clock, pointer } = state;
    const t = clock.getElapsedTime();

    // Mouse Interaction (Tilt & Parallax on inner group)
    // Mouse Interaction (Tilt & Parallax)
    if (groupRef.current) {
        // Smooth pointer tracking
        groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -pointer.y * 0.5, 0.1);
        groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, pointer.x * 0.5, 0.1);
    }

    // Sphere Distortion Pulse
    if (meshRef.current) {
        meshRef.current.rotation.z = t * 0.1;
    }
    
    // Particles Swirl
    if (particlesRef.current) {
        particlesRef.current.rotation.y = -t * 0.05;
        particlesRef.current.rotation.z = t * 0.02;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}> 
         {/* Centered for standard layout */}
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
          {/* Core MeshDistort Sphere */}
          <mesh ref={meshRef} scale={1.8}>
            <icosahedronGeometry args={[1, 15]} /> 
            <MeshDistortMaterial
              color="#3b82f6"
              emissive="#3b82f6"
              emissiveIntensity={0.5}
              roughness={0.1}
              metalness={1}
              distort={0.4}
              speed={2}
              wireframe
              transparent
              opacity={0.3}
            />
          </mesh>
          
          {/* Inner Solid Core for depth */}
          <mesh scale={0.8}>
             <icosahedronGeometry args={[1, 4]} />
             <meshPhysicalMaterial 
               color="#8b5cf6"
               roughness={0}
               metalness={0.8}
               transmission={1}
               thickness={2}
               transparent
               opacity={0.5}
             />
          </mesh>

          {/* Floating Data Points */}
          <points ref={particlesRef}>
              <bufferGeometry>
                  <bufferAttribute
                      attach="attributes-position"
                      count={particles.positions.length / 3}
                      array={particles.positions}
                      itemSize={3}
                      args={[particles.positions, 3]}
                  />
              </bufferGeometry>
              <pointsMaterial
                  size={0.03}
                  color={isLight ? "#000000" : "#ffffff"}
                  transparent
                  opacity={0.6}
                  sizeAttenuation
              />
          </points>
        </Float>
    </group>
  );
}