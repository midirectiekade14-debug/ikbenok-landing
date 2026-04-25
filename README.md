# ik ben ok — Landingspagina

Statische landingspagina voor de **ik ben ok** check-in app — een alarm dat afgaat als er níet gereageerd wordt.

## Live

GitHub Pages: zie *Settings → Pages* van dit repo voor de URL.

## Stack

Geen build step. React 18 + Babel-standalone via CDN, vanilla CSS custom properties, inline JSX-componenten. Direct hostbaar op elke statische host.

```
index.html              entry — mount React tree
components/Landing.jsx  Nav, Hero, HowItWorks, QuoteBlock, Pricing, Footer
components/Phone.jsx    iPhone mockup + 4 schermen (Home, Ping, Caregiver, Schedule)
styles/colors_and_type.css  design tokens (colors, type, spacing, motion)
assets/                 logo, mark, seal, paper-grain
```

## Lokaal draaien

```bash
python -m http.server 8000
# open http://localhost:8000
```

Geen npm install nodig.

## Design source

Geëxporteerd uit [Claude Design](https://claude.ai/design) — bundle `G7BXH3zAgSNne4IF4O3Ceg`.
