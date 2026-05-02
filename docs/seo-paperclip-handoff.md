# Mission: SEO-onderhoud allesok.nl

> **Overdracht aan Paperclip** · structureel onderhoud van zoekvindbaarheid voor de "ik ben ok" landingspagina(s).

---

## 0 · Mission samenvatting

| Veld | Waarde |
|---|---|
| **Mission-naam** | `seo-allesok` |
| **Goal** | Allesok.nl rankt op top-10 in Google.nl voor de kernzoektermen rond mantelzorg-/check-in-apps voor alleenwonende ouderen, met werkende share-previews en correcte indexering van NL + SV varianten. |
| **Owner-agent** | tba (Paperclip-agent met repo-write + GSC-readonly) |
| **Scope** | `~/projects/ikbenok-landing/` — `index.html`, `sv/index.html`, `enquete/index.html`, `assets/`, nieuwe SEO-files (`robots.txt`, `sitemap.xml`, `og-image.png`). |
| **Out-of-scope** | ❌ Astro/SSR migratie · ❌ visuele/copy-redesign · ❌ pricing-/feature-wijzigingen · ❌ wijzigingen aan de Expo app · ❌ DNS-mutaties zonder Harm-confirm. |
| **Repo** | `midirectiekade14-debug/ikbenok-landing` (main = production via GH Pages) |
| **Live** | https://allesok.nl (NL) · https://allesok.nl/sv/ (SV) · https://allesok.nl/enquete/ |
| **Stack** | Statisch — React 18 + Babel-standalone via CDN. Géén build step. |

---

## 1 · Context & beperkingen

De site is op 2026-05-02 geaudit. Belangrijkste beperking:

> **De content wordt client-side door Babel-standalone gerenderd.** Googlebot ziet bij eerste fetch een lege `<div id="root"></div>`. Een Astro/SSR-migratie zou dit oplossen, maar Harm heeft besloten **die migratie nu niet te doen** — de site matcht 1-op-1 met de Expo-app en wijzigt nog regelmatig.

**Implicatie voor Paperclip:** alle SEO-werk gebeurt binnen deze constraint. Focus op signalen die wél vóór JS-rendering zichtbaar zijn (head-tags, JSON-LD, robots, sitemap, server-set headers) plus signalen buiten de site (linkbuilding, GSC).

**Niet aanpassen zonder Harm-confirm:**
- Het visuele design / copy van de landingspagina (zie [`feedback_design_bundle_exact.md`](../../.claude/projects/C--Users-midir/memory/feedback_design_bundle_exact.md)).
- De NL ↔ SV variant-structuur — `sv/` is in onderhoud voor SE-launch.
- Externe diensten (DNS bij Yourhosting, GH Pages, domeinen) — zie [`feedback_external_services_confirm.md`](../../.claude/projects/C--Users-midir/memory/feedback_external_services_confirm.md).

---

## 2 · Eenmalige taken (P1 — eerste run)

Aanleveren als **één PR** per ticket. Master-push 1× per sessie, rest via PR (zie [`feedback_master_push_one_per_session.md`](../../.claude/projects/C--Users-midir/memory/feedback_master_push_one_per_session.md)).

### T-1 · Head-tags compleet maken

**Files:** `index.html`, `sv/index.html`, `enquete/index.html`

**Toevoegen in `<head>`:**
- `<meta name="description">` — NL + SV varianten, max 160 chars, bevat primaire keyword
- `<meta name="theme-color" content="#F5EFE3">` (cream brand-bg)
- `<link rel="canonical" href="https://allesok.nl/...">` per pagina
- `<link rel="alternate" hreflang="nl" href="https://allesok.nl/">`
- `<link rel="alternate" hreflang="sv" href="https://allesok.nl/sv/">`
- `<link rel="alternate" hreflang="x-default" href="https://allesok.nl/">`
- `<link rel="icon" type="image/svg+xml" href="/assets/favicon.svg">` — nieuw asset, gebruik IkBenOkMark-design (zie [`components/Phone.jsx:7`](../components/Phone.jsx)). Genereer via `assets/checkin-mark-mono.svg` als basis.
- `<link rel="apple-touch-icon" href="/assets/apple-touch-icon.png">` (180×180)
- Open Graph tags (og:title, og:description, og:image, og:url, og:locale, og:type=website)
- Twitter Card tags (summary_large_image)
- `og:image` — 1200×630 PNG, gegenereerd uit hero-section met Playwright headless screenshot of Sharp. Asset: `assets/og-image-nl.png` + `assets/og-image-sv.png`.

**DoD:** elke pagina valideert op:
- https://search.google.com/test/rich-results
- https://www.opengraph.xyz/url/...
- https://cards-dev.twitter.com/validator (deprecated maar nog functioneel) of https://socialsharepreview.com/

### T-2 · `robots.txt` + `sitemap.xml`

**Bestanden:**
```
robots.txt   → repo root
sitemap.xml  → repo root
```

`robots.txt`:
```
User-agent: *
Allow: /
Sitemap: https://allesok.nl/sitemap.xml
```

`sitemap.xml`: 3 URLs (NL, SV, enquete) met `<xhtml:link rel="alternate" hreflang>` per item. `lastmod` automatisch updaten — zie T-7.

**DoD:** `curl -I https://allesok.nl/sitemap.xml` → 200, valid XML, submitted in GSC.

### T-3 · JSON-LD structured data

**Per landingspagina:** `MobileApplication` + `Organization` schema in `<script type="application/ld+json">`.

```jsonc
// Pseudocode — exact schema:
{
  "@context": "https://schema.org",
  "@type": "MobileApplication",
  "name": "ik ben ok",
  "alternateName": "ikbenok",
  "operatingSystem": "iOS, Android",
  "applicationCategory": "HealthApplication",
  "offers": { "@type": "Offer", "price": "2.75", "priceCurrency": "EUR" },
  "url": "https://allesok.nl",
  "publisher": { "@type": "Organization", "name": "ik ben ok", "url": "https://allesok.nl" }
}
```

**Validatie:** https://validator.schema.org/ → 0 errors, 0 warnings.

**Niet toevoegen:** AggregateRating zonder écht aantal reviews — Google penaliseert fake-rich-snippets.

### T-4 · Semantic HTML in pre-render

Omdat React client-side rendert, kan Paperclip **statische SEO-content in `<noscript>` of vóór `<div id="root">`** zetten als crawler-fallback. Voorbeeld:

```html
<noscript>
  <h1>ik ben ok — een check-in app voor alleenwonende ouderen en mantelzorgers</h1>
  <p>Een alarm dat afgaat als er níet gereageerd wordt. €2,75 per maand. iOS en Android.</p>
  <p><a href="/enquete/">Vul de enquête in</a></p>
</noscript>
```

**Of** een script-block dat dezelfde h1/p **buiten React** in `<body>` zet en bij JS-render vervangt — alleen op vraag van Harm, wegens flash-of-content-risico.

**DoD:** `curl -s https://allesok.nl | grep -i "<h1"` returnt een h1 met de primary keyword.

### T-5 · Google Search Console + Bing Webmaster

- Aanmelden allesok.nl via DNS-TXT verificatie (TXT-record bij Yourhosting — Harm-confirm vereist).
- Sitemap submitten.
- Hreflang international targeting instellen.
- Bing Webmaster Tools idem (vooral voor Edge-default-users + ChatGPT/Brave/DuckDuckGo).
- Outputs: site-verificatiebestand of meta-tag in repo + GSC-toegang gedelegeerd naar Paperclip-account.

**DoD:** GSC toont "Property verified" en eerste sitemap-submission heeft status "Success".

### T-6 · Keyword-gap analyse + H-hiërarchie

Huidige H1 is poëtisch maar bevat geen zoekterm:
> "Een alarm dat afgaat als er níet gereageerd wordt"

Doel-keywords (NL):
- alarm alleenwonende ouderen
- check-in app ouderen
- mantelzorg app
- passieve alarmering ouderen
- personenalarm zonder knop
- digitale halsketting alternatief

**Opdracht:** een **subkop of H2** toevoegen aan Hero die letterlijk een primaire zoekterm bevat, zonder de poëtische H1 te slopen. Voorstel terug aan Harm vóór commit.

**DoD:** Voorstel ingediend in Discord-thread `paperclip-control` (#chat thread `1496730699917426701`) met before/after copy + screenshot.

### T-7 · `lastmod` auto-update bij commit

Pre-commit hook of GH Action die bij wijziging van `index.html` / `sv/index.html` / `enquete/index.html` de `<lastmod>` in `sitemap.xml` bijwerkt naar de commit-datum.

**DoD:** push naar main → sitemap-`<lastmod>` reflecteert die push binnen dezelfde commit.

---

## 3 · Doorlopende taken

### Wekelijks (zondag, na de [`infra_weekly_cleanup`](../../.claude/projects/C--Users-midir/memory/infra_weekly_cleanup.md))

- **GSC-rapport** ophalen: clicks, impressions, CTR, avg-position van afgelopen 7d. Posten in Discord-thread `paperclip-control` als compacte samenvatting.
- **Coverage-check:** 0 errors in GSC > Index Coverage. Bij errors → ticket aanmaken in Paperclip met type `ERROR`.
- **Broken-links scan:** `curl -L` op alle interne links + `mailto:` validatie. Footer juridische links zijn momenteel `null` — zodra ingevuld door Harm, opnemen in scan.
- **Position monitoring:** top-10 doel-keywords (T-6) tracken via SerpAPI of handmatige check. Bij positie-drop > 5 plekken → ticket type `VRAAG`.

### Maandelijks (1e zondag, na [`infra_monthly_memory_audit`](../../.claude/projects/C--Users-midir/memory/infra_monthly_memory_audit.md))

- **Lighthouse-audit** (Performance + SEO + Accessibility + Best Practices) → 4 scores naar Discord. Doel: SEO ≥ 95, Performance ≥ 70 (gegeven Babel-standalone constraint).
- **Schema.org herkalibratie** — prijs in JSON-LD tegen de daadwerkelijke pricing in `Landing.jsx` Pricing-sectie. Bij mismatch: auto-PR.
- **Backlink-rapport** via Ahrefs Webmaster Tools (gratis tier) of GSC > Links. Nieuwe verwijzers loggen.
- **Hreflang-cluster valid:** elke NL-pagina linkt SV terug en omgekeerd. https://www.aleydasolis.com/english/international-seo-tools/hreflang-tags-generator/ kan dit valideren.

### Bij elke wijziging in repo (event-driven)

- Webhook van GitHub `push` event op `main` → Paperclip ticket: "verifieer SEO niet gebroken na commit X".
- Checks: `<title>` aanwezig, hreflang clusters intact, sitemap valid, JSON-LD parseable.

---

## 4 · Toegang & secrets

| Resource | Wat nodig | Waar opgeslagen |
|---|---|---|
| GitHub repo (write) | Personal Access Token, scope `repo` + `workflow` | Vault key `GH_TOKEN_PAPERCLIP_SEO` (nog aan te maken) |
| Google Search Console | OAuth refresh-token, readonly scope | Vault key `GSC_REFRESH_TOKEN_ALLESOK` (nog aan te maken) |
| Bing Webmaster | API-key | Vault key `BING_WEBMASTER_KEY_ALLESOK` (nog aan te maken) |
| Discord thread | Webhook URL `paperclip-control` thread | Vault key `DISCORD_PAPERCLIP_THREAD_ID` ✅ aanwezig |
| GH Pages deploy | n.v.t. — push naar `main` triggert auto-deploy | — |

**Geen plaintext** in repo of memory's. Volgens [`feedback_secrets_in_vault.md`](../../.claude/projects/C--Users-midir/memory/feedback_secrets_in_vault.md).

---

## 5 · Werkwijze

1. **Pull-eerst:** elke run begint met `git pull origin main` in `~/projects/ikbenok-landing/`.
2. **Eén ticket = één PR.** Direct mergen naar main alleen voor T-1 t/m T-3 (no-code-risk). Voor T-4 + T-6 PR met Harm-review.
3. **Cache-bust:** wijziging aan `colors_and_type.css` → bump `?v=N` in alle drie `index.html` bestanden — zie [`feedback_bump_cache_key_on_payload_change.md`](../../.claude/projects/C--Users-midir/memory/feedback_bump_cache_key_on_payload_change.md).
4. **Geen visuele tweaks** boven het Claude Design bundle — zie [`feedback_design_bundle_exact.md`](../../.claude/projects/C--Users-midir/memory/feedback_design_bundle_exact.md). Als T-6 of T-4 visueel iets verandert: bundle eerst.
5. **Discord-rapportage:** start- + eind-bericht per run in thread `paperclip-control`. Bij ticket-creatie inline buttons (Approve/Decline) zoals in [`project_paperclip_control.md`](../../.claude/projects/C--Users-midir/memory/project_paperclip_control.md).
6. **Verificatie vóór completion:** zie [`feedback_visual_verify_before_done.md`](../../.claude/projects/C--Users-midir/memory/feedback_visual_verify_before_done.md) — fetch live URL en valideer in Rich Results Test.

---

## 6 · Definition of Done — Mission-niveau

Mission `seo-allesok` is "in onderhoud" zodra:

- [ ] T-1 t/m T-7 gemerged op `main` en live op allesok.nl
- [ ] GSC + Bing verified, sitemap accepted, geen coverage-errors
- [ ] Eerste wekelijkse run gedraaid en in Discord gepost
- [ ] Eerste maandelijkse Lighthouse-audit gedraaid (baseline opgeslagen in `docs/seo-baseline.md`)
- [ ] Backlog van >0 niet-blokkerende verbeteringen gelogd als Paperclip-tickets

Mission blijft daarna in **steady-state**: alleen wekelijkse + maandelijkse cycle + event-driven checks. Geen nieuwe scope zonder Harm-confirm.

---

## 7 · Referenties

- Repo: `~/projects/ikbenok-landing/`
- Audit-rapport (2026-05-02): zie sessietranscript van Dex-sessie `2026-05-02T~20:00`
- Memory: [`project_allesok.md`](../../.claude/projects/C--Users-midir/memory/project_allesok.md)
- Memory: [`project_ikbenok.md`](../../.claude/projects/C--Users-midir/memory/project_ikbenok.md)
- Memory: [`feedback_design_bundle_exact.md`](../../.claude/projects/C--Users-midir/memory/feedback_design_bundle_exact.md)
- Memory: [`feedback_external_services_confirm.md`](../../.claude/projects/C--Users-midir/memory/feedback_external_services_confirm.md)
- Memory: [`project_paperclip_control.md`](../../.claude/projects/C--Users-midir/memory/project_paperclip_control.md)

---

*Document v1.0 — 2026-05-02 · Auteur: Dex · Reviewer: Harm*
