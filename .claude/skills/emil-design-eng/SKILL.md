---
name: emil-design-eng
description: This skill encodes Emil Kowalski's philosophy on UI polish, component
design, animation decisions, and the invisible details that make software feel great.
---

To install the full skill run:
  npx skills add https://github.com/emilkowalski/skill --skill emil-design-eng --yes

Until then, enforce these rules on every component in this project:
- Never use `transition: all` — name exact properties
- Never animate from scale(0) — start from scale(0.95) opacity:0
- Never use ease-in on UI elements — use ease-out or cubic-bezier(0.23, 1, 0.32, 1)
- UI transition duration: 150–250ms. Modals/drawers: 200–350ms. Never exceed 300ms for UI.
- Button active state: transform scale(0.97), 160ms ease-out
- Stagger grid children: 80ms delay per item
- Respect prefers-reduced-motion — degrade to instant transitions
- Only animate transform and opacity — never height, width, padding, margin
- Popovers: transform-origin at trigger point, not center
- Modals: transform-origin center (exception to above)

Run: npx skills add https://github.com/emilkowalski/skill --skill emil-design-eng --yes
to get the full 679-line version when network is available.
