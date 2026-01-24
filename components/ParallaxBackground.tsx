import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ParallaxBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
        const shapes = gsap.utils.toArray('.parallax-shape');
        
        shapes.forEach((shape: any) => {
            const speed = parseFloat(shape.getAttribute('data-speed'));
            
            // LOGIC:
            // The shapes are positioned absolutely within a 100% height container.
            // They will naturally scroll WITH the page.
            // We use 'yPercent' or 'y' to offset them relative to the scroll scrub, creating depth.
            // Positive 'y' = Moves down relative to anchor (appears Slower / Farther away).
            // Negative 'y' = Moves up relative to anchor (appears Faster / Closer).
            
            gsap.to(shape, {
                y: (i, target) => window.innerHeight * speed * 2, 
                ease: "none",
                scrollTrigger: {
                    trigger: document.body,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 0
                }
            });
        });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="parallax-container">
        {/* Shape 1 (Hero): Orange Circle, Top-Left */}
        <div 
            className="parallax-shape shape-circle"
            data-speed="0.2"
            style={{ 
                top: '5%', 
                left: '-5%', 
                width: '300px', 
                height: '300px' 
            }}
        ></div>

        {/* Shape 2 (About): Textured Square, Mid-Right */}
        <div 
            className="parallax-shape pattern-fill"
            data-speed="-0.2"
            style={{ 
                top: '15%', 
                right: '-5%', 
                width: '250px', 
                height: '250px' 
            }}
        ></div>

        {/* Shape 3 (Exp Start): Large Grey Ring, Top-Left */}
        <div 
            className="parallax-shape shape-ring"
            data-speed="0.4"
            style={{ 
                top: '30%', 
                left: '-10%', 
                width: '500px', 
                height: '500px' 
            }}
        ></div>

        {/* Shape 4 (Exp Mid): Orange Square (outlined), Bottom-Right */}
        <div 
            className="parallax-shape shape-outlined-square"
            data-speed="-0.1"
            style={{ 
                top: '45%', 
                right: '-5%', 
                width: '200px', 
                height: '200px',
                transform: 'rotate(15deg)'
            }}
        ></div>

        {/* Shape 5 (Portfolio): Textured Large Circle, Top-Left */}
        <div 
            className="parallax-shape pattern-fill rounded-full"
            data-speed="0.3"
            style={{ 
                top: '60%', 
                left: '-5%', 
                width: '400px', 
                height: '400px' 
            }}
        ></div>

        {/* Shape 6 (Services): Grey Circle (filled), Mid-Right */}
        <div 
            className="parallax-shape shape-circle"
            data-speed="-0.3"
            style={{ 
                top: '75%', 
                right: '-2%', 
                width: '250px', 
                height: '250px',
                backgroundColor: '#e5e5e5' 
            }}
        ></div>

        {/* Shape 7 (Footer): Textured Vertical Rectangle, Bottom-Left */}
        <div 
            className="parallax-shape pattern-fill"
            data-speed="0.1"
            style={{ 
                top: '90%', 
                left: '5%', 
                width: '150px', 
                height: '400px' 
            }}
        ></div>

        {/* Shape 8 (Extra): Small Orange floating dot, Mid-Right */}
        <div 
            className="parallax-shape shape-small-circle"
            data-speed="-0.5"
            style={{ 
                top: '50%', 
                right: '10%', 
                width: '40px', 
                height: '40px' 
            }}
        ></div>
    </div>
  );
};

export default ParallaxBackground;