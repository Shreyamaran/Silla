import React, { useState } from 'react';
import { Compass, MessageSquare, HelpCircle, Play, CheckCircle2, BrainCircuit, Sparkles, Send, BookOpen } from 'lucide-react';
import sillaLogo from '../assets/sillaLogo.jpeg';

export default function ProductShowcaseSection({ onStartLearning }) {
  const [showcaseTab, setShowcaseTab] = useState('timeline'); // 'timeline', 'quiz', 'chat'

  return (
    <section style={{ 
      padding: '100px 24px', 
      position: 'relative',
      borderTop: '1px solid rgba(185, 144, 153, 0.12)',
      background: 'linear-gradient(180deg, transparent 0%, rgba(30, 20, 23, 0.6) 50%, transparent 100%)'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
        
        {/* Header */}
        <div style={{ maxWidth: '720px', margin: '0 auto 48px auto' }}>
          <div className="badge-editorial" style={{ marginBottom: '16px' }}>
            INTERACTIVE PREVIEW
          </div>
          <h2 style={{ 
            fontFamily: 'var(--font-serif)', 
            fontSize: 'clamp(2.4rem, 4.2vw, 3.6rem)', 
            fontWeight: 600, 
            lineHeight: '1.12', 
            color: 'var(--color-platinum)',
            marginBottom: '16px'
          }}>
            Your entire study session, in one place.
          </h2>
          <p style={{ 
            fontFamily: 'var(--font-sans)', 
            fontSize: '1.05rem', 
            color: 'rgba(232, 221, 221, 0.75)' 
          }}>
            Explore Silla's core study environments built around your learning material.
          </p>
        </div>

        {/* Tab Switcher */}
        <div style={{ display: 'inline-flex', gap: '8px', background: 'rgba(18, 12, 14, 0.8)', padding: '6px', borderRadius: '12px', border: '1px solid rgba(185, 144, 153, 0.2)', marginBottom: '36px' }}>
          <button 
            onClick={() => setShowcaseTab('timeline')}
            style={{ 
              background: showcaseTab === 'timeline' ? 'var(--color-puce)' : 'transparent',
              color: showcaseTab === 'timeline' ? '#ffffff' : 'var(--color-rosy)',
              border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.2s'
            }}
          >
            <Compass size={16} /> 1. Study Path
          </button>
          <button 
            onClick={() => setShowcaseTab('quiz')}
            style={{ 
              background: showcaseTab === 'quiz' ? 'var(--color-puce)' : 'transparent',
              color: showcaseTab === 'quiz' ? '#ffffff' : 'var(--color-rosy)',
              border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.2s'
            }}
          >
            <HelpCircle size={16} /> 2. Quiz Practice
          </button>
          <button 
            onClick={() => setShowcaseTab('chat')}
            style={{ 
              background: showcaseTab === 'chat' ? 'var(--color-puce)' : 'transparent',
              color: showcaseTab === 'chat' ? '#ffffff' : 'var(--color-rosy)',
              border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.2s'
            }}
          >
            <MessageSquare size={16} /> 3. AI Tutor
          </button>
        </div>

        {/* Showcase App Mockup Frame */}
        <div className="glass-panel" style={{ 
          maxWidth: '1080px', 
          margin: '0 auto', 
          textAlign: 'left',
          overflow: 'hidden',
          borderColor: 'rgba(185, 144, 153, 0.3)',
          boxShadow: '0 24px 60px rgba(0,0,0,0.6)'
        }}>
          
          {/* App Window Top Bar */}
          <div style={{ padding: '14px 20px', background: 'rgba(18, 12, 14, 0.9)', borderBottom: '1px solid rgba(185, 144, 153, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#762E3F' }} />
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#B99099' }} />
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#654C52' }} />
              <img src={sillaLogo} alt="Silla" style={{ width: 20, height: 20, borderRadius: '50%', objectFit: 'cover', marginLeft: '8px' }} />
              <span style={{ fontSize: '12px', color: 'var(--color-rosy)', fontFamily: 'var(--font-sans)', fontWeight: 600 }}>
                Silla Workspace — {showcaseTab === 'timeline' ? 'Personalized Study Path' : showcaseTab === 'quiz' ? 'Contextual Practice Quiz' : 'Grounded AI Companion'}
              </span>
            </div>
            <span style={{ fontSize: '11px', color: 'var(--color-rosy)', background: 'rgba(185, 144, 153, 0.15)', padding: '3px 10px', borderRadius: '12px' }}>
              Local-First Active Session
            </span>
          </div>

          {/* App Content Display */}
          <div style={{ padding: '28px', minHeight: '420px', background: 'rgba(26, 17, 20, 0.95)' }}>
            
            {/* STATE 1: STUDY PATH */}
            {showcaseTab === 'timeline' && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '24px' }} className="mock-grid">
                <div style={{ background: 'rgba(38, 26, 29, 0.5)', padding: '24px', borderRadius: '14px', border: '1px solid rgba(185, 144, 153, 0.15)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                    <div>
                      <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--color-platinum)' }}>Your Personalized Study Path</h3>
                      <p style={{ fontSize: '12px', color: 'var(--color-rosy)' }}>Sequential topic orchestration grounded in syllabus</p>
                    </div>
                  </div>

                  {/* Silla Path Node Sequence */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', position: 'relative', padding: '10px 0 10px 30px' }}>
                    <div style={{ position: 'absolute', top: 20, bottom: 20, left: 53, width: 3, background: 'linear-gradient(to bottom, #5A8F76, var(--color-puce), rgba(185,144,153,0.2))' }} />

                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', position: 'relative', zIndex: 2 }}>
                      <div style={{ width: 48, height: 48, borderRadius: '50%', background: '#5A8F76', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #ffffff' }}>
                        <CheckCircle2 size={24} color="#ffffff" />
                      </div>
                      <div style={{ background: 'rgba(90, 143, 118, 0.15)', padding: '10px 16px', borderRadius: '10px', border: '1px solid #5A8F76', flex: 1 }}>
                        <span style={{ fontSize: '10px', color: '#5A8F76', fontWeight: 700 }}>COMPLETED — DAY 1</span>
                        <h4 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-platinum)' }}>Neural Networks & Deep Learning</h4>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', position: 'relative', zIndex: 2 }}>
                      <div className="pulse-node" style={{ width: 48, height: 48, borderRadius: '50%', background: 'linear-gradient(135deg, var(--color-puce), var(--color-wenge))', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #ffffff' }}>
                        <Play size={22} color="#ffffff" style={{ marginLeft: 2 }} />
                      </div>
                      <div style={{ background: 'rgba(118, 46, 63, 0.25)', padding: '10px 16px', borderRadius: '10px', border: '1px solid var(--color-puce)', flex: 1 }}>
                        <span style={{ fontSize: '10px', color: 'var(--color-rosy)', fontWeight: 700 }}>CURRENT TOPIC — DAY 2</span>
                        <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#ffffff' }}>Loss Functions & Backpropagation</h4>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', position: 'relative', zIndex: 2, opacity: 0.6 }}>
                      <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'rgba(38, 26, 29, 0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px dashed var(--color-rosy)' }}>
                        <BrainCircuit size={22} color="var(--color-rosy)" />
                      </div>
                      <div style={{ background: 'rgba(38, 26, 29, 0.4)', padding: '10px 16px', borderRadius: '10px', border: '1px solid rgba(185,144,153,0.1)', flex: 1 }}>
                        <span style={{ fontSize: '10px', color: 'var(--color-rosy)' }}>LOCKED — DAY 3</span>
                        <h4 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-platinum)' }}>Optimization & Learning Rates</h4>
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{ background: 'rgba(38, 26, 29, 0.7)', padding: '20px', borderRadius: '14px', border: '1px solid rgba(185, 144, 153, 0.2)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <span style={{ fontSize: '10px', color: 'var(--color-rosy)', fontWeight: 800, letterSpacing: '1px', textTransform: 'uppercase' }}>ACTIVE NODE OVERVIEW</span>
                    <h4 style={{ fontSize: '16px', fontWeight: 700, marginTop: '4px', color: 'var(--color-platinum)' }}>Loss Functions & Backpropagation</h4>
                    <p style={{ fontSize: '12px', color: 'rgba(232, 221, 221, 0.7)', marginTop: '8px', lineHeight: '1.5' }}>
                      Understanding how gradient descent uses the chain rule to update internal neural weights across deep network architectures.
                    </p>
                  </div>
                  <button onClick={() => onStartLearning('timeline')} className="btn-primary" style={{ width: '100%', justifyContent: 'center', fontSize: '13px' }}>
                    <Play size={14} /> Practice Topic Node
                  </button>
                </div>
              </div>
            )}

            {/* STATE 2: QUIZ */}
            {showcaseTab === 'quiz' && (
              <div style={{ maxWidth: '640px', margin: '0 auto', background: 'rgba(38, 26, 29, 0.8)', padding: '28px', borderRadius: '16px', border: '1px solid rgba(185, 144, 153, 0.3)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px', padding: '10px 14px', background: 'rgba(118, 46, 63, 0.2)', borderRadius: '10px', border: '1px solid rgba(185,144,153,0.2)' }}>
                  <img src={sillaLogo} alt="Silla Mascot" style={{ width: 28, height: 28, borderRadius: '50%', objectFit: 'cover' }} />
                  <div style={{ flex: 1 }}>
                    <span style={{ fontSize: '11px', color: 'var(--color-rosy)', fontWeight: 700, display: 'block' }}>SILLA MASCOT PRACTICE CHALLENGE</span>
                    <span style={{ fontSize: '12px', color: 'var(--color-platinum)', fontWeight: 600 }}>Topic: Backpropagation</span>
                  </div>
                  <span style={{ fontSize: '11px', color: '#5A8F76', fontWeight: 700 }}>Score: 1 / 1</span>
                </div>

                <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--color-platinum)', lineHeight: '1.5', marginBottom: '20px' }}>
                  What derivative rule forms the mathematical foundation of backpropagation?
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ padding: '12px 16px', borderRadius: '10px', background: 'rgba(90, 143, 118, 0.2)', border: '1px solid #5A8F76', color: '#ffffff', fontSize: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>✓ The Chain Rule</span>
                    <span style={{ fontSize: '11px', color: '#5A8F76', fontWeight: 700 }}>Correct!</span>
                  </div>
                  <div style={{ padding: '12px 16px', borderRadius: '10px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(185,144,153,0.15)', color: 'rgba(232, 221, 221, 0.6)', fontSize: '14px' }}>
                    The Product Rule
                  </div>
                  <div style={{ padding: '12px 16px', borderRadius: '10px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(185,144,153,0.15)', color: 'rgba(232, 221, 221, 0.6)', fontSize: '14px' }}>
                    The Power Rule
                  </div>
                </div>

                <div style={{ marginTop: '16px', padding: '12px 16px', borderRadius: '10px', background: 'rgba(185, 144, 153, 0.1)', border: '1px solid rgba(185, 144, 153, 0.2)', fontSize: '12px', color: 'var(--color-rosy)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <img src={sillaLogo} alt="Silla" style={{ width: 18, height: 18, borderRadius: '50%', objectFit: 'cover' }} />
                  <span>Grounded in your uploaded notes: <i>Lecture_3_Backpropagation.pdf</i></span>
                </div>
              </div>
            )}

            {/* STATE 3: AI TUTOR */}
            {showcaseTab === 'chat' && (
              <div style={{ display: 'flex', flexDirection: 'column', height: '360px', background: 'rgba(18, 12, 14, 0.7)', borderRadius: '14px', border: '1px solid rgba(185, 144, 153, 0.2)', overflow: 'hidden' }}>
                <div style={{ padding: '12px 20px', borderBottom: '1px solid rgba(185, 144, 153, 0.15)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <img src={sillaLogo} alt="Silla Mascot" style={{ width: 24, height: 24, borderRadius: '50%', objectFit: 'cover', border: '1px solid var(--color-puce)' }} />
                  <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-platinum)' }}>Silla AI Study Companion</span>
                </div>

                <div style={{ flex: 1, padding: '16px', display: 'flex', flexDirection: 'column', gap: '14px', overflowY: 'auto' }}>
                  <div style={{ display: 'flex', gap: '8px', alignSelf: 'flex-start', maxWidth: '88%' }}>
                    <img src={sillaLogo} alt="Silla" style={{ width: 26, height: 26, borderRadius: '50%', objectFit: 'cover', border: '1px solid var(--color-puce)', marginTop: '2px', flexShrink: 0 }} />
                    <div style={{ background: 'rgba(38, 26, 29, 0.8)', padding: '12px 16px', borderRadius: '14px', border: '1px solid rgba(185,144,153,0.15)', fontSize: '13px', color: 'var(--color-platinum)' }}>
                      Hello! Ask me any question grounded in your uploaded lecture notes or syllabus!
                    </div>
                  </div>
                  <div style={{ alignSelf: 'flex-end', background: 'linear-gradient(135deg, var(--color-puce), var(--color-liver))', padding: '12px 16px', borderRadius: '14px', maxWidth: '80%', fontSize: '13px', color: '#ffffff' }}>
                    Can you explain backpropagation using my uploaded notes?
                  </div>
                  <div style={{ display: 'flex', gap: '8px', alignSelf: 'flex-start', maxWidth: '88%' }}>
                    <img src={sillaLogo} alt="Silla" style={{ width: 26, height: 26, borderRadius: '50%', objectFit: 'cover', border: '1px solid var(--color-puce)', marginTop: '2px', flexShrink: 0 }} />
                    <div style={{ background: 'rgba(38, 26, 29, 0.9)', padding: '12px 16px', borderRadius: '14px', border: '1px solid rgba(185,144,153,0.2)', fontSize: '13px', color: 'var(--color-platinum)', lineHeight: '1.5' }}>
                      Based on your notes in <i>Neural_Networks_Ch3.pdf</i>, backpropagation passes the prediction error backward through layer activation matrices to update weight vectors...
                      <div style={{ marginTop: '8px', fontSize: '11px', color: 'var(--color-rosy)', display: 'flex', gap: '6px' }}>
                        <BookOpen size={12} /> Source: Neural_Networks_Ch3.pdf
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{ padding: '12px', borderTop: '1px solid rgba(185, 144, 153, 0.15)', display: 'flex', gap: '10px' }}>
                  <input readOnly value="Ask Silla a question grounded in your material..." style={{ flex: 1, background: 'rgba(38,26,29,0.5)', border: '1px solid rgba(185,144,153,0.2)', padding: '10px 14px', borderRadius: '8px', color: 'rgba(232,221,221,0.6)', fontSize: '13px', outline: 'none' }} />
                  <button className="btn-primary" onClick={() => onStartLearning('chat')} style={{ padding: '8px 14px' }}>
                    <Send size={14} />
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Explore CTA */}
        <div style={{ marginTop: '40px' }}>
          <button 
            onClick={() => onStartLearning(showcaseTab)} 
            className="btn-primary"
            style={{ fontSize: '15px', padding: '14px 32px' }}
          >
            Explore Silla →
          </button>
        </div>

      </div>

      <style>{`
        @media (max-width: 800px) {
          .mock-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
