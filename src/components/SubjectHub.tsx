import { useParams } from 'react-router-dom'
import Screen from './Screen'
import { useApp } from '../store'
import { Icon, Ring } from '../icons'
import { areaPct, subjPct } from '../data'
import { resolve } from '../nav'
import { TopicCard } from './shared'
import type { Subject, Area, Topic, ViewBy } from '../types'

const VIEWS: [ViewBy, string][] = [['topic', 'Topic'], ['grade', 'Grade'], ['mastery', 'Mastery'], ['difficulty', 'Difficulty']]

interface Item { area: Area; topic: Topic }

function Shelf({ subject, title, sub, icon, color, items, showArea, onSeeAll }:
  { subject: Subject; title: string; sub?: string; icon?: string; color?: string; items: Item[]; showArea?: boolean; onSeeAll?: () => void }) {
  if (items.length === 0) return null
  return (
    <div className="shelf">
      <div className="shelfhead">
        {icon && <span className="sq" style={{ background: color }}><Icon name={icon} /></span>}
        <span className="nm">{title}</span>
        {sub && <span className="pc">{sub}</span>}
        {onSeeAll && <span className="seeall" onClick={onSeeAll}>See all ›</span>}
      </div>
      <div className="hscroll">
        {items.map(({ area, topic }) => (
          <TopicCard key={area.name + topic.n} subject={subject} area={area} topic={topic} showArea={showArea} />
        ))}
      </div>
    </div>
  )
}

export default function SubjectHub() {
  const { sid } = useParams()
  const { nav, vview, setView, setSwitcherOpen, toast } = useApp()
  const res = resolve(sid)
  if (!res) return <Screen title="Not found" back={{ label: 'Learn', onClick: () => nav.home() }}><div className="lsub">Subject not found.</div></Screen>
  const s = res.s

  const flat: Item[] = []
  s.areas.forEach((area) => area.topics.forEach((topic) => flat.push({ area, topic })))
  const cont = flat.find((x) => x.topic.st === 'prog')

  let body
  if (vview === 'topic') {
    body = s.areas.map((area) => (
      <Shelf key={area.name} subject={s} title={area.name} icon={area.icon} color={s.color}
        sub={`${areaPct(area)}%`} items={area.topics.map((topic) => ({ area, topic }))}
        onSeeAll={() => nav.area(s.id, area.name)} />
    ))
  } else if (vview === 'mastery') {
    const order: [string, string][] = [['prog', 'Continue'], ['start', 'Ready to start'], ['done', 'Completed'], ['lock', 'Locked']]
    body = order.map(([st, title]) => (
      <Shelf key={st} subject={s} title={title} items={flat.filter((x) => x.topic.st === st)} showArea />
    ))
  } else if (vview === 'difficulty') {
    const order: [number, string][] = [[1, 'Foundational'], [2, 'Core'], [3, 'Challenge']]
    body = order.map(([d, title]) => (
      <Shelf key={d} subject={s} title={title} items={flat.filter((x) => (x.topic.diff || 2) === d)} showArea />
    ))
  } else {
    body = (
      <>
        <div className="lsub" style={{ margin: '14px 2px 0' }}>
          Showing <b>{s.grade}</b>, set from your profile · <span style={{ color: 'var(--tint)', fontWeight: 700 }} onClick={() => toast('Grade picker · keeps your place')}>Change</span>
        </div>
        <Shelf subject={s} title={`${s.grade} · all topics`} items={flat} showArea />
      </>
    )
  }

  return (
    <Screen
      title={s.name}
      subtitle={`${s.grade} · ${subjPct(s)}% mastered`}
      back={{ label: 'Learn', onClick: () => nav.home() }}
      right={<button className="nbi" onClick={() => nav.go('/search')}><Icon name="search" /></button>}
      titleAccessory={<span className="sw" onClick={() => setSwitcherOpen(true)}>Switch <Icon name="down" /></span>}
    >
      <div className="viewby">
        {VIEWS.map(([k, l]) => (
          <button key={k} className={'vchip' + (vview === k ? ' on' : '')} onClick={() => setView(k)}>{l}</button>
        ))}
      </div>

      {cont && (
        <div className="feat" onClick={() => nav.topic(s.id, cont.area.name, cont.topic.n)}>
          <Ring pct={cont.topic.pct || 0} color="#fff" track="rgba(255,255,255,.32)" label={`${cont.topic.pct}%`} />
          <div className="ftxt">
            <div className="fk">Continue</div>
            <div className="ft">{cont.topic.n}</div>
            <div className="fa">{cont.area.name}</div>
          </div>
          <div className="resume">Resume</div>
        </div>
      )}

      {body}
    </Screen>
  )
}
