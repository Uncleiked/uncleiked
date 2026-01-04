'use client';

import { Canvas } from '@react-three/fiber';
import { Preload, View } from '@react-three/drei';
import { Suspense } from 'react';
import CameraManager from './CameraManager';
import MovingLights from './MovingLights';

export default function Scene({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="fixed inset-0 pointer-events-none z-0">
        <Canvas
          className="h-full w-full"
          // eventSource={document.body} allows the canvas to capture events 
          // even if other HTML elements are on top of it.
          eventSource={typeof document !== 'undefined' ? document.body : undefined}
          // eventPrefix="client" ensures correct coordinate mapping when scrolling
          eventPrefix="client"
          shadows
          gl={{ antialias: true, alpha: true }}
          camera={{ position: [0, 0, 5], fov: 45 }}
        >
          <CameraManager />
          <MovingLights />
          
          <Suspense fallback={null}>
            <View.Port />
            <Preload all />
          </Suspense>
        </Canvas>
      </div>
      
      {/* This div holds the HTML content. 
        Note: The actual interaction logic for 3D elements is handled 
        via the global eventSource in the Canvas above.
      */}
      <div className="relative z-10 w-full min-h-screen pointer-events-auto">
        {children}
      </div>
    </>
  );
}