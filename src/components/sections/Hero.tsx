you'use client';

import SpatialSection from '@/components/three/SpatialSection';
import VoxelHero from '@/components/three/VoxelHero';
import { useGSAP } from '@/lib/gsap';
import gsap from 'gsap';
import { useRef } from 'react';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null!);
  const name1 = "DANIEL AMECHI";
  const name2 = "IKEDIASHI";

  const splitText = (text: string) => {
    return text.split("").map((char, i) => (
      <span 
        key={i} 
        className="letter inline-block hover:text-primary transition-colors duration-200 cursor-default"
        onMouseEnter={(e) => {
          gsap.to(e.currentTarget, {
            scale: 1.3,
            y: -10,
            duration: 0.3,
            ease: "back.out(3)"
          });
        }}
        onMouseLeave={(e) => {
          gsap.to(e.currentTarget, {
            scale: 1,
            y: 0,
            duration: 0.5,
            ease: "elastic.out(1, 0.3)"
          });
        }}
      >
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  };

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1.5 } });
    
    tl.from('.letter', { 
      y: 100, 
      opacity: 0, 
      rotateX: -90,
      stagger: 0.03,
      delay: 0.5
    })
    .from('.hero-subtitle', { 
      y: 20, 
      opacity: 0,
      duration: 1
    }, '-=0.5');

    // Liquid Effect GSAP Animation
    gsap.to('#liquid-filter feTurbulence', {
      attr: { baseFrequency: '0.02 0.05' },
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

  }, { scope: containerRef });

  return (
    <SpatialSection
      id="hero"
      scene={<VoxelHero />}
      className="relative overflow-hidden"
    >
      <svg className="absolute w-0 h-0">
        <filter id="liquid-filter">
          <feTurbulence type="fractalNoise" baseFrequency="0.01" numOctaves="2" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="15" />
        </filter>
      </svg>

      <div ref={containerRef} className="hero-content relative z-10 w-full h-full flex flex-col items-center justify-center px-4 pointer-events-none">
        <div className="text-center space-y-6">
          <div 
            style={{ filter: "url(#liquid-filter)" }}
            className="flex flex-col items-center pointer-events-auto"
          >
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-[0.8] mb-2 text-foreground">
              {splitText(name1)}
            </h1>
            <h1 className="text-5xl md:text-8xl font-light uppercase tracking-tight leading-[0.8] mb-8 text-primary italic">
              {splitText(name2)}
            </h1>
          </div>
          <p className="hero-subtitle text-lg md:text-2xl font-mono tracking-[0.3em] uppercase max-w-2xl mx-auto text-foreground/50">
            Creative Fullstack Developer | Portfolio v2026.1
          </p>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 font-mono text-xs opacity-30 animate-bounce text-foreground">
        <span>Scroll Case Study</span>
        <div className="w-px h-10 bg-current" />
      </div>
    </SpatialSection>
  );
}
