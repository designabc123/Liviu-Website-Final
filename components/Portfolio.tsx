import React, { useState, useEffect, useRef } from 'react';
import { PORTFOLIO_CATEGORIES, PORTFOLIO_ITEMS } from '../constants';
import { PortfolioItem } from '../types';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

// --- COMPONENT: PROJECT MODAL ---
interface ProjectModalProps {
  project: PortfolioItem;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const currentMedia = project.gallery[activeMediaIndex];
  const hasMultiple = project.gallery.length > 1;

  // Reset index when project changes (though normally we mount/unmount)
  useEffect(() => {
    setActiveMediaIndex(0);
  }, [project]);

  // Handle Key Press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && hasMultiple) handleNext();
      if (e.key === 'ArrowLeft' && hasMultiple) handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [hasMultiple, onClose, activeMediaIndex]);

  const handleNext = () => {
    setActiveMediaIndex((prev) => (prev + 1) % project.gallery.length);
  };

  const handlePrev = () => {
    setActiveMediaIndex((prev) => (prev - 1 + project.gallery.length) % project.gallery.length);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 md:p-8"
      onClick={onClose} // Backdrop click closes
    >
      <div 
        className="relative w-full max-w-7xl h-full md:h-auto max-h-[95vh] flex flex-col md:grid md:grid-cols-[1fr_350px] gap-8 bg-dark-gray rounded-2xl overflow-hidden shadow-2xl border border-white/10"
        onClick={(e) => e.stopPropagation()} // Stop propagation
      >
        {/* CLOSE BUTTON */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-50 w-10 h-10 bg-black/50 hover:bg-accent-orange text-white rounded-full flex items-center justify-center transition-colors border border-white/10"
        >
          <i className="fa-solid fa-xmark"></i>
        </button>

        {/* LEFT: MEDIA VIEWER */}
        <div className="flex flex-col h-full bg-black relative">
          {/* Main Viewport */}
          <div className="flex-grow relative flex items-center justify-center bg-zinc-900 overflow-hidden group">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeMediaIndex}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full flex items-center justify-center"
              >
                {currentMedia.type === 'video' ? (
                  <video 
                    src={currentMedia.url} 
                    controls 
                    autoPlay 
                    className="max-w-full max-h-full object-contain"
                  />
                ) : (
                  <img 
                    src={currentMedia.url} 
                    alt={project.title} 
                    className="max-w-full max-h-full object-contain"
                  />
                )}
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows (Only if multiple) */}
            {hasMultiple && (
              <>
                <button 
                  onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-accent-orange text-white rounded-full flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
                >
                  <i className="fa-solid fa-chevron-left"></i>
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); handleNext(); }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-accent-orange text-white rounded-full flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
                >
                  <i className="fa-solid fa-chevron-right"></i>
                </button>
              </>
            )}
          </div>

          {/* Thumbnails Strip (Only if multiple) */}
          {hasMultiple && (
            <div className="h-20 bg-zinc-900 border-t border-white/10 flex items-center gap-2 px-4 overflow-x-auto">
               {project.gallery.map((item, idx) => (
                 <button
                   key={idx}
                   onClick={() => setActiveMediaIndex(idx)}
                   className={`relative w-24 h-16 flex-shrink-0 rounded overflow-hidden border-2 transition-all ${activeMediaIndex === idx ? 'border-accent-orange opacity-100' : 'border-transparent opacity-50 hover:opacity-80'}`}
                 >
                   {item.type === 'video' ? (
                     <video src={item.url} className="w-full h-full object-cover pointer-events-none" />
                   ) : (
                     <img src={item.url} alt="thumb" className="w-full h-full object-cover" />
                   )}
                   {item.type === 'video' && (
                     <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                        <i className="fa-solid fa-play text-white text-[10px]"></i>
                     </div>
                   )}
                 </button>
               ))}
            </div>
          )}
        </div>

        {/* RIGHT: INFO PANEL */}
        <div className="p-8 md:p-12 flex flex-col bg-zinc-800/50 md:bg-transparent overflow-y-auto">
          <div className="mb-6">
            <span className="inline-block px-3 py-1 bg-accent-orange/10 text-accent-orange text-xs font-bold uppercase tracking-widest rounded mb-3">
              {project.category}
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6">
              {project.title}
            </h2>
            <div className="h-1 w-20 bg-accent-orange mb-6"></div>
            <p className="text-gray-300 leading-relaxed text-lg font-light">
              {project.description}
            </p>
          </div>

          <div className="mt-auto pt-8 border-t border-white/10">
            <div className="flex gap-4">
              <div className="text-center">
                 <p className="text-2xl font-bold text-white">{project.gallery.length}</p>
                 <p className="text-xs text-gray-500 uppercase">Assets</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </motion.div>
  );
};


// --- COMPONENT: PORTFOLIO TILE ---
const PortfolioTile = ({ item, onClick }: { item: PortfolioItem, onClick: () => void }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (item.videoPreview && videoRef.current) {
      if (isHovered) {
        videoRef.current.play().catch(e => console.log("Autoplay prevented", e));
      } else {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  }, [isHovered, item.videoPreview]);

  return (
    <div 
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative overflow-hidden rounded-xl bg-gray-200 cursor-pointer shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 aspect-video ${item.span || 'md:col-span-1'}`}
    >
      {/* 1. Static Image (Always visible initially) */}
      <img 
        src={item.thumbnail} 
        alt={item.title} 
        className={`w-full h-full object-cover transition-opacity duration-500 ${isHovered && item.videoPreview ? 'opacity-0' : 'opacity-100'} filter grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105`}
      />

      {/* 2. Video Preview (Plays on hover) */}
      {item.videoPreview && (
        <video
          ref={videoRef}
          src={item.videoPreview}
          muted
          loop
          playsInline
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
        />
      )}

      {/* 3. Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-dark-gray via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>

      {/* 4. Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
        <span className="text-accent-orange text-xs font-bold uppercase tracking-wider mb-2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 delay-75">
          {item.category}
        </span>
        <h3 className="text-white text-xl md:text-2xl font-bold translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100 leading-none">
          {item.title}
        </h3>
        
        {/* Play Icon Indicator if Video or Gallery */}
        <div className="absolute top-4 right-4 w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-150">
           {item.gallery.some(g => g.type === 'video') ? (
             <i className="fa-solid fa-play text-white text-sm"></i>
           ) : (
             <i className="fa-solid fa-expand text-white text-sm"></i>
           )}
        </div>
      </div>
    </div>
  );
};


// --- MAIN COMPONENT ---
const Portfolio: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(null);
  
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

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedProject]);

  return (
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
                className={`px-4 py-2 text-sm font-bold uppercase tracking-wider border-2 transition-all duration-300 rounded-full
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

        {/* Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 grid-flow-dense">
          <AnimatePresence>
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className={item.span || 'md:col-span-1'}
              >
                <PortfolioTile 
                  item={item} 
                  onClick={() => setSelectedProject(item)} 
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
      
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-1/3 h-full bg-grid-pattern opacity-50 z-0 transform rotate-180 pointer-events-none"></div>

      {/* PROJECT MODAL */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Portfolio;