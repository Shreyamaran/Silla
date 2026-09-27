import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  BrainCircuit, 
  CheckCircle2, 
  ChevronRight, 
  Compass, 
  FileText, 
  HelpCircle, 
  Layers, 
  MessageSquare, 
  Play, 
  Plus, 
  RefreshCw, 
  Send, 
  Sparkles, 
  UploadCloud, 
  X, 
  Zap 
} from 'lucide-react';

const API_BASE = 'http://127.0.0.1:3001';

export default function App() {
  const [activeTab, setActiveTab] = useState('timeline'); // 'timeline', 'resources', 'chat'
  const [serverHealth, setServerHealth] = useState('checking');

  // Timeline State
  const [timeline, setTimeline] = useState([
    { id: 1, topic: 'Neural Networks & Deep Learning', description: 'Layer architectures, weights, biases, and activation functions.', dueDate: 'Day 1', status: 'completed' },
    { id: 2, topic: 'Loss Functions & Backpropagation', description: 'Gradient descent, chain rule, and weight updates.', dueDate: 'Day 2', status: 'current' },
    { id: 3, topic: 'Optimization & Learning Rates', description: 'Adam, SGD, momentum, and decay schedules.', dueDate: 'Day 3', status: 'locked' },
    { id: 4, topic: 'Convolutional & Recurrent Nets', description: 'Spatial feature maps, sequence modeling, and attention.', dueDate: 'Day 4', status: 'locked' }
  ]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [isGeneratingTimeline, setIsGeneratingTimeline] = useState(false);

  // Upload State
  const [uploadStatus, setUploadStatus] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  // Quiz Modal State
  const [quizModalOpen, setQuizModalOpen] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [quizResult, setQuizResult] = useState(null);
  const [quizScore, setQuizScore] = useState(0);
  const [isGeneratingQuiz, setIsGeneratingQuiz] = useState(false);

  // Chat State
  const [chatMessages, setChatMessages] = useState([
    { role: 'assistant', content: 'Hello! I am Silla, your sovereign AI study orchestrator. Ask me anything about your uploaded notes or ask me to quiz you!' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isSendingChat, setIsSendingChat] = useState(false);

  // Health Check
  useEffect(() => {
    checkHealth();
  }, []);

  const checkHealth = async () => {
    try {
      const res = await fetch(`${API_BASE}/health`);
      if (res.ok) setServerHealth('online');
      else setServerHealth('offline');
    } catch {
      setServerHealth('offline');
    }
  };

  // Generate Timeline from uploaded notes
  const handleGenerateTimeline = async () => {
    setIsGeneratingTimeline(true);
    try {
      const res = await fetch(`${API_BASE}/timeline/generate`, { method: 'POST' });
      const data = await res.json();
      if (data.timeline && data.timeline.length > 0) {
        setTimeline(data.timeline);
      }
    } catch (err) {
      console.error('Failed to generate timeline:', err);
    } finally {
      setIsGeneratingTimeline(false);
    }
  };

  // Upload File
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    setUploadStatus({ type: 'info', message: `Uploading ${file.name}...` });

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch(`${API_BASE}/upload`, {
        method: 'POST',
        body: formData
      });
      const data = await res.json();

      if (res.ok) {
        setUploadStatus({
          type: 'success',
          message: `Successfully processed ${data.filename}! Created ${data.savedChunksCount} searchable note chunks.`
        });
        // Auto regenerate timeline after upload
        handleGenerateTimeline();
      } else {
        setUploadStatus({ type: 'error', message: data.error || 'Upload failed' });
      }
    } catch (err) {
      setUploadStatus({ type: 'error', message: 'Failed to connect to backend server' });
    } finally {
      setIsUploading(false);
    }
  };

  // Generate Quiz for Topic
  const startQuiz = async (topicName) => {
    setSelectedNode(null);
    setQuizModalOpen(true);
    setIsGeneratingQuiz(true);
    setCurrentQuestionIdx(0);
    setSelectedOption(null);
    setQuizResult(null);
    setQuizScore(0);

    try {
      const res = await fetch(`${API_BASE}/quiz/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: topicName })
      });
      const data = await res.json();
      if (data.questions && data.questions.length > 0) {
        setQuizQuestions(data.questions);
      } else {
        setQuizQuestions([
          {
            id: 1,
            question: `What is the core principle of ${topicName}?`,
            options: ['Gradient adjustment', 'Random guessing', 'Static allocation', 'Linear interpolation'],
            correctAnswerIndex: 0,
            explanation: 'Gradient adjustment optimizes parameters toward minimum loss.'
          }
        ]);
      }
    } catch (err) {
      setQuizQuestions([
        {
          id: 1,
          question: `What is the core principle of ${topicName}?`,
          options: ['Gradient adjustment', 'Random guessing', 'Static allocation', 'Linear interpolation'],
          correctAnswerIndex: 0,
          explanation: 'Gradient adjustment optimizes parameters toward minimum loss.'
        }
      ]);
    } finally {
      setIsGeneratingQuiz(false);
    }
  };

  // Submit Answer
  const handleAnswerSubmit = async (optIdx) => {
    setSelectedOption(optIdx);
    const q = quizQuestions[currentQuestionIdx];

    try {
      const res = await fetch(`${API_BASE}/quiz/check`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userIndex: optIdx, correctIndex: q.correctAnswerIndex })
      });
      const data = await res.json();
      setQuizResult(data);
      if (data.isCorrect) setQuizScore(prev => prev + 1);
    } catch {
      const isCorrect = optIdx === q.correctAnswerIndex;
      setQuizResult({
        isCorrect,
        feedback: isCorrect ? 'Correct! Excellent job.' : 'Not quite. Review references.'
      });
      if (isCorrect) setQuizScore(prev => prev + 1);
    }
  };

  // Next Question
  const handleNextQuestion = () => {
    if (currentQuestionIdx < quizQuestions.length - 1) {
      setCurrentQuestionIdx(prev => prev + 1);
      setSelectedOption(null);
      setQuizResult(null);
    } else {
      // Quiz complete
      setQuizResult({
        finished: true,
        feedback: `Quiz Completed! Your score: ${quizScore + (quizResult?.isCorrect ? 1 : 0)} / ${quizQuestions.length}`
      });
    }
  };

  // Send Chat Message
  const handleSendChat = async (presetMsg = null) => {
    const msgText = presetMsg || chatInput;
    if (!msgText.trim()) return;

    const newHistory = [...chatMessages, { role: 'user', content: msgText }];
    setChatMessages(newHistory);
    if (!presetMsg) setChatInput('');
    setIsSendingChat(true);

    try {
      const res = await fetch(`${API_BASE}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: msgText, history: newHistory })
      });
      const data = await res.json();
      setChatMessages(prev => [...prev, { role: 'assistant', content: data.reply, sources: data.sources }]);
    } catch (err) {
      setChatMessages(prev => [...prev, { role: 'assistant', content: "I'm currently processing offline! Let's continue testing your recall." }]);
    } finally {
      setIsSendingChat(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Top Navbar */}
      <header className="glass-panel" style={{ margin: '16px 24px 0 24px', padding: '14px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: 42, height: 42, borderRadius: '12px', background: 'linear-gradient(135deg, #6366f1, #06b6d4)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 15px rgba(99,102,241,0.5)' }}>
            <Sparkles size={24} color="#fff" />
          </div>
          <div>
            <h1 style={{ fontSize: '20px', fontWeight: 800, letterSpacing: '-0.5px' }}>Silla</h1>
            <p style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 500 }}>SOVEREIGN AI STUDY ORCHESTRATOR</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav style={{ display: 'flex', gap: '8px', background: 'rgba(0,0,0,0.3)', padding: '6px', borderRadius: '12px' }}>
          <button 
            onClick={() => setActiveTab('timeline')}
            style={{ 
              background: activeTab === 'timeline' ? 'var(--accent-primary)' : 'transparent',
              color: activeTab === 'timeline' ? '#fff' : 'var(--text-muted)',
              border: 'none', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px', transition: 'all 0.2s'
            }}
          >
            <Compass size={16} /> Study Path
          </button>
          <button 
            onClick={() => setActiveTab('resources')}
            style={{ 
              background: activeTab === 'resources' ? 'var(--accent-primary)' : 'transparent',
              color: activeTab === 'resources' ? '#fff' : 'var(--text-muted)',
              border: 'none', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px', transition: 'all 0.2s'
            }}
          >
            <Layers size={16} /> Resources & Upload
          </button>
          <button 
            onClick={() => setActiveTab('chat')}
            style={{ 
              background: activeTab === 'chat' ? 'var(--accent-primary)' : 'transparent',
              color: activeTab === 'chat' ? '#fff' : 'var(--text-muted)',
              border: 'none', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px', transition: 'all 0.2s'
            }}
          >
            <MessageSquare size={16} /> AI Tutor Chat
          </button>
        </nav>

        {/* Server Status Indicator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.05)', padding: '6px 12px', borderRadius: '20px' }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: serverHealth === 'online' ? '#10b981' : '#f43f5e', boxShadow: serverHealth === 'online' ? '0 0 8px #10b981' : '0 0 8px #f43f5e' }} />
          <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 500 }}>{serverHealth === 'online' ? 'Backend Ready' : 'Backend Connecting'}</span>
          <RefreshCw size={12} style={{ cursor: 'pointer', opacity: 0.7 }} onClick={checkHealth} />
        </div>
      </header>

      {/* Main Content Area */}
      <main style={{ flex: 1, padding: '24px', maxWidth: '1200px', width: '100%', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        
        {/* TAB 1: STUDY PATH (DUOLINGO STYLE) */}
        {activeTab === 'timeline' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '24px' }}>
            {/* Timeline View */}
            <div className="glass-panel" style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h2 style={{ fontSize: '22px', fontWeight: 700 }}>Your Personalized Study Path</h2>
                  <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>Master topics sequentially using spaced recall & interactive quizzes.</p>
                </div>
                <button className="btn-secondary" onClick={handleGenerateTimeline} disabled={isGeneratingTimeline}>
                  <RefreshCw size={14} className={isGeneratingTimeline ? 'spin' : ''} />
                  {isGeneratingTimeline ? 'Orchestrating...' : 'Regenerate Path'}
                </button>
              </div>

              {/* Duolingo Style Nodes Path */}
              <div style={{ position: 'relative', margin: '30px 0', padding: '0 40px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '48px' }}>
                {/* Connecting Line */}
                <div style={{ position: 'absolute', top: 30, bottom: 30, width: 4, background: 'linear-gradient(to bottom, #10b981, #6366f1, rgba(255,255,255,0.1))', borderRadius: 2, zIndex: 1 }} />

                {timeline.map((node, idx) => {
                  const isCurrent = node.status === 'current' || idx === 1;
                  const isCompleted = node.status === 'completed' || idx === 0;

                  // Staggered node offsets for playful path shape
                  const offsets = [0, 45, -45, 30, -30];
                  const xOffset = offsets[idx % offsets.length];

                  return (
                    <div 
                      key={node.id} 
                      onClick={() => setSelectedNode(node)}
                      style={{ 
                        position: 'relative', 
                        zIndex: 2, 
                        transform: `translateX(${xOffset}px)`,
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '8px'
                      }}
                    >
                      <div 
                        className={isCurrent ? 'pulse-node' : ''}
                        style={{
                          width: 64,
                          height: 64,
                          borderRadius: '50%',
                          background: isCompleted 
                            ? 'linear-gradient(135deg, #10b981, #059669)' 
                            : isCurrent 
                              ? 'linear-gradient(135deg, #6366f1, #06b6d4)' 
                              : 'rgba(30, 41, 59, 0.8)',
                          border: isCurrent ? '3px solid #ffffff' : '2px solid rgba(255,255,255,0.15)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: '0 10px 25px rgba(0,0,0,0.4)',
                          transition: 'all 0.3s ease'
                        }}
                      >
                        {isCompleted ? (
                          <CheckCircle2 size={30} color="#fff" />
                        ) : isCurrent ? (
                          <Play size={26} color="#fff" style={{ marginLeft: 4 }} />
                        ) : (
                          <BrainCircuit size={26} color="var(--text-muted)" />
                        )}
                      </div>

                      <div style={{ textAlign: 'center', background: 'rgba(15, 23, 42, 0.9)', padding: '6px 14px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)', maxWidth: '200px' }}>
                        <span style={{ fontSize: '10px', color: 'var(--accent-cyan)', fontWeight: 700, textTransform: 'uppercase' }}>{node.dueDate || `Step ${idx + 1}`}</span>
                        <h4 style={{ fontSize: '13px', fontWeight: 600, color: '#fff', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{node.topic}</h4>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Sidebar Topic Focus Card */}
            <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <BookOpen size={20} color="var(--accent-cyan)" /> Node Overview
              </h3>

              {selectedNode ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ background: 'rgba(99,102,241,0.1)', padding: '12px 16px', borderRadius: '12px', borderLeft: '4px solid var(--accent-primary)' }}>
                    <span style={{ fontSize: '11px', color: 'var(--accent-primary)', fontWeight: 700 }}>ACTIVE TOPIC</span>
                    <h4 style={{ fontSize: '16px', fontWeight: 700, marginTop: '2px' }}>{selectedNode.topic}</h4>
                  </div>
                  <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.5' }}>{selectedNode.description}</p>
                  
                  <button className="btn-primary" onClick={() => startQuiz(selectedNode.topic)} style={{ width: '100%', justifyContent: 'center', marginTop: '10px' }}>
                    <Zap size={16} /> Launch Practice Quiz
                  </button>
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '40px 10px', color: 'var(--text-muted)' }}>
                  <BrainCircuit size={40} style={{ opacity: 0.3, marginBottom: '12px' }} />
                  <p style={{ fontSize: '13px' }}>Click any node on the timeline path to view topic details and practice quizzes.</p>
                </div>
              )}

              {/* Quick Actions */}
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '16px', marginTop: 'auto' }}>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600 }}>QUICK STUDY ACTIONS</span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '10px' }}>
                  <button className="btn-secondary" onClick={() => setActiveTab('chat')} style={{ fontSize: '12px', justifyContent: 'flex-start' }}>
                    <MessageSquare size={14} /> Ask Silla about this syllabus
                  </button>
                  <button className="btn-secondary" onClick={() => startQuiz('General Knowledge')} style={{ fontSize: '12px', justifyContent: 'flex-start' }}>
                    <HelpCircle size={14} /> Quick Random Quiz
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: RESOURCES & UPLOAD */}
        {activeTab === 'resources' && (
          <div className="glass-panel" style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '28px' }}>
            <div>
              <h2 style={{ fontSize: '24px', fontWeight: 800 }}>Knowledge Base & Document Upload</h2>
              <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginTop: '4px' }}>Upload notes, PDF syllabus, or timetables. Silla parses and vector-indexes them locally for semantic retrieval.</p>
            </div>

            {/* Upload Drag & Drop Area */}
            <label style={{ 
              border: '2px dashed var(--border-glow)', 
              borderRadius: '16px', 
              padding: '48px 24px', 
              textAlign: 'center', 
              cursor: 'pointer',
              background: 'rgba(99,102,241,0.03)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '12px',
              transition: 'all 0.2s ease'
            }}>
              <input type="file" accept=".pdf,.txt,.md" onChange={handleFileUpload} style={{ display: 'none' }} disabled={isUploading} />
              <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(99,102,241,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <UploadCloud size={28} color="var(--accent-primary)" />
              </div>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: 600 }}>Click or Drag & Drop Study Files</h3>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>Supports PDF documents, plain text (.txt), and Markdown (.md)</p>
              </div>
            </label>

            {/* Upload Feedback Alert */}
            {uploadStatus && (
              <div style={{ 
                padding: '14px 18px', 
                borderRadius: '12px', 
                background: uploadStatus.type === 'success' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(244, 63, 94, 0.1)',
                border: `1px solid ${uploadStatus.type === 'success' ? '#10b981' : '#f43f5e'}`,
                color: uploadStatus.type === 'success' ? '#10b981' : '#f43f5e',
                fontSize: '13px',
                fontWeight: 500
              }}>
                {uploadStatus.message}
              </div>
            )}

            {/* Indexed Notes Summary */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700 }}>Vector Indexed Resources</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
                <div className="glass-panel" style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <FileText size={24} color="var(--accent-cyan)" />
                  <div>
                    <h4 style={{ fontSize: '14px', fontWeight: 600 }}>Syllabus & Lecture Notes</h4>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Indexed in pgvector DB</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: AI TUTOR CHAT */}
        {activeTab === 'chat' && (
          <div className="glass-panel" style={{ height: '620px', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            {/* Chat Header */}
            <div style={{ padding: '16px 24px', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Sparkles size={20} color="var(--accent-cyan)" />
                <h3 style={{ fontSize: '16px', fontWeight: 700 }}>Silla AI Study Companion</h3>
              </div>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)', background: 'rgba(255,255,255,0.05)', padding: '4px 10px', borderRadius: '12px' }}>Groq RAG Model</span>
            </div>

            {/* Messages Area */}
            <div style={{ flex: 1, padding: '20px 24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {chatMessages.map((msg, i) => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
                  <div style={{ 
                    maxWidth: '80%', 
                    padding: '12px 18px', 
                    borderRadius: '16px', 
                    fontSize: '14px', 
                    lineHeight: '1.5',
                    background: msg.role === 'user' ? 'linear-gradient(135deg, var(--accent-primary), var(--accent-cyan))' : 'rgba(30, 41, 59, 0.8)',
                    color: '#fff',
                    border: msg.role === 'user' ? 'none' : '1px solid rgba(255,255,255,0.08)'
                  }}>
                    {msg.content}
                  </div>

                  {/* Sources Citation */}
                  {msg.sources && msg.sources.length > 0 && (
                    <div style={{ marginTop: '6px', fontSize: '11px', color: 'var(--text-muted)', display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                      <span>Sources used:</span>
                      {msg.sources.map((s, sIdx) => (
                        <span key={sIdx} style={{ background: 'rgba(255,255,255,0.06)', padding: '2px 6px', borderRadius: '4px' }}>📄 {s.file}</span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Chat Input Bar */}
            <div style={{ padding: '16px 24px', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', gap: '12px' }}>
              <input 
                type="text" 
                placeholder="Ask Silla a question about your study material..."
                value={chatInput}
                onChange={e => setChatInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSendChat()}
                style={{ 
                  flex: 1, 
                  background: 'rgba(15, 23, 42, 0.8)', 
                  border: '1px solid rgba(255,255,255,0.12)', 
                  padding: '12px 18px', 
                  borderRadius: '12px', 
                  color: '#fff', 
                  fontSize: '14px',
                  outline: 'none'
                }}
              />
              <button className="btn-primary" onClick={() => handleSendChat()} disabled={isSendingChat}>
                <Send size={16} />
              </button>
            </div>
          </div>
        )}
      </main>

      {/* PRACTICE QUIZ MODAL */}
      {quizModalOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
          <div className="glass-panel" style={{ width: '90%', maxWidth: '540px', padding: '28px', display: 'flex', flexDirection: 'column', gap: '20px', position: 'relative' }}>
            <button onClick={() => setQuizModalOpen(false)} style={{ position: 'absolute', top: 20, right: 20, background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
              <X size={20} />
            </button>

            {isGeneratingQuiz ? (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <Sparkles size={36} color="var(--accent-primary)" className="float-anim" />
                <h3 style={{ marginTop: '16px', fontSize: '18px' }}>Generating Quiz Questions...</h3>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Using Groq LLM grounded in your uploaded notes</p>
              </div>
            ) : quizQuestions.length > 0 ? (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <span style={{ fontSize: '12px', color: 'var(--accent-cyan)', fontWeight: 700 }}>QUESTION {currentQuestionIdx + 1} OF {quizQuestions.length}</span>
                  <span style={{ fontSize: '12px', color: 'var(--accent-emerald)', fontWeight: 700 }}>Score: {quizScore}</span>
                </div>

                <h3 style={{ fontSize: '16px', fontWeight: 600, lineHeight: '1.5', marginBottom: '20px' }}>
                  {quizQuestions[currentQuestionIdx].question}
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {quizQuestions[currentQuestionIdx].options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleAnswerSubmit(idx)}
                      disabled={selectedOption !== null}
                      style={{
                        padding: '14px 18px',
                        borderRadius: '12px',
                        background: selectedOption === idx 
                          ? (idx === quizQuestions[currentQuestionIdx].correctAnswerIndex ? 'rgba(16, 185, 129, 0.2)' : 'rgba(244, 63, 94, 0.2)')
                          : 'rgba(255,255,255,0.04)',
                        border: selectedOption === idx
                          ? `1px solid ${idx === quizQuestions[currentQuestionIdx].correctAnswerIndex ? '#10b981' : '#f43f5e'}`
                          : '1px solid rgba(255,255,255,0.08)',
                        color: '#fff',
                        textAlign: 'left',
                        cursor: selectedOption === null ? 'pointer' : 'default',
                        fontSize: '14px',
                        fontWeight: 500,
                        transition: 'all 0.2s'
                      }}
                    >
                      {option}
                    </button>
                  ))}
                </div>

                {quizResult && (
                  <div style={{ marginTop: '20px', padding: '14px', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', fontSize: '13px' }}>
                    <p style={{ fontWeight: 600, color: quizResult.isCorrect ? '#10b981' : '#f43f5e' }}>{quizResult.feedback}</p>
                    <p style={{ color: 'var(--text-muted)', marginTop: '4px' }}>{quizQuestions[currentQuestionIdx].explanation}</p>

                    <button className="btn-primary" onClick={handleNextQuestion} style={{ marginTop: '14px', width: '100%', justifyContent: 'center' }}>
                      {currentQuestionIdx < quizQuestions.length - 1 ? 'Next Question' : 'Finish Quiz'} <ChevronRight size={16} />
                    </button>
                  </div>
                )}
              </div>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}
