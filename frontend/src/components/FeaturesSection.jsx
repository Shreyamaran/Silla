import React from 'react';
import { Compass, HelpCircle, MessageSquare, BookOpen, HardDrive, Layers } from 'lucide-react';

export default function FeaturesSection() {
  const features = [
    {
      num: 'FEATURE 01',
      title: 'Personalized Study Path',
      icon: <Compass size={22} color="var(--color-rosy)" />,
      desc: 'Turn your syllabus and study material into a structured sequence of topics.'
    },
    {
      num: 'FEATURE 02',
      title: 'Contextual Quizzes',
      icon: <HelpCircle size={22} color="var(--color-rosy)" />,
      desc: 'Practice with questions generated from the material you\'re actually studying.'
    },
    {
      num: 'FEATURE 03',
      title: 'AI Tutor',
      icon: <MessageSquare size={22} color="var(--color-rosy)" />,
      desc: 'Ask questions and have conversations grounded in your own learning material.'
    },
    {
      num: 'FEATURE 04',
      title: 'Your References',
      icon: <BookOpen size={22} color="var(--color-rosy)" />,
      desc: 'Keep the material behind each topic close at hand.'
    },
    {
      num: 'FEATURE 05',
      title: 'Local-First Knowledge',
      icon: <HardDrive size={22} color="var(--color-rosy)" />,
      desc: 'Your study files and knowledge base are designed to remain on your machine.'
    },
    {
      num: 'FEATURE 06',
      title: 'One Learning Space',
      icon: <Layers size={22} color="var(--color-rosy)" />,
      desc: 'Upload, learn, practice, and ask questions without constantly switching between tools.'
    }
  ];

  return (
    <section id="features" style={{ 
      padding: '100px 24px', 
      position: 'relative',
      borderTop: '1px solid rgba(185, 144, 153, 0.12)'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ maxWidth: '640px', marginBottom: '64px' }}>
          <div className="badge-editorial" style={{ marginBottom: '16px' }}>
            CAPABILITIES
          </div>
          <h2 style={{ 
            fontFamily: 'var(--font-serif)', 
            fontSize: 'clamp(2.2rem, 3.8vw, 3.2rem)', 
            fontWeight: 600, 
            lineHeight: '1.15', 
            color: 'var(--color-platinum)' 
          }}>
            Everything you need to actually study.
          </h2>
        </div>

        {/* 6 Feature Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
          gap: '28px' 
        }}>
          {features.map((f, idx) => (
            <div 
              key={idx}
              className="glass-panel hover-lift"
              style={{ 
                padding: '32px 28px', 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '18px',
                background: 'rgba(38, 26, 29, 0.55)',
                borderColor: 'rgba(185, 144, 153, 0.18)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '1px', color: 'var(--color-rosy)', textTransform: 'uppercase' }}>
                  {f.num}
                </span>
                <div style={{ 
                  width: 38, 
                  height: 38, 
                  borderRadius: '10px', 
                  background: 'rgba(101, 76, 82, 0.25)', 
                  border: '1px solid rgba(185, 144, 153, 0.2)',
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center' 
                }}>
                  {f.icon}
                </div>
              </div>

              <div>
                <h3 style={{ 
                  fontFamily: 'var(--font-serif)', 
                  fontSize: '22px', 
                  fontWeight: 600, 
                  color: 'var(--color-platinum)',
                  marginBottom: '8px'
                }}>
                  {f.title}
                </h3>
                <p style={{ 
                  fontFamily: 'var(--font-sans)', 
                  fontSize: '14.5px', 
                  color: 'rgba(232, 221, 221, 0.75)', 
                  lineHeight: '1.6' 
                }}>
                  {f.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
