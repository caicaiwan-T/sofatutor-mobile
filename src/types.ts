export type TopicState = 'done' | 'prog' | 'start' | 'lock'
export type ViewName = 'subject' | 'area' | 'topic'
export type ViewBy = 'topic' | 'grade' | 'mastery' | 'difficulty'
export type Audience = 'older' | 'young'

export interface Topic {
  n: string
  st: TopicState
  pct?: number
  diff?: number
  prereq?: string      // soft prerequisite (banner)
  prereqLock?: string  // hard prerequisite (locks the topic)
  next?: string        // "deepens" relation
  related?: string[]   // "related" relation
}

export interface Area {
  name: string
  icon: string
  topics: Topic[]
}

export interface Subject {
  id: string
  name: string
  color: string
  icon: string
  grade: string
  areas: Area[]
}

export interface NavState {
  route: 'home' | 'subject'
  cur: number
  view: ViewName
  selA: number
  selT: number
  expanded: number
}

export interface AppState extends NavState {
  vview: ViewBy
  aud: Audience
  railOpen: boolean
}

// A flattened topic with its location, used by the subject hub.
export interface FlatTopic {
  a: Area
  ai: number
  t: Topic
  ti: number
}
