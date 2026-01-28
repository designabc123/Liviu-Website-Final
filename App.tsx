import React, { useEffect, useState } from 'react';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Footer from './components/Footer';
import Header from './components/Header';

function App() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  
  // Smooth scroll behavior for anchor links & Back to Top logic
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';

    const handleScroll = () => {
      // Threshold set to approx height of Hero section
      if (window.scrollY > 800) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="antialiased selection:bg-accent-orange selection:text-white relative w-full max-w-[100vw] overflow-x-hidden">
      <Header />
      <Hero />
      <About />
      <Experience />
      <Portfolio />
      <Services />
      <Footer />

      {/* Smart Sticky Back to Top Button */}
      <button 
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 z-50 w-12 h-12 md:w-14 md:h-14 rounded-full bg-accent-orange text-white shadow-2xl flex items-center justify-center transition-all duration-500 ease-in-out hover:bg-dark-gray hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-accent-orange/30 ${
          showBackToTop 
            ? 'opacity-100 translate-y-0 pointer-events-auto' 
            : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
        aria-label="Back to Top"
      >
        <i className="fa-solid fa-arrow-up text-lg md:text-xl"></i>
      </button>
    </main>
  );
}

export default App;