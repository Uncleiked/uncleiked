'use client';

import { useGSAP } from '@/lib/gsap';
import gsap from 'gsap';
import { useRef } from 'react';
// import { Twitter, Github, Instagram, Linkedin, ArrowUpRight } from 'lucide-react';
import SpatialSection from '@/components/three/SpatialSection';
import SignalWaves from '@/components/three/SignalWaves';

// const SOCIALS = [
//   { name: 'X (Twitter)', icon: Twitter, href: 'https://x.com/dannyiked', handle: '@dannyiked' },
//   { name: 'GitHub', icon: Github, href: 'https://github.com/dannyiked', handle: 'dannyiked' },
//   { name: 'Instagram', icon: Instagram, href: 'https://instagram.com/dannyiked', handle: '@dannyiked' },
//   { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/in/dannyiked', handle: 'Daniel Amechi Ikediashi' },
// ];

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null!);

  const handleContactClick = () => {
    window.location.href = 'mailto:dannyiked@gmail.com';
  };

  useGSAP(() => {
    gsap.from('.contact-item', {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
      },
      scale: 0.9,
      opacity: 0,
      stagger: 0.1,
      duration: 1,
      ease: 'back.out(1.7)',
    });
  }, { scope: containerRef });

  return (
    <SpatialSection
      id="contact"
      scene={<SignalWaves />}
      className="relative overflow-hidden"
    >
      <div ref={containerRef} className="w-full h-full flex flex-col items-center justify-center px-6 md:px-20 max-w-7xl mx-auto text-center">
        <div className="space-y-8 mb-20">
          <h2 className="text-xs font-mono uppercase tracking-[0.5em] text-primary font-bold">Connection Request</h2>
          <h1 className="text-6xl md:text-9xl font-black uppercase tracking-tighter leading-none text-foreground">
            Start a <span className="text-primary italic">Signal</span>.
          </h1>
          <p className="text-xl md:text-2xl font-mono max-w-2xl mx-auto text-foreground/50">
            Currently based in <span className="text-primary px-3 py-1 bg-primary/10 rounded-lg font-bold">Lagos, Nigeria</span>. 
            Ready to collaborate on world-class spatial experiences.
          </p>
        </div>

        <button 
          onClick={handleContactClick}
          className="group relative px-16 py-8 bg-primary text-black font-black uppercase text-2xl tracking-tighter rounded-full hover:scale-110 active:scale-95 transition-all mb-20 cursor-pointer shadow-[0_0_50px_rgba(59,130,246,0.3)]"
        >
          Send me a Message
          <div className="absolute inset-0 bg-white/30 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
        </button>

        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left w-full">
          {SOCIALS.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-item group relative p-10 bg-white/5 dark:bg-black/20 border border-white/10 dark:border-white/5 rounded-[2.5rem] overflow-hidden hover:bg-primary/10 hover:border-primary/50 transition-all duration-500"
            >
              <div className="flex items-start justify-between relative z-10">
                <div className="space-y-6">
                  <social.icon className="w-10 h-10 text-primary group-hover:scale-110 transition-transform" />
                  <div>
                    <div className="text-xs font-mono uppercase tracking-widest opacity-30 mb-2 text-foreground">{social.name}</div>
                    <div className="text-xl font-bold tracking-tight text-foreground">{social.handle}</div>
                  </div>
                </div>
                <ArrowUpRight className="w-6 h-6 opacity-20 group-hover:opacity-100 group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
              </div>
              <div className="absolute inset-0 bg-linear-to-tr from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          ))}
        </div> */}

        <div className="mt-28 font-mono text-[11px] uppercase tracking-[0.6em] text-foreground/50 italic">
          Daniel Amechi Ikediashi &copy; 2026 // Lagos, Nigeria // Available Worldwide
        </div>
      </div>
    </SpatialSection>
  );
}
