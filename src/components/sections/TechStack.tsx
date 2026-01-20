'use client';



const TECH_LIST = [
  { name: 'Next.js', category: 'Framework', color: '#FFFFFF', textContrast: '#000000' }, // White -> Black text
  { name: 'React', category: 'Library', color: '#61DAFB', textContrast: '#000000' }, // Light Blue -> Black text
  { name: 'TypeScript', category: 'Language', color: '#3178C6' },
  { name: 'Node Js', category: 'Backend', color: '#61DAFB', textContrast: '#000000' }, // Light Blue -> Black text
  { name: 'GSAP', category: 'Motion', color: '#88CE02', textContrast: '#000000' }, // Bright Green -> Black text
  { name: 'Tailwind', category: 'Styling', color: '#38B2AC' },
  { name: 'Three.js', category: 'Spatial', color: '#FFFFFF', textContrast: '#000000' }, // White -> Black text
  { name: 'Neon Postgre', category: 'Database', color: '#00E599', textContrast: '#000000' }, // Bright Green -> Black text
  { name: 'Prisma', category: 'ORM', color: '#5A67D8' },
   { name: 'MongoDb', category: 'Database', color: '#88CE02', textContrast: '#000000' }, // Bright Green -> Black text
  { name: 'Sanity', category: 'CMS', color: '#F03E2F' },
  { name: 'WordPress', category: 'CMS', color: '#21759B' },
  { name: 'JavaScript', category: 'Language', color: '#F7DF1E', textContrast: '#000000' }, // Yellow -> Black text
];

import StarlightBackground from './StarlightBackground';

export default function TechStack() {
  // Triple the list to ensure smooth infinite scrolling
  const carouselItems = [...TECH_LIST, ...TECH_LIST, ...TECH_LIST];

  return (
    <section id="tech" className="relative py-32 overflow-hidden w-full">
      <StarlightBackground />
      <div className="container mx-auto px-6 mb-20 text-center relative z-10">
        <h2 className="text-xs font-mono uppercase tracking-[0.5em] text-primary mb-6">Technical Arsenal</h2>
        <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter text-foreground">
          The <span className="text-primary italic">Stack</span>.
        </h1>
      </div>
      
      {/* Carousel Container */}
      <div className="relative w-full overflow-hidden mask-gradient z-10">
          <div 
             className="flex whitespace-nowrap animate-marquee hover:[animation-play-state:paused]"
             style={{ width: 'max-content' }}
          >
            {carouselItems.map((tech, index) => (
              <div 
                key={`${tech.name}-${index}`}
                className="group relative flex flex-col items-center justify-center w-[280px] h-[160px] mx-4 p-6 
                           border border-white/5 bg-white/5 backdrop-blur-sm rounded-3xl 
                           overflow-hidden transition-all duration-300 hover:scale-105 cursor-default"
                style={{
                  '--tech-color': tech.color,
                  '--tech-contrast': tech.textContrast || '#FFFFFF',
                } as React.CSSProperties}
              >
                {/* Liquid Fill Effect */}
                <div 
                  className="absolute inset-0 top-full group-hover:top-0 transition-all duration-500 ease-in-out"
                  style={{ backgroundColor: 'var(--tech-color)' }}
                />

                {/* Border Glow (kept for extra detail, now subtle) */}
                <div 
                   className="absolute inset-0 rounded-3xl border border-transparent group-hover:border-white/20 transition-colors duration-500 z-20"
                />

                <div className="relative z-10 text-[10px] font-mono uppercase tracking-widest opacity-40 mb-3 text-foreground group-hover:text-[var(--tech-contrast)] group-hover:opacity-100 transition-all duration-300">
                  {tech.category}
                </div>
                
                <div className="relative z-10 text-2xl font-bold tracking-tight text-foreground group-hover:text-[var(--tech-contrast)] transition-colors duration-300">
                  {tech.name}
                </div>
              </div>
            ))}
          </div>
      </div>
      

      
      <div className="mt-20 text-center px-6">
        <div className="p-8 border border-primary/20 bg-primary/5 rounded-3xl backdrop-blur-2xl inline-block max-w-2xl mx-auto font-mono text-sm text-foreground/60 leading-relaxed italic">
          &quot;I orchestrate complex spatial interfaces where sub-millisecond performance meets high-end aesthetics.&quot;
        </div>
      </div>
    </section>
  );
}
