import React from 'react';
import { Sparkles, FileText, Layers, HelpCircle, MessageSquare, Compass, ShieldCheck } from 'lucide-react';

export default function SolutionSection() {
  return (
    <section style={{ 
      padding: '100px 24px', 
      position: 'relative',
      background: 'linear-gradient(180deg, transparent 0%, rgba(38, 26, 29, 0.4) 50%, transparent 100%)'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
        
        {/* Section Header */}
        <div style={{ maxWidth: '720px', margin: '0 auto 64px auto' }}>
          <div className="badge-editorial" style={{ marginBottom: '16px' }}>
            THE SOLUTION
          </div>
          <h2 style={{ 
            fontFamily: 'var(--font-serif)', 
            fontSize: 'clamp(2.4rem, 4.2vw, 3.6rem)', 
            fontWeight: 600, 
            lineHeight: '1.12', 
            color: 'var(--color-platinum)',
            marginBottom: '20px'
          }}>
            Meet Silla.
          </h2>
          <p style={{ 
            fontFamily: 'var(--font-sans)', 
            fontSize: '1.1rem', 
            color: 'rgba(232, 221, 221, 0.8)', 
            lineHeight: '1.65' 
          }}>
            Silla brings your learning material together and turns it into an intelligent study experience built around what you're actually learning.
          </p>
        </div>

        {/* Visual Transformation Flow */}
        <div className="glass-panel" style={{ 
          padding: '48px 32px', 
          background: 'rgba(26, 17, 20, 0.85)', 
          borderColor: 'rgba(185, 144, 153, 0.25)',
          maxWidth: '1000px',
          margin: '0 auto'
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 140px 1fr', gap: '24px', alignItems: 'center' }} className="solution-flow-grid">
            
            {/* Left Box: YOUR MATERIAL */}
            <div style={{ 
              background: 'rgba(101, 76, 82, 0.2)', 
              border: '1px solid rgba(185, 144, 153, 0.25)', 
              borderRadius: '14px', 
              padding: '28px 24px',
              textAlign: 'left'
            }}>
              <span style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '1.5px', color: 'var(--color-rosy)', textTransform: 'uppercase', display: 'block', marginBottom: '16px' }}>
                INPUT // YOUR MATERIAL
              </span>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(18, 12, 14, 0.6)', padding: '10px 14px', borderRadius: '8px', border: '1px solid rgba(185, 144, 153, 0.15)' }}>
                  <FileText size={16} color="var(--color-rosy)" />
                  <span style={{ fontSize: '13px', color: 'var(--color-platinum)', fontWeight: 600 }}>PDF Documents</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(18, 12, 14, 0.6)', padding: '10px 14px', borderRadius: '8px', border: '1px solid rgba(185, 144, 153, 0.15)' }}>
                  <FileText size={16} color="var(--color-rosy)" />
                  <span style={{ fontSize: '13px', color: 'var(--color-platinum)', fontWeight: 600 }}>Lecture Notes (.txt, .md)</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(18, 12, 14, 0.6)', padding: '10px 14px', borderRadius: '8px', border: '1px solid rgba(185, 144, 153, 0.15)' }}>
                  <Layers size={16} color="var(--color-rosy)" />
                  <span style={{ fontSize: '13px', color: 'var(--color-platinum)', fontWeight: 600 }}>Course Syllabus</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(18, 12, 14, 0.6)', padding: '10px 14px', borderRadius: '8px', border: '1px solid rgba(185, 144, 153, 0.15)' }}>
                  <FileText size={16} color="var(--color-rosy)" />
                  <span style={{ fontSize: '13px', color: 'var(--color-platinum)', fontWeight: 600 }}>Study Material</span>
                </div>
              </div>
            </div>

            {/* Center Core: SILLA */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
              <div className="pulse-node" style={{ 
                width: 72, 
                height: 72, 
                borderRadius: '50%', 
                background: 'linear-gradient(135deg, var(--color-puce), var(--color-liver))', 
                border: '2px solid var(--color-platinum)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                boxShadow: '0 0 30px rgba(118, 46, 63, 0.6)'
              }}>
                <Sparkles size={32} color="#ffffff" />
              </div>
              <span style={{ fontFamily: 'var(--font-serif)', fontSize: '22px', fontWeight: 700, color: 'var(--color-platinum)' }}>
                Silla
              </span>
              <span style={{ fontSize: '10px', letterSpacing: '1px', color: 'var(--color-rosy)', fontWeight: 700, textTransform: 'uppercase' }}>
                ORCHESTRATOR
              </span>
            </div>

            {/* Right Box: YOUR STUDY EXPERIENCE */}
            <div style={{ 
              background: 'rgba(118, 46, 63, 0.18)', 
              border: '1px solid rgba(118, 46, 63, 0.4)', 
              borderRadius: '14px', 
              padding: '28px 24px',
              textAlign: 'left'
            }}>
              <span style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '1.5px', color: 'var(--color-rosy)', textTransform: 'uppercase', display: 'block', marginBottom: '16px' }}>
                OUTPUT // STUDY EXPERIENCE
              </span>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(18, 12, 14, 0.7)', padding: '10px 14px', borderRadius: '8px', border: '1px solid rgba(185, 144, 153, 0.2)' }}>
                  <Compass size={16} color="var(--color-rosy)" />
                  <span style={{ fontSize: '13px', color: 'var(--color-platinum)', fontWeight: 600 }}>Personalized Path</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(18, 12, 14, 0.7)', padding: '10px 14px', borderRadius: '8px', border: '1px solid rgba(185, 144, 153, 0.2)' }}>
                  <HelpCircle size={16} color="var(--color-rosy)" />
                  <span style={{ fontSize: '13px', color: 'var(--color-platinum)', fontWeight: 600 }}>Contextual Quizzes</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(18, 12, 14, 0.7)', padding: '10px 14px', borderRadius: '8px', border: '1px solid rgba(185, 144, 153, 0.2)' }}>
                  <MessageSquare size={16} color="var(--color-rosy)" />
                  <span style={{ fontSize: '13px', color: 'var(--color-platinum)', fontWeight: 600 }}>Grounded AI Tutor</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(18, 12, 14, 0.7)', padding: '10px 14px', borderRadius: '8px', border: '1px solid rgba(185, 144, 153, 0.2)' }}>
                  <ShieldCheck size={16} color="var(--color-rosy)" />
                  <span style={{ fontSize: '13px', color: 'var(--color-platinum)', fontWeight: 600 }}>Source Document References</span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>

      <style>{`
        @media (max-width: 850px) {
          .solution-flow-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
        }
      `}</style>
    </section>
  );
}
