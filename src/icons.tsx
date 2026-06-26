// SVG icon path data (24×24 viewBox). Add new icons here.
export const ICONS: Record<string, string> = {
  sofa: '<path d="M4 11a3 3 0 0 1 6 0v3h4v-3a3 3 0 0 1 6 0v6H4z"/><line x1="4" y1="17" x2="4" y2="20"/><line x1="20" y1="17" x2="20" y2="20"/>',
  home: '<path d="M4 11l8-7 8 7"/><path d="M6 10v9h12v-9"/>',
  search: '<circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.5" y2="16.5"/>',
  bell: '<path d="M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6"/><path d="M10 20a2 2 0 0 0 4 0"/>',
  down: '<path d="M6 9l6 6 6-6"/>',
  right: '<path d="M9 6l6 6-6 6"/>',
  back: '<path d="M15 5l-7 7 7 7"/>',
  calc: '<rect x="4" y="3" width="16" height="18" rx="2"/><line x1="8" y1="7" x2="16" y2="7"/><line x1="8" y1="11" x2="8" y2="17"/><line x1="12" y1="11" x2="12" y2="17"/><line x1="16" y1="11" x2="16" y2="17"/>',
  pie: '<path d="M12 3a9 9 0 1 0 9 9h-9z"/><path d="M12 3v9h9a9 9 0 0 0-9-9z"/>',
  shape: '<rect x="4" y="4" width="16" height="16" rx="2"/><circle cx="8" cy="8" r="1.3"/><circle cx="16" cy="8" r="1.3"/><circle cx="8" cy="16" r="1.3"/><circle cx="16" cy="16" r="1.3"/>',
  bar: '<line x1="6" y1="20" x2="6" y2="12"/><line x1="12" y1="20" x2="12" y2="6"/><line x1="18" y1="20" x2="18" y2="14"/>',
  book: '<path d="M4 5a2 2 0 0 1 2-2h12v16H6a2 2 0 0 0-2 2z"/><path d="M4 19a2 2 0 0 1 2-2h12"/>',
  doc: '<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4"/><line x1="9" y1="12" x2="15" y2="12"/><line x1="9" y1="16" x2="15" y2="16"/>',
  atom: '<circle cx="12" cy="12" r="2"/><ellipse cx="12" cy="12" rx="9" ry="4"/><ellipse cx="12" cy="12" rx="9" ry="4" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="9" ry="4" transform="rotate(120 12 12)"/>',
  flask: '<path d="M9 3h6"/><path d="M10 3v6l-5 9a1.6 1.6 0 0 0 1.4 2.4h11.2A1.6 1.6 0 0 0 19 18l-5-9V3"/><line x1="7.5" y1="14" x2="16.5" y2="14"/>',
  play: '<path d="M7 5l12 7-12 7z" fill="currentColor" stroke="none"/>',
  check: '<path d="M5 12l4 4 10-10"/>',
  game: '<rect x="3" y="7" width="18" height="10" rx="4"/><line x1="7" y1="12" x2="9" y2="12"/><line x1="8" y1="11" x2="8" y2="13"/><circle cx="15.5" cy="11.5" r="1"/><circle cx="17.5" cy="13" r="1"/>',
  cards: '<rect x="4" y="6" width="13" height="14" rx="2"/><path d="M8 4h9a2 2 0 0 1 2 2v11"/>',
  chat: '<path d="M4 5h16v11H9l-4 4z"/>',
  lock: '<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
  sparkle: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" fill="currentColor" stroke="none"/><circle cx="18.5" cy="5.5" r="1.2" fill="currentColor" stroke="none"/>',
  target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.3" fill="currentColor"/>',
  cap: '<path d="M3 9l9-4 9 4-9 4z"/><path d="M7 11v5c0 1 2.5 2.5 5 2.5s5-1.5 5-2.5v-5"/>',
  flame: '<path d="M12 3c1 3-2 4-2 7a2 2 0 0 0 4 0c0-1-.5-1.5-.5-1.5C16 11 17 13 17 15a5 5 0 0 1-10 0c0-4 5-5 5-12z" fill="currentColor" stroke="none"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  send: '<path d="M5 12l15-7-6 15-2.5-6z"/>',
  close: '<line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/>',
  arrow: '<line x1="5" y1="12" x2="19" y2="12"/><path d="M13 6l6 6-6 6"/>',
  next: '<path d="M5 12h13"/><path d="M13 6l6 6-6 6"/>',
  up: '<circle cx="12" cy="12" r="9"/><path d="M12 16V8"/><path d="M8.5 11.5L12 8l3.5 3.5"/>',
  chart: '<line x1="4" y1="20" x2="20" y2="20"/><rect x="6" y="11" width="3" height="6"/><rect x="11" y="7" width="3" height="10"/><rect x="16" y="13" width="3" height="4"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/>',
  dots: '<circle cx="5" cy="12" r="1.6" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.6" fill="currentColor" stroke="none"/><circle cx="19" cy="12" r="1.6" fill="currentColor" stroke="none"/>',
  trophy: '<path d="M7 4h10v4a5 5 0 0 1-10 0z"/><path d="M7 6H4v1a3 3 0 0 0 3 3"/><path d="M17 6h3v1a3 3 0 0 1-3 3"/><line x1="12" y1="13" x2="12" y2="17"/><path d="M8 20h8"/><path d="M10 17h4v3h-4z"/>',
}

import type { ReactNode } from 'react'

interface IconProps { name: string; size?: number; color?: string; sw?: number; inline?: boolean }

export function Icon({ name, size, color = 'currentColor', sw = 1.9, inline = false }: IconProps) {
  const style = inline && size ? { display: 'inline-block', verticalAlign: '-2px' } : undefined
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color}
      strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" style={style}
      dangerouslySetInnerHTML={{ __html: ICONS[name] || '' }} />
  )
}

// Progress ring. Optional centered label via `label` prop.
export function Ring({ pct, color = 'var(--tint)', track = 'var(--ring-track)', sw = 3.4, label }:
  { pct: number; color?: string; track?: string; sw?: number; label?: ReactNode }) {
  return (
    <div className="ring">
      <svg viewBox="0 0 36 36">
        <circle cx="18" cy="18" r="15.5" fill="none" stroke={track} strokeWidth={sw} />
        <circle cx="18" cy="18" r="15.5" fill="none" stroke={color} strokeWidth={sw}
          strokeLinecap="round" strokeDasharray={`${pct * 0.974} 100`} transform="rotate(-90 18 18)" />
      </svg>
      {label != null && <span className="pct" style={{ color }}>{label}</span>}
    </div>
  )
}
