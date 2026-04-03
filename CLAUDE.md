# CLAUDE.md

## Project

My Contract -- a static site built with Eleventy v3. Vanilla JS, no frameworks.

## Quick Start

```bash
npm install
npm run serve    # dev server at localhost:8080
npm run build    # output to _site/
```

## Key Paths

- `content/` -- Markdown source files (Eleventy input dir)
- `src/_includes/` -- Nunjucks templates (base.njk + layouts/)
- `src/css/style.css` -- all styles
- `src/js/main.js` -- shared JS (nav, dark mode, TOC)
- `src/js/calculators/` -- one JS file per calculator tool
- `src/js/tools/` -- premium tool scripts (localStorage-backed)
- `_data/` -- global data (site.json, navigation.json, costTables.json)
- `eleventy.config.js` -- collections, filters, passthrough copy config
- `netlify.toml` -- deployment config

## Content

All content is Markdown with YAML frontmatter. Three collections sorted by `order`:
- `methodology` (tag: `methodology`) -- 15 core modules in `content/methodology/`
- `deepDives` (tag: `deep-dive`) -- 28+ guides in `content/deep-dives/`
- `tools` (tag: `tool`) -- calculators/tools in `content/tools/`

When adding content, also update `_data/navigation.json`.

## Conventions

- Calculators are vanilla JS IIFEs -- no external dependencies
- Premium tools use `mc_` prefixed localStorage keys via `src/js/tools/mc-store.js`
- CSS uses custom properties for theming (light/dark via `data-theme` attribute)
- No build tools besides Eleventy -- no bundler, no transpiler
- Layouts: `landing.njk` (homepage), `module.njk` (articles), `tool.njk` (interactive tools)
