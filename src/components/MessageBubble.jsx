export default function MessageBubble({ who, text, icon }) {
  const isUser = who === "user";
  
  return (
    <div
      className={`flex items-start gap-2 sm:gap-3 mb-4 ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      {!isUser && (
        <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-[#8b5f47] to-[#a0704f] rounded-full shadow-lg flex items-center justify-center ring-2 ring-[#f5f1eb] ring-opacity-50 order-first">
          {icon}
        </div>
      )}
      
      <div
        className={`relative max-w-[75%] sm:max-w-[70%] p-3 sm:p-4 rounded-2xl text-sm sm:text-base leading-relaxed shadow-md transition-all duration-300 hover:shadow-lg group ${
          isUser
            ? "bg-gradient-to-br from-[#8b5f47] to-[#7a4f3a] text-[#f5f1eb] rounded-br-sm"
            : "bg-white/80 backdrop-blur-sm text-[#3e2723] border border-[#d4c4b0]/30 rounded-bl-sm"
        }`}
      >
        {/* Message content */}
        <div className="relative z-10">
          {text}
        </div>
        
        {/* Subtle glow effect on hover */}
        <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 ${
          isUser
            ? "bg-gradient-to-br from-[#f5f1eb] to-transparent"
            : "bg-gradient-to-br from-[#8b5f47] to-transparent"
        } ${isUser ? "rounded-br-sm" : "rounded-bl-sm"}`}></div>
        
        {/* Message tail */}
        <div
          className={`absolute bottom-0 w-3 h-3 transform rotate-45 ${
            isUser
              ? "right-0 translate-x-1 bg-gradient-to-br from-[#8b5f47] to-[#7a4f3a]"
              : "left-0 -translate-x-1 bg-white/80 border-l border-b border-[#d4c4b0]/30"
          }`}
        ></div>
      </div>
      
      {isUser && (
        <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-[#c4a788] to-[#b8997d] rounded-full shadow-lg flex items-center justify-center ring-2 ring-[#f5f1eb] ring-opacity-50 order-last">
          {icon}
        </div>
      )}
      
      {/* Timestamp (subtle) */}
      <div className={`text-xs text-[#8b5f47]/40 mt-auto pb-1 ${
        isUser ? "order-first mr-2" : "order-last ml-2"
      }`}>
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
}