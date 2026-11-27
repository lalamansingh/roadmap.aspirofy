# Aspirofy Roadmaps

**Know what to learn. Watch yourself grow.**

Step-by-step learning roadmaps for 24 tech careers and skills, with a built-in tracker that turns every topic you study into progress, streaks, a study history and a projected finish date.

**Live app: https://roadmap-aspirofy.vercel.app**

Free, with no sign-up. Your progress is stored only in your own browser.

---

## Contents

- [How to learn with a roadmap](#how-to-learn-with-a-roadmap)
- [Where to read documentation and find resources](#where-to-read-documentation-and-find-resources)
- [How your progress is tracked](#how-your-progress-is-tracked)
- [Example: following the Frontend Developer roadmap](#example-following-the-frontend-developer-roadmap)
- [All features](#all-features)
- [Available roadmaps](#available-roadmaps)
- [Your data and privacy](#your-data-and-privacy)
- [Run it locally](#run-it-locally)
- [Add or edit a roadmap](#add-or-edit-a-roadmap)

---

## How to learn with a roadmap

Each roadmap works like a self-paced course. It is split into **stages**, each stage has **topics**, and most stages end with a **milestone project**.

1. **Pick a roadmap.** On the home page, choose a goal under *"What do you want to do?"*, or browse the **Roadmaps** page. Search covers topics too, so typing "window functions" finds the SQL roadmap.
2. **Read the roadmap header.** It shows how many stages, topics, hours and projects the roadmap has, what you will be able to do at the end, and who it is for.
3. **Work through the stages in order.** Stages go from beginner to advanced. Each topic shows its estimated hours. Topics marked **Optional** are nice to have, and topics marked **Alt** are alternatives: pick one (for example React, Vue or Angular).
4. **Open a topic to study it.** Clicking a topic opens a side panel with:
   - a short explanation of what to learn
   - links to official documentation, articles, videos and practice exercises
   - a study timer, a notes box and a confidence rating
5. **Mark your progress.** Set each topic to **Learning**, **Done** or **Skipped**. Clicking the circle next to a topic marks it done in one click.
6. **Build the milestone project** at the end of each stage to prove what you learned, and track it on the **Projects** board.
7. **Check what stuck** with the roadmap's **quizzes** and the **Review** queue.

> **Tip:** Plan it out first. Open **Planner**, choose the roadmap and how many hours a week you can study, and you get a week-by-week schedule with a finish date. You can also export it to your calendar.

---

## Where to read documentation and find resources

Every topic's side panel has a **Free resources** list:

| Resource | What it links to |
|---|---|
| **Official documentation** | The project's own docs page, for example MDN, react.dev, the Node.js docs, go.dev, kubernetes.io, the Docker docs or Android Developers. About 210 of the 916 topics have one. |
| **Articles & guides** | A web search for guides on that exact topic. |
| **Video tutorials** | A YouTube search for tutorials on the topic. |
| **Practice exercises** | A web search for exercises to practise the topic. |

Start with the official documentation when there is a link. It is the most accurate and up-to-date source. Use videos and articles for a second explanation, then practise.

Keep what you learn in the **My notes** box on each topic. It saves automatically, and a note icon on the roadmap shows which topics have notes.

---

## How your progress is tracked

Everything you do is saved as an entry in a local activity log. The analytics are calculated from that log.

### What gets recorded

| You do this | What is saved | Where it shows up |
|---|---|---|
| Mark a topic **Learning** | Status change | Roadmap progress, *Up next*, Planner (in-progress topics are scheduled first) |
| Mark a topic **Done** | Status change, and the topic joins the review queue for tomorrow | Progress %, streak, XP, weekly topics chart, finish-date forecast |
| Mark a topic **Skipped** | Status change | The topic is left out of progress % and remaining hours |
| Start and stop the **timer** | Minutes studied on that topic | Time studied, daily and weekly charts, *When you study*, *Most time invested* |
| **Log minutes** manually | Minutes studied | Same as the timer |
| Write a **note** | A note event (first time per topic) | *Note Taker* achievement |
| Rate your **confidence** (1–5 stars) | Confidence score | *Needs reinforcement* list (topics done but rated 1–2 stars) |
| Grade a **review** | Review result and next due date | Review queue, *Never Forget* achievement |
| Take a **quiz** | Score per section | Mastery %, quiz stats on the Analytics page |

### How the numbers are calculated

- **Progress %** = topics done ÷ topics not skipped, per stage and for the whole roadmap.
- **Streak** = consecutive days with any activity. Today not being active yet does not break it.
- **Pace** = topics completed in that roadmap over the last 28 days, shown as topics per week.
- **Projected finish** = remaining topics ÷ your pace. It appears once you've completed a few topics.
- **Target date check:** set a target date on a roadmap and it tells you the topics per week you need, and whether you are on track or behind.
- **Pace vs estimate** = time you logged ÷ estimated hours, on completed topics. Above 1× means you're slower than the estimates, below 1× faster.
- **XP** = 50 per topic done + 5 per 10 minutes studied + 10 per review. Each level needs more XP than the last.
- **Spaced review:** a completed topic comes back the next day. Rate your recall as *Forgot*, *Hard*, *Good* or *Easy*, and it returns after a shorter or longer gap.
- **Quiz mastery** = the average of your best score in each section. Sections you haven't tried count as 0%.

---

## Example: following the Frontend Developer roadmap

Here is what happens when you pick **Frontend Developer** (11 stages, 55 topics, about 257 hours):

1. **Open the roadmap.** The header shows the stages, topics, hours and 5 milestone projects, plus the three outcomes (build accessible sites, ship typed React apps, fix performance and security issues). The progress card shows 0%.
2. **Stage 1: How the Web Works.** You open *Internet & HTTP basics*, read the MDN link, and press **Start timer**. The timer appears in the top bar while you study. When you stop it, 45 minutes is logged to that topic.
3. **Mark it done.** The topic turns green, the stage's progress ring fills a little, your streak starts, and you earn XP. The topic is scheduled for review tomorrow.
4. **Keep going for a couple of weeks.** The roadmap's progress card now shows your pace (for example 5 topics per week) and a projected finish date. Set a target date, and it tells you whether you are on track.
5. **Finish Stage 2 (HTML).** The milestone project *Personal profile page* is waiting. Move it to *Building* on the Projects board, then *Shipped* with your repo and demo links.
6. **Next day: open Review.** *Internet & HTTP basics* is due. You recall the key ideas, reveal the answer and grade yourself. *Good* sends it back in a few days.
7. **Take the HTML quiz.** Three questions with explanations. Your best score counts towards the roadmap's mastery %.
8. **Check Analytics.** Your activity heatmap, study hours versus your weekly goal, topics per week, the hours you usually study, weak topics and achievements are all there.

To see all of this with sample data first, click **"Try it with demo data"** on the home page. It loads 90 days of activity across four roadmaps. Clear it any time from **Settings**.

---

## All features

### Roadmaps
- 24 roadmaps (14 role-based, 10 skill-based) with 916 topics
- Stage timeline view and a **Checklist** view
- Each topic has a description, difficulty, estimated hours, free resources, notes, a confidence rating and its activity history
- *What you'll be able to do* and *Who it's for* on every roadmap
- Filters: search topics, filter by level, hide completed
- Bookmark roadmaps, copy a progress summary to share, reset a roadmap

### Tracking & analytics (the **Analytics** page)
- Streak, topics done, time studied, active days, level and XP, reviews due, pace versus estimates
- 12-month activity heatmap
- Daily study time chart, hours per week against your weekly goal, topics completed per week
- Progress and projected finish for every roadmap you've started
- When you study (hour of day and day of week)
- Skill depth by difficulty level
- Up next, needs reinforcement, most time invested
- Quiz performance, project stats, 12 achievements
- View the last 30 days, 90 days or 1 year

### Study tools
- **Study timer:** start it from any topic. It keeps running while you browse, and you stop it from the top bar.
- **Planner:** a week-by-week schedule built from your remaining topics and weekly hours. Optionally include optional or alternative topics. Export it as an `.ics` calendar file or print it.
- **Quizzes:** 555 questions with explanations, about three per stage.
- **Spaced review:** a daily queue of completed topics to recall.
- **Projects board:** milestone and extra project ideas, moved from *Idea* to *Building* to *Shipped*, with repo and demo links. Export your portfolio as Markdown.
- **Search palette:** press Ctrl+K or ⌘K to jump to any page, roadmap or topic. Shift+Enter marks a topic done.

### Keyboard shortcuts

| Where | Shortcut | Action |
|---|---|---|
| Anywhere | Ctrl+K / ⌘K | Open search |
| Roadmap | Click the circle | Toggle done |
| Roadmap | Shift+click a topic | Mark learning |
| Roadmap | Alt+click a topic | Mark skipped |
| Roadmap | Right-click a topic | Toggle done |
| Topic panel | `d` / `l` / `s` / `r` | Done / Learning / Skip / Reset |
| Topic panel | ← / → | Previous / next topic |
| Topic panel | Esc | Close |

### Interface
- Light and dark themes
- Works on phones, with a bottom tab bar

---

## Available roadmaps

| Roadmap | Type | Stages | Topics | Hours | Topics with official docs |
|---|---|---|---|---|---|
| [Frontend Developer](https://roadmap-aspirofy.vercel.app/#/roadmaps/frontend) | Role | 11 | 55 | ~257h | 18 |
| [Backend Developer](https://roadmap-aspirofy.vercel.app/#/roadmaps/backend) | Role | 10 | 46 | ~265h | 13 |
| [Full Stack Developer](https://roadmap-aspirofy.vercel.app/#/roadmaps/fullstack) | Role | 6 | 21 | ~146h | 2 |
| [DevOps Engineer](https://roadmap-aspirofy.vercel.app/#/roadmaps/devops) | Role | 10 | 41 | ~183h | 6 |
| [AI Engineer](https://roadmap-aspirofy.vercel.app/#/roadmaps/ai-engineer) | Role | 8 | 31 | ~96h | 1 |
| [Machine Learning Engineer](https://roadmap-aspirofy.vercel.app/#/roadmaps/machine-learning) | Role | 9 | 46 | ~174h | 8 |
| [Data Analyst](https://roadmap-aspirofy.vercel.app/#/roadmaps/data-analyst) | Role | 6 | 24 | ~96h | 1 |
| [Data Engineer](https://roadmap-aspirofy.vercel.app/#/roadmaps/data-engineer) | Role | 8 | 40 | ~149h | 9 |
| [Cyber Security](https://roadmap-aspirofy.vercel.app/#/roadmaps/cyber-security) | Role | 5 | 18 | ~80h | 0 |
| [Android Developer](https://roadmap-aspirofy.vercel.app/#/roadmaps/android) | Role | 8 | 47 | ~155h | 18 |
| [iOS Developer](https://roadmap-aspirofy.vercel.app/#/roadmaps/ios) | Role | 8 | 44 | ~149h | 13 |
| [QA Engineer](https://roadmap-aspirofy.vercel.app/#/roadmaps/qa-engineer) | Role | 8 | 44 | ~138h | 10 |
| [UX Designer](https://roadmap-aspirofy.vercel.app/#/roadmaps/ux-design) | Role | 8 | 42 | ~128h | 3 |
| [Product Manager](https://roadmap-aspirofy.vercel.app/#/roadmaps/product-manager) | Role | 8 | 43 | ~122h | 1 |
| [React](https://roadmap-aspirofy.vercel.app/#/roadmaps/react) | Skill | 5 | 22 | ~59h | 1 |
| [TypeScript](https://roadmap-aspirofy.vercel.app/#/roadmaps/typescript) | Skill | 8 | 43 | ~106h | 20 |
| [Node.js](https://roadmap-aspirofy.vercel.app/#/roadmaps/nodejs) | Skill | 9 | 50 | ~157h | 22 |
| [Python](https://roadmap-aspirofy.vercel.app/#/roadmaps/python) | Skill | 5 | 25 | ~103h | 2 |
| [Go](https://roadmap-aspirofy.vercel.app/#/roadmaps/golang) | Skill | 9 | 50 | ~127h | 23 |
| [Java](https://roadmap-aspirofy.vercel.app/#/roadmaps/java) | Skill | 9 | 51 | ~150h | 12 |
| [SQL](https://roadmap-aspirofy.vercel.app/#/roadmaps/sql) | Skill | 5 | 21 | ~42h | 0 |
| [Docker](https://roadmap-aspirofy.vercel.app/#/roadmaps/docker) | Skill | 9 | 46 | ~82h | 10 |
| [Kubernetes](https://roadmap-aspirofy.vercel.app/#/roadmaps/kubernetes) | Skill | 9 | 46 | ~104h | 17 |
| [System Design](https://roadmap-aspirofy.vercel.app/#/roadmaps/system-design) | Skill | 4 | 20 | ~46h | 0 |

Hours are estimates of focused study time.

---

## Your data and privacy

- There are no accounts or passwords. Nothing is sent to a server.
- Progress, notes, timers, quiz scores and projects are saved in your browser's local storage.
- Clearing your browser data or switching browsers or devices starts you fresh. To move your progress, use **Settings → Export JSON**, then **Import JSON** on the other device.
- **Settings** also has your display name, weekly study goal (default 8 hours), demo data and *Reset everything*.

---

## Run it locally

Requires Node.js 20.19+ or 22.12+.

```bash
git clone https://github.com/lalamansingh/roadmap.aspirofy
cd roadmap.aspirofy
npm install
npm run dev        # http://localhost:5173 (Vite uses the next free port if 5173 is taken)
npm run build      # type-check and build into dist/
npm run preview    # serve the production build
```

Built with React 19, TypeScript, Vite, Tailwind CSS 4, Zustand and Recharts.

**Deploying:** the site is hosted on Vercel. Run `vercel deploy --prod`, or connect the GitHub repo in Vercel so each push to `main` deploys. The app uses `#` URLs, so any static host works without extra routing setup.

---

## Add or edit a roadmap

Roadmap content lives in `src/data/roadmaps/<id>.ts`. Each topic is written as a short tuple:

```ts
['Topic title', estimatedHours, 'What to learn.', 'https://official-docs-link']
// or mark it optional / alternative:
['Svelte', 15, 'A compiler-based framework.', { kind: 'alternative', docs: 'https://svelte.dev/docs' }]
```

To add a roadmap:

1. Create `src/data/roadmaps/<id>.ts` using `buildRoadmap({...})`. Copy an existing file as a template.
2. Register it in `src/data/index.ts`.
3. Add its icon, outcomes and audience in `src/data/meta.ts`.
4. Optionally add quiz questions in `src/data/quizzes*.ts`, keyed by stage title.

To improve resources, add an official docs URL as the fourth item on a topic. That is the most useful content upgrade left, since about 700 topics only have search links.
