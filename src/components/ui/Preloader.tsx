'use client';

import { useProgress } from '@react-three/drei';
import { useState } from 'react';
import { useGSAP } from '@/lib/gsap';
import gsap from 'gsap';

export default function Preloader() {
  const { progress, active } = useProgress();
  const [show, setShow] = useState(true);

  useGSAP(() => {
    if (!active && progress === 100) {
      gsap.to('.preloader', {
        opacity: 0,
        duration: 1,
        ease: 'power3.inOut',
        onComplete: () => setShow(false),
      });
    }
  }, [active, progress]);

  if (!show) return null;

  return (
    <div className="preloader fixed inset-0 z-100 flex flex-col items-center justify-center bg-background text-white p-10">
      <div className="w-full max-w-md space-y-4">
        <div className="flex justify-between font-mono text-sm uppercase tracking-widest">
          <span>Initializing Scene</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-[2px] w-full bg-white/10 overflow-hidden">
          <div 
            className="h-full bg-primary transition-all duration-300 ease-out" 
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="font-mono text-[10px] text-white/30 truncate">
          Daniel Amechi Ikediashi | Creative Developer Portfolio v2026.0.1
        </div>
      </div>
    </div>
  );
}
