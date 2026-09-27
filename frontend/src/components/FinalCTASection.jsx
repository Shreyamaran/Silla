import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function FinalCTASection({ onStartLearning }) {
  return (
    <section style={{ 
      padding: '120px 24px', 
      position: 'relative',
      overflow: 'hidden',
      borderTop: '1px solid rgba(185, 144, 153, 0.12)'
    }}>
      {/* Background glow */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '500px',
        height: '350px',
        background: 'radial-gradient(ellipse at center, rgba(118, 46, 63, 0.25) 0%, transparent 70%)',
        filter: 'blur(50px)',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <div className="glass-panel" style={{ 
          padding: '64px 36px', 
          background: 'linear-gradient(135deg, rgba(38, 26, 29, 0.9) 0%, rgba(20, 13, 15, 0.95) 100%)', 
          borderColor: 'rgba(185, 144, 153, 0.3)',
          boxShadow: '0 24px 60px rgba(0,0,0,0.6)'
        }}>
          
          <div style={{ width: 48, height: 48, borderRadius: '12px', background: 'var(--color-puce)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px', boxShadow: '0 0 20px rgba(118,46,63,0.5)' }}>
            <Sparkles size={24} color="#ffffff" />
          </div>

          <h2 style={{ 
            fontFamily: 'var(--font-serif)', 
            fontSize: 'clamp(2.6rem, 4.8vw, 4rem)', 
            fontWeight: 600, 
            lineHeight: '1.1', 
            color: 'var(--color-platinum)',
            marginBottom: '16px'
          }}>
            Stop wondering what to study next.
          </h2>

          <p style={{ 
            fontFamily: 'var(--font-sans)', 
            fontSize: '1.2rem', 
            color: 'rgba(232, 221, 221, 0.85)', 
            marginBottom: '36px' 
          }}>
            Give Silla your material. Let it build the path.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
            <button 
              onClick={() => onStartLearning()}
              className="btn-primary"
              style={{ 
                fontSize: '16px', 
                padding: '16px 36px', 
                backgroundColor: 'var(--color-puce)',
                borderRadius: '10px'
              }}
            >
              Start Learning <ArrowRight size={18} />
            </button>

            <span style={{ 
              fontSize: '13px', 
              fontFamily: 'var(--font-sans)', 
              color: 'var(--color-rosy)', 
              letterSpacing: '0.5px' 
            }}>
              Your material. Your path. Your learning.
            </span>
          </div>

        </div>
      </div>
    </section>
  );
}
