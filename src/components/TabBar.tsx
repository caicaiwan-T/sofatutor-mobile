import { useLocation } from 'react-router-dom'
import { useApp } from '../store'
import { Icon } from '../icons'

const TABS: { key: string; label: string; icon: string; path: string }[] = [
  { key: 'learn', label: 'Learn', icon: 'book', path: '/' },
  { key: 'search', label: 'Search', icon: 'search', path: '/search' },
  { key: 'progress', label: 'Progress', icon: 'chart', path: '/progress' },
  { key: 'profile', label: 'Profile', icon: 'user', path: '/profile' },
]

export default function TabBar() {
  const { nav } = useApp()
  const { pathname } = useLocation()
  const active =
    pathname === '/' || pathname.startsWith('/s/') ? 'learn'
      : pathname.startsWith('/search') ? 'search'
        : pathname.startsWith('/progress') ? 'progress'
          : pathname.startsWith('/profile') ? 'profile' : 'learn'
  return (
    <div className="tabbar">
      {TABS.map((t) => (
        <button key={t.key} className={'tab' + (active === t.key ? ' on' : '')} onClick={() => nav.go(t.path)}>
          <Icon name={t.icon} />
          <span>{t.label}</span>
        </button>
      ))}
    </div>
  )
}
