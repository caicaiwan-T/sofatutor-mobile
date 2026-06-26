import Screen from './Screen'
import { useApp } from '../store'
import { Icon } from '../icons'

export default function Profile() {
  const { toast } = useApp()
  const row = (icon: string, col: string, label: string, value?: string) => (
    <div className="lrow" onClick={() => toast(label)}>
      <div className="lic" style={{ background: col }}><Icon name={icon} /></div>
      <div className="lt">{label}</div>
      {value && <span className="lv">{value}</span>}
      <span className="chev"><Icon name="right" /></span>
    </div>
  )
  return (
    <Screen title="Profile">
      <div className="glasscard" style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'var(--tint2)', color: 'var(--tint-strong)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 22, border: '2px solid var(--tint-line)' }}>L</div>
        <div>
          <div style={{ fontSize: 19, fontWeight: 800 }}>Lena</div>
          <div style={{ fontSize: 13, color: 'var(--label2)', marginTop: 2 }}>Grade 10 · Family plan</div>
        </div>
      </div>

      <div className="sec">Learner</div>
      <div className="listcard">
        {row('user', '#2f6fb0', 'Switch learner', '3 children')}
        {row('cap', '#1f9d6b', 'Grade & subjects', 'Grade 10')}
        {row('bell', '#e0a020', 'Reminders & goals')}
      </div>

      <div className="sec">Account</div>
      <div className="listcard">
        {row('trophy', '#6a51d6', 'Subscription', 'Family')}
        {row('cards', '#cf4d63', 'Redeem a voucher')}
      </div>

      <div className="sec">Support</div>
      <div className="listcard">
        {row('chat', '#8e8e93', 'Help center')}
        {row('doc', '#8e8e93', 'About sofatutor')}
      </div>
    </Screen>
  )
}
