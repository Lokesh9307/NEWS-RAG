import React, { useState, useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";
import { initSocket, getSocket, joinSessionRoom } from "../services/socket";
import { Send, Loader2, Bot, User } from "lucide-react";
import { formatSummary } from "../utils/helper";

export default function Chat({ sessionId }) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesRef = useRef(null);

  useEffect(() => {
    const s = initSocket();

    s.on("bot_typing", () => {
      setIsTyping(true);
    });

    s.on("bot_chunk", ({ chunk }) => {
      setMessages((prev) => {
        const updated = [...prev];
        const last = updated[updated.length - 1];
        if (last?.id === "typing") {
          updated[updated.length - 1] = { ...last, bot: last.bot + chunk };
        } else {
          updated.push({ id: "typing", bot: chunk });
        }
        return updated;
      });
    });

    s.on("bot_done", ({ full }) => {
      setIsTyping(false);
      setMessages((prev) => {
        const updated = [...prev];
        if (updated.length > 0 && updated[updated.length - 1].id === "typing") {
          updated[updated.length - 1] = { id: Date.now(), bot: full };
        } else {
          updated.push({ id: Date.now(), bot: full });
        }
        return updated;
      });
    });

    s.on("bot_error", ({ error }) => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        { id: Date.now(), bot: `Error: ${error}` },
      ]);
    });

    return () => {
      s.off("bot_typing");
      s.off("bot_chunk");
      s.off("bot_done");
      s.off("bot_error");
    };
  }, []);

  useEffect(() => {
    if (sessionId) {
      joinSessionRoom(sessionId);
    }
  }, [sessionId]);

  async function handleSend(e) {
    e.preventDefault();
    if (!input || !sessionId) return;
    setMessages((m) => [...m, { id: Date.now(), user: input }]);
    const s = getSocket();
    s.emit("user_message", { sessionId, message: input });
    setInput("");
  }

  return (
    <div className="flex flex-col h-[75vh] min-h-[500px] max-h-[800px] bg-gradient-to-br from-[#f5f1eb] via-[#f0e6d8] to-[#ebe0d2] rounded-3xl shadow-2xl border border-[#d4c4b0] backdrop-blur-sm overflow-hidden">
      {/* Header with subtle gradient */}
      <div className="bg-gradient-to-r from-[#8b5f47] to-[#a0704f] p-4 sm:p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#f5f1eb] flex items-center justify-center shadow-md">
              <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-[#8b5f47]" />
            </div>
            <div>
              <h3 className="text-[#f5f1eb] font-semibold text-sm sm:text-base">AI Assistant</h3>
              <p className="text-[#d4c4b0] text-xs sm:text-sm">
                {sessionId ? "Online" : "Disconnected"}
              </p>
            </div>
          </div>
          <div className="w-2 h-2 rounded-full bg-green-400 shadow-lg animate-pulse"></div>
        </div>
      </div>

      {/* Messages */}
      <div
        ref={messagesRef}
        className="flex-1 overflow-auto space-y-3 sm:space-y-4 p-4 sm:p-6 scrollbar-thin scrollbar-thumb-[#c4a788] scrollbar-track-transparent hover:scrollbar-thumb-[#8b5f47] transition-colors"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 80%, rgba(139, 95, 71, 0.03) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(196, 167, 136, 0.03) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(245, 241, 235, 0.05) 0%, transparent 50%)
          `
        }}
      >
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center py-8 sm:py-12">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-[#8b5f47] to-[#a0704f] flex items-center justify-center mb-4 shadow-lg">
              <Bot className="w-8 h-8 sm:w-10 sm:h-10 text-[#f5f1eb]" />
            </div>
            <h4 className="text-[#5d4037] font-semibold text-lg sm:text-xl mb-2">Start a Conversation</h4>
            <p className="text-[#8b5f47] text-sm sm:text-base max-w-xs sm:max-w-sm">
              {sessionId ? "Send a message to begin chatting with AI" : "Create a session to get started"}
            </p>
          </div>
        )}
        
        {messages.map((m) =>
          m.user ? (
            <MessageBubble
              key={m.id}
              who="user"
              text={m.user}
              icon={<User className="w-4 h-4 sm:w-5 sm:h-5 text-[#8b5f47]" />}
            />
          ) : (
            <MessageBubble
              key={m.id}
              who="bot"
              text={formatSummary(m.bot)}
              icon={<Bot className="w-4 h-4 sm:w-5 sm:h-5 text-[#f5f1eb]" />}
            />
          )
        )}
        
        {isTyping && (
          <div className="flex items-center justify-start mb-4">
            <div className="flex items-center bg-white/60 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-md border border-[#d4c4b0]/30">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#8b5f47] to-[#a0704f] flex items-center justify-center mr-3 shadow-sm">
                <Bot className="w-4 h-4 text-[#f5f1eb]" />
              </div>
              <div className="flex items-center text-[#5d4037] text-sm font-medium">
                <Loader2 className="w-4 h-4 mr-2 animate-spin text-[#8b5f47]" />
                <span>AI is thinking</span>
                <div className="flex ml-2 space-x-1">
                  <div className="w-1.5 h-1.5 bg-[#8b5f47] rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-[#8b5f47] rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                  <div className="w-1.5 h-1.5 bg-[#8b5f47] rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input Section */}
      <div className="p-4 sm:p-6 bg-gradient-to-r from-[#f0e6d8] to-[#ebe0d2] border-t border-[#d4c4b0]/30">
        <form onSubmit={handleSend} className="flex items-center gap-3 sm:gap-4">
          <div className="flex-1 relative group">
            <input
              className="w-full p-3 sm:p-4 pr-12 sm:pr-14 rounded-2xl bg-white/70 backdrop-blur-sm border border-[#d4c4b0]/50 text-[#3e2723] placeholder-[#8b5f47]/60 focus:ring-2 focus:ring-[#8b5f47]/30 focus:border-[#8b5f47] outline-none transition-all duration-300 shadow-sm hover:shadow-md text-sm sm:text-base"
              placeholder={
                sessionId ? "Type your message here..." : "Create a session first to start chatting"
              }
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={!sessionId}
            />
            {input && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#8b5f47]/40 text-xs sm:text-sm">
                {input.length}
              </div>
            )}
          </div>
          
          <button
            type="submit"
            disabled={!sessionId || !input.trim()}
            className="bg-gradient-to-r from-[#8b5f47] to-[#a0704f] px-4 sm:px-6 py-3 sm:py-4 rounded-2xl text-white flex items-center justify-center gap-2 hover:from-[#7a4f3a] hover:to-[#8d5f42] disabled:from-[#c4a788] disabled:to-[#b8997d] disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 min-w-[48px] sm:min-w-[56px]"
          >
            <Send className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden sm:inline text-sm font-medium">Send</span>
          </button>
        </form>
        
        {!sessionId && (
          <p className="text-[#8b5f47]/70 text-xs sm:text-sm mt-2 text-center">
            Please create or join a session to start messaging
          </p>
        )}
      </div>
    </div>
  );
}