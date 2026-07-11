import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { X, Settings, ShieldCheck } from 'lucide-react';
import ChatInterface from '../components/ChatInterface';
import { createConversation } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

export default function Assessment() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const startConversation = async () => {
      try {
        const conv = await createConversation(user?.id);
        setConversationId(conv._id);
        localStorage.setItem('conversationId', conv._id);
        setIsLoading(false);
      } catch (error) {
        console.error('Error starting conversation:', error);
        setIsLoading(false);
      }
    };
    startConversation();
  }, [user]);

  const handleComplete = () => {
    setIsComplete(true);
    setTimeout(() => {
      navigate('/processing');
    }, 1500);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--theme-bg)' }}>
        <div className="text-center">
          <div className="w-12 h-12 border-4 rounded-full animate-spin mx-auto" style={{ borderColor: 'var(--theme-brand) transparent transparent transparent' }} />
          <p className="mt-4 text-[var(--theme-text-muted)]">Loading your session...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: 'var(--theme-bg)' }} className="min-h-screen flex flex-col font-sans antialiased">
      {/* Top Navigation */}
      <header style={{ backgroundColor: 'var(--theme-surface)', borderBottomColor: 'var(--theme-border)' }} className="border-b px-4 md:px-6 py-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/')}
            aria-label="Close assessment"
            style={{ color: 'var(--theme-text-muted)' }}
            className="p-2 rounded-lg transition-colors cursor-pointer hover:opacity-70"
          >
            <X size={18} />
          </button>
          <div className="flex flex-col">
            <span style={{ color: 'var(--theme-brand)' }} className="text-[10px] font-bold uppercase tracking-[0.1em]">
              {isComplete ? 'Complete!' : 'Building Your Profile'}
            </span>
            <div className="flex items-center gap-2 mt-1">
              <div style={{ backgroundColor: 'var(--theme-border)' }} className="w-28 h-1 rounded-full overflow-hidden">
                <motion.div
                  style={{ backgroundColor: 'var(--theme-brand)' }}
                  className="h-full"
                  initial={{ width: 0 }}
                  animate={{ width: isComplete ? '100%' : '33%' }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                />
              </div>
              <span style={{ color: 'var(--theme-text-soft)' }} className="text-[10.5px] font-semibold">{isComplete ? '100%' : '33%'}</span>
            </div>
          </div>
        </div>
        <button
          aria-label="Settings"
          style={{ color: 'var(--theme-text-muted)' }}
          className="p-2 rounded-lg transition-colors cursor-pointer hover:opacity-70"
        >
          <Settings size={18} />
        </button>
      </header>

      {/* Card Container */}
      <main className="flex-1 overflow-hidden p-4 md:p-8 flex justify-center">
        <div
          style={{
            backgroundColor: 'var(--theme-surface)',
            border: '2px solid var(--theme-border)',
            boxShadow: '4px 4px 0 var(--theme-ink)',
          }}
          className="w-full max-w-2xl rounded-xl flex flex-col h-full"
        >
          {/* Card Header */}
          <div className="p-6 flex flex-col items-center justify-center border-b" style={{ borderColor: 'var(--theme-border-soft)' }}>
            <div style={{ backgroundColor: 'var(--theme-brand-light)', borderColor: 'var(--theme-brand)', color: 'var(--theme-brand)' }} className="w-10 h-10 border rounded-lg flex items-center justify-center mb-4">
              <ShieldCheck className="w-5 h-5" strokeWidth={2.25} />
            </div>
            <h2 style={{ color: 'var(--theme-text)' }} className="font-serif text-xl font-semibold tracking-tight">Let's build your profile</h2>
            <p style={{ color: 'var(--theme-text-muted)' }} className="text-xs text-center max-w-xs mt-1.5 leading-relaxed">
              Speak naturally. We'll adapt follow-up prompts dynamically based on what you share.
            </p>
          </div>

          {/* Chat Area */}
          <div className="flex-1 overflow-hidden p-4 md:p-6">
            {conversationId && (
              <ChatInterface
                conversationId={conversationId}
                onMessageSent={() => {}}
                onComplete={handleComplete}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
