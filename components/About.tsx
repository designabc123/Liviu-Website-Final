import React, { useEffect, useRef } from 'react';
import { CV_DATA } from '../constants';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useScroll, useMotionValueEvent } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

// CONSTANTS
const POSTER_URL = "https://res.cloudinary.com/dao9flvhw/video/upload/v1769375974/Liviu_Profile_Animation_720_V2_xofa6w.jpg";
const DESKTOP_VIDEO_URL = "https://res.cloudinary.com/dao9flvhw/video/upload/v1769375974/Liviu_Profile_Animation_720_V2_xofa6w.mp4";
// Ping-Pong video has the reverse motion baked in for a seamless loop on mobile
const MOBILE_VIDEO_URL = "https://res.cloudinary.com/dao9flvhw/video/upload/v1769457701/Liviu_Profile_Animation_Ping_Pong_720_qetc31.mp4";

const About: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  
  // Desktop Specific Refs (Canvas Scrub)
  const desktopVideoRef = useRef<HTMLVideoElement>(null);
  const desktopCanvasRef = useRef<HTMLCanvasElement>(null);

  // Framer Motion: Track scroll progress
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // --- DESKTOP LOGIC START ---
  // Optimized to only run when screen width indicates Desktop usage

  // 1. Desktop Initialization & Autoplay Prevention
  useEffect(() => {
    // Optimization: Check for desktop width
    if (window.innerWidth < 768) return;

    const video = desktopVideoRef.current;
    if (!video) return;

    // "Runaway Fix": If desktop video tries to play to end, snap it back
    const handleEnded = () => {
        video.pause();
        video.currentTime = 0.1; 
    };
    video.addEventListener('ended', handleEnded);

    // Initial State
    video.pause();
    video.currentTime = 0;

    return () => {
        video.removeEventListener('ended', handleEnded);
    };
  }, []);

  // 2. Desktop Resize Handler (Canvas Resolution)
  useEffect(() => {
    const handleResize = () => {
      // Gate for Desktop to save resources
      if (window.innerWidth < 768) return;

      if (desktopCanvasRef.current && desktopVideoRef.current) {
        desktopCanvasRef.current.width = desktopCanvasRef.current.offsetWidth;
        desktopCanvasRef.current.height = desktopCanvasRef.current.offsetHeight;
        
        // Redraw frame if video is ready
        if (desktopVideoRef.current.readyState >= 2) {
             const ctx = desktopCanvasRef.current.getContext('2d');
             if (ctx) ctx.drawImage(desktopVideoRef.current, 0, 0, desktopCanvasRef.current.width, desktopCanvasRef.current.height);
        }
      }
    };

    window.addEventListener('resize', handleResize);
    // Initial sync
    handleResize();

    return () => {
        window.removeEventListener('resize', handleResize);
    };
  }, []);

  // 3. Desktop Scrub Logic (Driven by Scroll)
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // CRITICAL OPTIMIZATION: Do not run heavy canvas logic on mobile
    if (window.innerWidth < 768) return;

    const video = desktopVideoRef.current;
    const canvas = desktopCanvasRef.current;

    if (video && canvas && !isNaN(video.duration)) {
        const duration = video.duration;
        let targetTime = latest * duration;
        
        if (!Number.isFinite(targetTime)) targetTime = 0;
        // Keep slightly away from absolute end to prevent 'ended' event locking
        targetTime = Math.min(targetTime, duration - 0.1);
        
        video.currentTime = targetTime;
        
        const ctx = canvas.getContext('2d');
        if (ctx) {
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        }
    }
  });

  // 4. Desktop Seeked Listener (Backup Redraw)
  useEffect(() => {
      const video = desktopVideoRef.current;
      const canvas = desktopCanvasRef.current;
      
      const draw = () => {
          if (window.innerWidth < 768) return;
          if (video && canvas) {
              const ctx = canvas.getContext('2d');
              if (ctx) ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          }
      }

      if (video) {
        video.addEventListener('seeked', draw);
      }
      return () => {
        if (video) video.removeEventListener('seeked', draw);
      };
  }, []);
  // --- DESKTOP LOGIC END ---


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
      
      {/* MOBILE BLEED EFFECT: White Floor */}
      <div className="absolute bottom-0 left-0 w-full h-[100px] bg-white block md:hidden z-0"></div>

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

          {/* Video Column - Dual Mode */}
          <div className="lg:w-1/2 relative w-full">
             <div 
                className="relative z-30 lg:-mb-20 aspect-square w-full max-w-[550px] ml-auto bg-cover bg-center rounded-[20px] shadow-2xl"
                style={{ backgroundImage: `url(${POSTER_URL})` }}
             >
                
                {/* 1. MOBILE VIDEO: Simple Loop (Ping Pong) */}
                <video 
                   src={MOBILE_VIDEO_URL}
                   className="block md:hidden w-full h-full object-cover rounded-[20px] relative z-10"
                   autoPlay
                   loop
                   muted
                   playsInline
                   poster={POSTER_URL}
                   {...{ "webkit-playsinline": "true" } as any}
                />

                {/* 2. DESKTOP VIDEO: High-End Canvas Scrub */}
                <div className="hidden md:block w-full h-full relative z-10">
                    <canvas 
                        ref={desktopCanvasRef}
                        className="w-full h-full object-cover rounded-[20px]"
                    />
                    {/* Source for Canvas */}
                    <video 
                      ref={desktopVideoRef}
                      className="hidden"
                      src={DESKTOP_VIDEO_URL} 
                      muted
                      playsInline
                      preload="auto"
                      poster={POSTER_URL}
                    />
                </div>
                
                {/* Badge Overlay (Sits on top of both) */}
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