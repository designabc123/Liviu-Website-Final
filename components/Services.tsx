import React, { useEffect, useRef } from 'react';
import { CORE_COMPETENCIES } from '../constants';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Services: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading Reveal
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
    // Updated padding: pt-16 pb-24 for mobile symmetry (matching header mb-16)
    <section id="competencies" ref={containerRef} className="pt-16 pb-24 md:py-24 bg-white/90 relative z-10">
      <div className="container mx-auto px-6">
        {/* Header Margin: mb-16 on mobile to match pt-16 */}
        <div className="text-center mb-16 md:mb-16">
          <h2 ref={headingRef} className="text-3xl md:text-5xl font-display font-bold text-dark-gray origin-center">
            Core Competencies & <br/><span className="text-accent-orange">Technical Skills</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CORE_COMPETENCIES.map((service, index) => (
            <div 
              key={index}
              className="perspective-container group"
            >
                {/* Card Base */}
                <div className="iso-card-base bg-[#FAFAFA]/80 backdrop-blur-sm p-10 rounded-xl relative h-full">
                    {/* Hover Outlines */}
                    <div className="card-outline-orange absolute inset-0 border border-accent-orange rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {/* Move Right/Down on Hover (move-right) */}
                    <div className="card-outline-grey move-right absolute inset-0 border border-gray-300 rounded-xl"></div>

                    {/* Content */}
                    <div className="relative z-10 flex flex-col h-full justify-between">
                        <div>
                            <div className="w-16 h-16 bg-accent-orange/10 rounded-full flex items-center justify-center mb-8 group-hover:bg-accent-orange transition-colors duration-300">
                                <i className={`fa-solid ${service.icon} text-2xl text-accent-orange group-hover:text-white transition-colors duration-300`}></i>
                            </div>
                            <h3 className="text-xl font-bold text-dark-gray mb-4">{service.title}</h3>
                            <p className="text-gray-500 leading-relaxed text-sm">
                                {service.description}
                            </p>
                        </div>

                        {/* Software Icons Row */}
                        {service.icons && (
                          <div className="mt-auto pt-6 border-t border-gray-100 flex flex-wrap gap-3 items-center mt-6">
                            {service.icons.map((iconUrl, i) => (
                              <img
                                key={i}
                                src={iconUrl}
                                alt="Software Icon"
                                className="h-8 w-auto object-contain"
                              />
                            ))}
                          </div>
                        )}
                    </div>
                </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;