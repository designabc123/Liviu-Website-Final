import React, { useEffect, useRef } from 'react';
import { EXPERIENCE_DATA } from '../constants';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { ExperienceRole } from '../types';

gsap.registerPlugin(ScrollTrigger);

const EXPERIENCE_GRAPHICS = [
  // Job A: Standard
  { src: "https://res.cloudinary.com/dao9flvhw/image/upload/v1769286335/Exp-1-DNA_yfswmr.png", width: "w-[500px]", margin: "md:-ml-40", targetOpacity: 0.8 },
  // Job B: Standard
  { src: "https://res.cloudinary.com/dao9flvhw/image/upload/v1769289703/Exp-2-Lens_tsmttp.png", width: "w-[350px]", margin: "md:-mr-40", targetOpacity: 0.8 },
  // Job C: MOVED CLOSER TO SPINE
  { src: "https://res.cloudinary.com/dao9flvhw/image/upload/v1769289705/Exp-3-Skin_cd4cqx.png", width: "w-[300px]", margin: "md:-ml-10", targetOpacity: 0.8 },
  // Job D: Standard
  { src: "https://res.cloudinary.com/dao9flvhw/image/upload/v1769289705/Exp-4-Magazine_ntumfq.png", width: "w-[450px]", margin: "md:-mr-40", targetOpacity: 0.8 },
  // Job E: Standard
  { src: "https://res.cloudinary.com/dao9flvhw/image/upload/v1769289706/Exp-5-Pills_lwjqhy.png", width: "w-[250px]", margin: "md:-ml-40", targetOpacity: 0.8 },
  // Job F: Standard
  { src: "https://res.cloudinary.com/dao9flvhw/image/upload/v1769289707/Exp-6-Plant_chsdyh.png", width: "w-[200px]", margin: "md:-mr-40", targetOpacity: 0.8 },
  // Job G: CLOSER TO SPINE + CUSTOM OPACITY
  { src: "https://res.cloudinary.com/dao9flvhw/image/upload/v1769289705/Exp-7-Mac_toymjy.png", width: "w-[250px]", margin: "md:-ml-10", targetOpacity: 0.7 },
  // Job H: CLOSER TO SPINE
  { src: "https://res.cloudinary.com/dao9flvhw/image/upload/v1769289706/Exp-8-Stylus_lu8afb.png", width: "w-[250px]", margin: "md:-mr-10", targetOpacity: 0.8 }
];

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
      
      rows.forEach((row: any, i: number) => {
        const date = row.querySelector('.timeline-date-text');
        const wrappers = row.querySelectorAll('.reveal-wrapper');
        const circle = row.querySelector('.timeline-circle');
        const graphic = row.querySelector('.experience-graphic');
        
        // Get opacity from data or default to 0.8
        const targetOpacity = EXPERIENCE_GRAPHICS[i]?.targetOpacity || 0.8;

        // Default animation setup (Reveal)
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: row,
            start: "top 60%", 
            toggleActions: "play none none reverse"
          }
        });

        // 0. Graphic Logic (Big & Slow Parallax)
        if (graphic) {
            // Fade In/Out (Opacity 0 -> targetOpacity)
            gsap.fromTo(graphic,
                { opacity: 0 },
                { 
                    opacity: targetOpacity, 
                    duration: 2.5, // Slow fade
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: row,
                        start: "top 90%", // Fade in early
                        end: "bottom 10%", // Fade out when leaving
                        toggleActions: "play reverse play reverse"
                    }
                }
            );
            
            // Parallax Effect (Dramatic Y movement)
            gsap.fromTo(graphic, 
                { y: -150 }, 
                { 
                    y: 150, 
                    ease: "none",
                    scrollTrigger: {
                        trigger: row,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: true
                    }
                }
            );
        }

        // 1. Date reveals first (0.6s)
        if (date) {
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
                { opacity: 0, x: cardXStart },
                { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" },
                "<" 
            );
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Helper component to render the Card Content
  const ExperienceCard = ({ role, isLeft, isMobile = false }: { role: ExperienceRole, isLeft: boolean, isMobile?: boolean }) => (
    <div 
        className={`iso-card-base ${isLeft ? 'iso-card-left origin-right' : 'iso-card-right origin-left'} bg-off-white/50 backdrop-blur-sm p-8 rounded-xl relative group w-full z-10`}
    >
        {/* Hover Outlines */}
        <div className="card-outline-orange absolute inset-0 border border-accent-orange rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className={`card-outline-grey ${isLeft ? 'move-left' : 'move-right'} absolute inset-0 border border-gray-300 rounded-xl`}></div>

        {/* CONNECTOR LINE */}
        <div className={`absolute top-1/2 -translate-y-1/2 h-[1px] bg-accent-orange -z-10
            ${isLeft 
                ? '-right-[60px] w-[60px] origin-left hidden md:block' 
                : isMobile 
                    ? '-left-16 w-16' 
                    : '-left-[60px] w-[60px]'
            }
        `}></div>

        <div className="relative z-10">
        <h3 className="text-2xl font-bold text-dark-gray mb-1">{role.title}</h3>
        <h4 className="text-accent-orange font-semibold mb-1">{role.company}</h4>
        
        <div className="mb-6">
            <p className="text-sm text-gray-500 italic"><i className="fa-solid fa-location-dot mr-2"></i>{role.location}</p>
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
          <div 
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px transform md:-translate-x-1/2 z-0"
            style={{
              background: 'linear-gradient(to bottom, transparent 0%, #e5e5e5 5%, #e5e5e5 95%, transparent 100%)'
            }}
          ></div>

          <div className="space-y-16 md:space-y-0">
            {EXPERIENCE_DATA.map((role, index) => {
              const isEven = index % 2 === 0; // Card on Right, Date on Left
              const isRightCard = isEven;
              const graphic = EXPERIENCE_GRAPHICS[index] || EXPERIENCE_GRAPHICS[0];
              
              return (
                <div 
                  key={index} 
                  className={`experience-row grid grid-cols-[auto_1fr] md:grid-cols-[1fr_auto_1fr] gap-8 md:gap-0 items-center relative z-0 pointer-events-none ${index > 0 ? 'md:-mt-48' : ''}`}
                >
                  
                  {/* LEFT COLUMN */}
                  <div className="hidden md:flex justify-end pr-12 w-full perspective-container relative">
                    
                    {/* Even Index (0, 2, 4): Image is on Left Side (same as Date) */}
                    {isEven && (
                        <div className={`absolute left-0 top-1/2 -translate-y-1/2 ${graphic.margin} ${graphic.width} z-0 hidden md:block pointer-events-none`}>
                             <img 
                                src={graphic.src} 
                                alt={`Experience Graphic ${index + 1}`}
                                className="experience-graphic w-full h-auto opacity-0"
                            />
                        </div>
                    )}

                    {isRightCard ? (
                      <div className="timeline-date text-right w-full pointer-events-auto relative z-10">
                         <span className="timeline-date-text block text-2xl lg:text-3xl font-display font-bold text-accent-orange leading-none">
                          {role.period}
                        </span>
                      </div>
                    ) : (
                      <div className="reveal-wrapper w-full pointer-events-auto relative z-10" data-side="left">
                         <ExperienceCard role={role} isLeft={true} />
                      </div>
                    )}
                  </div>

                  {/* CENTER COLUMN */}
                  <div className="relative flex justify-center items-center h-full z-40">
                     <div className="timeline-circle w-6 h-6 bg-accent-orange rounded-full border-4 border-white flex-shrink-0 shadow-sm"></div>
                  </div>

                  {/* RIGHT COLUMN */}
                  <div className="pl-4 md:pl-12 w-full perspective-container relative">
                    
                    {/* Odd Index (1, 3, 5): Image is on Right Side (same as Date) */}
                    {!isEven && (
                        <div className={`absolute right-0 top-1/2 -translate-y-1/2 ${graphic.margin} ${graphic.width} z-0 hidden md:block pointer-events-none`}>
                             <img 
                                src={graphic.src} 
                                alt={`Experience Graphic ${index + 1}`}
                                className="experience-graphic w-full h-auto opacity-0"
                            />
                        </div>
                    )}

                    <div className="hidden md:block">
                        {isRightCard ? (
                            <div className="reveal-wrapper w-full pointer-events-auto relative z-10" data-side="right">
                                <ExperienceCard role={role} isLeft={false} />
                            </div>
                        ) : (
                            <div className="timeline-date text-left w-full pointer-events-auto relative z-10">
                                <span className="timeline-date-text block text-2xl lg:text-3xl font-display font-bold text-accent-orange leading-none">
                                {role.period}
                                </span>
                            </div>
                        )}
                    </div>
                    <div className="md:hidden">
                        <div className="reveal-wrapper w-full pointer-events-auto relative z-10" data-side="right">
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