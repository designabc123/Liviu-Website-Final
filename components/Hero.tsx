import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const VIDEOS = ['/bg1.mp4', '/bg2.mp4', '/bg3.mp4'];

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const [videoSrc, setVideoSrc] = useState('/bg1.mp4');

  useEffect(() => {
    // Select a random video on mount
    const randomVideo = VIDEOS[Math.floor(Math.random() * VIDEOS.length)];
    setVideoSrc(randomVideo);

    const ctx = gsap.context(() => {
      // Scale Up and Fade Out on Scroll
      if (textRef.current) {
        gsap.to(textRef.current, {
          scale: 1.3,
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true
          }
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    // Changed bg-white to bg-white/90 for parallax transparency. Added z-10 relative.
    <section ref={containerRef} className="relative z-10 h-screen w-full overflow-hidden flex items-center justify-center bg-white/90">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          key={videoSrc}
          src={videoSrc}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-20 filter grayscale"
        >
          Your browser does not support the video tag.
        </video>
        {/* Overlay to ensure text contrast */}
        <div className="absolute inset-0 bg-white/50"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center w-full px-4">
        <h2 className="text-accent-orange font-bold tracking-widest uppercase mb-4 text-xs md:text-sm animate-fade-in-up">
          Senior Graphic & Motion Designer
        </h2>
        
        {/* Responsive Heading - fits 2 lines always */}
        <div ref={textRef} className="origin-center will-change-transform">
          <h1 className="font-display font-bold leading-[0.9] tracking-tight mb-8 flex flex-col items-center">
            <span className="text-dark-gray text-[8vw] md:text-7xl lg:text-8xl xl:text-9xl whitespace-nowrap">
              VISUALIZING THE
            </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-orange to-orange-400 text-[8vw] md:text-7xl lg:text-8xl xl:text-9xl whitespace-nowrap">
              SCIENCE OF LIFE
            </span>
          </h1>
        </div>

        <p className="text-dark-gray/70 text-base md:text-xl max-w-2xl mx-auto font-light px-4">
          Bridging the gap between complex medical data and compelling visual storytelling.
        </p>
        
        <div className="mt-12 animate-bounce">
          <i className="fa-solid fa-arrow-down text-accent-orange text-2xl"></i>
        </div>
      </div>
    </section>
  );
};

export default Hero;