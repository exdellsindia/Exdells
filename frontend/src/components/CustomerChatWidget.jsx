// CustomerChatWidget.jsx
// Floating chat widget for Exdells Website
// Styled to match Exdells branding, with automated messages and simple chat logic

import React, { useState, useRef, useEffect } from 'react';

const BOT_NAME = 'Support Team';
const BRAND = 'Exdells';
const BRAND_TAGLINE = 'Empowering Your Solar Journey';

const initialMessages = [
  { role: 'bot', content: 'Hello\nHow may I help you today?' },
];

export default function CustomerChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');
  const bottomRef = useRef(null);

  useEffect(() => {
    if (open && bottomRef.current) bottomRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [messages, open]);

  // Bot logic: ask for name after first user message, then ask for phone number after name
  useEffect(() => {
    if (messages.length === 2 && messages[1].role === 'user') {
      setTimeout(() => {
        setMessages(prev => [...prev, { role: 'bot', content: 'Kindly Enter Your Name' }]);
      }, 800);
    }
    // If user enters name (third message, role user, after bot asked for name)
    if (
      messages.length === 4 &&
      messages[2].role === 'bot' && messages[2].content.includes('Enter Your Name') &&
      messages[3].role === 'user'
    ) {
      setTimeout(() => {
        setMessages(prev => [...prev, { role: 'bot', content: 'Please enter your phone number' }]);
      }, 800);
    }
    // If user enters phone number (fifth message, role user, after bot asked for phone)
    if (
      messages.length === 6 &&
      messages[4].role === 'bot' && messages[4].content.includes('phone number') &&
      messages[5].role === 'user'
    ) {
      setTimeout(() => {
        setMessages(prev => [...prev, { role: 'bot', content: 'Thanks for response. Connect with our team.' }]);
      }, 800);
    }
  }, [messages]);

  const send = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { role: 'user', content: input.trim() }]);
    setInput('');
  };

  return (
    <>
      {/* Floating button */}
      {!open && (
        <button
          className="fixed bottom-6 right-6 z-50 bg-[#FFC857] text-[#0A223D] rounded-full shadow-xl w-14 h-14 flex items-center justify-center border-none hover:scale-105 transition-all"
          onClick={() => setOpen(true)}
          aria-label="Open chat"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#0A223D" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12c0 1.624.39 3.204 1.13 4.62L2 22l5.56-1.13A9.96 9.96 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18c-1.47 0-2.89-.36-4.13-1.04l-.29-.16-3.3.67.67-3.22-.17-.29A7.96 7.96 0 0 1 4 12c0-4.418 3.582-8 8-8s8 3.582 8 8-3.582 8-8 8zm4.13-5.04c-.2-.1-1.18-.58-1.36-.65-.18-.07-.31-.1-.44.1-.13.2-.5.65-.62.78-.12.13-.23.15-.43.05-.2-.1-.84-.31-1.6-.98-.59-.52-.99-1.16-1.1-1.36-.12-.2-.01-.31.09-.41.09-.09.2-.23.3-.35.1-.12.13-.2.2-.33.07-.13.04-.25-.02-.35-.06-.1-.44-1.06-.6-1.45-.16-.39-.32-.34-.44-.35-.11-.01-.25-.01-.39-.01-.13 0-.35.05-.53.23-.18.18-.7.68-.7 1.65s.72 1.92.82 2.06c.1.13 1.42 2.17 3.45 2.96.48.17.85.27 1.14.34.48.1.92.09 1.27.06.39-.04 1.18-.48 1.35-.94.17-.46.17-.85.12-.94-.05-.09-.18-.13-.38-.23z"/></svg>
        </button>
      )}
      {/* Chat widget */}
      {open && (
        <div className="fixed bottom-0 left-0 right-0 z-50 w-full sm:left-auto sm:right-6 sm:bottom-6 sm:w-80 sm:max-w-xs bg-[#0A223D] rounded-t-2xl sm:rounded-2xl shadow-2xl border border-[#FFC857] flex flex-col overflow-hidden animate-fadeIn pb-safe">
          {/* Header */}
          <div className="flex items-center gap-2 bg-[#0A223D] px-4 py-3 border-b border-[#FFC857]">
            {/* Logo or fallback */}
            {/* <img src={logo} alt="Exdells Logo" className="w-8 h-8 rounded-full border border-white" /> */}
            <div className="w-8 h-8 rounded-full bg-[#FFC857] flex items-center justify-center font-bold text-[#0A223D] border-2 border-[#0A223D]">E</div>
            <div className="flex flex-col">
              <span className="font-semibold text-sm text-[#FFC857]">{BRAND} Support</span>
              <span className="text-xs opacity-80 text-[#FFC857]">{BRAND_TAGLINE}</span>
            </div>
            <button className="ml-auto text-[#FFC857] hover:text-white" onClick={() => setOpen(false)} aria-label="Close chat">
              &times;
            </button>
          </div>
          {/* Messages */}
          <div className="flex-1 bg-[#0A223D] px-3 py-2 space-y-2 overflow-y-auto" style={{ minHeight: 220 }}>
            {messages.map((msg, i) => (
              <div key={i} className={msg.role === 'bot' ? 'flex items-start gap-2' : 'flex justify-end'}>
                {msg.role === 'bot' && (
                  <div className="w-7 h-7 rounded-full bg-[#FFC857] flex items-center justify-center text-[#0A223D] font-bold text-xs border-2 border-[#0A223D]">S</div>
                )}
                <div
                  className={
                    msg.role === 'bot'
                      ? 'bg-[#FFC857] text-[#0A223D] rounded-xl px-3 py-2 text-sm font-semibold shadow-sm border border-[#FFC857]'
                      : 'bg-[#0A223D] text-[#FFC857] rounded-xl px-3 py-2 text-sm font-semibold shadow-md border border-[#FFC857]'
                  }
                  style={msg.role === 'user' ? { borderTopRightRadius: 0 } : {}}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>
          {/* Input or WhatsApp button */}
          {messages[messages.length - 1]?.role === 'bot' && messages[messages.length - 1]?.content.includes('Thanks for response') ? (
            <div className="px-3 py-4 bg-[#0A223D] border-t border-[#FFC857] flex flex-col items-center">
              {(() => {
                // Extract user details from chat
                const userQuery = messages[1]?.role === 'user' ? messages[1].content : '';
                const userName = messages[3]?.role === 'user' ? messages[3].content : '';
                const userPhone = messages[5]?.role === 'user' ? messages[5].content : '';
                const waMsg = encodeURIComponent(
                  `New Solar Lead from Exdells Website:%0AQuery: ${userQuery}%0AName: ${userName}%0APhone: ${userPhone}`
                );
                const waUrl = `https://api.whatsapp.com/send/?phone=918955808315&text=${waMsg}`;
                return (
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-[#FFC857] text-[#0A223D] font-semibold py-2 rounded-full shadow hover:scale-105 transition-all text-center border-2 border-[#0A223D]"
                  >
                    Connect with Our Team
                  </a>
                );
              })()}
            </div>
          ) : (
            <form
              className="flex items-center gap-2 px-3 py-2 bg-[#0A223D] border-t border-[#FFC857] w-full"
              onSubmit={e => {
                e.preventDefault();
                send();
              }}
            >
              <input
                type="text"
                className="flex-1 rounded-full border-2 border-[#FFC857] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FFC857] bg-[#0A223D] text-[#FFC857] placeholder:text-[#FFC857]"
                placeholder="Type your message here"
                value={input}
                onChange={e => setInput(e.target.value)}
                autoFocus={open}
              />
              <button
                type="submit"
                className="bg-[#FFC857] text-[#0A223D] rounded-full px-4 py-2 font-semibold shadow hover:scale-105 transition-all border-2 border-[#0A223D]"
              >
                &#9654;
              </button>
            </form>
          )}
          {/* Footer */}
          <div className="text-xs text-center py-1 bg-[#0A223D] text-[#FFC857] border-t border-[#FFC857]">
            ⚡ by {BRAND}
          </div>
        </div>
      )}
    </>
  );
}
