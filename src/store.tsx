import { createContext, useContext, useRef, useState, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { SUBJECTS, findTopic } from './data'
import { pSub, pArea, pTopic } from './nav'
import type { ViewBy, Audience } from './types'

interface Nav {
  home: () => void
  go: (path: string) => void
  subject: (sid: string) => void
  area: (sid: string, areaName: string) => void
  topic: (sid: string, areaName: string, topicName: string) => void
  topicByName: (sid: string, topicName: string) => void
}

interface AppContextType {
  aud: Audience; setAud: (a: Audience) => void
  vview: ViewBy; setView: (v: ViewBy) => void
  toast: (m: string) => void; toastMsg: string; toastShow: boolean
  buddy: { open: boolean; ctx: string }
  openBuddy: () => void; openBuddyTopic: (t: string) => void; closeBuddy: () => void
  switcherOpen: boolean; setSwitcherOpen: (b: boolean) => void
  nav: Nav
}

const Ctx = createContext<AppContextType | null>(null)
export const useApp = (): AppContextType => {
  const c = useContext(Ctx)
  if (!c) throw new Error('useApp must be inside AppProvider')
  return c
}

export function AppProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate()
  const [aud, setAud] = useState<Audience>('older')
  const [vview, setView] = useState<ViewBy>('topic')

  const [toastMsg, setToastMsg] = useState('')
  const [toastShow, setToastShow] = useState(false)
  const tt = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const toast = (m: string) => {
    setToastMsg(m); setToastShow(true)
    clearTimeout(tt.current); tt.current = setTimeout(() => setToastShow(false), 1600)
  }

  const [buddy, setBuddy] = useState<{ open: boolean; ctx: string }>({ open: false, ctx: 'general' })
  const openBuddy = () => setBuddy({ open: true, ctx: 'general' })
  const openBuddyTopic = (t: string) => setBuddy({ open: true, ctx: t })
  const closeBuddy = () => setBuddy((b) => ({ ...b, open: false }))

  const [switcherOpen, setSwitcherOpen] = useState(false)

  const nav: Nav = {
    home: () => navigate('/'),
    go: (path) => navigate(path),
    subject: (sid) => navigate(pSub(sid)),
    area: (sid, areaName) => navigate(pArea(sid, areaName)),
    topic: (sid, areaName, topicName) => navigate(pTopic(sid, areaName, topicName)),
    topicByName: (sid, topicName) => {
      const loc = findTopic(sid, topicName)
      if (loc) {
        const s = SUBJECTS[loc.si]
        navigate(pTopic(s.id, s.areas[loc.ai].name, s.areas[loc.ai].topics[loc.ti].n))
      } else toast('Open: ' + topicName)
    },
  }

  const value: AppContextType = {
    aud, setAud, vview, setView,
    toast, toastMsg, toastShow,
    buddy, openBuddy, openBuddyTopic, closeBuddy,
    switcherOpen, setSwitcherOpen,
    nav,
  }
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}
