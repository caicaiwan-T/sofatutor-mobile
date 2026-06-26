import { useApp } from '../store'
import { Icon, Ring } from '../icons'
import { pctOf } from '../data'
import type { Subject, Area, Topic } from '../types'

const pill = (t: Topic) =>
  t.st === 'prog' ? `${t.pct}%` : t.st === 'done' ? 'Done' : t.st === 'lock' ? 'Locked' : 'Start'

// Topic card used in shelves (horizontal) and area grid. `showArea` adds the
// area label for views where cards aren't grouped by area.
export function TopicCard({ subject, area, topic, showArea }: { subject: Subject; area: Area; topic: Topic; showArea?: boolean }) {
  const { nav, toast } = useApp()
  const lock = topic.st === 'lock'
  const pct = pctOf(topic)
  const open = () => (lock ? toast(`Locked — finish "${topic.prereqLock}" first`) : nav.topic(subject.id, area.name, topic.n))

  let thumb
  if (topic.st === 'prog') thumb = <Ring pct={pct} color={subject.color} label={`${pct}%`} />
  else if (topic.st === 'done') thumb = <Ring pct={100} color={subject.color} label={<Icon name="check" size={20} color={subject.color} />} />
  else if (lock) thumb = <span className="lk" style={{ color: subject.color }}><Icon name="lock" /></span>
  else thumb = <span className="big" style={{ color: subject.color }}><Icon name={area.icon} /></span>

  return (
    <div className={'tcard' + (lock ? ' locked' : '')} onClick={open}>
      <div className="thumb" style={{ background: subject.color + '1f' }}>{thumb}</div>
      {showArea && <div className="tg-area"><Icon name={area.icon} size={12} />{area.name}</div>}
      <div className="nm2">{topic.n}</div>
      <span className={'pill ' + topic.st}>{pill(topic)}</span>
    </div>
  )
}
