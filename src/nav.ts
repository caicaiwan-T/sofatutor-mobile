import { SUBJECTS } from './data'
import type { Subject, Area, Topic } from './types'

export const slug = (s: string): string =>
  s.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

// path builders
export const pSub = (sid: string) => `/s/${sid}`
export const pArea = (sid: string, areaName: string) => `/s/${sid}/${slug(areaName)}`
export const pTopic = (sid: string, areaName: string, topicName: string) =>
  `/s/${sid}/${slug(areaName)}/${slug(topicName)}`

export interface Resolved { ci: number; s: Subject; ai: number; a: Area | null; ti: number; t: Topic | null }

// resolve url params (sid / area-slug / topic-slug) to data objects
export function resolve(sid?: string, areaSlug?: string, topicSlug?: string): Resolved | null {
  const ci = SUBJECTS.findIndex((s) => s.id === sid)
  if (ci < 0) return null
  const s = SUBJECTS[ci]
  const res: Resolved = { ci, s, ai: -1, a: null, ti: -1, t: null }
  if (areaSlug) {
    const ai = s.areas.findIndex((a) => slug(a.name) === areaSlug)
    if (ai < 0) return res
    res.ai = ai; res.a = s.areas[ai]
    if (topicSlug) {
      const ti = res.a.topics.findIndex((t) => slug(t.n) === topicSlug)
      res.ti = ti; res.t = ti >= 0 ? res.a.topics[ti] : null
    }
  }
  return res
}
