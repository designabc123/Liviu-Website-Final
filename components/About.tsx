import React, { useEffect, useRef } from 'react';
import { CV_DATA } from '../constants';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useScroll, useMotionValueEvent } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

// Derived from the video URL (Cloudinary auto-generates jpg posters)
const POSTER_URL = "https://res.cloudinary.com/dao9flvhw/video/upload/v1769375974/Liviu_Profile_Animation_720_V2_xofa6w.jpg";

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

  // 1. RUNAWAY FIX & START CLAMP
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let isInitialized = false;
    let animationFrameId: number;

    // A. The "Runaway" Fix: Handle 'ended' event
    // If the video somehow plays to the end (mobile autoplay), snap it back
    const handleEnded = () => {
        video.pause();
        video.currentTime = 0.1; // Reset to start (safe zone)
    };
    video.addEventListener('ended', handleEnded);

    // B. The "Start Clamp" (Initialization Loop)
    // Run a loop for the first few seconds to aggressively catch any autoplay "runaway" behavior
    const startTime = Date.now();
    
    const checkInitialization = () => {
        // Stop checking after 2 seconds to release resources
        if (Date.now() - startTime > 2000) {
            cancelAnimationFrame(animationFrameId);
            return;
        }

        // Logic: If we haven't manually scrubbed yet (approximated) and video has advanced > 0.5s
        // This catches the "runaway" autoplay on iOS/Android
        if (!isInitialized && video.currentTime > 0.5) {
             video.pause();
             video.currentTime = 0;
             isInitialized = true; // Mark as handled
        }
        
        animationFrameId = requestAnimationFrame(checkInitialization);
    };

    // Kick off the monitoring loop
    animationFrameId = requestAnimationFrame(checkInitialization);

    // Initial Hard Reset
    video.pause();
    video.currentTime = 0;

    return () => {
        video.removeEventListener('ended', handleEnded);
        cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // 2. Resize Handler: Sync Canvas Resolution
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
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
    const timer = setTimeout(handleResize, 100);

    return () => {
        window.removeEventListener('resize', handleResize);
        clearTimeout(timer);
    };
  }, []);

  // 3. The Scrub Logic (Mobile Robustness)
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (video && canvas && !isNaN(video.duration)) {
        const duration = video.duration;
        
        // Calculate target time based on scroll progress
        let targetTime = latest * duration;
        
        // Safety Clamp 1: Ensure finite number
        if (!Number.isFinite(targetTime)) targetTime = 0;
        
        // Safety Clamp 2: Never hit absolute end (prevent 'ended' lock-up)
        // Keeping it 0.1s away from the end ensures smooth backward scrubbing
        targetTime = Math.min(targetTime, duration - 0.1);
        
        video.currentTime = targetTime;
        
        // Draw immediate frame
        const ctx = canvas.getContext('2d');
        if (ctx) {
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        }
    }
  });

  // 4. Backup Seeked Listener (Redraw on seek)
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
      }

      return () => {
        if (video) {
            video.removeEventListener('seeked', draw);
        }
      };
  }, []);

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
             {/* 
                Mobile Fixes:
                1. min-h-[400px]: Prevents collapse on mobile
                2. bg-cover: Shows fallback poster if canvas fails/loads slow
             */}
             <div 
                className="relative z-30 lg:-mb-20 aspect-square w-full max-w-[550px] min-h-[400px] lg:min-h-0 ml-auto bg-cover bg-center rounded-[20px]"
                style={{ backgroundImage: `url(${POSTER_URL})` }}
             >
                
                {/* Visible Canvas */}
                <canvas 
                    ref={canvasRef}
                    className="w-full h-full object-cover shadow-2xl rounded-[20px] relative z-10"
                />

                {/* Hidden Source Video */}
                {/* 
                   Attributes Critical for Mobile:
                   - playsInline={true}: Required for iOS to prevent fullscreen
                   - muted: Often required for manipulation without interaction
                   - poster: Fallback logic
                   - NO autoplay: Strictly manual control
                */}
                <video 
                  ref={videoRef}
                  className="hidden"
                  src="https://res.cloudinary.com/dao9flvhw/video/upload/v1769375974/Liviu_Profile_Animation_720_V2_xofa6w.mp4" 
                  muted
                  playsInline={true}
                  loop={false}
                  preload="auto"
                  poster={POSTER_URL}
                  {...{ "webkit-playsinline": "true" } as any}
                />
                
                {/* Badge Overlay */}
                <div className="absolute top-14 -left-12 bg-white px-5 py-5 shadow-2xl z-30 border-t-4 border-accent-orange hidden lg:block w-fit">
                  <div className="flex items-baseline justify-center leading-none gap-[1px]">
                    <span className="text-4xl font-display font-bold text-dark-gray tracking-tighter">20+</span>
                    <span className="text-4xl font-sans font-light text-dark-gray">YR</span>
                  </div>
                  <p className="text-[10px] text-dark-gray font-medium uppercase tracking-[0.38em] text-center leading-none mt-1 ml-1">
                    Experience
                  </p>
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