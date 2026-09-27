import React from 'react';
import { UserCheck, Target, Lightbulb } from 'lucide-react';

export default function WhoIsItForSection() {
  const personas = [
    {
      role: 'THE OVERWHELMED STUDENT',
      quote: '"I have all my material. I just don\'t know where to start."',
      icon: <UserCheck size={24} color="var(--color-rosy)" />,
      description: 'Turn chaotic lecture folders and endless PDFs into a step-by-step topic timeline.'
    },
    {
      role: 'THE EXAM PREPPER',
      quote: '"I need to practice what actually matters for my exam."',
      icon: <Target size={24} color="var(--color-rosy)" />,
      description: 'Generate active recall quizzes directly from your syllabus to test mastery.'
    },
    {
      role: 'THE CURIOUS LEARNER',
      quote: '"I want to understand concepts, not just memorize answers."',
      icon: <Lightbulb size={24} color="var(--color-rosy)" />,
      description: 'Talk with an AI tutor that cites your exact reading material for deep understanding.'
    }
  ];

  return (
    <section style={{ 
      padding: '100px 24px', 
      position: 'relative',
      borderTop: '1px solid rgba(185, 144, 153, 0.12)'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ maxWidth: '640px', marginBottom: '64px' }}>
          <div className="badge-editorial" style={{ marginBottom: '16px' }}>
            STUDENT PERSONAS
          </div>
          <h2 style={{ 
            fontFamily: 'var(--font-serif)', 
            fontSize: 'clamp(2.2rem, 3.8vw, 3.2rem)', 
            fontWeight: 600, 
            lineHeight: '1.15', 
            color: 'var(--color-platinum)' 
          }}>
            Built for students who have a lot to learn.
          </h2>
        </div>

        {/* 3 Persona Cards */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '28px' 
        }}>
          {personas.map((p, idx) => (
            <div 
              key={idx}
              className="glass-panel hover-lift"
              style={{ 
                padding: '36px 30px', 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '20px',
                background: 'rgba(38, 26, 29, 0.5)',
                borderColor: 'rgba(185, 144, 153, 0.2)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '1.5px', color: 'var(--color-rosy)' }}>
                  {p.role}
                </span>
                <div style={{ 
                  width: 42, 
                  height: 42, 
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
                <p style={{ 
                  fontFamily: 'var(--font-serif)', 
                  fontSize: '20px', 
                  fontStyle: 'italic',
                  fontWeight: 500, 
                  color: 'var(--color-platinum)',
                  marginBottom: '12px',
                  lineHeight: '1.35'
                }}>
                  {p.quote}
                </p>
                <p style={{ 
                  fontFamily: 'var(--font-sans)', 
                  fontSize: '14px', 
                  color: 'rgba(232, 221, 221, 0.7)', 
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
