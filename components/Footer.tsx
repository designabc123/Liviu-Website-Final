import React from 'react';
import { CV_DATA } from '../constants';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  return (
    // Removed h-screen, kept py-24. Added overflow-hidden to crop the background text
    <footer id="contact" className="bg-dark-gray text-white py-24 relative overflow-hidden flex flex-col justify-center">
      <div className="container mx-auto px-6 relative z-10 text-center">
        
        {/* Animated Heading with Framer Motion - Reversible */}
        <motion.h2 
          initial={{ opacity: 0, letterSpacing: "0.25em", y: 20 }}
          whileInView={{ opacity: 1, letterSpacing: "0em", y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          viewport={{ once: false, margin: "-10%" }}
          className="text-4xl md:text-6xl lg:text-8xl font-display font-bold mb-16 uppercase origin-center"
        >
          Let's create <span className="text-accent-orange">impact</span>
        </motion.h2>
        
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16 mb-16">
          <a href={`mailto:${CV_DATA.email}`} className="group flex items-center text-xl hover:text-accent-orange transition-colors">
            <div className="w-12 h-12 border border-white/20 rounded-full flex items-center justify-center mr-4 group-hover:border-accent-orange transition-colors">
              <i className="fa-regular fa-envelope"></i>
            </div>
            {CV_DATA.email}
          </a>
          
          <a href={`https://${CV_DATA.linkedin}`} target="_blank" rel="noreferrer" className="group flex items-center text-xl hover:text-accent-orange transition-colors">
            <div className="w-12 h-12 border border-white/20 rounded-full flex items-center justify-center mr-4 group-hover:border-accent-orange transition-colors">
              <i className="fa-brands fa-linkedin-in"></i>
            </div>
            LinkedIn Profile
          </a>
        </div>
        
        <div className="border-t border-white/10 pt-8 text-white/40 text-sm">
          <p>© {new Date().getFullYear()} {CV_DATA.name}. All Rights Reserved.</p>
        </div>
      </div>
      
      {/* Decorative large text bg - Centered and Huge (Vertical Crop) */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[300px] md:text-[500px] lg:text-[750px] font-display font-bold text-white opacity-[0.03] leading-[0.8] whitespace-nowrap">
          LIVIU
        </span>
      </div>
    </footer>
  );
};

export default Footer;