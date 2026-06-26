import { useParams } from 'react-router-dom'
import Screen from './Screen'
import { useApp } from '../store'
import { areaPct } from '../data'
import { resolve } from '../nav'
import { TopicCard } from './shared'

export default function AreaPage() {
  const { sid, area } = useParams()
  const { nav } = useApp()
  const res = resolve(sid, area)
  if (!res || !res.a) return <Screen title="Not found" back={{ label: 'Back', onClick: () => nav.home() }}><div className="lsub">Area not found.</div></Screen>
  const { s, a } = res
  const inprog = a.topics.filter((t) => t.st === 'prog').length

  return (
    <Screen title={a.name} subtitle={s.name} back={{ label: s.name, onClick: () => nav.subject(s.id) }}>
      <div className="areabar">
        <span className="pbar"><i style={{ width: areaPct(a) + '%' }} /></span>
        <span className="pl">{areaPct(a)}% · {a.topics.length} topics · {inprog} in progress</span>
      </div>
      <div className="agrid">
        {a.topics.map((topic) => <TopicCard key={topic.n} subject={s} area={a} topic={topic} />)}
      </div>
    </Screen>
  )
}
