# sofatutor · mobile (React + TypeScript)

The mobile companion to `sofatutor-react`. **Same content architecture** (identical
`SUBJECTS` data, same IA: subject → area → topic → topic page; content converges on the
topic page) but the **hierarchy and layout are re-thought for touch** — bottom tabs,
drill-down navigation, large collapsing titles, App-Store-style shelves, and bottom sheets.

## Run / build

```bash
npm install
npm run dev        # http://localhost:5173
npm run typecheck
npm run build      # -> dist/
```

Deploys to Vercel as a standard Vite app (`vercel.json` adds the SPA rewrite).

## Mobile design decisions (vs. desktop)

| Desktop | Mobile |
|---|---|
| Persistent left rail (subject · areas · topics) | **Bottom tab bar** + drill-down screens with a back-navigating top bar |
| Top-nav mega-menu for subjects | **Subjects live on the Home (Learn) tab**; switch subject via a bottom sheet |
| Subject hub = all topics in a grid + VIEW BY | Subject hub = **horizontal shelves per area** (App-Store style) + VIEW BY chips |
| Topic page: multi-column convergence | Same content, **stacked vertically**: Watch → big CTA → Practice (2-col tools) → Check → Ask Sofabuddy → Up next / Related |
| Sofabuddy = docked side panel | Sofabuddy = **full-screen bottom sheet**, opened contextually from the topic page |
| Hover states | Tap/active states, 44px targets, safe-area insets |

Unchanged from desktop (one IA): topic-first entry, content convergence, VIEW BY at the
subject level only, prerequisite locks/banners, knowledge-graph "up next / related", and the
older/young audience split.

## Screens
`Home` (Learn) · `SubjectHub` (shelves) · `AreaPage` · `TopicPage` · `Search` · `Progress` ·
`Profile` · `Sofabuddy` (sheet) · `SubjectSwitcher` (sheet).

## Structure
```
src/
  main.tsx · App.tsx (routes + tab bar + sheets)
  store.tsx   app state + navigation helpers (router-based)
  data.ts     SHARED with desktop (same content source)
  types.ts · nav.ts (slug + url resolvers) · icons.tsx · styles.css (iOS tokens)
  components/  Screen (large-title wrapper), TabBar, Home, SubjectHub, AreaPage,
               TopicPage, Search, Progress, Profile, Sofabuddy, SubjectSwitcher, Toast, shared
```
Layout fits a phone full-bleed; on desktop it renders as a centered phone frame for demos.
