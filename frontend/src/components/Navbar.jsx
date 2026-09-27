import React, { useState, useEffect } from 'react';
import { Sparkles, Menu, X, ArrowRight } from 'lucide-react';
import sillaLogo from '../assets/sillaLogo.jpeg';

export default function Navbar({ onStartLearning }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: isScrolled ? '14px 28px' : '20px 36px',
        backgroundColor: isScrolled ? 'rgba(18, 12, 14, 0.92)' : 'rgba(18, 12, 14, 0.4)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: isScrolled ? '1px solid rgba(185, 144, 153, 0.18)' : '1px solid transparent',
        transition: 'all 0.3s cubic-bezier(0.2, 0, 0, 1)'
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Left Logo */}
        <div 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}
        >
          <div style={{ 
            width: 38, 
            height: 38, 
            borderRadius: '10px', 
            overflow: 'hidden',
            border: '1.5px solid rgba(185, 144, 153, 0.3)',
            boxShadow: '0 4px 12px rgba(118, 46, 63, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#261a1d',
            flexShrink: 0
          }}>
            <img src={sillaLogo} alt="Silla Mascot Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div>
            <span style={{ fontFamily: 'var(--font-serif)', fontSize: '24px', fontWeight: 700, letterSpacing: '-0.5px', color: 'var(--color-platinum)' }}>
              Silla
            </span>
            <span style={{ display: 'block', fontSize: '10px', fontFamily: 'var(--font-sans)', color: 'var(--color-rosy)', letterSpacing: '1px', fontWeight: 600, textTransform: 'uppercase', marginTop: '-2px' }}>
              Study Orchestrator
            </span>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <nav className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          <button 
            onClick={() => scrollToSection('how-it-works')} 
            style={{ background: 'none', border: 'none', color: 'var(--color-platinum)', fontSize: '14px', fontWeight: 500, cursor: 'pointer', opacity: 0.85, transition: 'opacity 0.2s' }}
            onMouseEnter={e => e.target.style.opacity = 1}
            onMouseLeave={e => e.target.style.opacity = 0.85}
          >
            How It Works
          </button>
          <button 
            onClick={() => scrollToSection('features')} 
            style={{ background: 'none', border: 'none', color: 'var(--color-platinum)', fontSize: '14px', fontWeight: 500, cursor: 'pointer', opacity: 0.85, transition: 'opacity 0.2s' }}
            onMouseEnter={e => e.target.style.opacity = 1}
            onMouseLeave={e => e.target.style.opacity = 0.85}
          >
            Features
          </button>
          <button 
            onClick={() => scrollToSection('your-data')} 
            style={{ background: 'none', border: 'none', color: 'var(--color-platinum)', fontSize: '14px', fontWeight: 500, cursor: 'pointer', opacity: 0.85, transition: 'opacity 0.2s' }}
            onMouseEnter={e => e.target.style.opacity = 1}
            onMouseLeave={e => e.target.style.opacity = 0.85}
          >
            Your Data
          </button>
        </nav>

        {/* Right CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button 
            onClick={() => onStartLearning()}
            className="btn-primary"
            style={{ 
              backgroundColor: 'var(--color-puce)', 
              fontSize: '13px', 
              padding: '10px 20px',
              borderRadius: '8px'
            }}
          >
            Get Started <ArrowRight size={15} />
          </button>

          {/* Mobile Menu Toggle */}
          <button 
            className="mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{ background: 'none', border: 'none', color: 'var(--color-platinum)', cursor: 'pointer', padding: '6px' }}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          background: 'rgba(18, 12, 14, 0.98)',
          borderBottom: '1px solid var(--border-subtle)',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          backdropFilter: 'blur(20px)'
        }}>
          <button 
            onClick={() => scrollToSection('how-it-works')} 
            style={{ background: 'none', border: 'none', color: 'var(--color-platinum)', fontSize: '16px', textAlign: 'left', padding: '8px 0', fontWeight: 500 }}
          >
            How It Works
          </button>
          <button 
            onClick={() => scrollToSection('features')} 
            style={{ background: 'none', border: 'none', color: 'var(--color-platinum)', fontSize: '16px', textAlign: 'left', padding: '8px 0', fontWeight: 500 }}
          >
            Features
          </button>
          <button 
            onClick={() => scrollToSection('your-data')} 
            style={{ background: 'none', border: 'none', color: 'var(--color-platinum)', fontSize: '16px', textAlign: 'left', padding: '8px 0', fontWeight: 500 }}
          >
            Your Data
          </button>
          <button 
            onClick={() => { setMobileMenuOpen(false); onStartLearning(); }}
            className="btn-primary"
            style={{ width: '100%', justifyContent: 'center', marginTop: '10px' }}
          >
            Get Started <ArrowRight size={16} />
          </button>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: block !important; }
        }
        @media (min-width: 769px) {
          .mobile-toggle { display: none !important; }
        }
      `}</style>
    </header>
  );
}
