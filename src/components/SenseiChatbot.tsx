"use client";

import React, { useState, useRef, useEffect } from "react";
import { useAppState } from "@/context/AppStateContext";
import { MessageSquare, X, Send, Sparkles, Bot, User } from "lucide-react";

interface ChatMessage {
  id: string;
  role: "user" | "sensei";
  content: string;
  timestamp: string;
}

interface SenseiChatbotProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SenseiChatbot: React.FC<SenseiChatbotProps> = ({ isOpen, onClose }) => {
  const { ikigai } = useAppState();

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "sensei",
      content: "Konnichiwa. Saya Sensei Zen AI. Mengalami hambatan mental atau bingung memulai tugas hari ini? Ceritakan apa yang kamu rasakan, mari kita cari langkah mikro pertamamu.",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  if (!isOpen) return null;

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || isTyping) return;

    const userText = inputMessage.trim();
    setInputMessage("");

    const userMsg: ChatMessage = {
      id: "usr-" + Date.now(),
      role: "user",
      content: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setIsTyping(true);

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userText,
          history: updatedMessages.slice(-6).map((m) => ({ role: m.role, content: m.content })),
          ikigaiPurpose: ikigai.goalTitle,
        }),
      });
      const data = await res.json();

      const senseiMsg: ChatMessage = {
        id: "sn-" + Date.now(),
        role: "sensei",
        content: data.reply || "Aksi mikro terkecil hari ini lebih berharga daripada niat besar tanpa pelaksanaan.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, senseiMsg]);
    } catch (err) {
      console.error("Sensei Chatbot Error:", err);
      const fallbackMsg: ChatMessage = {
        id: "sn-err-" + Date.now(),
        role: "sensei",
        content: "Ingatlah prinsip Kaizen: tidak perlu sempurna, yang penting berjalan 1% setiap hari.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 w-full max-w-sm sm:max-w-md bg-white dark:bg-[#121214] border border-stone-200 dark:border-stone-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[520px] animate-in slide-in-from-bottom-5 duration-300 font-sans">
      {/* Top Banner */}
      <div className="p-4 bg-stone-900 text-stone-100 flex items-center justify-between border-b border-stone-800">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center shadow-md overflow-hidden">
            <img src="/zenflow.jpeg" alt="Sensei Zen" className="w-full h-full object-cover" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="font-sans font-bold text-sm text-stone-100">Sensei Zen AI</h3>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <p className="text-[10px] text-stone-400 font-sans">Konsultasi Produktivitas &amp; Ikigai</p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 text-stone-400 hover:text-white hover:bg-stone-800 rounded-xl transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-stone-50/50 dark:bg-stone-950/50">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
          >
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs shrink-0 overflow-hidden ${
                msg.role === "user"
                  ? "bg-emerald-700 text-white font-sans font-semibold"
                  : "bg-stone-900 dark:bg-stone-100 text-stone-100 dark:text-stone-950"
              }`}
            >
              {msg.role === "user" ? "U" : <img src="/zenflow.jpeg" alt="Sensei Zen" className="w-full h-full object-cover" />}
            </div>

            <div
              className={`max-w-[80%] p-3.5 rounded-2xl text-xs leading-relaxed font-sans ${
                msg.role === "user"
                  ? "bg-emerald-700 text-white rounded-tr-none shadow-sm"
                  : "bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 border border-stone-200/80 dark:border-stone-800 rounded-tl-none shadow-sm"
              }`}
            >
              <p>{msg.content}</p>
              <span
                className={`text-[9px] block mt-1 ${
                  msg.role === "user" ? "text-emerald-200 text-right" : "text-stone-400 text-left"
                }`}
              >
                {msg.timestamp}
              </span>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-2 text-xs font-sans text-stone-500 italic p-2">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600 animate-spin" />
            <span>Sensei Zen sedang berpikir...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <form onSubmit={handleSendMessage} className="p-3 bg-white dark:bg-[#121214] border-t border-stone-200/80 dark:border-stone-800 flex items-center gap-2">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Tanyakan kendala produktivitasmu..."
          className="flex-1 px-3.5 py-2.5 text-xs font-sans rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
        />
        <button
          type="submit"
          disabled={!inputMessage.trim() || isTyping}
          className="p-2.5 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-40 text-white rounded-xl transition-all shadow-md active:scale-95"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
};
