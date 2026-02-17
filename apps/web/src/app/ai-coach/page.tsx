'use client';
import { useState } from 'react';
import AppShell from '../../components/AppShell';
import { Bot, Send, Sparkles } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function AiCoachPage() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Ciao! Sono il tuo AI Coach PetVerse 🐾 Come posso aiutarti con i tuoi animali domestici oggi?' },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const suggestions = [
    'Il mio cane non mangia, cosa faccio?',
    'Quando devo vaccinare il gattino?',
    'Come addestrare un cucciolo',
    'Alimentazione corretta per gatti',
  ];

  const send = async (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { role: 'user', content: text };
    setMessages((m) => [...m, userMsg]);
    setInput('');
    setLoading(true);

    setTimeout(() => {
      setMessages((m) => [
        ...m,
        {
          role: 'assistant',
          content: 'Grazie per la domanda! Al momento il servizio AI è in modalità demo. Collega la tua API key OpenAI nelle impostazioni per attivare le risposte intelligenti. Nel frattempo, ti consiglio di consultare il tuo veterinario per questioni urgenti. 🏥',
        },
      ]);
      setLoading(false);
    }, 1500);
  };

  return (
    <AppShell>
      <div className="max-w-3xl mx-auto h-[calc(100vh-8rem)] flex flex-col">
        <div className="mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#F0FDFA] flex items-center justify-center">
              <Bot className="w-6 h-6 text-[#4ECDC4]" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[#1E293B]">AI Coach</h1>
              <p className="text-[#94A3B8] text-sm">Assistente veterinario intelligente</p>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto space-y-4 mb-4">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-[#6C63FF] text-white rounded-br-md'
                    : 'bg-white border border-[#E2E8F0] text-[#1E293B] rounded-bl-md'
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-white border border-[#E2E8F0] px-4 py-3 rounded-2xl rounded-bl-md">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-[#94A3B8] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-[#94A3B8] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-[#94A3B8] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
        </div>

        {messages.length <= 1 && (
          <div className="grid grid-cols-2 gap-2 mb-4">
            {suggestions.map((s) => (
              <button
                key={s}
                onClick={() => send(s)}
                className="text-left p-3 rounded-xl border border-[#E2E8F0] text-sm text-[#475569] hover:bg-[#F8FAFC] hover:border-[#6C63FF] transition-colors flex items-start gap-2"
              >
                <Sparkles className="w-4 h-4 text-[#6C63FF] shrink-0 mt-0.5" />
                {s}
              </button>
            ))}
          </div>
        )}

        <div className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && send(input)}
            placeholder="Scrivi un messaggio..."
            className="input flex-1"
            disabled={loading}
          />
          <button
            onClick={() => send(input)}
            disabled={loading || !input.trim()}
            className="btn-primary px-4 disabled:opacity-50"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </AppShell>
  );
}
