import React, { useEffect } from 'react';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Footer from './components/Footer';

function App() {
  
  // Smooth scroll behavior for anchor links
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
  }, []);

  return (
    <main className="antialiased selection:bg-accent-orange selection:text-white relative w-full max-w-[100vw] overflow-x-hidden">
      {/* Navigation (Simple Absolute) */}
      <nav className="absolute top-0 left-0 w-full z-50 px-6 py-6 flex justify-between items-center">
        <div className="text-2xl font-bold font-display tracking-tighter text-dark-gray mix-blend-difference">
          LL<span className="text-accent-orange">.</span>
        </div>
        <a href="#contact" className="text-sm font-bold uppercase tracking-widest text-dark-gray hover:text-accent-orange transition-colors mix-blend-difference">
          Contact
        </a>
      </nav>

      <Hero />
      <About />
      <Experience />
      <Portfolio />
      <Services />
      <Footer />
    </main>
  );
}

export default App;