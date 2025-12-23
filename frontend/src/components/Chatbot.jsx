import React, { useState, useRef, useEffect } from 'react'
import { api } from '../lib/api'

export default function Chatbot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    if (open && bottomRef.current) bottomRef.current.scrollIntoView({ behavior: 'smooth' })
  }, [messages, open])

  const send = async () => {
    if (!input.trim()) return
    const userMsg = { role: 'user', content: input.trim() }
    const next = [...messages, userMsg]
    setMessages(next)
    setInput('')
    setLoading(true)
    try {
      const resp = await api.post('/api/chat', { message: userMsg.content, messages: next })
      const reply = resp.data?.reply || 'No response'
      setMessages(prev => [...prev, { role: 'assistant', content: reply }])
    } catch (err) {
      console.error(err)
      setMessages(prev => [...prev, { role: 'assistant', content: 'Error: failed to get reply' }])
    } finally {
      setLoading(false)
    }
  }

  const onKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      send()
    }
  }

  return (
    <>
      <div className="fixed right-6 bottom-6 z-50">
        <div className="flex items-end">
          {open && (
            <div className="w-80 max-w-xs bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden flex flex-col">
              <div className="px-4 py-2 bg-slate-50 border-b border-slate-100 font-semibold">Ask Exdells AI</div>
              <div className="p-3 h-64 overflow-auto text-sm space-y-2">
                {messages.length === 0 && <div className="text-slate-400">Hi — ask me about services, subsidies, or projects.</div>}
                {messages.map((m, i) => (
                  <div key={i} className={m.role === 'user' ? 'text-right' : 'text-left'}>
                    <div className={m.role === 'user' ? 'inline-block bg-sky-100 text-sky-900 px-3 py-1 rounded-lg' : 'inline-block bg-slate-100 text-slate-800 px-3 py-1 rounded-lg'}>
                      {m.content}
                    </div>
                  </div>
                ))}
                <div ref={bottomRef} />
              </div>
              <div className="p-2 border-t border-slate-100">
                <textarea
                  rows={2}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={onKey}
                  className="w-full rounded-md border border-slate-200 p-2 text-sm"
                  placeholder="Type your question..."
                />
                <div className="mt-2 flex items-center justify-between">
                  <div className="text-xs text-slate-400">{loading ? 'Thinking...' : ''}</div>
                  <div>
                    <button onClick={() => { setOpen(false) }} className="mr-2 px-3 py-1 text-xs rounded-md">Close</button>
                    <button onClick={send} className="bg-sky-600 text-white px-3 py-1 rounded-md text-sm">Send</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          <button
            onClick={() => setOpen(o => !o)}
            className="ml-3 w-12 h-12 rounded-full bg-sky-600 text-white shadow-lg flex items-center justify-center"
            title="Open chat"
          >
            💬
          </button>
        </div>
      </div>
    </>
  )
}
