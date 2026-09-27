import React from 'react';
import { UploadCloud, Cpu, GitMerge, GraduationCap } from 'lucide-react';

export default function HowItWorksSection() {
  const steps = [
    {
      step: '01',
      title: 'Bring your material',
      icon: <UploadCloud size={24} color="var(--color-platinum)" />,
      desc: 'Upload your notes, syllabus, PDFs, or text files.'
    },
    {
      step: '02',
      title: 'Silla understands it',
      icon: <Cpu size={24} color="var(--color-platinum)" />,
      desc: 'Your material becomes searchable knowledge that Silla can use to build your learning experience.'
    },
    {
      step: '03',
      title: 'Follow your study path',
      icon: <GitMerge size={24} color="var(--color-platinum)" />,
      desc: 'Silla organizes topics into a structured learning path so you know what to focus on next.'
    },
    {
      step: '04',
      title: 'Learn. Practice. Ask.',
      icon: <GraduationCap size={24} color="var(--color-platinum)" />,
      desc: 'Study the topic, take contextual quizzes, and ask the AI tutor questions grounded in your uploaded material.'
    }
  ];

  return (
    <section id="how-it-works" style={{ 
      padding: '100px 24px', 
      position: 'relative',
      borderTop: '1px solid rgba(185, 144, 153, 0.12)'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ maxWidth: '640px', marginBottom: '64px' }}>
          <div className="badge-editorial" style={{ marginBottom: '16px' }}>
            WORKFLOW
          </div>
          <h2 style={{ 
            fontFamily: 'var(--font-serif)', 
            fontSize: 'clamp(2.2rem, 3.8vw, 3.2rem)', 
            fontWeight: 600, 
            lineHeight: '1.15', 
            color: 'var(--color-platinum)' 
          }}>
            From material to mastery.
          </h2>
        </div>

        {/* 4 Steps Timeline Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', 
          gap: '24px',
          position: 'relative'
        }}>
          {steps.map((s, idx) => (
            <div 
              key={idx}
              className="glass-panel hover-lift"
              style={{ 
                padding: '32px 26px', 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '20px',
                background: 'rgba(38, 26, 29, 0.6)',
                borderColor: 'rgba(185, 144, 153, 0.18)',
                position: 'relative'
              }}
            >
              {/* Top Step Row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="badge-editorial" style={{ fontSize: '11px', background: 'var(--color-puce)', color: '#ffffff', borderColor: 'transparent' }}>
                  STEP {s.step}
                </span>
                <div style={{ 
                  width: 44, 
                  height: 44, 
                  borderRadius: '50%', 
                  background: 'linear-gradient(135deg, var(--color-wenge), var(--color-liver))', 
                  border: '1px solid rgba(185, 144, 153, 0.3)',
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
                }}>
                  {s.icon}
                </div>
              </div>

              <div>
                <h3 style={{ 
                  fontFamily: 'var(--font-serif)', 
                  fontSize: '22px', 
                  fontWeight: 600, 
                  color: 'var(--color-platinum)',
                  marginBottom: '10px'
                }}>
                  {s.title}
                </h3>
                <p style={{ 
                  fontFamily: 'var(--font-sans)', 
                  fontSize: '14px', 
                  color: 'rgba(232, 221, 221, 0.75)', 
                  lineHeight: '1.6' 
                }}>
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
