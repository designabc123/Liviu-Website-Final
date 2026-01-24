import React, { useState, useEffect, useRef } from 'react';
import { PORTFOLIO_CATEGORIES, PORTFOLIO_ITEMS } from '../constants';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Portfolio: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  const filteredItems = activeFilter === "All" 
    ? PORTFOLIO_ITEMS 
    : PORTFOLIO_ITEMS.filter(item => item.category === activeFilter);

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
    // bg-off-white/90 for transparency. relative z-10 for layering.
    <section ref={containerRef} className="py-32 bg-off-white/90 relative z-10">
      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-16 text-center">
          <h2 ref={headingRef} className="text-4xl md:text-6xl font-display font-bold text-dark-gray mb-8 origin-center">
            Selected <span className="text-accent-orange">Work</span>
          </h2>
          
          {/* Filters */}
          <div className="flex flex-wrap gap-4 justify-center">
            {PORTFOLIO_CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-4 py-2 text-sm font-bold uppercase tracking-wider border-2 transition-all duration-300
                  ${activeFilter === category 
                    ? 'bg-accent-orange border-accent-orange text-white' 
                    : 'bg-transparent border-gray-300 text-gray-500 hover:border-dark-gray hover:text-dark-gray'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry Grid - Flat, No Isometric */}
        {/* grid-flow-dense is crucial for filling gaps with variable sizes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 grid-flow-dense">
          {filteredItems.map((item) => (
            <div 
              key={item.id} 
              // Enforce aspect-video (16:9). For large boxes (col-span-2 row-span-2), this aspect ratio still holds overall if the grid is square-ish.
              // If not, object-cover handles the image fill.
              className={`group relative overflow-hidden rounded-lg bg-gray-200 cursor-pointer shadow-lg hover:shadow-xl transition-shadow duration-300 aspect-video ${item.span || 'md:col-span-1'} `}
            >
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 filter grayscale group-hover:grayscale-0"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-dark-gray/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                <span className="text-accent-orange text-xs font-bold uppercase tracking-wider mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">{item.category}</span>
                <h3 className="text-white text-xl font-bold translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Background decoration - Left Side */}
      <div className="absolute top-0 left-0 w-1/3 h-full bg-grid-pattern opacity-50 z-0 transform rotate-180 pointer-events-none"></div>
    </section>
  );
};

export default Portfolio;