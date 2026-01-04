'use client';

import { View } from '@react-three/drei';
import { useRef } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface SpatialSectionProps {
  children?: React.ReactNode;
  scene?: React.ReactNode;
  className?: string;
  id?: string;
}

export default function SpatialSection({
  children,
  scene,
  className,
  id,
}: SpatialSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null!);

  return (
    <section
      id={id}
      ref={containerRef}
      className={cn('spatial-section relative w-full h-screen', className)}
    >
      {/* 3D Content Layer */}
      <View track={containerRef} className="absolute inset-0 z-0">
        {scene}
      </View>

      {/* HTML UI Layer */}
      <div className="relative z-10 w-full h-full pointer-events-none *:pointer-events-auto">
        {children}
      </div>
    </section>
  );
}
