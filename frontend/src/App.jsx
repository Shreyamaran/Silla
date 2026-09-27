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
  Lock,
  MessageSquare, 
  Play, 
  Plus, 
  RefreshCw, 
  Send, 
  Sparkles, 
  Star,
  Trash2, 
  Trophy,
  UploadCloud, 
  X, 
  Zap 
} from 'lucide-react';

const API_BASE = 'http://127.0.0.1:3001';

export default function App() {
  const [serverHealth, setServerHealth] = useState('checking');

  // Multi-Chat Scoped Data Model
  const [chats, setChats] = useState([
    {
      id: 'chat-dbms',
      topic: 'Database Management Systems (DBMS)',
      messages: [
        { role: 'assistant', content: 'Hello! I am Silla, your AI study assistant for Database Management Systems (DBMS). Upload your notes, ask questions, or view your generated study timeline!' }
      ],
      files: [],
      timeline: [
        { id: 1, phase: 'Phase 1: Relational Model & SQL', topic: 'Relational Algebra & Schema Design', description: 'Keys, normalization (1NF-3NF), ER diagrams, and SQL queries.', suggestedContent: 'Focus on ER diagram mapping to relational tables, primary/foreign key constraints, and 3NF decomposition.', dueDate: 'Day 1-2', status: 'current' },
        { id: 2, phase: 'Phase 2: Transactions & ACID', topic: 'Concurrency & Recovery', description: 'ACID properties, 2PL, serializability, and WAL logs.', suggestedContent: 'Understand strict 2PL, deadlock prevention, and ARIES recovery algorithm.', dueDate: 'Day 3-4', status: 'todo' },
        { id: 3, phase: 'Phase 3: Indexing & Query Processing', topic: 'B+ Trees & Query Optimization', description: 'B+ Tree index operations, hash indexes, and cost-based optimization.', suggestedContent: 'Analyze B+ Tree node splitting/merging and query execution plans.', dueDate: 'Day 5-6', status: 'todo' }
      ]
    },
    {
      id: 'chat-os',
      topic: 'Operating Systems (OS)',
      messages: [
        { role: 'assistant', content: 'Hello! I am Silla, your AI study assistant for Operating Systems (OS). Ask me questions about processes, virtual memory, or concurrency!' }
      ],
      files: [],
      timeline: [
        { id: 1, phase: 'Phase 1: Processes & Threads', topic: 'Process Lifecycle & Scheduling', description: 'PCB, context switching, CPU scheduling algorithms (Round Robin, SRTF).', suggestedContent: 'Master Gantt charts for CPU scheduling and thread synchronization.', dueDate: 'Day 1-2', status: 'current' },
        { id: 2, phase: 'Phase 2: Memory Management', topic: 'Virtual Memory & Paging', description: 'Page tables, TLB, page replacement (LRU, FIFO), and thrashing.', suggestedContent: 'Understand multi-level page tables, TLB hit rates, and working set model.', dueDate: 'Day 3-4', status: 'todo' }
      ]
    }
  ]);

  const [activeChatId, setActiveChatId] = useState('chat-dbms');
  const [viewMode, setViewMode] = useState('chat'); // 'chat' or 'timeline'

  // New Chat Modal State
  const [newChatModalOpen, setNewChatModalOpen] = useState(false);
  const [newTopicInput, setNewTopicInput] = useState('');

  // Timeline Phase Focus & Regeneration State
  const [selectedPhase, setSelectedPhase] = useState(null);
  const [isGeneratingTimeline, setIsGeneratingTimeline] = useState(false);

  // Upload State per Chat
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
  const [activeQuizPhaseName, setActiveQuizPhaseName] = useState('');

  // Chat Input State
  const [chatInput, setChatInput] = useState('');
  const [isSendingChat, setIsSendingChat] = useState(false);

  // Get current active chat
  const activeChat = chats.find(c => c.id === activeChatId) || chats[0];

  // Health Check Polling
  useEffect(() => {
    checkHealth();
    const interval = setInterval(checkHealth, 5000);
    return () => clearInterval(interval);
  }, []);

  const checkHealth = async () => {
    try {
      let res = await fetch(`${API_BASE}/health`, { signal: AbortSignal.timeout(3000) }).catch(() => null);
      if (!res || !res.ok) {
        res = await fetch('http://localhost:3001/health', { signal: AbortSignal.timeout(3000) }).catch(() => null);
      }
      if (res && res.ok) setServerHealth('online');
      else setServerHealth('offline');
    } catch {
      setServerHealth('offline');
    }
  };

  // Create New Chat (New Topic)
  const handleCreateNewChat = (e) => {
    e.preventDefault();
    if (!newTopicInput.trim()) return;

    const newChatId = `chat-${Date.now()}`;
    const newChatObj = {
      id: newChatId,
      topic: newTopicInput.trim(),
      messages: [
        { role: 'assistant', content: `Welcome to your new study chat for "${newTopicInput.trim()}". Upload your notes or syllabus to generate a study timeline!` }
      ],
      files: [],
      timeline: [
        { id: 1, phase: 'Phase 1: Foundations', topic: `${newTopicInput.trim()} Overview`, description: 'Core principles and definitions', suggestedContent: 'Review introductory specifications and fundamentals.', dueDate: 'Day 1-2', status: 'current' },
        { id: 2, phase: 'Phase 2: Core Concepts', topic: `${newTopicInput.trim()} Mechanisms`, description: 'Architecture, logic, and key workflows', suggestedContent: 'Deep dive into primary workflows and mechanisms.', dueDate: 'Day 3-4', status: 'todo' }
      ]
    };

    setChats(prev => [...prev, newChatObj]);
    setActiveChatId(newChatId);
    setNewTopicInput('');
    setNewChatModalOpen(false);
    setViewMode('chat');
  };

  // Upload File Scoped to Active Chat + Auto Regenerate Timeline
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    setUploadStatus({ type: 'info', message: `Uploading ${file.name} to ${activeChat.topic}...` });

    const formData = new FormData();
    formData.append('file', file);
    formData.append('chatId', activeChat.id);

    try {
      const res = await fetch(`${API_BASE}/upload?chatId=${activeChat.id}`, {
        method: 'POST',
        body: formData
      });
      const data = await res.json();

      if (res.ok) {
        setUploadStatus({
          type: 'success',
          message: `Attached ${data.filename} to ${activeChat.topic}! Saved ${data.savedChunksCount} searchable note chunks.`
        });

        // Add file to active chat
        setChats(prev => prev.map(c => {
          if (c.id === activeChat.id) {
            const fileExists = c.files.some(f => f.name === data.filename);
            return {
              ...c,
              files: fileExists ? c.files : [...c.files, { name: data.filename, chunks: data.savedChunksCount, date: new Date().toLocaleDateString() }]
            };
          }
          return c;
        }));

        // Trigger automatic timeline regeneration on upload for this chat
        regenerateTimelineForChat(activeChat.id, activeChat.topic);
      } else {
        setUploadStatus({ type: 'error', message: data.error || 'Upload failed' });
      }
    } catch (err) {
      setUploadStatus({ type: 'error', message: 'Failed to connect to backend server' });
    } finally {
      setIsUploading(false);
    }
  };

  // Regenerate Timeline for specific Chat
  const regenerateTimelineForChat = async (cId, cTopic) => {
    setIsGeneratingTimeline(true);
    try {
      const res = await fetch(`${API_BASE}/timeline/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chatId: cId, topic: cTopic })
      });
      const data = await res.json();
      if (data.timeline && data.timeline.length > 0) {
        setChats(prev => prev.map(c => c.id === cId ? { ...c, timeline: data.timeline } : c));
      }
    } catch (err) {
      console.error('Timeline regeneration notice:', err);
    } finally {
      setIsGeneratingTimeline(false);
    }
  };

  // Send Chat Message Scoped to Active Chat
  const handleSendChat = async (presetMsg = null) => {
    const msgText = presetMsg || chatInput;
    if (!msgText.trim()) return;

    const newHistory = [...activeChat.messages, { role: 'user', content: msgText }];
    
    // Update chat history locally
    setChats(prev => prev.map(c => c.id === activeChat.id ? { ...c, messages: newHistory } : c));
    if (!presetMsg) setChatInput('');
    setIsSendingChat(true);

    try {
      const res = await fetch(`${API_BASE}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: msgText,
          history: newHistory,
          chatId: activeChat.id,
          topic: activeChat.topic
        })
      });
      const data = await res.json();

      setChats(prev => prev.map(c => {
        if (c.id === activeChat.id) {
          return {
            ...c,
            messages: [...newHistory, { role: 'assistant', content: data.reply, sources: data.sources }]
          };
        }
        return c;
      }));
    } catch (err) {
      setChats(prev => prev.map(c => {
        if (c.id === activeChat.id) {
          return {
            ...c,
            messages: [...newHistory, { role: 'assistant', content: `Silla: Ready to assist with ${activeChat.topic}! What question do you have about this topic?` }]
          };
        }
        return c;
      }));
    } finally {
      setIsSendingChat(false);
    }
  };

  // Generate Quiz Scoped to Phase & Chat
  const startQuizForPhase = async (phaseObj) => {
    setActiveQuizPhaseName(phaseObj.phase || phaseObj.topic);
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
        body: JSON.stringify({
          topic: activeChat.topic,
          phaseName: phaseObj.phase || phaseObj.topic,
          phaseContent: phaseObj.suggestedContent || phaseObj.description,
          chatId: activeChat.id
        })
      });
      const data = await res.json();
      if (data.questions && data.questions.length > 0) {
        setQuizQuestions(data.questions);
      } else {
        setQuizQuestions([
          {
            id: 1,
            question: `What is the core principle of ${phaseObj.phase || phaseObj.topic}?`,
            options: ['Primary optimization mechanism', 'Random variance', 'Manual intervention', 'Static allocation'],
            correctAnswerIndex: 0,
            explanation: 'Primary optimization provides targeted performance.'
          }
        ]);
      }
    } catch (err) {
      setQuizQuestions([
        {
          id: 1,
          question: `What is the core principle of ${phaseObj.phase || phaseObj.topic}?`,
          options: ['Primary optimization mechanism', 'Random variance', 'Manual intervention', 'Static allocation'],
          correctAnswerIndex: 0,
          explanation: 'Primary optimization provides targeted performance.'
        }
      ]);
    } finally {
      setIsGeneratingQuiz(false);
    }
  };

  // Check Quiz Answer
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
        feedback: isCorrect ? 'Spot on! Correct answer.' : 'Not quite. Review the phase material and try again!'
      });
      if (isCorrect) setQuizScore(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIdx < quizQuestions.length - 1) {
      setCurrentQuestionIdx(prev => prev + 1);
      setSelectedOption(null);
      setQuizResult(null);
    } else {
      setQuizResult({
        finished: true,
        feedback: `Phase Quiz Completed! Score: ${quizScore + (quizResult?.isCorrect ? 1 : 0)} / ${quizQuestions.length}`
      });
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw', overflow: 'hidden', backgroundColor: 'var(--bg-dark)' }}>
      
      {/* 1. SIDEBAR: Topic Chats List */}
      <aside className="glass-panel" style={{ width: '280px', margin: '12px 0 12px 12px', display: 'flex', flexDirection: 'column', gap: '16px', padding: '20px 16px', zIndex: 10 }}>
        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: 36, height: 36, borderRadius: '10px', background: 'linear-gradient(135deg, #6366f1, #06b6d4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Sparkles size={20} color="#fff" />
          </div>
          <div>
            <h1 style={{ fontSize: '18px', fontWeight: 800 }}>Silla</h1>
            <p style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 600 }}>TOPIC CHATS & TIMELINES</p>
          </div>
        </div>

        {/* New Chat Button */}
        <button 
          className="btn-primary" 
          onClick={() => setNewChatModalOpen(true)}
          style={{ width: '100%', justifyContent: 'center', fontSize: '13px', padding: '10px' }}
        >
          <Plus size={16} /> New Topic Chat
        </button>

        {/* Chats List */}
        <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', paddingLeft: '4px' }}>Active Study Topics</span>
          
          {chats.map(chat => {
            const isActive = chat.id === activeChatId;
            return (
              <div
                key={chat.id}
                onClick={() => {
                  setActiveChatId(chat.id);
                  setSelectedPhase(null);
                }}
                style={{
                  padding: '12px 14px',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  background: isActive ? 'linear-gradient(135deg, rgba(99,102,241,0.25), rgba(6,182,212,0.15))' : 'rgba(255,255,255,0.03)',
                  border: isActive ? '1px solid var(--accent-primary)' : '1px solid rgba(255,255,255,0.06)',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}
              >
                <MessageSquare size={16} color={isActive ? 'var(--accent-cyan)' : 'var(--text-muted)'} />
                <div style={{ flex: 1, overflow: 'hidden' }}>
                  <h4 style={{ fontSize: '13px', fontWeight: isActive ? 700 : 500, color: isActive ? '#fff' : 'var(--text-main)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {chat.topic}
                  </h4>
                  <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
                    {chat.files.length} notes attached
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Server Status Indicator */}
        <div 
          onClick={checkHealth}
          style={{ 
            marginTop: 'auto',
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px', 
            background: 'rgba(255,255,255,0.04)', 
            padding: '8px 12px', 
            borderRadius: '12px',
            cursor: 'pointer',
            border: '1px solid rgba(255,255,255,0.06)'
          }}
        >
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: serverHealth === 'online' ? '#10b981' : '#f59e0b' }} />
          <span style={{ fontSize: '11px', color: serverHealth === 'online' ? '#10b981' : 'var(--text-muted)', fontWeight: 600 }}>
            {serverHealth === 'online' ? 'Backend Ready' : 'Connecting...'}
          </span>
          <RefreshCw size={12} className={serverHealth !== 'online' ? 'spin' : ''} style={{ opacity: 0.6, marginLeft: 'auto' }} />
        </div>
      </aside>

      {/* 2. MAIN DISPLAY AREA (CHAT VIEW & TIMELINE VIEW PER CHAT) */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', margin: '12px', overflow: 'hidden' }}>
        
        {/* Main Header with View Switcher */}
        <header className="glass-panel" style={{ padding: '14px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
          <div>
            <span style={{ fontSize: '11px', color: 'var(--accent-cyan)', fontWeight: 700, textTransform: 'uppercase' }}>SELECTED STUDY TOPIC</span>
            <h2 style={{ fontSize: '18px', fontWeight: 800 }}>{activeChat.topic}</h2>
          </div>

          {/* View Switcher: Chat vs Timeline */}
          <div style={{ display: 'flex', gap: '8px', background: 'rgba(0,0,0,0.3)', padding: '4px', borderRadius: '12px' }}>
            <button
              onClick={() => setViewMode('chat')}
              style={{
                background: viewMode === 'chat' ? 'var(--accent-primary)' : 'transparent',
                color: viewMode === 'chat' ? '#fff' : 'var(--text-muted)',
                border: 'none', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px', transition: 'all 0.2s'
              }}
            >
              <MessageSquare size={15} /> Chat View
            </button>
            <button
              onClick={() => setViewMode('timeline')}
              style={{
                background: viewMode === 'timeline' ? 'var(--accent-primary)' : 'transparent',
                color: viewMode === 'timeline' ? '#fff' : 'var(--text-muted)',
                border: 'none', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px', transition: 'all 0.2s'
              }}
            >
              <Compass size={15} /> Timeline Screen
            </button>
          </div>
        </header>

        {/* SCREEN A: CHAT VIEW FOR SELECTED CHAT */}
        {viewMode === 'chat' && (
          <div className="glass-panel" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            
            {/* Scoped Files Bar */}
            <div style={{ padding: '12px 24px', borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(0,0,0,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Layers size={16} color="var(--accent-cyan)" />
                <span style={{ fontSize: '12px', fontWeight: 600 }}>Attached Notes Context:</span>
                {activeChat.files.length > 0 ? (
                  activeChat.files.map((f, fIdx) => (
                    <span key={fIdx} style={{ background: 'rgba(99,102,241,0.15)', color: 'var(--accent-cyan)', padding: '2px 8px', borderRadius: '6px', fontSize: '11px', border: '1px solid rgba(99,102,241,0.3)' }}>
                      📄 {f.name}
                    </span>
                  ))
                ) : (
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>No notes uploaded yet for this topic</span>
                )}
              </div>

              {/* Upload Button Scoped to this Chat */}
              <label className="btn-secondary" style={{ padding: '6px 14px', fontSize: '12px', cursor: 'pointer' }}>
                <UploadCloud size={14} /> Upload Notes to {activeChat.topic.slice(0, 12)}...
                <input type="file" accept=".pdf,.txt,.md" onChange={handleFileUpload} style={{ display: 'none' }} disabled={isUploading} />
              </label>
            </div>

            {/* Upload Notification Alert */}
            {uploadStatus && (
              <div style={{ padding: '8px 24px', background: uploadStatus.type === 'success' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(244, 63, 94, 0.15)', color: uploadStatus.type === 'success' ? '#10b981' : '#f43f5e', fontSize: '12px', fontWeight: 600 }}>
                {uploadStatus.message}
              </div>
            )}

            {/* Conversation Messages List */}
            <div style={{ flex: 1, padding: '20px 24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {activeChat.messages.map((msg, i) => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
                  <div style={{
                    maxWidth: '80%',
                    padding: '12px 18px',
                    borderRadius: '16px',
                    fontSize: '14px',
                    lineHeight: '1.5',
                    background: msg.role === 'user' ? 'linear-gradient(135deg, var(--accent-primary), var(--accent-cyan))' : 'rgba(30, 41, 59, 0.85)',
                    color: '#fff',
                    border: msg.role === 'user' ? 'none' : '1px solid rgba(255,255,255,0.08)'
                  }}>
                    {msg.content}
                  </div>

                  {msg.sources && msg.sources.length > 0 && (
                    <div style={{ marginTop: '6px', fontSize: '11px', color: 'var(--text-muted)', display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                      <span>Sources:</span>
                      {msg.sources.map((s, sIdx) => (
                        <span key={sIdx} style={{ background: 'rgba(255,255,255,0.06)', padding: '2px 6px', borderRadius: '4px' }}>📄 {s.file}</span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <div style={{ padding: '16px 24px', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', gap: '12px' }}>
              <input
                type="text"
                placeholder={`Ask Silla a question about ${activeChat.topic}...`}
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

        {/* SCREEN B: TIMELINE SCREEN FOR SELECTED CHAT */}
        {viewMode === 'timeline' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '16px', flex: 1, overflow: 'hidden' }}>
            
            {/* Timeline Phases View */}
            <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px', overflowY: 'auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ fontSize: '20px', fontWeight: 800 }}>{activeChat.topic} — Study Timeline</h3>
                  <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>Sequenced learning phases generated from material uploaded to this topic chat.</p>
                </div>
                <button className="btn-secondary" onClick={() => regenerateTimelineForChat(activeChat.id, activeChat.topic)} disabled={isGeneratingTimeline}>
                  <RefreshCw size={14} className={isGeneratingTimeline ? 'spin' : ''} />
                  {isGeneratingTimeline ? 'Regenerating...' : 'Regenerate'}
                </button>
              </div>

              {/* Duolingo Winding Path of Circular Nodes */}
              <div style={{ position: 'relative', margin: '30px 0', padding: '20px 40px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '52px' }}>
                
                {/* Connecting Line */}
                <div style={{
                  position: 'absolute',
                  top: 40,
                  bottom: 40,
                  width: 4,
                  background: 'linear-gradient(to bottom, #10b981, #6366f1, #06b6d4, rgba(255,255,255,0.12))',
                  borderRadius: 2,
                  zIndex: 1
                }} />

                {activeChat.timeline.map((item, idx) => {
                  const status = item.status || (idx === 0 ? 'completed' : idx === 1 ? 'current' : 'locked');
                  const isCompleted = status === 'completed';
                  const isCurrent = status === 'current';
                  const isSelected = selectedPhase?.id === item.id || (selectedPhase === null && idx === 0);

                  // Loosely scattered horizontal offsets (organic zig-zag)
                  const offsets = [0, 65, -35, 75, -20, -70, 40];
                  const xOffset = offsets[idx % offsets.length];

                  const nodeSize = 68; // Uniform size for the inner chunky circle
                  const nodeClass = isCompleted 
                    ? 'duo-node-base duo-node-completed' 
                    : isCurrent 
                      ? 'duo-node-base duo-node-current' 
                      : 'duo-node-base duo-node-locked';

                  // Lucide icon per node state & type
                  const renderNodeIcon = () => {
                    if (isCompleted) {
                      return idx % 2 === 0 ? <MessageSquare size={32} color="#fff" fill="currentColor" /> : <CheckCircle2 size={32} color="#fff" />;
                    }
                    if (isCurrent) {
                      return <Star size={36} color="#fff" fill="currentColor" />;
                    }
                    return <BookOpen size={28} color="#afafaf" />;
                  };

                  return (
                    <div
                      key={item.id || idx}
                      onClick={() => setSelectedPhase(item)}
                      style={{
                        position: 'relative',
                        zIndex: 2,
                        transform: `translateX(${xOffset}px)`,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '8px',
                        margin: '10px 0'
                      }}
                    >
                      {/* Floating Speech Bubble Above Active Node */}
                      {isCurrent && (
                        <div className="duo-speech-bubble">
                          START
                        </div>
                      )}

                      {/* Current Node needs outer ring container, others don't */}
                      {isCurrent ? (
                        <div className="duo-active-ring-container">
                          <div className="duo-active-ring" />
                          <div
                            className={nodeClass}
                            style={{
                              width: nodeSize,
                              height: nodeSize
                            }}
                          >
                            {renderNodeIcon()}
                          </div>
                          <div className="duo-mini-stars">
                            <Star size={14} color="#00cd9c" fill="currentColor" />
                            <Star size={12} color="#e5e5e5" fill="currentColor" style={{ marginTop: '8px' }} />
                          </div>
                        </div>
                      ) : (
                        <div
                          className={nodeClass}
                          style={{
                            width: nodeSize,
                            height: nodeSize,
                            outline: isSelected ? '4px solid rgba(255,255,255,0.4)' : 'none',
                            outlineOffset: '6px'
                          }}
                        >
                          {renderNodeIcon()}
                        </div>
                      )}

                      {/* Label Badge */}
                      <div style={{
                        textAlign: 'center',
                        background: isSelected ? 'rgba(99,102,241,0.35)' : 'rgba(15, 23, 42, 0.95)',
                        padding: '6px 14px',
                        borderRadius: '12px',
                        border: isSelected ? '1px solid var(--accent-cyan)' : '1px solid rgba(255,255,255,0.1)',
                        maxWidth: '210px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
                      }}>
                        <span style={{ fontSize: '10px', color: 'var(--accent-cyan)', fontWeight: 700, textTransform: 'uppercase' }}>
                          {item.phase || `Phase ${idx + 1}`}
                        </span>
                        <h4 style={{ fontSize: '13px', fontWeight: 600, color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {item.topic}
                        </h4>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Sidebar Phase Focus & Quiz Trigger */}
            <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px', overflowY: 'auto' }}>
              {(() => {
                const phaseToDisplay = selectedPhase || activeChat.timeline[0];
                if (!phaseToDisplay) return null;

                return (
                  <>
                    <div>
                      <span style={{ fontSize: '11px', color: 'var(--accent-primary)', fontWeight: 700 }}>SELECTED PHASE CONTENT</span>
                      <h3 style={{ fontSize: '18px', fontWeight: 800, marginTop: '4px' }}>{phaseToDisplay.phase || phaseToDisplay.topic}</h3>
                    </div>

                    <div style={{ background: 'rgba(99,102,241,0.08)', padding: '16px', borderRadius: '12px', borderLeft: '4px solid var(--accent-primary)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#fff' }}>Suggested Material to Cover</h4>
                      <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                        {phaseToDisplay.suggestedContent || phaseToDisplay.description}
                      </p>
                    </div>

                    {/* Quiz this Phase Button */}
                    <button 
                      className="btn-primary" 
                      onClick={() => startQuizForPhase(phaseToDisplay)}
                      style={{ width: '100%', justifyContent: 'center', padding: '12px', marginTop: 'auto' }}
                    >
                      <Zap size={16} /> Quiz this Phase
                    </button>
                  </>
                );
              })()}
            </div>
          </div>
        )}
      </main>

      {/* MODAL 1: NEW CHAT (NEW TOPIC) MODAL */}
      {newChatModalOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
          <form onSubmit={handleCreateNewChat} className="glass-panel" style={{ width: '90%', maxWidth: '420px', padding: '28px', display: 'flex', flexDirection: 'column', gap: '20px', position: 'relative' }}>
            <button type="button" onClick={() => setNewChatModalOpen(false)} style={{ position: 'absolute', top: 20, right: 20, background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
              <X size={20} />
            </button>

            <div>
              <h3 style={{ fontSize: '18px', fontWeight: 800 }}>Create New Topic Chat</h3>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>Enter the name of the subject or course topic (e.g. Operating Systems, DBMS, Networks).</p>
            </div>

            <input
              type="text"
              placeholder="e.g. Computer Networks"
              value={newTopicInput}
              onChange={e => setNewTopicInput(e.target.value)}
              autoFocus
              style={{
                width: '100%',
                background: 'rgba(15, 23, 42, 0.9)',
                border: '1px solid rgba(255,255,255,0.15)',
                padding: '12px 16px',
                borderRadius: '12px',
                color: '#fff',
                fontSize: '14px',
                outline: 'none'
              }}
            />

            <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
              <Plus size={16} /> Create Topic Chat
            </button>
          </form>
        </div>
      )}

      {/* MODAL 2: PHASE QUIZ MODAL */}
      {quizModalOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
          <div className="glass-panel" style={{ width: '90%', maxWidth: '540px', padding: '28px', display: 'flex', flexDirection: 'column', gap: '20px', position: 'relative' }}>
            <button onClick={() => setQuizModalOpen(false)} style={{ position: 'absolute', top: 20, right: 20, background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
              <X size={20} />
            </button>

            {isGeneratingQuiz ? (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <Sparkles size={36} color="var(--accent-primary)" className="float-anim" />
                <h3 style={{ marginTop: '16px', fontSize: '18px' }}>Generating Phase Quiz Questions...</h3>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Using Groq LLM grounded in material for {activeQuizPhaseName}</p>
              </div>
            ) : quizQuestions.length > 0 ? (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <span style={{ fontSize: '12px', color: 'var(--accent-cyan)', fontWeight: 700 }}>{activeQuizPhaseName.toUpperCase()} — Q{currentQuestionIdx + 1}/{quizQuestions.length}</span>
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
                      {currentQuestionIdx < quizQuestions.length - 1 ? 'Next Question' : 'Finish Phase Quiz'} <ChevronRight size={16} />
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
