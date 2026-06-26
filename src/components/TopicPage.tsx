import { useState } from 'react'
import { useParams } from 'react-router-dom'
import Screen from './Screen'
import { useApp } from '../store'
import { Icon, Ring } from '../icons'
import { pctOf } from '../data'
import { resolve } from '../nav'

export default function TopicPage() {
  const { sid, area, topic } = useParams()
  const { nav, toast, openBuddyTopic } = useApp()
  const [preDismissed, setPreDismissed] = useState(false)
  const res = resolve(sid, area, topic)
  if (!res || !res.a) return <Screen title="Not found" back={{ label: 'Back', onClick: () => nav.home() }}><div className="lsub">Not found.</div></Screen>
  const { s, a } = res
  const t = res.t

  if (!t) return <Screen title="Not found" back={{ label: a.name, onClick: () => nav.area(s.id, a.name) }}><div className="lsub">Topic not found.</div></Screen>

  const backToArea = { label: a.name, onClick: () => nav.area(s.id, a.name) }

  if (t.st === 'lock') {
    return (
      <Screen title={t.n} back={backToArea}>
        <div className="lockwrap">
          <div className="lkic"><Icon name="lock" /></div>
          <h2>{t.n} is locked</h2>
          <p>This builds on <b>{t.prereqLock}</b>. Finish that first and this unlocks automatically — the path follows the knowledge graph.</p>
          <button className="cta" style={{ maxWidth: 280, margin: '20px auto 0' }} onClick={() => nav.topicByName(s.id, t.prereqLock!)}>
            <Icon name="arrow" /> Go to {t.prereqLock}
          </button>
        </div>
      </Screen>
    )
  }

  const pct = pctOf(t)
  const total = 4
  const secure = Math.round((pct / 100) * total)
  const nextName = t.next || (() => {
    const i = a.topics.findIndex((x) => x.n === t.n)
    return i >= 0 && i < a.topics.length - 1 ? a.topics[i + 1].n : null
  })()
  const related = t.related || (() => {
    const o: string[] = []
    s.areas.forEach((x) => { if (x !== a) x.topics.forEach((tt) => o.push(tt.n)) })
    return o.slice(0, 3)
  })()

  return (
    <Screen
      title={t.n}
      subtitle={`${s.name} · ${a.name}`}
      back={backToArea}
      right={<button className="nbi" onClick={() => openBuddyTopic(t.n)}><Icon name="sparkle" /></button>}
    >
      <div className="masterhead">
        <Ring pct={pct || 4} color={pct >= 100 ? 'var(--green)' : 'var(--tint)'} label={pct > 0 ? `${pct}%` : '·'} />
        <div>
          <div className="mt">{pct > 0 ? `${pct}% mastered` : 'Not started'}</div>
          <div className="ms">{pct > 0 ? `${secure} of ${total} micro-skills secure` : `${total} micro-skills · ~15 min`}</div>
          <div className="mskills">
            {Array.from({ length: total }, (_, i) => (
              <span key={i} className={'mskill' + (i < secure ? ' ok' : i === secure && pct > 0 ? ' now' : '')} />
            ))}
          </div>
        </div>
      </div>

      {t.prereq && pct < 100 && !preDismissed && (
        <div className="banner">
          <div className="bic"><Icon name="up" /></div>
          <div className="bt"><b>Builds on {t.prereq}</b> — a quick refresher helps</div>
          <button className="bbtn" onClick={() => nav.topicByName(s.id, t.prereq!)}>Review</button>
        </div>
      )}

      {/* WATCH */}
      <div className="sec">Watch</div>
      <div className="video" onClick={() => toast('Playing: ' + t.n)}>
        <div className="play"><Icon name="play" /></div>
        <div className="vmeta"><div className="vt">{t.n} — explained</div><div className="vs">4 clips{pct > 0 ? ' · 2 watched' : ''}</div></div>
        <div className="dur">6:10</div>
        {pct > 0 && <div className="vprog"><i style={{ width: Math.min(pct, 70) + '%' }} /></div>}
      </div>
      <button className="cta" onClick={() => toast('Starting recommended path: 1 clip + practice set')}>
        <Icon name="play" /> {pct > 0 ? 'Resume topic' : 'Start topic'}
      </button>

      {/* PRACTICE — all content types converge here (no UCS gate) */}
      <div className="sec">Practice</div>
      <div className="tools">
        <Tool icon="check" col="#2f6fb0" name="Exercises" meta={pct > 0 ? `${secure} of ${total} done` : 'Adaptive'} onClick={() => toast('Exercises')} />
        <Tool icon="game" col="#6a51d6" name="Sofaheld" meta="Practice game" onClick={() => toast('Sofaheld')} />
        <Tool icon="doc" col="#8e8e93" name="Worksheet" meta="Printable PDF" onClick={() => toast('Worksheet')} />
        <Tool icon="cards" col="#aa6e12" name="Flashcards" meta="AI deck" dot onClick={() => toast('Flashcards')} />
      </div>

      {/* CHECK */}
      <div className="sec">Check yourself</div>
      <div className="tools">
        <Tool wide icon="target" col="#34a853" name="Mastery check" meta={pct >= 100 ? 'Passed' : 'Short check · updates progress'} onClick={() => toast('Mastery check')} />
      </div>

      <div className="askbuddy" onClick={() => openBuddyTopic(t.n)}>
        <div className="ic"><Icon name="sparkle" /></div>
        <div>
          <div className="al">Ask Sofabuddy <span className="aitag"><Icon name="sparkle" />AI</span></div>
          <div className="am">Stuck? Answers come from this topic.</div>
        </div>
        <span className="ago"><Icon name="right" /></span>
      </div>

      {/* relationships → recommendations */}
      <div className="sec">Up next</div>
      {nextName ? (
        <div className="nextcard" onClick={() => nav.topicByName(s.id, nextName)}>
          <div className="ic"><Icon name="next" /></div>
          <div><div className="nk">Deepens this topic</div><div className="nt">{nextName}</div></div>
          <span className="nchev"><Icon name="right" /></span>
        </div>
      ) : <div className="lsub" style={{ margin: '0 2px' }}>You're at the end of this area — great work.</div>}

      <div className="sec">Related</div>
      <div className="chips">
        {related.map((r) => <span key={r} className="rchip" onClick={() => nav.topicByName(s.id, r)}>{r}</span>)}
      </div>
    </Screen>
  )
}

function Tool({ icon, col, name, meta, dot, wide, onClick }:
  { icon: string; col: string; name: string; meta: string; dot?: boolean; wide?: boolean; onClick: () => void }) {
  return (
    <div className={'tool' + (wide ? ' wide' : '')} onClick={onClick}>
      {dot && <span className="newdot" />}
      <div className="ic" style={{ background: col }}><Icon name={icon} /></div>
      <div>
        <div className="tl">{name}</div>
        <div className="tm">{meta}</div>
      </div>
    </div>
  )
}
