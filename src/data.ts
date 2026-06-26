import type { Subject, Area, Topic } from './types'

// One content source. Skill = the "topic" the user enters. Areas group them.
// States: done / prog / start / lock (lock follows prerequisite).
export const SUBJECTS: Subject[] = [
  { id: 'math', name: 'Mathematics', color: '#2f6fb0', icon: 'calc', grade: 'Grade 10', areas: [
    { name: 'Numbers & operations', icon: 'calc', topics: [
      { n: 'Place value', st: 'done' }, { n: 'Times tables', st: 'done' },
      { n: 'Long division', st: 'prog', pct: 45, diff: 1 }] },
    { name: 'Fractions', icon: 'pie', topics: [
      { n: 'Comparing fractions', st: 'prog', pct: 60, diff: 2, next: 'Ordering fractions', related: ['Decimals', 'Percentages'] },
      { n: 'Equivalent fractions', st: 'start', diff: 2, prereq: 'Comparing fractions', related: ['Decimals'] },
      { n: 'Adding fractions', st: 'lock', prereqLock: 'Equivalent fractions', diff: 2 },
      { n: 'Mixed numbers', st: 'lock', prereqLock: 'Adding fractions', diff: 3 }] },
    { name: 'Geometry', icon: 'shape', topics: [
      { n: 'Angles', st: 'start', diff: 1 }, { n: 'Area & perimeter', st: 'lock', prereqLock: 'Angles', diff: 2 }] },
    { name: 'Data & chance', icon: 'bar', topics: [
      { n: 'Bar charts', st: 'start', diff: 1 }, { n: 'Mean & median', st: 'lock', prereqLock: 'Bar charts', diff: 2 }] }] },
  { id: 'german', name: 'German', color: '#cf4d63', icon: 'book', grade: 'Grade 10', areas: [
    { name: 'Reading', icon: 'book', topics: [
      { n: 'Main idea & details', st: 'prog', pct: 38, diff: 1, next: 'Summarising' },
      { n: 'Text types', st: 'start', diff: 2 }, { n: 'Summarising', st: 'lock', prereqLock: 'Main idea & details', diff: 2 }] },
    { name: 'Grammar', icon: 'shape', topics: [
      { n: 'The four cases', st: 'start', diff: 2 }, { n: 'Tenses', st: 'lock', prereqLock: 'The four cases', diff: 2 }] },
    { name: 'Writing', icon: 'doc', topics: [
      { n: 'Paragraphs', st: 'start', diff: 1 }, { n: 'Argumentative essay', st: 'lock', prereqLock: 'Paragraphs', diff: 3 }] }] },
  { id: 'english', name: 'English', color: '#1f9d6b', icon: 'book', grade: 'Grade 10', areas: [
    { name: 'Grammar', icon: 'shape', topics: [
      { n: 'Present tenses', st: 'prog', pct: 25, diff: 1, next: 'Past tenses' },
      { n: 'Conditionals', st: 'lock', prereqLock: 'Present tenses', diff: 2 }] },
    { name: 'Vocabulary', icon: 'book', topics: [
      { n: 'Everyday words', st: 'start', diff: 1 }, { n: 'Phrasal verbs', st: 'lock', prereqLock: 'Everyday words', diff: 2 }] },
    { name: 'Reading', icon: 'doc', topics: [{ n: 'Skimming & scanning', st: 'start', diff: 1 }] }] },
  { id: 'bio', name: 'Biology', color: '#6a51d6', icon: 'atom', grade: 'Grade 10', areas: [
    { name: 'Cells', icon: 'pie', topics: [
      { n: 'Cell structure', st: 'start', diff: 1 }, { n: 'Cell division', st: 'lock', prereqLock: 'Cell structure', diff: 2 }] },
    { name: 'Genetics', icon: 'shape', topics: [{ n: 'Inheritance', st: 'start', diff: 2 }] },
    { name: 'Ecology', icon: 'bar', topics: [{ n: 'Food webs', st: 'start', diff: 1 }] }] },
  { id: 'physics', name: 'Physics', color: '#d97a18', icon: 'atom', grade: 'Grade 10', areas: [
    { name: 'Mechanics', icon: 'shape', topics: [
      { n: 'Speed & velocity', st: 'start', diff: 1 }, { n: 'Forces', st: 'lock', prereqLock: 'Speed & velocity', diff: 2 }] },
    { name: 'Energy', icon: 'bar', topics: [{ n: 'Work & power', st: 'start', diff: 2 }] }] },
  { id: 'chem', name: 'Chemistry', color: '#0e9aa0', icon: 'flask', grade: 'Grade 10', areas: [
    { name: 'Matter', icon: 'pie', topics: [
      { n: 'States of matter', st: 'start', diff: 1 }, { n: 'Atoms & elements', st: 'lock', prereqLock: 'States of matter', diff: 2 }] },
    { name: 'Reactions', icon: 'shape', topics: [{ n: 'Chemical changes', st: 'start', diff: 2 }] }] },
]

export const pctOf = (t: Topic): number => (t.st === 'done' ? 100 : t.st === 'prog' ? (t.pct || 0) : 0)
export const areaPct = (a: Area): number => {
  const v = a.topics.map(pctOf)
  return Math.round(v.reduce((x, y) => x + y, 0) / v.length)
}
export const subjPct = (s: Subject): number => {
  const all: number[] = []
  s.areas.forEach((a) => a.topics.forEach((t) => all.push(pctOf(t))))
  return Math.round(all.reduce((x, y) => x + y, 0) / all.length)
}
export const findTopic = (sid: string, tn: string): { si: number; ai: number; ti: number } | null => {
  const s = SUBJECTS.find((x) => x.id === sid)
  if (!s) return null
  for (let ai = 0; ai < s.areas.length; ai++) {
    const ti = s.areas[ai].topics.findIndex((t) => t.n === tn)
    if (ti >= 0) return { si: SUBJECTS.indexOf(s), ai, ti }
  }
  return null
}
export const diffLabel = (d?: number): string => (d === 1 ? 'Foundational' : d === 2 ? 'Core' : d === 3 ? 'Challenge' : 'Core')
