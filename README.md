# My Contract

A Human Operating System for People Who Are Done With Bullshit.

Personal operations framework treating life as a system that can be diagnosed, engineered, and maintained. Built as a static site with [Eleventy](https://www.11ty.dev/) v3.

**Live site:** [mycontract.co](https://mycontract.co)

## Prerequisites

- [Node.js](https://nodejs.org/) v18+

## Getting Started

```bash
# Install dependencies
npm install

# Start the dev server (with hot reload)
npm run serve
```

Open [http://localhost:8080](http://localhost:8080) in your browser.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run serve` | Start dev server with live reload on `:8080` |
| `npm run build` | Build static site to `_site/` |
| `npm run debug` | Build with verbose Eleventy debug logging |

## Project Structure

```
content/              # Markdown source files (Eleventy input)
  pages/              # Landing pages (index, start, about, crisis)
  methodology/        # 15 core modules (00-14)
  deep-dives/         # 28+ specialized guides
  tools/              # Calculator & tool pages
src/
  _includes/          # Nunjucks templates
    base.njk          # HTML shell (head, header, footer)
    layouts/
      landing.njk     # Homepage layout
      module.njk      # Methodology & deep-dive layout (sidebar + content)
      tool.njk        # Calculator/tool layout
  css/
    style.css         # All styles (light/dark themes, responsive)
  js/
    main.js           # Nav toggle, dark mode, TOC generation
    calculators/      # Vanilla JS calculators (one per tool page)
    tools/            # Premium tool scripts (localStorage-backed)
  fonts/              # Self-hosted fonts
_data/                # Global template data
  site.json           # Site metadata, crisis hotline numbers
  navigation.json     # All nav menus (main, methodology, deep-dives, tools)
  costTables.json     # Lookup data for calculators
eleventy.config.js    # Eleventy configuration
netlify.toml          # Netlify deploy & caching config
_site/                # Build output (gitignored)
```

## How Content Works

All content lives in `content/` as Markdown files with YAML frontmatter. Eleventy processes them through Nunjucks templates into static HTML.

### Adding a methodology module

Create a file in `content/methodology/` with this frontmatter:

```yaml
---
title: "Module Title"
description: "Short description"
layout: layouts/module.njk
tags: methodology
order: 15
permalink: /methodology/15-module-slug/
---
```

Then add the corresponding entry to `_data/navigation.json` under `methodology`.

### Adding a deep dive

Create a file in `content/deep-dives/` with:

```yaml
---
title: "Deep Dive Title"
description: "Short description"
layout: layouts/module.njk
tags: deep-dive
order: 29
permalink: /deep-dives/deep-dive-slug/
---
```

Add the entry to `_data/navigation.json` under `deepDives`.

### Adding a calculator/tool

1. Create the content page in `content/tools/`:

```yaml
---
title: "Tool Name"
description: "What it does"
layout: layouts/tool.njk
tags: tool
order: 21
free: true
permalink: /tools/tool-slug/
script: tool-slug.js
---
```

2. Create the JS file in `src/js/calculators/` (or `src/js/tools/` for premium tools).
3. Add the entry to `_data/navigation.json` under `tools`.

## Templates

Three layouts extend `base.njk`:

- **`layouts/landing.njk`** -- Homepage and tool listing pages
- **`layouts/module.njk`** -- Methodology modules and deep dives (sidebar nav + table of contents auto-generated from `h2` headings)
- **`layouts/tool.njk`** -- Calculator and interactive tool pages

## Styling

Single CSS file (`src/css/style.css`) with CSS custom properties. Supports light and dark themes via `data-theme` attribute, respects `prefers-color-scheme` by default. Typography uses IBM Plex Sans/Mono from Google Fonts.

## Deployment

Deployed to [Netlify](https://www.netlify.com/) via `netlify.toml`:

- **Build command:** `npx @11ty/eleventy`
- **Publish directory:** `_site`
- Static assets (CSS, JS, fonts) are served with immutable cache headers

## Architecture Notes

- **No backend** -- entirely static. Premium tools persist data in browser `localStorage` with `mc_` prefix.
- **No frameworks** -- vanilla HTML, CSS, and JavaScript throughout.
- **No build tooling** beyond Eleventy -- no bundler, transpiler, or CSS preprocessor.
- **Collections** are defined in `eleventy.config.js` and sorted by `order` frontmatter field.
- **Custom Eleventy filters:** `padStart`, `date`, `commaNumber`, `getNextItem`, `getPrevItem`.
