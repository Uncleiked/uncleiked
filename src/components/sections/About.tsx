'use client';

import SpatialSection from '@/components/three/SpatialSection';
import VoxelCore from '@/components/three/VoxelCore';
import { useGSAP } from '@/lib/gsap';
import gsap from 'gsap';
import { useRef } from 'react';

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null!);

  useGSAP(() => {
    gsap.from('.about-content > *', {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
      },
      y: 40,
      opacity: 0,
      stagger: 0.1,
      duration: 1.2,
      ease: 'power4.out',
    });
  }, { scope: containerRef });

  return (
    <SpatialSection
      id="about"
      scene={<VoxelCore />}
      className="relative overflow-hidden"
    >
      <div ref={containerRef} className="w-full h-full flex flex-col justify-center px-6 md:px-20 max-w-7xl mx-auto pointer-events-none">
        <div className="w-full about-content text-left pointer-events-auto">
          <div className="space-y-10 max-w-xl md:max-w-2xl relative z-20">
            <div className="space-y-4">
              <h2 className="text-xs font-mono uppercase tracking-[0.5em] text-primary">
                The Architect
              </h2>
              <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none text-foreground">
                Engineering <span className="text-primary italic">Atmosphere</span>.
              </h1>
            </div>
            
            <div className="space-y-8 text-lg md:text-2xl font-mono leading-relaxed text-foreground/70 bg-background/30 backdrop-blur-sm p-4 rounded-xl border border-white/5">
              <p>
                I&apos;m Daniel Amechi Ikediashi, a Lead Creative Developer based in 
                <span className="text-primary font-bold"> Lagos, Nigeria</span>. 
                I specialize in bridging the gap between raw hardware performance and high-end emotional aesthetics.
              </p>
              <p>
                My philosophy? A portfolio shouldn&apos;t just be a list of links—it should be a 
                spatial experience that pushes the limits of what a browser can render.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 md:gap-6">
              <div className="px-6 py-3 md:px-8 md:py-4 bg-primary/10 border border-primary/20 rounded-2xl text-[10px] md:text-xs uppercase tracking-[0.2em] font-black text-primary hover:bg-primary/20 transition-colors">
                Next.js 16 Expert
              </div>
              <div className="px-6 py-3 md:px-8 md:py-4 bg-primary/10 border border-primary/20 rounded-2xl text-[10px] md:text-xs uppercase tracking-[0.2em] font-black text-primary hover:bg-primary/20 transition-colors">
                R3F Specialist
              </div>
            </div>
          </div>
        </div>
      </div>
    </SpatialSection>
  );
}
