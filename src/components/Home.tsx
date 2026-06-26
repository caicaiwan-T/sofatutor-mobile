import Screen from './Screen'
import { useApp } from '../store'
import { Icon, Ring } from '../icons'
import { SUBJECTS, subjPct } from '../data'

export default function Home() {
  const { aud } = useApp()
  return (
    <Screen title="Learn" subtitle="Welcome back, Lena 👋" right={<AudMini />}>
      {aud === 'older' ? <Older /> : <Young />}
    </Screen>
  )
}

// compact audience toggle, lives in the nav bar's top-right
function AudMini() {
  const { aud, setAud } = useApp()
  return (
    <div className="seg-mini">
      <button className={aud === 'older' ? 'on' : ''} onClick={() => setAud('older')}>9–13</button>
      <button className={aud === 'young' ? 'on' : ''} onClick={() => setAud('young')}>1–4</button>
    </div>
  )
}

function Subjects({ big }: { big?: boolean }) {
  const { nav } = useApp()
  return (
    <>
      <div className="secrow"><h2>Your subjects</h2></div>
      <div className="subjgrid">
        {SUBJECTS.map((s) => {
          const p = subjPct(s)
          return (
            <div key={s.id} className="subjcard" onClick={() => nav.subject(s.id)}>
              <div className="sci" style={{ background: s.color }}><Icon name={s.icon} /></div>
              <div className="scn">{s.name}</div>
              <div className="scm">{big ? 'Tap to play!' : (p > 0 ? `${p}% · ${s.grade}` : 'Start exploring')}</div>
              {!big && <div className="scbar"><i style={{ width: p + '%', background: s.color }} /></div>}
            </div>
          )
        })}
      </div>
    </>
  )
}

/* ---------------- OLDER ---------------- */
function Older() {
  const { nav, toast } = useApp()
  return (
    <>
      <div className="search" onClick={() => nav.go('/search')}><Icon name="search" /> Search topics, skills…</div>

      <div className="feat" onClick={() => nav.topicByName('math', 'Comparing fractions')}>
        <Ring pct={60} color="#fff" track="rgba(255,255,255,.32)" label="60%" />
        <div className="ftxt">
          <div className="fk">Continue</div>
          <div className="ft">Comparing fractions</div>
          <div className="fa">Mathematics · ~6 min left</div>
        </div>
        <div className="resume">Resume</div>
      </div>

      <div className="exam" onClick={() => toast('Test prep — topics auto-organised by exam scope')}>
        <div className="eic"><Icon name="cap" /></div>
        <div>
          <div className="et">Maths class test</div>
          <div className="es">Fractions &amp; decimals · 2 topics need work</div>
        </div>
        <span className="ecd">in 3 days</span>
      </div>

      <div className="secrow"><h2>Recommended next</h2><span className="aitag"><Icon name="sparkle" />AI</span></div>
      <div className="hscroll">
        <Rec icn="pie" col="#2f6fb0" subj="Mathematics" name="Equivalent fractions" why="The next skill after comparing fractions." sid="math" topic="Equivalent fractions" />
        <Rec icn="book" col="#cf4d63" subj="German" name="Cases (Dativ)" why="Resume your reading streak." sid="german" topic="The four cases" />
        <Rec icn="shape" col="#1f9d6b" subj="English" name="Present tenses" why="25% done — one set to finish." sid="english" topic="Present tenses" />
      </div>

      <Subjects />
    </>
  )
}

function Rec({ icn, col, subj, name, why, sid, topic }: { icn: string; col: string; subj: string; name: string; why: string; sid: string; topic: string }) {
  const { nav } = useApp()
  return (
    <div className="reccard" onClick={() => nav.topicByName(sid, topic)}>
      <div className="ri" style={{ background: col }}><Icon name={icn} /></div>
      <div className="rsubj">{subj}</div>
      <div className="rn">{name}</div>
      <div className="rwhy">{why}</div>
    </div>
  )
}

/* ---------------- YOUNG ---------------- */
function Young() {
  const { nav, toast } = useApp()
  return (
    <>
      <div className="feat" style={{ background: 'linear-gradient(135deg,#f0a93a,#d97a18)', marginTop: 16 }} onClick={() => toast('Launching Sofaheld with Pommes 🐧')}>
        <div style={{ fontSize: 46, flex: '0 0 auto' }}>🐧</div>
        <div className="ftxt">
          <div className="fk">Today's adventure</div>
          <div className="ft">Play &amp; learn with Pommes</div>
          <div className="fa">Earn 3 stars!</div>
        </div>
        <div className="resume" style={{ color: '#d97a18' }}>Go!</div>
      </div>

      <div className="exam" style={{ background: 'linear-gradient(120deg,#eaf6ee,#dcefe2)', borderColor: '#bce0c8' }} onClick={() => toast('Friendly test practice 🌟')}>
        <div className="eic" style={{ borderColor: '#bce0c8', color: '#2f8a52' }}><Icon name="cap" /></div>
        <div>
          <div className="et" style={{ color: '#1f6b3c' }}>Little maths test! 💪</div>
          <div className="es" style={{ color: '#3d8a5a' }}>Let's practise together</div>
        </div>
        <span className="ecd" style={{ color: '#2f8a52', borderColor: '#bce0c8' }}>in 3 sleeps</span>
      </div>

      <div className="secrow"><h2>Keep playing</h2></div>
      <div className="hscroll">
        <Rec icn="pie" col="#2f6fb0" subj="Maths game" name="Comparing fractions" why="Level 3 of 5 🏆" sid="math" topic="Comparing fractions" />
        <Rec icn="book" col="#cf4d63" subj="German" name="Reading with Pommes" why="New adventure!" sid="german" topic="Main idea & details" />
        <Rec icn="shape" col="#1f9d6b" subj="English" name="English words" why="Earn 2 stars" sid="english" topic="Everyday words" />
      </div>

      <Subjects big />
    </>
  )
}
