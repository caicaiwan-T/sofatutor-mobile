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

export default function App() {
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
