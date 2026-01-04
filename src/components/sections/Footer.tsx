'use client';

import { Github, Instagram, Linkedin, Twitter } from 'lucide-react';

const SOCIALS = [
  { name: 'X', icon: Twitter, href: 'https://x.com/danyik3d' },
  { name: 'GitHub', icon: Github, href: 'https://github.com/danyiked' },
  { name: 'Instagram', icon: Instagram, href: 'https://instagram.com/uncleiked' },
  { name: 'LinkedIn', icon: Linkedin, href: 'https://www.linkedin.com/in/daniel-ikediashi-052952251/?originalSubdomain=ng' },
];

export default function Footer() {
  return (
    <footer className="w-full py-20 px-10 md:px-20 bg-background border-t border-white/5 relative z-10">
      <div className="flex flex-col md:flex-row items-center justify-between gap-10">
        <div className="space-y-4 text-center md:text-left">
          <h2 className="text-2xl font-black uppercase tracking-tighter">
            Daniel Amechi <span className="text-primary italic">Ikediashi</span>
          </h2>
          <p className="font-mono text-xs opacity-40 uppercase tracking-[0.3em]">
            Creative Developer Portfolio v2026.1
          </p>
        </div>

        <div className="flex gap-6">
          {SOCIALS.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-white/5 border border-white/10 rounded-full hover:bg-primary/20 hover:border-primary/50 hover:scale-110 active:scale-95 transition-all group"
              aria-label={social.name}
            >
              <social.icon className="w-5 h-5 group-hover:text-primary transition-colors" />
            </a>
          ))}
        </div>

        <div className="text-[10px] font-mono uppercase tracking-[0.5em] opacity-20 text-center md:text-right">
          Designed & Built in 
          <span className="block text-primary font-bold mt-1 text-xs">Lagos, Nigeria</span>
        </div>
      </div>
    </footer>
  );
}
