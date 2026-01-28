import React, { useEffect, useRef, useState } from 'react';
import { CV_DATA } from '../constants';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useScroll, useMotionValueEvent, AnimatePresence, motion } from 'framer-motion';
// @ts-ignore
import emailjs from 'https://esm.sh/@emailjs/browser@3.11.0';

gsap.registerPlugin(ScrollTrigger);

// CONSTANTS
const POSTER_URL = "https://res.cloudinary.com/dao9flvhw/video/upload/v1769375974/Liviu_Profile_Animation_720_V2_xofa6w.jpg";
const DESKTOP_VIDEO_URL = "https://res.cloudinary.com/dao9flvhw/video/upload/v1769375974/Liviu_Profile_Animation_720_V2_xofa6w.mp4";
// Ping-Pong video has the reverse motion baked in for a seamless loop on mobile
const MOBILE_VIDEO_URL = "https://res.cloudinary.com/dao9flvhw/video/upload/v1769457701/Liviu_Profile_Animation_Ping_Pong_720_qetc31.mp4";

// EMAILJS CONFIG
const EMAILJS_SERVICE_ID = "service_bqc6gzk";
const EMAILJS_TEMPLATE_ID = "template_zetnijk";
const EMAILJS_PUBLIC_KEY = "WiBNxYYDT9eYBkVd6";

// --- CONTACT MODAL COMPONENT ---
const ContactModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    // MAPPING FIX: Ensure keys match the EmailJS template variables exactly
    const templateParams = {
      user_name: formData.name,
      user_email: formData.email,
      user_phone: formData.phone,
      message: formData.message
    };

    console.log("Sending Data:", templateParams);

    emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams,
      EMAILJS_PUBLIC_KEY
    )
    .then(() => {
      setStatus('success');
      setTimeout(() => {
        setStatus('idle');
        setFormData({ name: '', email: '', phone: '', message: '' });
        onClose();
      }, 2000);
    })
    .catch((err: any) => {
      console.error('Failed to send email:', err);
      setStatus('error');
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg bg-white rounded-[32px] overflow-hidden shadow-2xl border border-gray-200 p-8 md:p-10 relative"
          >
            {/* Close Button */}
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-dark-gray hover:bg-accent-orange hover:text-white transition-colors"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>

            <h3 className="text-3xl font-display font-bold text-dark-gray mb-2">Get in Touch</h3>
            <p className="text-gray-500 mb-8 text-sm">Fill out the form below and I'll get back to you shortly.</p>

            {status === 'success' ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                  <i className="fa-solid fa-check text-3xl text-green-500"></i>
                </div>
                <h4 className="text-2xl font-bold text-dark-gray mb-2">Message Sent!</h4>
                <p className="text-gray-500">Thank you for reaching out.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    required 
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-dark-gray focus:outline-none focus:border-accent-orange focus:bg-white transition-colors placeholder-gray-400"
                    placeholder="Your Name"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="email" className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Email</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-dark-gray focus:outline-none focus:border-accent-orange focus:bg-white transition-colors placeholder-gray-400"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Phone <span className="font-normal normal-case opacity-60">(Optional)</span></label>
                    <input 
                      type="tel" 
                      id="phone" 
                      name="phone" 
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-dark-gray focus:outline-none focus:border-accent-orange focus:bg-white transition-colors placeholder-gray-400"
                      placeholder="+353 86 000 0000"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Message</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    required 
                    rows={8}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-dark-gray focus:outline-none focus:border-accent-orange focus:bg-white transition-colors placeholder-gray-400 resize-none"
                    placeholder="How can I help you?"
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  disabled={status === 'sending'}
                  className="w-full bg-accent-orange text-white font-bold uppercase tracking-wider py-4 rounded-lg hover:bg-dark-gray hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-4 shadow-lg hover:shadow-xl"
                >
                  {status === 'sending' ? 'Sending...' : 'Send Message'}
                </button>
                
                {status === 'error' && (
                  <p className="text-red-500 text-sm text-center mt-2">Something went wrong. Please try again.</p>
                )}
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const About: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [isContactOpen, setIsContactOpen] = useState(false);
  
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
    // LAYER ROOT: bg-gray-100 (Darker than off-white for contrast)
    <section id="about" ref={containerRef} className="relative pt-32 pb-12 lg:pb-0 bg-gray-100 z-20">
      
      {/* LAYER 1 (Bottom): Background Texture - z-0 */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-grid-pattern opacity-50 z-0 pointer-events-none"></div>

      {/* LAYER 2 (Middle): White Bleed Box - z-10 
          This sits ON TOP of the texture (hiding it) but BELOW the content.
          Visible only on stacked layouts (lg:hidden). */}
      <div className="absolute bottom-0 left-0 w-full h-[100px] bg-white block lg:hidden z-10"></div>

      {/* LAYER 3 (Top): Content - z-20 */}
      <div className="container mx-auto px-6 relative z-20">
        <div className="flex flex-col lg:flex-row items-start"> 
          
          {/* Text Column */}
          <div className="lg:w-1/2 mb-12 lg:mb-0 lg:pr-16 z-20">
            <h3 className="text-accent-orange font-bold uppercase tracking-widest mb-4">Professional Summary</h3>
            <h2 ref={headingRef} className="text-4xl md:text-5xl font-display font-bold text-dark-gray mb-8 leading-tight origin-left">
              Strategic<br />Multidisciplinary Design
            </h2>
            <div className="text-lg text-gray-600 space-y-6 leading-relaxed font-light">
               <p>{CV_DATA.bio.split('execution.')[0]}execution.</p>
               <p>{CV_DATA.bio.split('execution.')[1]}</p>
            </div>
            
            <button 
              onClick={() => setIsContactOpen(true)}
              className="inline-block mt-10 px-8 py-4 bg-accent-orange text-white font-bold uppercase tracking-wider hover:bg-dark-gray transition-colors duration-300"
            >
              Get in Touch
            </button>
          </div>

          {/* Video Column - Dual Mode */}
          <div className="lg:w-1/2 relative w-full">
             <div 
                // VIDEO LAYER: z-30 (Above Content z-20)
                // ALIGNMENT: mr-auto (Left) on mobile/tablet, right aligned on desktop
                className="relative z-30 lg:-mb-20 aspect-square w-full max-w-[550px] mr-auto lg:mr-0 lg:ml-auto bg-cover bg-center rounded-[20px] shadow-2xl"
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
      
      {/* Contact Modal */}
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </section>
  );
};

export default About;