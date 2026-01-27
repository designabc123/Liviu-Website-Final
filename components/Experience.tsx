import React, { useEffect, useRef } from 'react';
import { EXPERIENCE_DATA } from '../constants';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { ExperienceRole } from '../types';

gsap.registerPlugin(ScrollTrigger);

const EXPERIENCE_GRAPHICS = [
  // Job A: Standard
  { src: "https://res.cloudinary.com/dao9flvhw/image/upload/v1769286335/Exp-1-DNA_yfswmr.png", width: "w-[500px]", margin: "md:-ml-40", targetOpacity: 0.8, nudgeDesktop: "" },
  // Job B: Standard
  { src: "https://res.cloudinary.com/dao9flvhw/image/upload/v1769289703/Exp-2-Lens_tsmttp.png", width: "w-[350px]", margin: "md:-mr-40", targetOpacity: 0.8, nudgeDesktop: "" },
  // Job C: Shift Right 75px
  { src: "https://res.cloudinary.com/dao9flvhw/image/upload/v1769289705/Exp-3-Skin_cd4cqx.png", width: "w-[300px]", margin: "md:-ml-10", targetOpacity: 0.8, nudgeDesktop: "lg:translate-x-[75px]" },
  // Job D: Shift Left 100px
  { src: "https://res.cloudinary.com/dao9flvhw/image/upload/v1769289705/Exp-4-Magazine_ntumfq.png", width: "w-[450px]", margin: "md:-mr-40", targetOpacity: 0.8, nudgeDesktop: "lg:-translate-x-[100px]" },
  // Job E: Shift Right 200px -> Scaled 30% (250 -> 325)
  { src: "https://res.cloudinary.com/dao9flvhw/image/upload/v1769289706/Exp-5-Pills_lwjqhy.png", width: "w-[325px]", margin: "md:-ml-40", targetOpacity: 0.8, nudgeDesktop: "lg:translate-x-[200px]" },
  // Job F: Shift Left 200px -> Scaled 30% (200 -> 260)
  { src: "https://res.cloudinary.com/dao9flvhw/image/upload/v1769289707/Exp-6-Plant_chsdyh.png", width: "w-[260px]", margin: "md:-mr-40", targetOpacity: 0.8, nudgeDesktop: "lg:-translate-x-[200px]" },
  // Job G: Shift Right 150px
  { src: "https://res.cloudinary.com/dao9flvhw/image/upload/v1769289705/Exp-7-Mac_toymjy.png", width: "w-[250px]", margin: "md:-ml-10", targetOpacity: 0.7, nudgeDesktop: "lg:translate-x-[150px]" },
  // Job H: Shift Left 150px -> Scaled 30% (250 -> 325)
  { src: "https://res.cloudinary.com/dao9flvhw/image/upload/v1769289706/Exp-8-Stylus_lu8afb.png", width: "w-[325px]", margin: "md:-mr-10", targetOpacity: 0.8, nudgeDesktop: "lg:-translate-x-[150px]" }
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
            start: "top 80%", // Trigger slightly earlier for better mobile feel
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
            tl.fromTo(date, 
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
            );
        }

        // 2. Circle reveals
        if (circle) {
            tl.fromTo(circle,
            { scale: 0, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.7)" },
            "<" 
            );
        }

        // 3. Card Wrapper(s) reveal
        wrappers.forEach((wrapper: any) => {
             const side = wrapper.getAttribute('data-side');
             
             // Determine animation direction based on layout side
             let startVars = { opacity: 0, x: 0, y: 0 };
             
             if (side === 'left') {
                 startVars.x = -50;
             } else if (side === 'right') {
                 startVars.x = 50;
             } else {
                 // 'center' / Mobile default: Slide Up
                 startVars.y = 50;
             }
             
             tl.fromTo(wrapper,
                startVars,
                { opacity: 1, x: 0, y: 0, duration: 0.8, ease: "power3.out" },
                "-=0.4" // Overlap slightly with circle
            );
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Helper component to render the Card Content
  const ExperienceCard = ({ role, isLeft, isMobile = false }: { role: ExperienceRole, isLeft: boolean, isMobile?: boolean }) => (
    <div 
        className={`iso-card-base ${isMobile ? '' : isLeft ? 'iso-card-left origin-right' : 'iso-card-right origin-left'} 
        ${isMobile 
            ? 'bg-[#FAFAFA] border border-gray-200 hover:border-accent-orange transition-colors duration-300 shadow-lg' 
            : 'bg-[#FAFAFA]/80 backdrop-blur-sm'
        } 
        p-8 rounded-xl relative group w-full z-10`}
    >
        {/* Mobile: Orange Dot on Top Border */}
        {isMobile && (
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-accent-orange rounded-full z-20"></div>
        )}

        {/* Hover Outlines (Desktop Only) */}
        {!isMobile && (
             <div className="card-outline-orange absolute inset-0 border border-accent-orange rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        )}
        {!isMobile && (
            <div className={`card-outline-grey ${isLeft ? 'move-left' : 'move-right'} absolute inset-0 border border-gray-300 rounded-xl`}></div>
        )}

        {/* CONNECTOR LINE - Only for Desktop */}
        {!isMobile && (
            <div className={`absolute top-1/2 -translate-y-1/2 h-[1px] bg-accent-orange -z-10
                ${isLeft 
                    ? '-right-[60px] w-[60px] origin-left hidden md:block' 
                    : '-left-[60px] w-[60px]'
                }
            `}></div>
        )}

        <div className="relative z-10">
            <h3 className="text-2xl font-bold text-dark-gray mb-1">{role.title}</h3>
            <h4 className="text-accent-orange font-semibold mb-1">{role.company}</h4>
            
            <div className="mb-6">
                <p className="text-sm text-gray-500 italic"><i className="fa-solid fa-location-dot mr-2"></i>{role.location}</p>
                
                {/* Mobile: Date Badge */}
                {isMobile && (
                   <span className="bg-black text-white px-3 py-1 rounded-full text-xs font-bold inline-block w-fit mt-3 uppercase tracking-wider">
                     {role.period}
                   </span>
                )}
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
    // SYMMETRY FIX: pt-16 (top padding) equals mb-16 (header bottom margin) on mobile.
    // SEAMLESS FIX: pb-0 on mobile so the inner spine connects to the bottom.
    <section ref={containerRef} className="pt-16 md:pt-40 pb-0 md:pb-32 bg-white/90 relative overflow-hidden z-10">
      <div className="container mx-auto px-6">
        
        {/* Header Spacing: mb-16 to match pt-16 */}
        <div className="text-center mb-16 md:mb-24">
          <h2 ref={headingRef} className="text-4xl md:text-6xl font-display font-bold text-dark-gray mb-4 origin-center">
            Experience <span className="text-accent-orange">Timeline</span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            A journey through pharmaceutical, medical device, and biotech design excellence.
          </p>
        </div>

        {/* Timeline Container - with Perspective */}
        {/* pb-24 on Mobile ensures spine extends below the last item */}
        <div className="relative perspective-container pb-24 md:pb-0 overflow-visible">
          
          {/* DESKTOP SPINE (Hidden on Mobile) */}
          <div 
            className="absolute left-1/2 top-0 bottom-0 md:-bottom-32 w-px transform -translate-x-1/2 z-0 hidden md:block"
            style={{
              background: 'linear-gradient(to bottom, transparent 0%, #e5e5e5 5%, #e5e5e5 100%)'
            }}
          ></div>

          {/* MOBILE SPINE (New: Center, Orange, Full Height) */}
          <div 
             className="absolute left-1/2 top-0 bottom-0 w-px transform -translate-x-1/2 z-0 md:hidden bg-accent-orange/30"
          ></div>

          <div className="space-y-12 md:space-y-0">
            {EXPERIENCE_DATA.map((role, index) => {
              const isEven = index % 2 === 0; // Card on Right, Date on Left (Desktop)
              const isRightCard = isEven;
              const graphic = EXPERIENCE_GRAPHICS[index] || EXPERIENCE_GRAPHICS[0];
              
              return (
                <div 
                  key={index} 
                  className={`experience-row relative z-0 ${index > 0 ? 'md:-mt-48' : ''}`}
                >
                  
                  {/* --- MOBILE LAYOUT (Solid Cards) --- */}
                  <div className="md:hidden w-full relative">
                      {/* Content Card with Top Dot */}
                      <div className="reveal-wrapper w-full relative z-10" data-side="center">
                          <ExperienceCard role={role} isLeft={false} isMobile={true} />
                      </div>
                  </div>


                  {/* --- DESKTOP LAYOUT (Grid) --- */}
                  <div className="hidden md:grid grid-cols-[1fr_auto_1fr] gap-0 items-center w-full perspective-container">
                    
                    {/* LEFT COLUMN */}
                    <div className="flex justify-end pr-12 w-full perspective-container relative">
                        {/* Graphics Logic */}
                        {isEven && (
                            <div className={`absolute left-0 top-1/2 -translate-y-1/2 ${graphic.margin} ${graphic.width} ${graphic.nudgeDesktop || ''} z-0 pointer-events-none`}>
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
                    <div className="pl-12 w-full perspective-container relative">
                        {/* Graphics Logic */}
                        {!isEven && (
                            <div className={`absolute right-0 top-1/2 -translate-y-1/2 ${graphic.margin} ${graphic.width} ${graphic.nudgeDesktop || ''} z-0 pointer-events-none`}>
                                <img 
                                    src={graphic.src} 
                                    alt={`Experience Graphic ${index + 1}`}
                                    className="experience-graphic w-full h-auto opacity-0"
                                />
                            </div>
                        )}

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