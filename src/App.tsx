import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import TabBar from './components/TabBar'
import Home from './components/Home'
import SubjectHub from './components/SubjectHub'
import AreaPage from './components/AreaPage'
import TopicPage from './components/TopicPage'
import Search from './components/Search'
import Progress from './components/Progress'
import Profile from './components/Profile'
import Sofabuddy from './components/Sofabuddy'
import SubjectSwitcher from './components/SubjectSwitcher'
import Toast from './components/Toast'

// On desktop, scale the fixed 390×844 phone to fit the window (preserves ratio
// and keeps content from reflowing). On real phones (<500px) it goes full-bleed.
const FRAME_W = 390 + 22, FRAME_H = 844 + 22, GAP = 40
function useFitScale() {
  useEffect(() => {
    const fit = () => {
      const root = document.documentElement
      if (window.innerWidth < 500) { root.style.removeProperty('--scale'); return }
      const s = Math.min((window.innerHeight - GAP) / FRAME_H, (window.innerWidth - GAP) / FRAME_W, 1.25)
      root.style.setProperty('--scale', String(s))
    }
    fit()
    window.addEventListener('resize', fit)
    return () => window.removeEventListener('resize', fit)
  }, [])
}

export default function App() {
  useFitScale()
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/s/:sid" element={<SubjectHub />} />
        <Route path="/s/:sid/:area" element={<AreaPage />} />
        <Route path="/s/:sid/:area/:topic" element={<TopicPage />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <TabBar />
      <SubjectSwitcher />
      <Sofabuddy />
      <Toast />
    </div>
  )
}
