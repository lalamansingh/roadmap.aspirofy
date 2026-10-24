# Aspirofy Roadmaps

Interactive learning roadmaps with a built-in progress-tracking and analytics system.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
```

## Features

**Roadmaps**
- Interactive roadmap map (sections on a central spine, topics branching left/right) plus a checklist view
- Topic drawer: description, difficulty, estimated hours, free resources, notes, confidence rating
- Quick status marking: right-click = done, shift+click = learning, alt+click = skip; drawer shortcuts d / l / s / r, ←/→, esc
- Optional / alternative topic markers, milestone projects after each stage
- Filters: search, difficulty level, hide completed

**Tracking & analytics** (everything is an event in a local log)
- Study timer per topic (header chip) + manual time logging
- 12-month activity heatmap, daily study time, hours/week vs goal, topics/week velocity
- Per-roadmap forecasts: pace, hours left, projected finish date, target date on-track check
- When-you-study (hour of day / weekday), skill depth by difficulty, estimate-vs-actual pace
- Up next, weak topics (low confidence), most time invested
- Streaks, XP levels, achievements
- Spaced-repetition review queue for completed topics
- Export / import JSON, demo data, reset

**Beyond roadmaps**
- 24 roadmaps (14 role-based, 10 skill-based), 916 topics
- Section quizzes: 555 questions with explanations, mastery score per roadmap (`/quiz/:id`)
- Study planner: week-by-week schedule from your remaining topics, .ics calendar export (`/planner`)
- Projects board: milestone + extra project ideas, Idea → Building → Shipped, portfolio as Markdown (`/projects`)
- Global search / command palette: Ctrl+K or ⌘K, Shift+Enter marks a topic done

## Structure

```
src/data/roadmaps/*.ts   roadmap content (compact tuple format, see data/build.ts)
src/lib/store.ts         persisted zustand store + event log
src/lib/analytics.ts     all analytics computations
src/pages/               Home, Roadmaps, Roadmap, Dashboard, Review, Settings
src/components/          canvas, drawer, heatmap, UI primitives
```

To add a roadmap: create `src/data/roadmaps/<id>.ts` with `buildRoadmap({...})` and register it in `src/data/index.ts`.
