'use client';

// Using relative paths to ensure resolution without build aliases
import { useStore } from '../../lib/store';
import { useGSAP } from '../../lib/gsap';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useState } from 'react';
import { useProgress } from '@react-three/drei';

export default function ExperienceProgress() {
  const { completion, setCompletion, hasContacted } = useStore();
  const { progress: assetProgress } = useProgress();
  const [isInitialized, setIsInitialized] = useState(false);

  useGSAP(() => {
    // Check if assets are loaded (approx 100%) or if we should force show
    if (!isInitialized && assetProgress >= 99) {
      gsap.to('.progress-container', {
        autoAlpha: 1, // Handles both opacity and visibility
        y: 0,
        duration: 1,
        ease: 'power3.out',
        onComplete: () => setIsInitialized(true),
      });
    }

    // Scroll trigger for percentage
    const trigger = ScrollTrigger.create({
      trigger: 'body',
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        if (!hasContacted) {
          const scrollProgress = Math.floor(self.progress * 100);
          setCompletion(scrollProgress);
        }
      },
    });

    return () => trigger.kill();
  }, [assetProgress, isInitialized, hasContacted]);

  return (
    <div className="progress-container fixed top-6 left-6 z-[100] opacity-0 translate-y-[-20px] pointer-events-none mix-blend-difference md:mix-blend-normal">
      {/* Glass card container for better visibility on any bg */}
      <div className="p-4 rounded-xl bg-background/50 backdrop-blur-md border border-primary/20 shadow-lg supports-[backdrop-filter]:bg-background/20">
        
        <div className="font-mono text-[10px] tracking-[0.2em] uppercase opacity-70 mb-1 text-foreground">
          System Status
        </div>
        
        <div className="flex items-baseline gap-2 text-foreground">
          <span className="text-5xl font-black tabular-nums tracking-tighter leading-none">
            {completion}
          </span>
          <span className="text-xl font-bold opacity-50">%</span>
        </div>

        <div className="mt-3 w-32 h-[3px] bg-foreground/10 rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary transition-all duration-300 ease-out"
            style={{ width: `${completion}%` }}
          />
        </div>

        <div className="mt-2 font-mono text-[9px] uppercase tracking-widest text-primary animate-pulse">
          {completion === 100 ? ':: SYSTEM READY ::' : ':: SYNCING ::'}
        </div>
      </div>
    </div>
  );
}