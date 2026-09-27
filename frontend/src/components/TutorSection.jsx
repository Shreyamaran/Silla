import React from 'react';
import { Sparkles, BookOpen, CheckCircle, ArrowRight } from 'lucide-react';
import sillaLogo from '../assets/sillaLogo.jpeg';

export default function TutorSection({ onStartLearning }) {
  return (
    <section style={{ 
      padding: '100px 24px', 
      position: 'relative',
      borderTop: '1px solid rgba(185, 144, 153, 0.12)'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'center' }} className="tutor-grid">
          
          {/* Left Side: Mock Conversation UI */}
          <div className="glass-panel" style={{ 
            padding: '28px', 
            background: 'rgba(26, 17, 20, 0.9)', 
            borderColor: 'rgba(185, 144, 153, 0.25)',
            boxShadow: '0 16px 40px rgba(0,0,0,0.5)'
          }}>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(185, 144, 153, 0.15)', paddingBottom: '14px', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <img src={sillaLogo} alt="Silla Mascot" style={{ width: 28, height: 28, borderRadius: '50%', objectFit: 'cover', border: '1.5px solid var(--color-puce)' }} />
                <span style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', fontWeight: 700, color: 'var(--color-platinum)' }}>
                  Silla Grounded AI Tutor
                </span>
              </div>
              <span className="badge-editorial" style={{ fontSize: '10px', padding: '2px 8px' }}>
                GROUNDED IN YOUR FILES
              </span>
            </div>

            {/* Conversation Stream */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              
              {/* Turn 1: User */}
              <div style={{ alignSelf: 'flex-end', background: 'linear-gradient(135deg, var(--color-puce), var(--color-liver))', padding: '12px 18px', borderRadius: '16px 16px 4px 16px', color: '#ffffff', fontSize: '14px', maxWidth: '85%' }}>
                Can you explain backpropagation using the notes I uploaded?
              </div>

              {/* Turn 1: Assistant with Citation */}
              <div style={{ display: 'flex', gap: '10px', alignSelf: 'flex-start', maxWidth: '92%' }}>
                <img src={sillaLogo} alt="Silla AI" style={{ width: 32, height: 32, borderRadius: '50%', objectFit: 'cover', border: '1.5px solid var(--color-puce)', marginTop: '2px', flexShrink: 0 }} />
                <div style={{ background: 'rgba(38, 26, 29, 0.85)', border: '1px solid rgba(185, 144, 153, 0.2)', padding: '14px 18px', borderRadius: '16px 16px 16px 4px', color: 'var(--color-platinum)', fontSize: '14px', lineHeight: '1.5', flex: 1 }}>
                  Based on your notes in <span style={{ color: 'var(--color-rosy)', fontWeight: 600 }}>Lecture_3_NeuralNets.pdf</span>, backpropagation works by calculating the partial derivatives of the loss function with respect to weights using the chain rule, stepping backwards from output layers.
                  
                  <div style={{ marginTop: '10px', paddingTop: '8px', borderTop: '1px solid rgba(185, 144, 153, 0.15)', fontSize: '11px', color: 'var(--color-rosy)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <BookOpen size={13} /> Grounded source: 📄 Lecture_3_NeuralNets.pdf (Chunk 14)
                  </div>
                </div>
              </div>

              {/* Turn 2: User */}
              <div style={{ alignSelf: 'flex-end', background: 'linear-gradient(135deg, var(--color-puce), var(--color-liver))', padding: '12px 18px', borderRadius: '16px 16px 4px 16px', color: '#ffffff', fontSize: '14px', maxWidth: '85%' }}>
                Quiz me on this.
              </div>

              {/* Turn 2: Assistant Quiz Prompt */}
              <div style={{ display: 'flex', gap: '10px', alignSelf: 'flex-start', maxWidth: '92%' }}>
                <img src={sillaLogo} alt="Silla AI" style={{ width: 32, height: 32, borderRadius: '50%', objectFit: 'cover', border: '1.5px solid var(--color-puce)', marginTop: '2px', flexShrink: 0 }} />
                <div style={{ background: 'rgba(38, 26, 29, 0.85)', border: '1px solid rgba(185, 144, 153, 0.2)', padding: '14px 18px', borderRadius: '16px 16px 16px 4px', color: 'var(--color-platinum)', fontSize: '14px', lineHeight: '1.5', flex: 1 }}>
                  Let's test your understanding!
                  <div style={{ marginTop: '10px', padding: '10px 14px', background: 'rgba(18, 12, 14, 0.6)', borderRadius: '8px', border: '1px solid rgba(185, 144, 153, 0.2)' }}>
                    <span style={{ fontSize: '12px', color: 'var(--color-rosy)', fontWeight: 700, display: 'block', marginBottom: '4px' }}>QUESTION:</span>
                    What parameter is adjusted during the backward pass?
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Right Side: Copy & Explanation */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <div className="badge-editorial" style={{ marginBottom: '16px' }}>
              CONTEXTUAL CONVERSATION
            </div>

            <h2 style={{ 
              fontFamily: 'var(--font-serif)', 
              fontSize: 'clamp(2.2rem, 3.8vw, 3.2rem)', 
              fontWeight: 600, 
              lineHeight: '1.15', 
              color: 'var(--color-platinum)',
              marginBottom: '20px'
            }}>
              Don't just search for answers. Talk through what you're learning.
            </h2>

            <p style={{ 
              fontFamily: 'var(--font-sans)', 
              fontSize: '1.05rem', 
              color: 'rgba(232, 221, 221, 0.8)', 
              lineHeight: '1.65', 
              marginBottom: '28px' 
            }}>
              Generic AI chat models give general internet responses. Silla reads your specific uploaded notes, syllabus, and study files, grounding every answer in the exact material you are studying for your course.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '36px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <CheckCircle size={18} color="var(--color-rosy)" />
                <span style={{ fontSize: '14px', color: 'var(--color-platinum)', fontWeight: 500 }}>Grounded strictly in your syllabus & uploaded files</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <CheckCircle size={18} color="var(--color-rosy)" />
                <span style={{ fontSize: '14px', color: 'var(--color-platinum)', fontWeight: 500 }}>Instant contextual quiz generation from any topic</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <CheckCircle size={18} color="var(--color-rosy)" />
                <span style={{ fontSize: '14px', color: 'var(--color-platinum)', fontWeight: 500 }}>Exact source document citations for every answer</span>
              </div>
            </div>

            <button 
              onClick={() => onStartLearning('chat')} 
              className="btn-primary" 
              style={{ fontSize: '14px', padding: '12px 26px' }}
            >
              Ask Silla a Question <ArrowRight size={16} />
            </button>
          </div>

        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .tutor-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </section>
  );
}
