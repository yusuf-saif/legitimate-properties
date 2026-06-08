# Setup Guide
> Read this first. Everything you need to get running.

## 1. Install Dependencies
```bash
npm install
```

## 2. Set Up Environment Variables
```bash
cp .env.example .env.local
```
Then fill in `.env.local`:

| Variable | Where to get it |
|----------|----------------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Create project at sanity.io → Settings → API |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` (default) |
| `SANITY_API_TOKEN` | sanity.io → Settings → API → Tokens → Add (Editor role) |
| `NEXT_PUBLIC_APP_URL` | `http://localhost:3000` for dev |
| `NEXT_PUBLIC_WA_NUMBER` | WhatsApp Business number (no + or spaces, e.g. `2348000000000`) |

## 3. Start Development
```bash
# Start Next.js (localhost:3000)
npm run dev

# Start Sanity Studio in a separate terminal (localhost:3333)
npm run sanity
```

## 4. Install the Emil Design Skill (already in .claude/skills/)
The `emil-design-eng` skill is already copied into `.claude/skills/emil-design-eng/SKILL.md`.
Claude Code and OpenCode will auto-load it.

To update it later:
```bash
npx skills add https://github.com/emilkowalski/skill --skill emil-design-eng --yes
```

---

## Using Claude Code
Claude Code reads `CLAUDE.md` automatically every session. Everything it needs is there.

### Slash Commands Available
| Command | What it does |
|---------|-------------|
| `/phase 2a` | Build all pages for Phase 2a (About page) |
| `/phase 2b` | Build Contact page + API route |
| `/new-page [name]` | Scaffold a new page with correct hero + layout |
| `/new-component [Name] [type]` | Create a new component with design system |
| `/design "Component Name"` | Build/redesign with max design quality + Emil review |
| `/check` | Full project audit — TODOs, violations, missing pages |
| `/check [filepath]` | Focused review of a single file |
| `/schema [name]` | Create Sanity schema + TypeScript type + GROQ query |
| `/brand [path]` | Audit a directory for design system violations |

### Workflow for Building Remaining Pages
```bash
# In Claude Code terminal:
/phase 2a     # Builds About page
/phase 2b     # Builds Contact page  
/phase 2c     # Builds Investors page
/phase 2d     # Builds News listing
/phase 2e     # Builds News detail
/phase 2f     # Builds Services page
/phase 2g     # Builds 404 page
/check        # Full audit before launch
```

## Using OpenCode
OpenCode reads `AGENTS.md` automatically every session.

### Slash Commands
Same as Claude Code but prefixed with `/user:`:
```
/user:phase 2a
/user:check
```

---

## Skills Available

### `emil-design-eng` (Installed — `.claude/skills/`)
Emil Kowalski's design engineering philosophy. Covers:
- Animation decision framework (should it animate? how fast? what easing?)
- Component polish principles (button press states, popover origins, tooltip behaviour)
- Performance rules (only animate transform + opacity, CSS vs Framer Motion tradeoffs)
- `clip-path` animation techniques
- Spring animation guidance
- Full review checklist (before/after table format)

Reference: [animations.dev](https://animations.dev/) | [emilkowal.ski/skill](https://emilkowal.ski/skill)

### Other Skills to Consider Adding
```bash
# Good pairings for this project:
npx skills add vercel-labs/agent-skills --yes    # Vercel-specific best practices
```

---

## Project Structure
```
legitimate-properties/
├── CLAUDE.md              ← Claude Code reads this every session
├── AGENTS.md              ← OpenCode reads this every session
├── SETUP_GUIDE.md         ← You're reading this
├── docs/
│   ├── PRD.md             ← Product requirements
│   ├── TRD.md             ← Technical requirements
│   ├── DESIGN_SYSTEM.md   ← Full token + component reference
│   ├── DESIGN_GUIDE.md    ← Animation + premium UI guidance
│   └── BUILD_PHASES.md    ← What's built, what's next
├── .claude/
│   ├── settings.json      ← Permissions + model config
│   ├── skills/
│   │   └── emil-design-eng/SKILL.md  ← Loaded automatically
│   └── commands/
│       ├── phase.md        → /phase 2a
│       ├── check.md        → /check
│       ├── design.md       → /design "Component"
│       ├── schema.md       → /schema name
│       ├── brand.md        → /brand path/
│       ├── new-page.md     → /new-page name
│       └── new-component.md→ /new-component Name type
├── .opencode/
│   └── commands/
│       ├── phase.md        → /user:phase 2a
│       └── check.md        → /user:check
├── src/
│   ├── app/               ← Next.js App Router pages
│   ├── components/        ← All UI components
│   ├── lib/               ← Sanity, hooks, utils
│   ├── styles/            ← globals.css
│   └── types/             ← TypeScript interfaces
├── sanity/schemas/        ← Sanity content schemas
└── public/                ← Static assets
```
