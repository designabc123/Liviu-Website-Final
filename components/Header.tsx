import React from 'react';

const Header: React.FC = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { label: 'About Me', id: 'about' },
    { label: 'Experience', id: 'experience' },
    { label: 'Portfolio', id: 'portfolio' },
    { label: 'Skills', id: 'competencies' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <nav className="absolute top-0 left-0 w-full z-50 px-6 py-6 flex flex-wrap justify-between items-center bg-transparent">
      {/* Logo */}
      <div 
        className="text-3xl md:text-4xl font-bold font-display tracking-tighter text-dark-gray z-50 select-none cursor-pointer"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        LL<span className="text-accent-orange">.</span>
      </div>
      
      {/* Navigation Menu */}
      <ul className="flex gap-4 md:gap-8 flex-wrap justify-end items-center">
        {navItems.map((item) => (
          <li key={item.id}>
            <button
              onClick={() => scrollToSection(item.id)}
              className="text-sm md:text-base font-bold text-dark-gray hover:text-accent-orange transition-colors duration-300 uppercase tracking-widest bg-transparent border-none cursor-pointer outline-none"
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Header;