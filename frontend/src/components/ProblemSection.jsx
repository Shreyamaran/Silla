import React from 'react';
import { Files, Compass, Bot } from 'lucide-react';

export default function ProblemSection() {
  const problems = [
    {
      num: '01',
      title: 'SCATTERED MATERIAL',
      icon: <Files size={24} color="var(--color-rosy)" />,
      description: 'Notes in one place. Syllabus somewhere else. PDFs buried in folders. Resources everywhere.'
    },
    {
      num: '02',
      title: 'NO CLEAR PATH',
      icon: <Compass size={24} color="var(--color-rosy)" />,
      description: 'Knowing what to study is often harder than studying itself.'
    },
    {
      num: '03',
      title: 'GENERIC AI',
      icon: <Bot size={24} color="var(--color-rosy)" />,
      description: 'Most AI tools answer questions. They don\'t understand the specific material you\'re actually trying to learn.'
    }
  ];

  return (
    <section style={{ 
      padding: '100px 24px', 
      position: 'relative',
      borderTop: '1px solid rgba(185, 144, 153, 0.12)'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Section Header */}
        <div style={{ maxWidth: '680px', marginBottom: '64px' }}>
          <div className="badge-editorial" style={{ marginBottom: '16px' }}>
            THE CHALLENGE
          </div>
          <h2 style={{ 
            fontFamily: 'var(--font-serif)', 
            fontSize: 'clamp(2.2rem, 3.8vw, 3.2rem)', 
            fontWeight: 600, 
            lineHeight: '1.15', 
            color: 'var(--color-platinum)' 
          }}>
            Studying shouldn't mean managing five different things at once.
          </h2>
        </div>

        {/* 3 Problems Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '32px' 
        }}>
          {problems.map((p, idx) => (
            <div 
              key={idx}
              className="glass-panel hover-lift"
              style={{ 
                padding: '36px 30px', 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '20px',
                background: 'rgba(38, 26, 29, 0.5)',
                position: 'relative'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ 
                  fontFamily: 'var(--font-serif)', 
                  fontSize: '32px', 
                  fontWeight: 700, 
                  color: 'var(--color-rosy)', 
                  opacity: 0.8 
                }}>
                  {p.num}
                </span>
                <div style={{ 
                  width: 44, 
                  height: 44, 
                  borderRadius: '10px', 
                  background: 'rgba(101, 76, 82, 0.25)', 
                  border: '1px solid rgba(185, 144, 153, 0.2)',
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center' 
                }}>
                  {p.icon}
                </div>
              </div>

              <div>
                <h3 style={{ 
                  fontFamily: 'var(--font-sans)', 
                  fontSize: '13px', 
                  fontWeight: 800, 
                  letterSpacing: '1.5px', 
                  color: 'var(--color-platinum)',
                  marginBottom: '10px'
                }}>
                  {p.title}
                </h3>
                <p style={{ 
                  fontFamily: 'var(--font-sans)', 
                  fontSize: '15px', 
                  color: 'rgba(232, 221, 221, 0.75)', 
                  lineHeight: '1.6' 
                }}>
                  {p.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
