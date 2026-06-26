import Screen from './Screen'
import { useApp } from '../store'
import { Icon } from '../icons'
import { SUBJECTS, subjPct } from '../data'

export default function Progress() {
  const { nav } = useApp()
  return (
    <Screen title="Progress" subtitle="This week">
      <div className="statrow">
        <div className="statbox"><div className="n flame"><Icon name="flame" size={20} color="#e08a2b" inline />12</div><div className="l">day streak</div></div>
        <div className="statbox"><div className="n">3/5</div><div className="l">weekly goal</div></div>
        <div className="statbox"><div className="n">45m</div><div className="l">time</div></div>
      </div>

      <div className="sec">What you can do now</div>
      <div className="listcard">
        <div className="lrow"><div className="lic" style={{ background: 'var(--green)' }}><Icon name="check" /></div><div style={{ flex: 1 }}><div className="lt">Compare &amp; order fractions</div><div className="lv">Mastered</div></div></div>
        <div className="lrow"><div className="lic" style={{ background: '#e0a020' }}><Icon name="flame" /></div><div style={{ flex: 1 }}><div className="lt">Find equivalent fractions</div><div className="lv">Almost there · 1 skill left</div></div><span className="chev"><Icon name="right" /></span></div>
      </div>

      <div className="sec">By subject</div>
      <div className="listcard">
        {SUBJECTS.map((s) => {
          const p = subjPct(s)
          return (
            <div key={s.id} className="lrow" onClick={() => nav.subject(s.id)}>
              <div className="lic" style={{ background: s.color }}><Icon name={s.icon} /></div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="lt">{s.name}</div>
                <div className="lbar" style={{ marginTop: 6 }}><i style={{ width: p + '%', background: s.color }} /></div>
              </div>
              <span className="lv">{p}%</span>
              <span className="chev"><Icon name="right" /></span>
            </div>
          )
        })}
      </div>
    </Screen>
  )
}
