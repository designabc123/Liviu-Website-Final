import React, { useEffect, useRef } from 'react';
import { EXPERIENCE_DATA } from '../constants';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { ExperienceRole } from '../types';

gsap.registerPlugin(ScrollTrigger);

const Experience: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // Heading Animation
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

      // Loop through each row
      const rows = gsap.utils.toArray('.experience-row');
      
      rows.forEach((row: any) => {
        const date = row.querySelector('.timeline-date-text');
        const wrappers = row.querySelectorAll('.reveal-wrapper'); // Handle multiple wrappers (desktop/mobile variants)
        const circle = row.querySelector('.timeline-circle');
        
        // Default animation setup
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: row,
            start: "top 60%", 
            toggleActions: "play none none reverse"
          }
        });

        // 1. Date reveals first (0.6s) - if it exists (might not on mobile for some rows)
        if (date) {
            // Determine X start based on text alignment logic (approx)
            // If it's on right, slide from right. If left, slide from left.
            // Simplified: slide from 0 or just fade in. 
            // Let's keep the existing "slide from side" logic if we can detect it.
            // We can check the parent class or just use a generic fade/slide.
            const isRightAligned = date.parentElement?.classList.contains('text-right');
            const dateXStart = isRightAligned ? 50 : -50;
            
            tl.fromTo(date, 
            { opacity: 0, x: dateXStart },
            { opacity: 1, x: 0, duration: 0.6, ease: "power2.out" }
            );
        }

        // 2. Circle reveals
        tl.fromTo(circle,
          { scale: 2, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.6, ease: "power2.out" },
          "<" 
        );

        // 3. Card Wrapper(s) reveal
        wrappers.forEach((wrapper: any) => {
             const isLeft = wrapper.getAttribute('data-side') === 'left';
             const cardXStart = isLeft ? -50 : 50;
             
             tl.fromTo(wrapper,
                { 
                    opacity: 0, 
                    x: cardXStart, 
                },
                { 
                    opacity: 1, 
                    x: 0, 
                    duration: 0.8, 
                    ease: "power3.out" 
                },
                "<" 
            );
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Helper component to render the Card Content to avoid duplication in code
  const ExperienceCard = ({ role, isLeft, isMobile = false }: { role: ExperienceRole, isLeft: boolean, isMobile?: boolean }) => (
    <div 
        className={`iso-card-base ${isLeft ? 'iso-card-left' : 'iso-card-right'} bg-off-white/50 backdrop-blur-sm p-8 rounded-xl relative group w-full`}
    >
        {/* Hover Outlines */}
        <div className="card-outline-orange absolute inset-0 border border-accent-orange rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        {/* Move left/right based on position */}
        <div className={`card-outline-grey ${isLeft ? 'move-left' : 'move-right'} absolute inset-0 border border-gray-300 rounded-xl`}></div>

        {/* CONNECTOR LINE */}
        {/* If Left Card: Line on Right. If Right Card: Line on Left. */}
        {/* Desktop Width: w-12 (matches pr-12/pl-12). Mobile Width: w-8 (matches gap). */}
        <div className={`absolute top-1/2 h-[1px] bg-accent-orange
            ${isLeft 
                ? '-right-12 w-12 origin-left hidden md:block' // Left Card (Desktop only)
                : isMobile 
                    ? '-left-8 w-8' // Right Card (Mobile specific width)
                    : '-left-12 w-12' // Right Card (Desktop width)
            }
        `}></div>

        <div className="relative z-10">
        <h3 className="text-2xl font-bold text-dark-gray mb-1">{role.title}</h3>
        <h4 className="text-accent-orange font-semibold mb-1">{role.company}</h4>
        
        {/* Location & Mobile Date Pill */}
        <div className="mb-6">
            <p className="text-sm text-gray-500 italic"><i className="fa-solid fa-location-dot mr-2"></i>{role.location}</p>
            {/* Mobile Date Pill: Black bg, White text, small */}
            <div className="md:hidden mt-3 inline-block bg-black text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                {role.period}
            </div>
        </div>

        <ul className="space-y-3">
            {role.details.map((detail, idx) => (
                <li key={idx} className="flex items-start text-gray-600 text-sm leading-relaxed">
                <i className="fa-solid fa-caret-right text-accent-orange mt-1 mr-3 flex-shrink-0"></i>
                <span>{detail}</span>
                </li>
            ))}
        </ul>
        </div>
    </div>
  );

  return (
    // Layout Update:
    // 1. Removed lg:-mt-32 to rely on the image's negative margin pulling this up.
    // 2. Added pt-40 (160px) to provide a safety buffer for the About image bleed (approx 80px) so text doesn't overlap.
    <section ref={containerRef} className="pt-40 pb-32 bg-white/90 relative overflow-hidden z-10">
      <div className="container mx-auto px-6">
        <div className="text-center mb-24">
          <h2 ref={headingRef} className="text-4xl md:text-6xl font-display font-bold text-dark-gray mb-4 origin-center">
            Experience <span className="text-accent-orange">Timeline</span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            A journey through pharmaceutical, medical device, and biotech design excellence.
          </p>
        </div>

        {/* Timeline Container - with Perspective */}
        <div className="relative perspective-container">
          {/* Central Line */}
          {/* On Mobile: Line is on Left (left-4). On Desktop: Center (left-1/2) */}
          <div 
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px transform md:-translate-x-1/2 z-0"
            style={{
              background: 'linear-gradient(to bottom, transparent 0%, #e5e5e5 5%, #e5e5e5 95%, transparent 100%)'
            }}
          ></div>

          <div className="space-y-16 md:space-y-24">
            {EXPERIENCE_DATA.map((role, index) => {
              const isEven = index % 2 === 0; // Even: Card on Right, Date on Left
              const isLeftCard = !isEven;
              const isRightCard = isEven;
              
              return (
                <div key={index} className="experience-row grid grid-cols-[auto_1fr] md:grid-cols-[1fr_auto_1fr] gap-8 md:gap-0 items-center relative z-10">
                  
                  {/* LEFT COLUMN (Desktop Only) */}
                  <div className="hidden md:flex justify-end pr-12 w-full perspective-container">
                    {isRightCard ? (
                      // If Right Card, Date goes here on Left
                      <div className="timeline-date text-right w-full">
                         <span className="timeline-date-text block text-2xl lg:text-3xl font-display font-bold text-accent-orange leading-none">
                          {role.period}
                        </span>
                      </div>
                    ) : (
                      // If Left Card, Card goes here on Left
                      <div className="reveal-wrapper w-full" data-side="left">
                         <ExperienceCard role={role} isLeft={true} />
                      </div>
                    )}
                  </div>

                  {/* CENTER COLUMN: Spine Marker */}
                  <div className="relative flex justify-center items-center h-full z-20">
                     <div className="timeline-circle w-6 h-6 bg-accent-orange rounded-full border-4 border-white flex-shrink-0"></div>
                  </div>

                  {/* RIGHT COLUMN */}
                  <div className="pl-4 md:pl-12 w-full perspective-container">
                    
                    {/* DESKTOP LOGIC */}
                    <div className="hidden md:block">
                        {isRightCard ? (
                            // Desktop: Right Card in Right Column
                            <div className="reveal-wrapper w-full" data-side="right">
                                <ExperienceCard role={role} isLeft={false} />
                            </div>
                        ) : (
                            // Desktop: Date in Right Column (for Left Card)
                            <div className="timeline-date text-left w-full">
                                <span className="timeline-date-text block text-2xl lg:text-3xl font-display font-bold text-accent-orange leading-none">
                                {role.period}
                                </span>
                            </div>
                        )}
                    </div>

                    {/* MOBILE LOGIC (Everything is in Right Column) */}
                    <div className="md:hidden">
                        {/* Always Render Card here on Mobile */}
                        {/* We treat all mobile cards as "Right Sided" for animation/visuals, or keep original slant? 
                            User said "move all boxes... to the right". 
                            Visually, 'iso-card-right' looks better on the right side of spine.
                        */}
                        <div className="reveal-wrapper w-full" data-side="right">
                            <ExperienceCard role={role} isLeft={false} isMobile={true} />
                        </div>
                    </div>

                  </div>

                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;