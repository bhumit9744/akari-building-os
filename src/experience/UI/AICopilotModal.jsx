import { useState } from 'react'
import { useTwinStore } from '../../store/useTwinStore'
import { aiCopilot } from '../../services/ai/aiCopilot'

export function AICopilotModal() {
  const aiCopilotOpen = useTwinStore((state) => state.aiCopilotOpen)
  const toggleAICopilot = useTwinStore((state) => state.toggleAICopilot)
  const [prompt, setPrompt] = useState('')
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: '👋 Hello! I am your Akari Digital Twin AI Copilot. Ask me to highlight building zones, check temperatures, or run auto tours!',
    },
  ])

  if (!aiCopilotOpen) return null

  const handleSend = (textToSend) => {
    const queryText = textToSend || prompt
    if (!queryText.trim()) return

    const userMsg = { sender: 'user', text: queryText }
    setMessages((prev) => [...prev, userMsg])

    // Process via AI Copilot Service
    const res = aiCopilot.processPrompt(queryText)
    setTimeout(() => {
      setMessages((prev) => [...prev, { sender: 'ai', text: res.reply }])
    }, 400)

    setPrompt('')
  }

  const suggestions = [
    'Highlight solar array output',
    'Show rooms above 22°C',
    'Focus NOC server room',
    'Start 360° auto tour',
  ]

  return (
    <div className="copilot-drawer">
      <div className="copilot-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '20px' }}>🤖</span>
          <div>
            <h2 style={{ fontSize: '14px', fontWeight: 700 }}>AI COPILOT ASSISTANT</h2>
            <span style={{ fontSize: '10px', color: '#06b6d4' }}>ONLINE • LLM BUILDING REASONER</span>
          </div>
        </div>
        <button className="icon-btn" onClick={toggleAICopilot}>
          ✕
        </button>
      </div>

      <div className="copilot-chat">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`chat-msg ${msg.sender === 'user' ? 'user-msg' : 'ai-msg'}`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      <div className="copilot-suggestions">
        {suggestions.map((sug, idx) => (
          <button key={idx} className="suggestion-pill" onClick={() => handleSend(sug)}>
            {sug}
          </button>
        ))}
      </div>

      <div className="copilot-input-row">
        <input
          type="text"
          placeholder="Ask AI Copilot..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          className="copilot-input"
        />
        <button className="live-btn" onClick={() => handleSend()}>
          Send
        </button>
      </div>
    </div>
  )
}
