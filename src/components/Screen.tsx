import { useState, type ReactNode } from 'react'
import { Icon } from '../icons'

interface ScreenProps {
  title: string
  subtitle?: ReactNode
  titleAccessory?: ReactNode
  back?: { label: string; onClick: () => void }
  right?: ReactNode
  children: ReactNode
}

// iOS large-title screen: big title in the scroll area collapses into the
// nav-bar title once you scroll past it.
export default function Screen({ title, subtitle, titleAccessory, back, right, children }: ScreenProps) {
  const [scrolled, setScrolled] = useState(false)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
      <div className={'navbar' + (scrolled ? ' scrolled' : '')}>
        {back
          ? <button className="nb-back" onClick={back.onClick}><Icon name="back" />{back.label}</button>
          : <span style={{ width: 6 }} />}
        <span className="nb-title">{title}</span>
        <div className="nb-right">{right}</div>
      </div>
      <div className="stage" onScroll={(e) => setScrolled(e.currentTarget.scrollTop > 22)}>
        <h1 className="ltitle">{title}{titleAccessory}</h1>
        {subtitle != null && <div className="lsub">{subtitle}</div>}
        {children}
      </div>
    </div>
  )
}
