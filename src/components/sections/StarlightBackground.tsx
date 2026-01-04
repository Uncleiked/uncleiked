'use client';

import { useTheme } from 'next-themes';
import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  vx: number;
  vy: number;
}

export default function StarlightBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme, systemTheme } = useTheme();
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let stars: Star[] = [];
    const starCount = 100;

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const initStars = () => {
      stars = [];
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2,
          vx: (Math.random() - 0.5) * 0.2, // Slow movement
          vy: (Math.random() - 0.5) * 0.2,
        });
      }
    };

    const draw = () => {
      if (!ctx || !canvas) return;
      
      const currentTheme = theme === 'system' ? systemTheme : theme;
      const isDark = currentTheme === 'dark';
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Set star color
      ctx.fillStyle = isDark ? 'white' : 'black';

      stars.forEach((star) => {
        // Update position
        star.x += star.vx;
        star.y += star.vy;

        // Wrap around screen
        if (star.x < 0) star.x = canvas.width;
        if (star.x > canvas.width) star.x = 0;
        if (star.y < 0) star.y = canvas.height;
        if (star.y > canvas.height) star.y = 0;

        // Mouse interaction (repulsion)
        const dx = star.x - mouseRef.current.x;
        const dy = star.y - mouseRef.current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 150;

        if (distance < maxDist) {
          const force = (maxDist - distance) / maxDist;
          star.x += (dx / distance) * force * 2;
          star.y += (dy / distance) * force * 2;
        }

        // Draw star
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Optional: Twinkle effect by slightly varying opacity?
        // Simple alpha variation
        ctx.globalAlpha = 0.5 + Math.random() * 0.5;
        ctx.fill();
        ctx.globalAlpha = 1; // Reset
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    setCanvasSize();
    initStars();
    draw();

    // Event listeners
    const handleResize = () => {
      setCanvasSize();
      initStars();
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    window.addEventListener('resize', handleResize);
    // Attach mouse move to window or container? Window is safer for global tracking relative to canvas
    // But since it's a section background, maybe better to track safely relative to viewport
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme, systemTheme]);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    />
  );
}
