import React, { useState } from 'react'
import { createSession, getHistory, clearSession } from '../services/api'
import { Plus, History, Trash2, Loader2, MessageCircle, Clock, User, Bot } from 'lucide-react'

export default function SessionManager({ sessionId, setSessionId }) {
    const [loading, setLoading] = useState(false)
    const [historyPreview, setHistoryPreview] = useState([])

    async function handleNew() {
        setLoading(true)
        const res = await createSession()
        setSessionId(res.sessionId)
        setHistoryPreview([])
        setLoading(false)
    }

    async function handleLoad() {
        if (!sessionId) return
        setLoading(true)
        const res = await getHistory(sessionId)
        setHistoryPreview(res.history || [])
        setLoading(false)
    }

    async function handleClear() {
        if (!sessionId) return
        setLoading(true)
        await clearSession(sessionId)
        setHistoryPreview([])
        setLoading(false)
    }

    return (
        <div className="bg-gradient-to-br from-[#f5f1eb] via-[#f0e6d8] to-[#ebe0d2] rounded-3xl shadow-xl border border-[#d4c4b0] p-4 sm:p-6 backdrop-blur-sm">
            {/* Header */}
            <div className="mb-6">
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-[#8b5f47] to-[#a0704f] flex items-center justify-center shadow-lg">
                        <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-[#f5f1eb]" />
                    </div>
                    <h2 className="text-lg sm:text-xl font-bold text-[#3e2723]">Session Manager</h2>
                </div>
                <p className="text-sm text-[#8b5f47]/70">Manage your chat sessions and history</p>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6">
                <button 
                    onClick={handleNew} 
                    disabled={loading}
                    className="group relative bg-gradient-to-r from-[#8b5f47] to-[#a0704f] text-[#f5f1eb] py-3 px-4 rounded-2xl font-semibold text-sm sm:text-base hover:from-[#7a4f3a] hover:to-[#8d5f42] disabled:from-[#c4a788] disabled:to-[#b8997d] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
                >
                    {loading ? (
                        <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                    ) : (
                        <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                    )}
                    <span>New Session</span>
                </button>

                <button 
                    onClick={handleLoad} 
                    disabled={loading || !sessionId}
                    className="group bg-white/70 backdrop-blur-sm border-2 border-[#8b5f47]/30 text-[#8b5f47] py-3 px-4 rounded-2xl font-semibold text-sm sm:text-base hover:bg-[#8b5f47] hover:text-[#f5f1eb] hover:border-[#8b5f47] disabled:bg-[#f5f1eb]/50 disabled:text-[#8b5f47]/40 disabled:border-[#d4c4b0] transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
                >
                    {loading ? (
                        <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                    ) : (
                        <History className="w-4 h-4 sm:w-5 sm:h-5" />
                    )}
                    <span>Load History</span>
                </button>

                <button 
                    onClick={handleClear} 
                    disabled={loading || !sessionId}
                    className="group bg-white/70 backdrop-blur-sm border-2 border-red-400/50 text-red-600 py-3 px-4 rounded-2xl font-semibold text-sm sm:text-base hover:bg-red-500 hover:text-white hover:border-red-500 disabled:bg-[#f5f1eb]/50 disabled:text-red-400/40 disabled:border-red-300/30 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
                >
                    {loading ? (
                        <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                    ) : (
                        <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                    )}
                    <span>Clear Session</span>
                </button>
            </div>

            {/* Current Session Info */}
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 mb-6 border border-[#d4c4b0]/30 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-4 h-4 text-[#8b5f47]" />
                    <span className="text-sm font-semibold text-[#5d4037]">Current Session</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-sm text-[#8b5f47]">ID:</span>
                    <code className="bg-[#8b5f47]/10 text-[#5d4037] px-3 py-1 rounded-xl text-sm font-mono border border-[#8b5f47]/20 flex-1 truncate">
                        {sessionId || 'No active session'}
                    </code>
                    {sessionId && (
                        <div className="w-2 h-2 bg-green-400 rounded-full shadow-sm animate-pulse"></div>
                    )}
                </div>
            </div>

            {/* History Preview */}
            <div className="bg-white/40 backdrop-blur-sm rounded-2xl border border-[#d4c4b0]/30 shadow-sm overflow-hidden">
                <div className="bg-gradient-to-r from-[#8b5f47]/10 to-[#a0704f]/10 px-4 py-3 border-b border-[#d4c4b0]/30">
                    <div className="flex items-center gap-2">
                        <History className="w-4 h-4 text-[#8b5f47]" />
                        <span className="text-sm font-semibold text-[#5d4037]">
                            Chat History ({historyPreview.length} messages)
                        </span>
                    </div>
                </div>

                <div className="p-4 max-h-64 sm:max-h-80 overflow-auto scrollbar-thin scrollbar-thumb-[#c4a788] scrollbar-track-transparent">
                    {historyPreview.length === 0 ? (
                        <div className="text-center py-8">
                            <div className="w-12 h-12 bg-[#8b5f47]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                                <MessageCircle className="w-6 h-6 text-[#8b5f47]/40" />
                            </div>
                            <p className="text-[#8b5f47]/60 text-sm">No chat history available</p>
                            <p className="text-[#8b5f47]/40 text-xs mt-1">Start a conversation or load an existing session</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {historyPreview.map((item, index) => (
                                <div key={item.id} className="group bg-white/60 backdrop-blur-sm rounded-xl p-3 shadow-sm border border-[#d4c4b0]/20 hover:shadow-md transition-all duration-300">
                                    {/* Timestamp */}
                                    <div className="flex items-center gap-2 text-xs text-[#8b5f47]/60 mb-2">
                                        <Clock className="w-3 h-3" />
                                        <span>{new Date(item.ts).toLocaleString()}</span>
                                        <div className="ml-auto bg-[#8b5f47]/10 px-2 py-1 rounded-full text-[#5d4037] font-medium">
                                            #{index + 1}
                                        </div>
                                    </div>
                                    
                                    {/* User Message */}
                                    <div className="flex items-start gap-2 mb-2">
                                        <div className="w-5 h-5 bg-gradient-to-br from-[#c4a788] to-[#b8997d] rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
                                            <User className="w-2.5 h-2.5 text-[#f5f1eb]" />
                                        </div>
                                        <div className="flex-1 bg-gradient-to-r from-[#8b5f47]/10 to-transparent rounded-lg p-2">
                                            <span className="text-xs font-medium text-[#8b5f47] uppercase tracking-wide">You</span>
                                            <p className="text-sm text-[#3e2723] mt-1 line-clamp-2">{item.user}</p>
                                        </div>
                                    </div>
                                    
                                    {/* Bot Response */}
                                    <div className="flex items-start gap-2">
                                        <div className="w-5 h-5 bg-gradient-to-br from-[#8b5f47] to-[#a0704f] rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
                                            <Bot className="w-2.5 h-2.5 text-[#f5f1eb]" />
                                        </div>
                                        <div className="flex-1 bg-gradient-to-r from-[#a0704f]/10 to-transparent rounded-lg p-2">
                                            <span className="text-xs font-medium text-[#a0704f] uppercase tracking-wide">Assistant</span>
                                            <p className="text-sm text-[#5d4037] mt-1 line-clamp-3">{item.bot}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {loading && (
                <div className="absolute inset-0 bg-[#f5f1eb]/80 backdrop-blur-sm rounded-3xl flex items-center justify-center">
                    <div className="bg-white/90 rounded-2xl p-6 shadow-xl border border-[#d4c4b0]/30 flex items-center gap-3">
                        <Loader2 className="w-6 h-6 text-[#8b5f47] animate-spin" />
                        <span className="text-[#5d4037] font-medium">Processing...</span>
                    </div>
                </div>
            )}
        </div>
    )
}