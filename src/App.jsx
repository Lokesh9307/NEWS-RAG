import React, { useState, useEffect } from 'react'
import Chat from './components/Chat'
import SessionManager from './components/SessionManager'
import { initSocket } from './services/socket'
import { MessageSquare, Settings, Menu, X, Sparkles } from 'lucide-react'

export default function App() {
  const [sessionId, setSessionId] = useState(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    initSocket();
  }, [])

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5f1eb] via-[#f0e6d8] to-[#ebe0d2] relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-[#8b5f47]/20 to-[#a0704f]/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-[#c4a788]/20 to-[#b8997d]/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-[#d4c4b0]/20 to-[#f0e6d8]/20 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 bg-white/40 backdrop-blur-md border-b border-[#d4c4b0]/30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Title */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#8b5f47] to-[#a0704f] rounded-xl shadow-lg flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-[#f5f1eb]" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-[#3e2723] to-[#5d4037] bg-clip-text text-transparent">
                  AI Chat Assistant
                </h1>
                <p className="text-xs sm:text-sm text-[#8b5f47]/70 hidden sm:block">
                  Intelligent conversations made simple
                </p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-4">
              <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm rounded-xl px-4 py-2 border border-[#d4c4b0]/30">
                <div className={`w-2 h-2 rounded-full ${sessionId ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`}></div>
                <span className="text-sm text-[#5d4037] font-medium">
                  {sessionId ? 'Connected' : 'Disconnected'}
                </span>
              </div>
              <button className="p-2 bg-white/60 backdrop-blur-sm rounded-xl border border-[#d4c4b0]/30 hover:bg-white/80 transition-all duration-300">
                <Settings className="w-5 h-5 text-[#8b5f47]" />
              </button>
            </div>

            {/* Mobile menu button */}
            <button 
              onClick={toggleSidebar}
              className="md:hidden p-2 bg-white/60 backdrop-blur-sm rounded-xl border border-[#d4c4b0]/30 hover:bg-white/80 transition-all duration-300"
            >
              {sidebarOpen ? (
                <X className="w-6 h-6 text-[#8b5f47]" />
              ) : (
                <Menu className="w-6 h-6 text-[#8b5f47]" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 p-2 sm:p-3 lg:p-4">
        <div className="max-w-full mx-auto h-full">
          {/* Desktop Layout */}
          <div className="hidden md:grid md:grid-cols-10 gap-4 lg:gap-6 h-full">
            {/* Sidebar - 40% width */}
            <div className="md:col-span-4">
              <div className="bg-white/60 backdrop-blur-lg rounded-3xl shadow-xl border border-[#d4c4b0]/30 p-6 h-full overflow-hidden">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 bg-gradient-to-br from-[#8b5f47] to-[#a0704f] rounded-xl flex items-center justify-center shadow-md">
                    <Settings className="w-4 h-4 text-[#f5f1eb]" />
                  </div>
                  <h2 className="text-lg lg:text-xl font-bold text-[#3e2723]">Control Panel</h2>
                </div>
                <div className="h-full overflow-auto scrollbar-thin scrollbar-thumb-[#c4a788] scrollbar-track-transparent">
                  <SessionManager sessionId={sessionId} setSessionId={setSessionId} />
                </div>
              </div>
            </div>

            {/* Chat Area - 60% width */}
            <div className="md:col-span-6">
              <div className="h-full flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-[#8b5f47] to-[#a0704f] rounded-xl flex items-center justify-center shadow-md">
                      <MessageSquare className="w-4 h-4 text-[#f5f1eb]" />
                    </div>
                    <h2 className="text-lg lg:text-xl font-bold text-[#3e2723]">Conversation</h2>
                  </div>
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#8b5f47]" />
                    <span className="text-sm text-[#8b5f47]/80 hidden sm:inline">AI Powered</span>
                  </div>
                </div>
                <div className="flex-1">
                  <Chat sessionId={sessionId} />
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="md:hidden h-full relative">
            {/* Mobile Chat (Always Visible) */}
            <div className={`h-full transition-all duration-300 ${sidebarOpen ? 'blur-sm' : ''}`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-[#8b5f47] to-[#a0704f] rounded-xl flex items-center justify-center shadow-md">
                    <MessageSquare className="w-4 h-4 text-[#f5f1eb]" />
                  </div>
                  <h2 className="text-lg font-bold text-[#3e2723]">Chat</h2>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${sessionId ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`}></div>
                  <span className="text-xs text-[#5d4037] font-medium">
                    {sessionId ? 'Online' : 'Offline'}
                  </span>
                </div>
              </div>
              <Chat sessionId={sessionId} />
            </div>

            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
              <>
                {/* Backdrop */}
                <div 
                  className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
                  onClick={toggleSidebar}
                ></div>
                
                {/* Sidebar */}
                <div className="fixed right-0 top-0 h-full w-80 max-w-[85vw] bg-white/95 backdrop-blur-lg shadow-2xl border-l border-[#d4c4b0]/30 z-50 overflow-hidden">
                  {/* Mobile Sidebar Header */}
                  <div className="flex items-center justify-between p-4 border-b border-[#d4c4b0]/30 bg-gradient-to-r from-[#8b5f47]/5 to-[#a0704f]/5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-[#8b5f47] to-[#a0704f] rounded-xl flex items-center justify-center shadow-md">
                        <Settings className="w-4 h-4 text-[#f5f1eb]" />
                      </div>
                      <h2 className="text-lg font-bold text-[#3e2723]">Sessions</h2>
                    </div>
                    <button 
                      onClick={toggleSidebar}
                      className="p-2 bg-white/60 rounded-xl hover:bg-white/80 transition-colors"
                    >
                      <X className="w-5 h-5 text-[#8b5f47]" />
                    </button>
                  </div>
                  
                  {/* Mobile Sidebar Content */}
                  <div className="p-4 h-full overflow-auto scrollbar-thin scrollbar-thumb-[#c4a788] scrollbar-track-transparent">
                    <SessionManager sessionId={sessionId} setSessionId={setSessionId} />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 bg-white/30 backdrop-blur-md border-t border-[#d4c4b0]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between text-sm text-[#8b5f47]/70">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span className="hidden sm:inline">Powered by Advanced AI Technology</span>
              <span className="sm:hidden">AI Powered</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="hidden sm:inline">Made with ❤️ for better conversations</span>
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 bg-[#8b5f47] rounded-full animate-pulse"></div>
                <div className="w-1.5 h-1.5 bg-[#a0704f] rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                <div className="w-1.5 h-1.5 bg-[#c4a788] rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}