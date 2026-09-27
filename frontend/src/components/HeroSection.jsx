import React from 'react';
import { ArrowRight, BrainCircuit, CheckCircle2, Play, Sparkles, FileText, HelpCircle } from 'lucide-react';

export default function HeroSection({ onStartLearning }) {
  const scrollToHowItWorks = () => {
    const el = document.getElementById('how-it-works');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section style={{ 
      minHeight: '100vh', 
      paddingTop: '130px', 
      paddingBottom: '80px', 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'center', 
      alignItems: 'center', 
      position: 'relative' 
    }}>
      {/* Background Decorative Ambient Glows */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '600px',
        height: '400px',
        background: 'radial-gradient(ellipse at center, rgba(185, 144, 153, 0.12) 0%, rgba(118, 46, 63, 0.08) 45%, transparent 70%)',
        filter: 'blur(60px)',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      <div style={{ maxWidth: '1200px', width: '100%', margin: '0 auto', padding: '0 24px', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'center' }} className="hero-grid">
          
          {/* Left Hero Content */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', textAlign: 'left' }}>
            {/* Tag / Badge */}
            <div className="badge-editorial" style={{ marginBottom: '20px' }}>
              ✦ SOVEREIGN AI STUDY ORCHESTRATOR
            </div>

            {/* Main Headline */}
            <h1 style={{ 
              fontFamily: 'var(--font-serif)', 
              fontSize: 'clamp(2.8rem, 5vw, 4.4rem)', 
              fontWeight: 600, 
              lineHeight: '1.08', 
              letterSpacing: '-0.5px', 
              color: 'var(--color-platinum)',
              marginBottom: '24px' 
            }}>
              Turn scattered study material into a{' '}
              <span style={{ 
                color: 'var(--color-rosy)', 
                fontStyle: 'italic', 
                borderBottom: '2px solid rgba(185, 144, 153, 0.4)',
                paddingBottom: '2px'
              }}>
                path forward
              </span>.
            </h1>

            {/* Supporting Copy */}
            <p style={{ 
              fontFamily: 'var(--font-sans)', 
              fontSize: '1.05rem', 
              color: 'rgba(232, 221, 221, 0.8)', 
              lineHeight: '1.65', 
              marginBottom: '36px',
              maxWidth: '540px'
            }}>
              Silla is your personal AI study orchestrator — transforming your notes, syllabus, and learning material into a structured path to learn, practice, and understand.
            </p>

            {/* CTAs */}
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center', marginBottom: '24px' }}>
              <button 
                onClick={() => onStartLearning()} 
                className="btn-primary" 
                style={{ fontSize: '15px', padding: '14px 28px' }}
              >
                Start Learning <ArrowRight size={18} />
              </button>
              
              <button 
                onClick={scrollToHowItWorks} 
                className="btn-secondary" 
                style={{ fontSize: '15px', padding: '14px 24px' }}
              >
                See How It Works
              </button>
            </div>

            {/* Subtle Subtitle */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', opacity: 0.7 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--color-rosy)' }} />
              <span style={{ fontSize: '12px', fontFamily: 'var(--font-sans)', color: 'var(--color-rosy)', letterSpacing: '0.2px' }}>
                Built around your material. Designed for your learning.
              </span>
            </div>
          </div>

          {/* Right Visual: Abstract Silla Study Path */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div 
              className="glass-panel hover-lift"
              style={{ 
                width: '100%', 
                maxWidth: '480px', 
                padding: '36px 28px', 
                position: 'relative',
                background: 'linear-gradient(165deg, rgba(38, 26, 29, 0.85) 0%, rgba(20, 13, 15, 0.95) 100%)',
                borderColor: 'rgba(185, 144, 153, 0.25)',
                boxShadow: '0 20px 40px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.08)'
              }}
            >
              {/* Card Header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px', borderBottom: '1px solid rgba(185,144,153,0.15)', paddingBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <BrainCircuit size={20} color="var(--color-rosy)" />
                  <span style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', fontWeight: 700, letterSpacing: '1px', color: 'var(--color-platinum)', textTransform: 'uppercase' }}>
                    Silla Path Matrix
                  </span>
                </div>
                <span className="badge-editorial" style={{ fontSize: '10px', padding: '2px 8px' }}>
                  ACTIVE PATH
                </span>
              </div>

              {/* Path Node Progression */}
              <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '28px', padding: '10px 0' }}>
                
                {/* Vertical Connector Line */}
                <div style={{ 
                  position: 'absolute', 
                  top: '20px', 
                  bottom: '20px', 
                  left: '23px', 
                  width: '2px', 
                  background: 'linear-gradient(to bottom, var(--color-rosy), var(--color-puce), rgba(101,76,82,0.3))',
                  zIndex: 1
                }} />

                {/* Node 1: Material */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px', zIndex: 2 }}>
                  <div style={{ 
                    width: 48, 
                    height: 48, 
                    borderRadius: '50%', 
                    background: 'var(--color-wenge)', 
                    border: '2px solid var(--color-rosy)', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    boxShadow: '0 0 12px rgba(185,144,153,0.3)'
                  }}>
                    <FileText size={20} color="var(--color-platinum)" />
                  </div>
                  <div style={{ flex: 1, background: 'rgba(101,76,82,0.2)', padding: '10px 14px', borderRadius: '10px', border: '1px solid rgba(185,144,153,0.15)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-platinum)' }}>01. Material</span>
                      <span style={{ fontSize: '10px', color: 'var(--color-rosy)', fontWeight: 600 }}>PARSED</span>
                    </div>
                    <p style={{ fontSize: '11px', color: 'rgba(232, 221, 221, 0.65)', marginTop: '2px' }}>
                      Syllabus & Lecture Notes uploaded
                    </p>
                  </div>
                </div>

                {/* Node 2: Understand */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px', zIndex: 2 }}>
                  <div style={{ 
                    width: 48, 
                    height: 48, 
                    borderRadius: '50%', 
                    background: 'var(--color-liver)', 
                    border: '2px solid var(--color-rosy)', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    boxShadow: '0 0 12px rgba(112,74,76,0.4)'
                  }}>
                    <Sparkles size={20} color="var(--color-platinum)" />
                  </div>
                  <div style={{ flex: 1, background: 'rgba(112,74,76,0.25)', padding: '10px 14px', borderRadius: '10px', border: '1px solid rgba(185,144,153,0.2)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-platinum)' }}>02. Understand</span>
                      <span style={{ fontSize: '10px', color: 'var(--color-rosy)', fontWeight: 600 }}>VECTOR INDEXED</span>
                    </div>
                    <p style={{ fontSize: '11px', color: 'rgba(232, 221, 221, 0.65)', marginTop: '2px' }}>
                      Local knowledge graph built
                    </p>
                  </div>
                </div>

                {/* Node 3: Learn (Current Active) */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px', zIndex: 2 }}>
                  <div className="pulse-node" style={{ 
                    width: 48, 
                    height: 48, 
                    borderRadius: '50%', 
                    background: 'linear-gradient(135deg, var(--color-puce), var(--color-wenge))', 
                    border: '2px solid #ffffff', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    boxShadow: '0 0 20px rgba(118,46,63,0.6)'
                  }}>
                    <Play size={20} color="#ffffff" style={{ marginLeft: 2 }} />
                  </div>
                  <div style={{ flex: 1, background: 'rgba(118,46,63,0.3)', padding: '10px 14px', borderRadius: '10px', border: '1px solid var(--color-puce)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '12px', fontWeight: 700, color: '#ffffff' }}>03. Learn</span>
                      <span style={{ fontSize: '10px', color: '#ffffff', background: 'var(--color-puce)', padding: '1px 6px', borderRadius: '4px', fontWeight: 700 }}>CURRENT TOPIC</span>
                    </div>
                    <p style={{ fontSize: '11px', color: 'var(--color-platinum)', marginTop: '2px' }}>
                      Neural Networks & Backpropagation
                    </p>
                  </div>
                </div>

                {/* Node 4: Practice */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px', zIndex: 2 }}>
                  <div style={{ 
                    width: 48, 
                    height: 48, 
                    borderRadius: '50%', 
                    background: 'rgba(38,26,29,0.9)', 
                    border: '1px dashed var(--color-rosy)', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center' 
                  }}>
                    <HelpCircle size={20} color="var(--color-rosy)" />
                  </div>
                  <div style={{ flex: 1, background: 'rgba(38,26,29,0.5)', padding: '10px 14px', borderRadius: '10px', border: '1px solid rgba(185,144,153,0.1)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '12px', fontWeight: 600, color: 'rgba(232, 221, 221, 0.7)' }}>04. Practice</span>
                      <span style={{ fontSize: '10px', color: 'var(--color-rosy)', opacity: 0.7 }}>NEXT</span>
                    </div>
                    <p style={{ fontSize: '11px', color: 'rgba(232, 221, 221, 0.5)', marginTop: '2px' }}>
                      Contextual AI generated quiz
                    </p>
                  </div>
                </div>

                {/* Node 5: Master */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px', zIndex: 2 }}>
                  <div style={{ 
                    width: 48, 
                    height: 48, 
                    borderRadius: '50%', 
                    background: 'rgba(38,26,29,0.9)', 
                    border: '1px dashed rgba(185,144,153,0.3)', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center' 
                  }}>
                    <CheckCircle2 size={20} color="rgba(185,144,153,0.4)" />
                  </div>
                  <div style={{ flex: 1, background: 'rgba(38,26,29,0.5)', padding: '10px 14px', borderRadius: '10px', border: '1px solid rgba(185,144,153,0.1)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '12px', fontWeight: 600, color: 'rgba(232, 221, 221, 0.5)' }}>05. Master</span>
                      <span style={{ fontSize: '10px', color: 'rgba(232, 221, 221, 0.4)' }}>GOAL</span>
                    </div>
                    <p style={{ fontSize: '11px', color: 'rgba(232, 221, 221, 0.4)', marginTop: '2px' }}>
                      Complete topic retention
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
      `}</style>
    </section>
  );
}
