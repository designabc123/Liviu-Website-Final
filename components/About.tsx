import React, { useEffect, useRef } from 'react';
import { CV_DATA } from '../constants';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading Reveal: Scale Down & Fade In
      if (headingRef.current) {
        gsap.fromTo(headingRef.current,
          { scale: 1.5, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: headingRef.current,
              start: "top 90%",
              end: "bottom 70%",
              scrub: 1
            }
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    // z-20 to sit above Experience. Reduced bottom padding to let bleed work.
    <section ref={containerRef} className="relative pt-32 pb-12 lg:pb-0 bg-off-white/90 z-20">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-start"> 
          
          {/* Text Column */}
          <div className="lg:w-1/2 mb-12 lg:mb-0 lg:pr-16 z-20">
            <h3 className="text-accent-orange font-bold uppercase tracking-widest mb-4">Professional Summary</h3>
            <h2 ref={headingRef} className="text-4xl md:text-5xl font-display font-bold text-dark-gray mb-8 leading-tight origin-left">
              20+ Years of<br />Multidisciplinary Design
            </h2>
            <div className="text-lg text-gray-600 space-y-6 leading-relaxed font-light">
               <p>{CV_DATA.bio.split('.')[0]}. {CV_DATA.bio.split('.')[1]}.</p>
               <p className="border-l-4 border-accent-orange pl-6 italic text-gray-800 font-medium">
                 {CV_DATA.bio.split('Provenance')[0].split('Expert')[0].split('portfolios.')[1]}
               </p>
               <p>{CV_DATA.bio.split('execution.')[1]}</p>
            </div>
            
            <a href="#contact" className="inline-block mt-10 px-8 py-4 bg-accent-orange text-white font-bold uppercase tracking-wider hover:bg-dark-gray transition-colors duration-300">
              Get in Touch
            </a>
          </div>

          {/* Image Column */}
          <div className="lg:w-1/2 relative w-full">
             {/* 
                Target: 1:1 Aspect Ratio (aspect-square).
                Bleed: -mb-20 (approx -80px) to pull next section up.
                Align: No top margin, aligns with text.
             */}
             <div className="relative z-30 lg:-mb-20 aspect-square w-full max-w-[550px] ml-auto">
                <img 
                  src="https://picsum.photos/800/800?grayscale" 
                  alt="Liviu Lungu Abstract Work" 
                  className="w-full h-full object-cover shadow-2xl rounded-[20px]"
                />
                
                {/* 
                  Target: Badge Top-Left.
                  top: 60px -> top-14 (3.5rem = 56px).
                  left: -40px -> -left-10 (2.5rem = 40px).
                */}
                <div className="absolute top-14 -left-10 bg-white p-6 shadow-xl z-30 max-w-xs border-t-4 border-accent-orange hidden lg:block">
                  <p className="font-bold text-3xl text-dark-gray mb-1">20+</p>
                  <p className="text-sm text-gray-500 uppercase tracking-wider">Years Experience</p>
                </div>
             </div>
          </div>
          
        </div>
      </div>
      
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-grid-pattern opacity-50 z-0 pointer-events-none"></div>
    </section>
  );
};

export default About;