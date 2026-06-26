import { useState } from 'react'
import Screen from './Screen'
import { useApp } from '../store'
import { Icon } from '../icons'
import { SUBJECTS } from '../data'
import type { Subject, Area, Topic } from '../types'

interface Hit { s: Subject; a: Area; t: Topic }
const ALL: Hit[] = []
SUBJECTS.forEach((s) => s.areas.forEach((a) => a.topics.forEach((t) => ALL.push({ s, a, t }))))

export default function Search() {
  const { nav } = useApp()
  const [q, setQ] = useState('')
  const query = q.trim().toLowerCase()
  const hits = query ? ALL.filter((h) => h.t.n.toLowerCase().includes(query) || h.a.name.toLowerCase().includes(query) || h.s.name.toLowerCase().includes(query)) : []
  const popular = ['Comparing fractions', 'Present tenses', 'Cell structure', 'Angles']

  return (
    <Screen title="Search">
      <div className="search">
        <Icon name="search" />
        <input autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="Topics, skills, subjects…"
          style={{ border: 'none', background: 'transparent', outline: 'none', font: 'inherit', flex: 1, color: 'var(--label)' }} />
      </div>

      {!query && (
        <>
          <div className="sec">Try</div>
          <div className="chips">
            {popular.map((p) => <span key={p} className="rchip" onClick={() => setQ(p)}>{p}</span>)}
          </div>
        </>
      )}

      {query && (
        <>
          <div className="sec">{hits.length} result{hits.length === 1 ? '' : 's'}</div>
          <div className="listcard">
            {hits.map((h) => (
              <div key={h.s.id + h.a.name + h.t.n} className="lrow" onClick={() => nav.topic(h.s.id, h.a.name, h.t.n)}>
                <div className="lic" style={{ background: h.s.color }}><Icon name={h.a.icon} /></div>
                <div style={{ flex: 1 }}>
                  <div className="lt">{h.t.n}</div>
                  <div className="lv">{h.s.name} · {h.a.name}</div>
                </div>
                <span className="chev"><Icon name="right" /></span>
              </div>
            ))}
            {hits.length === 0 && <div className="lrow"><div className="lv">No topics match “{q}”.</div></div>}
          </div>
        </>
      )}
    </Screen>
  )
}
