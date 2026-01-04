'use client';

import { useThree } from '@react-three/fiber';
import { useGSAP } from '../../lib/gsap';
import gsap from 'gsap';

export default function CameraManager() {
  const { camera } = useThree();

  useGSAP(() => {
    if (!camera) return;

    // Initial cinematic entrance
    gsap.from(camera.position, {
      z: 20,
      y: 10,
      duration: 3,
      ease: 'expo.out',
    });

    // Scroll-linked cinematic camera progression
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 2.5, // High scrub for ultra-smooth motion
      },
    });

    // Phase 1: Hero to About (The Dive)
    tl.to(camera.position, {
      z: 2,
      y: 0,
      x: -4,
      ease: 'power2.inOut',
    })
    .to(camera.rotation, {
      y: Math.PI * 0.15,
      x: Math.PI * 0.05,
      ease: 'power1.inOut',
    }, 0);

    // Phase 2: About to Tech (The Sweep)
    tl.to(camera.position, {
      z: 8,
      x: 6,
      y: 3,
      ease: 'power3.inOut',
    })
    .to(camera.rotation, {
      y: -Math.PI * 0.25,
      z: Math.PI * 0.1,
      x: -Math.PI * 0.1,
      ease: 'power2.inOut',
    }, '>');

    // Phase 3: Tech to Contact (The Pull-In)
    tl.to(camera.position, {
      z: 4,
      x: 0,
      y: -2,
      ease: 'power4.inOut',
    })
    .to(camera.rotation, {
      x: -Math.PI * 0.2,
      y: 0,
      z: 0,
      ease: 'back.out(1.5)',
    }, '>');

  }, [camera]);

  return null;
}
