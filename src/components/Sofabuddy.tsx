import { useEffect, useRef, useState } from 'react'
import { useApp } from '../store'
import { Icon } from '../icons'

interface Message { role: 'me' | 'bot'; text: string }

export default function Sofabuddy() {
  const { buddy, closeBuddy } = useApp()
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const bodyRef = useRef<HTMLDivElement>(null)
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  useEffect(() => {
    if (buddy.open) { setMessages([]); setInput('') }
  }, [buddy.open, buddy.ctx])
  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight
  }, [messages])
  useEffect(() => () => clearTimeout(timer.current), [])

  const general = buddy.ctx === 'general'
  const sugg = general
    ? ['Help me prepare for my maths test', 'What should I learn next?']
    : ['Explain with an example', 'Give me a practice question', 'Why does this matter?']

  const send = (text?: string) => {
    const q = (text ?? input).trim()
    if (!q) return
    setMessages((m) => [...m, { role: 'me', text: q }])
    setInput('')
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setMessages((m) => [...m, {
      role: 'bot',
      text: `Here's a hint to get you moving — then try the next step yourself. (Demo · grounded in ${general ? 'your content' : buddy.ctx}.)`,
    }]), 500)
  }

  return (
    <>
      <div className={'sheet-bg' + (buddy.open ? ' open' : '')} onClick={closeBuddy} />
      <div className={'sheet buddy-sheet' + (buddy.open ? ' open' : '')} aria-label="Sofabuddy">
        <div className="sheet-handle" />
        <div className="sheet-head">
          <span className="sh-t">Sofabuddy</span>
          <button className="sh-x" onClick={closeBuddy}><Icon name="close" /></button>
        </div>
        <div className="sheet-body" ref={bodyRef} style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <div className="bp-ctx"><Icon name="sparkle" />{general ? 'Helping across your learning' : 'About: ' + buddy.ctx}</div>
          <div className="bubble bot">
            {general
              ? 'Hi Lena 👋 Ask me anything, or pick a starter.'
              : <>Hi Lena 👋 Ask about <b>{buddy.ctx}</b> — I answer from this topic.</>}
          </div>
          {messages.length === 0
            ? <div className="bp-sugg">{sugg.map((s) => <button key={s} onClick={() => send(s)}>{s}</button>)}</div>
            : messages.map((m, i) => <div key={i} className={'bubble ' + m.role}>{m.text}</div>)}
        </div>
        <div className="bp-foot">
          <input value={input} placeholder="Ask Sofabuddy…" onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') send() }} />
          <button className="send" onClick={() => send()}><Icon name="send" /></button>
        </div>
      </div>
    </>
  )
}
