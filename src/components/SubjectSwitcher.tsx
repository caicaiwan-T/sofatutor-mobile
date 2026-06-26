import { useLocation } from 'react-router-dom'
import { useApp } from '../store'
import { Icon } from '../icons'
import { SUBJECTS, subjPct } from '../data'

export default function SubjectSwitcher() {
  const { switcherOpen, setSwitcherOpen, nav } = useApp()
  const { pathname } = useLocation()
  const m = pathname.match(/^\/s\/([^/]+)/)
  const curId = m ? m[1] : null

  const pick = (sid: string) => { setSwitcherOpen(false); nav.subject(sid) }

  return (
    <>
      <div className={'sheet-bg' + (switcherOpen ? ' open' : '')} onClick={() => setSwitcherOpen(false)} />
      <div className={'sheet' + (switcherOpen ? ' open' : '')} aria-label="Switch subject">
        <div className="sheet-handle" />
        <div className="sheet-head">
          <span className="sh-t">Switch subject</span>
          <button className="sh-x" onClick={() => setSwitcherOpen(false)}><Icon name="close" /></button>
        </div>
        <div className="sheet-body">
          {SUBJECTS.map((s) => (
            <div key={s.id} className="swrow" onClick={() => pick(s.id)}>
              <div className="si" style={{ background: s.color }}><Icon name={s.icon} /></div>
              <div style={{ flex: 1 }}>
                <div className="sn">{s.name}</div>
                <div className="sm">{s.grade} · {subjPct(s)}% mastered</div>
              </div>
              {s.id === curId && <span className="ck"><Icon name="check" /></span>}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
