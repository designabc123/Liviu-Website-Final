import React, { useEffect, useRef } from 'react';
import { CV_DATA } from '../constants';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useScroll, useMotionValueEvent } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

const About: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  
  // Video Source (Hidden) & Canvas Target (Visible)
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Framer Motion: Track scroll progress across the entire section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // 1. Hard Reset Logic: Force start position on mount to prevent autoplay sticking at end
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Force reset repeatedly for 1 second to fight browser autoplay/caching
    const resetInterval = setInterval(() => {
        if(video) {
            video.pause();
            video.currentTime = 0;
        }
    }, 50);

    const timer = setTimeout(() => {
        clearInterval(resetInterval);
    }, 1000);

    return () => {
        clearInterval(resetInterval);
        clearTimeout(timer);
    };
  }, []);

  // 2. Resize Handler: Sync Canvas Resolution
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        // Set internal resolution to match display size
        // Using offsetWidth as requested, ensures 1:1 pixel mapping for sharpness
        canvasRef.current.width = canvasRef.current.offsetWidth;
        canvasRef.current.height = canvasRef.current.offsetHeight;
        
        // Redraw current frame if available
        if (videoRef.current && videoRef.current.readyState >= 2) {
             const ctx = canvasRef.current.getContext('2d');
             if (ctx) ctx.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
        }
      }
    };

    window.addEventListener('resize', handleResize);
    // Slight delay to ensure layout is settled
    const timer = setTimeout(handleResize, 100);

    return () => {
        window.removeEventListener('resize', handleResize);
        clearTimeout(timer);
    };
  }, []);

  // 3. The Render Loop (Driven by Scroll)
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (video && canvas && !isNaN(video.duration)) {
        const duration = video.duration;
        // Calculate time, clamp slightly before end to avoid ending state
        const targetTime = Math.min(latest * duration, duration - 0.1);
        
        if (isFinite(targetTime)) {
            video.currentTime = targetTime;
            
            // Draw immediately (per requirements)
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            }
        }
    }
  });

  // 4. Initial Paint on Load & Seeked Listener (Backup for sharpness)
  useEffect(() => {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      const draw = () => {
          if (video && canvas) {
              const ctx = canvas.getContext('2d');
              if (ctx) ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          }
      }

      if (video) {
        video.addEventListener('seeked', draw);
        video.addEventListener('loadeddata', draw);
      }

      return () => {
        if (video) {
            video.removeEventListener('seeked', draw);
            video.removeEventListener('loadeddata', draw);
        }
      };
  }, []);

  const onLoadedMetadata = () => {
    // This is handled by the Hard Reset effect, but good to have as immediate trigger
    if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
    }
  };

  // GSAP Animation for Heading
  useEffect(() => {
    const ctx = gsap.context(() => {
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
    <section ref={containerRef} className="relative pt-32 pb-12 lg:pb-0 bg-off-white/90 z-20">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-start"> 
          
          {/* Text Column */}
          <div className="lg:w-1/2 mb-12 lg:mb-0 lg:pr-16 z-20">
            <h3 className="text-accent-orange font-bold uppercase tracking-widest mb-4">Professional Summary</h3>
            <h2 ref={headingRef} className="text-4xl md:text-5xl font-display font-bold text-dark-gray mb-8 leading-tight origin-left">
              Strategic<br />Multidisciplinary Design
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

          {/* Video Column - Canvas Rendered */}
          <div className="lg:w-1/2 relative w-full">
             <div className="relative z-30 lg:-mb-20 aspect-square w-full max-w-[550px] ml-auto">
                
                {/* Visible Canvas */}
                <canvas 
                    ref={canvasRef}
                    className="w-full h-full object-cover shadow-2xl rounded-[20px]"
                />

                {/* Hidden Source Video */}
                <video 
                  ref={videoRef}
                  className="hidden"
                  src="https://res.cloudinary.com/dao9flvhw/video/upload/v1769375974/Liviu_Profile_Animation_720_V2_xofa6w.mp4" 
                  muted
                  playsInline
                  preload="auto"
                  onLoadedMetadata={onLoadedMetadata}
                  {...{ "webkit-playsinline": "true" } as any}
                />
                
                {/* Badge Overlay */}
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