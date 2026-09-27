import React from 'react';
import { Sparkles } from 'lucide-react';

export default function Footer({ onStartLearning }) {
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer style={{ 
      padding: '60px 24px 40px 24px', 
      borderTop: '1px solid rgba(185, 144, 153, 0.15)',
      background: 'rgba(18, 12, 14, 0.95)'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '40px' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '24px' }}>
          
          {/* Brand */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ 
              width: 36, 
              height: 36, 
              borderRadius: '8px', 
              background: 'var(--color-puce)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center' 
            }}>
              <Sparkles size={18} color="#ffffff" />
            </div>
            <div>
              <span style={{ fontFamily: 'var(--font-serif)', fontSize: '22px', fontWeight: 700, color: 'var(--color-platinum)' }}>
                Silla
              </span>
              <p style={{ fontSize: '11px', color: 'var(--color-rosy)', fontFamily: 'var(--font-sans)', fontWeight: 500 }}>
                Personal AI Study Orchestrator
              </p>
            </div>
          </div>

          {/* Links */}
          <div style={{ display: 'flex', gap: '28px', flexWrap: 'wrap' }}>
            <button 
              onClick={() => scrollToSection('how-it-works')} 
              style={{ background: 'none', border: 'none', color: 'var(--color-platinum)', fontSize: '14px', cursor: 'pointer', opacity: 0.8 }}
              onMouseEnter={e => e.target.style.opacity = 1}
              onMouseLeave={e => e.target.style.opacity = 0.8}
            >
              How It Works
            </button>
            <button 
              onClick={() => scrollToSection('features')} 
              style={{ background: 'none', border: 'none', color: 'var(--color-platinum)', fontSize: '14px', cursor: 'pointer', opacity: 0.8 }}
              onMouseEnter={e => e.target.style.opacity = 1}
              onMouseLeave={e => e.target.style.opacity = 0.8}
            >
              Features
            </button>
            <button 
              onClick={() => scrollToSection('your-data')} 
              style={{ background: 'none', border: 'none', color: 'var(--color-platinum)', fontSize: '14px', cursor: 'pointer', opacity: 0.8 }}
              onMouseEnter={e => e.target.style.opacity = 1}
              onMouseLeave={e => e.target.style.opacity = 0.8}
            >
              Your Data
            </button>
            <button 
              onClick={() => onStartLearning()} 
              style={{ background: 'none', border: 'none', color: 'var(--color-rosy)', fontWeight: 600, fontSize: '14px', cursor: 'pointer' }}
            >
              Get Started →
            </button>
          </div>

        </div>

        {/* Bottom Line */}
        <div style={{ borderTop: '1px solid rgba(185, 144, 153, 0.1)', paddingTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <span style={{ fontSize: '12px', color: 'rgba(232, 221, 221, 0.5)' }}>
            © {new Date().getFullYear()} Silla. Built around your material.
          </span>
          <span style={{ fontSize: '12px', color: 'rgba(185, 144, 153, 0.6)' }}>
            Local-First Architecture
          </span>
        </div>

      </div>
    </footer>
  );
}
