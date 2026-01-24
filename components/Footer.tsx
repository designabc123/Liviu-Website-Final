import React, { useEffect, useRef } from 'react';
import { CV_DATA } from '../constants';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Footer: React.FC = () => {
  const footerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Text Reveal Animation: Fade In + Scale Down
      gsap.fromTo(textRef.current,
        {
          scale: 1.5, // Start larger
          opacity: 0,
        },
        {
          scale: 1, // End normal size
          opacity: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 80%", // Start animating when footer enters view
            end: "center 60%", 
            scrub: 1 // Link to scroll
          }
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    // Removed h-screen, kept py-24. Added overflow-hidden to crop the background text
    <footer id="contact" ref={footerRef} className="bg-dark-gray text-white py-24 relative overflow-hidden flex flex-col justify-center">
      <div className="container mx-auto px-6 relative z-10 text-center">
        
        {/* Animated Heading */}
        <h2 ref={textRef} className="text-4xl md:text-6xl lg:text-8xl font-display font-bold mb-16 uppercase opacity-0 origin-center">
          Let's create <span className="text-accent-orange">impact</span>
        </h2>
        
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16 mb-16">
          <a href={`mailto:${CV_DATA.email}`} className="group flex items-center text-xl hover:text-accent-orange transition-colors">
            <div className="w-12 h-12 border border-white/20 rounded-full flex items-center justify-center mr-4 group-hover:border-accent-orange transition-colors">
              <i className="fa-regular fa-envelope"></i>
            </div>
            {CV_DATA.email}
          </a>
          
          <a href={`https://${CV_DATA.linkedin}`} target="_blank" rel="noreferrer" className="group flex items-center text-xl hover:text-accent-orange transition-colors">
            <div className="w-12 h-12 border border-white/20 rounded-full flex items-center justify-center mr-4 group-hover:border-accent-orange transition-colors">
              <i className="fa-brands fa-linkedin-in"></i>
            </div>
            LinkedIn Profile
          </a>
        </div>
        
        <div className="border-t border-white/10 pt-8 text-white/40 text-sm">
          <p>© {new Date().getFullYear()} {CV_DATA.name}. All Rights Reserved.</p>
        </div>
      </div>
      
      {/* Decorative large text bg - Centered and Huge */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className="text-[30vw] font-display font-bold text-white opacity-[0.03] leading-none whitespace-nowrap">
          LIVIU
        </span>
      </div>
    </footer>
  );
};

export default Footer;