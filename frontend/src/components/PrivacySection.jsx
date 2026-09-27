import React from 'react';
import { HardDrive, ShieldCheck, Database, ArrowRight } from 'lucide-react';

export default function PrivacySection() {
  return (
    <section id="your-data" style={{ 
      padding: '100px 24px', 
      position: 'relative',
      background: 'linear-gradient(180deg, #1B1215 0%, #281A1D 50%, #160F11 100%)',
      borderTop: '1px solid rgba(185, 144, 153, 0.2)',
      borderBottom: '1px solid rgba(185, 144, 153, 0.2)'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          
          {/* Badge */}
          <div className="badge-editorial" style={{ marginBottom: '20px', background: 'rgba(112, 74, 76, 0.3)', borderColor: 'rgba(185, 144, 153, 0.3)' }}>
            LOCAL-FIRST PHILOSOPHY
          </div>

          {/* Headline */}
          <h2 style={{ 
            fontFamily: 'var(--font-serif)', 
            fontSize: 'clamp(2.4rem, 4.4vw, 3.8rem)', 
            fontWeight: 600, 
            lineHeight: '1.12', 
            color: 'var(--color-platinum)',
            marginBottom: '24px'
          }}>
            Your learning should belong to you.
          </h2>

          {/* Copy */}
          <p style={{ 
            fontFamily: 'var(--font-sans)', 
            fontSize: '1.1rem', 
            color: 'rgba(232, 221, 221, 0.85)', 
            lineHeight: '1.7', 
            marginBottom: '56px' 
          }}>
            Silla is designed around a local-first architecture. Your study materials and personal knowledge base stay on your machine, giving you control over the information that powers your learning experience.
          </p>

          {/* Flow Diagram */}
          <div className="glass-panel" style={{ 
            padding: '40px 32px', 
            background: 'rgba(38, 26, 29, 0.8)', 
            borderColor: 'rgba(185, 144, 153, 0.3)',
            boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
          }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 40px 1fr 40px 1fr', gap: '16px', alignItems: 'center' }} className="privacy-flow-grid">
              
              {/* Box 1 */}
              <div style={{ background: 'rgba(101, 76, 82, 0.3)', padding: '24px 18px', borderRadius: '12px', border: '1px solid rgba(185, 144, 153, 0.25)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                <HardDrive size={28} color="var(--color-rosy)" />
                <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-platinum)', letterSpacing: '0.5px' }}>
                  YOUR FILES
                </span>
                <span style={{ fontSize: '11px', color: 'rgba(232, 221, 221, 0.6)' }}>
                  Kept on local storage
                </span>
              </div>

              {/* Arrow 1 */}
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <ArrowRight size={20} color="var(--color-rosy)" className="arrow-flow" />
              </div>

              {/* Box 2 */}
              <div style={{ background: 'rgba(112, 74, 76, 0.35)', padding: '24px 18px', borderRadius: '12px', border: '1px solid rgba(185, 144, 153, 0.3)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                <Database size={28} color="var(--color-rosy)" />
                <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-platinum)', letterSpacing: '0.5px' }}>
                  LOCAL KNOWLEDGE BASE
                </span>
                <span style={{ fontSize: '11px', color: 'rgba(232, 221, 221, 0.6)' }}>
                  Indexed vector database
                </span>
              </div>

              {/* Arrow 2 */}
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <ArrowRight size={20} color="var(--color-rosy)" className="arrow-flow" />
              </div>

              {/* Box 3 */}
              <div style={{ background: 'rgba(118, 46, 63, 0.35)', padding: '24px 18px', borderRadius: '12px', border: '1px solid var(--color-puce)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                <ShieldCheck size={28} color="#ffffff" />
                <span style={{ fontSize: '13px', fontWeight: 700, color: '#ffffff', letterSpacing: '0.5px' }}>
                  SILLA EXPERIENCE
                </span>
                <span style={{ fontSize: '11px', color: 'var(--color-platinum)' }}>
                  Personalized study path
                </span>
              </div>

            </div>
          </div>

        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .privacy-flow-grid {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
          .arrow-flow {
            transform: rotate(90deg);
          }
        }
      `}</style>
    </section>
  );
}
