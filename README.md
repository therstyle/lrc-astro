# Latin Rogue Cleaning

Static marketing site for **Latin Rogue Cleaning**, a professional home-cleaning
service. Built as a single-page experience (with a 404 page) using
[Astro](https://astro.build/) with [Svelte](https://svelte.dev) islands and
compiled with [Bun](https://bun.sh).

This is a static rebuild of a former WordPress site. All page copy lives in a
single typed content file so the page can be edited in one place.

## Tech stack

| Concern           | Tool / Library                                           |
| ----------------- | -------------------------------------------------------- |
| Framework         | Astro 5 (`output: 'static'`)                             |
| Interactivity     | Svelte 5 islands (runes)                                 |
| Runtime / package | Bun (lockfile: `bun.lock`)                               |
| Styling           | Sass (SCSS) + PostCSS + Autoprefixer                     |
| Lint & format     | Biome 2                                                  |
| Type-checking     | TypeScript + `astro check`                               |
| Target browsers   | `.browserslistrc` (last 2 versions, Android 4, Opera 12) |

## Requirements

- [Bun](https://bun.sh) (recommended — there is a `bun.lock`)
- Node.js 18+ also works, but install dependencies with Bun for consistency

## Getting started

```sh
# Install dependencies
bun install

# Start the dev server (http://localhost:4321)
bun run dev
```

## Scripts

| Command           | Description                                              |
| ----------------- | -------------------------------------------------------- |
| `bun run dev`     | Start the Astro dev server with hot reload.              |
| `bun run build`   | Build a static site into `dist/`.                        |
| `bun run preview` | Preview the production build locally.                    |
| `bun run check`   | Type-check the project with `astro check`.               |
| `bun run format`  | Format all supported files with Biome (`--write`).       |
| `bun run lint`    | Lint with Biome and auto-fix where possible (`--write`). |

It's a good habit to run `bun run check` and `bun run build` before committing.

## Project structure

```
.
├── astro.config.mjs      # Astro config (static output, Svelte integration)
├── biome.json            # Lint + format config (Biome)
├── postcss.config.cjs    # Autoprefixer for compiled CSS
├── tsconfig.json         # TypeScript config (extends astro strict)
├── .browserslistrc       # Browser support targets
├── public/               # Static assets served as-is
│   ├── fonts/            # @font-face sources (Agenda Bold/Medium, Cuisine)
│   └── images/           # Logos, icons, backgrounds, opengraph image
└── src/
    ├── components/       # Astro components (mostly static markup)
    │   ├── Layout.astro  # HTML shell, <head>, SEO/JSON-LD, slots
    │   ├── Header.astro  # Renders the Nav island (client:load)
    │   ├── Hero.astro    # Top hero section
    │   ├── About.astro   # "Why Latin Rogue" section
    │   ├── Services.astro# Services grid + call-to-action + quote slider
    │   ├── Contact.astro # Quote form section (ContactForm island)
    │   └── Footer.astro  # Footer / designer credit
    ├── data/
    │   └── home.ts       # Single source of truth for all page content
    ├── islands/          # Hydrated Svelte 5 components
    │   ├── Nav.svelte        # Mobile menu toggle + anchor nav
    │   ├── ContactForm.svelte# Demo quote form (non-submitting)
    │   └── QuoteSlider.svelte# Auto-advancing testimonials carousel
    ├── pages/
    │   ├── index.astro   # Front page
    │   └── 404.astro     # Not-found page
    └── styles/           # SCSS, see "Styling" below
```

## Content

All textual content (site name, phone, navigation, hero/about/services copy,
testimonials, and contact copy) is defined in
[`src/data/home.ts`](src/data/home.ts). That file documents where each value
originally came from (WordPress ACF fields) and maps old field names to the new
keys. **Edit that file to change page content** rather than editing the
components directly.

## Interactivity (Svelte islands)

Astro ships zero JavaScript by default; behavior is added with small Svelte
islands that hydrate on demand:

- **`Nav.svelte`** — mobile hamburger toggle (adds/removes `body.menu-open`; the
  SCSS animates the icon and reveals the menu) and anchor-link navigation that
  closes the open menu. It uses `client:load`.
- **`QuoteSlider.svelte`** — a lightweight crossfading testimonial carousel
  (auto-advance, pause on hover, keyboard-operable pagination dots) that
  replaces the original Flickity/Slick stack.
- **`ContactForm.svelte`** — a demo quote form. It is intentionally
  **non-functional**: submissions are prevented and the submit button is
  disabled because there is no backend. The field markup preserves the
  original `.frm_fields_container` structure so the existing SCSS applies
  unchanged. To make it real later, re-enable the button and point it at an
  Astro Action or a form service.

## Styling

SCSS is organized into three layers, each composed by an `_index` (barrel) file:

```
src/styles/
├── main.scss             # entry point, imported by Layout.astro
├── base/                 # foundation: mixins, reset, @font-face, global, :root vars
├── components/           # reusable UI (buttons, header/nav)
└── sections/             # page sections
    ├── top/   (intro)
    ├── middle/ (grass gradient, about, services)
    └── bottom/ (contact, dirt)
```

`main.scss` imports `base`, then `components`, then `sections`. Because CSS
cascade means later declarations win, **media-query styles must be emitted last**.
Note that the responsive mixins live in `base/_mixins.scss` and are `@use`d
locally by the section files — they are intentionally **not** forwarded through
`base/_index.scss`, so media queries land after the desktop rules and override
them correctly.

### Conventions

- **Spacing** uses the `--space` CSS variable scale (`--space-1` … `--space-8`)
  defined in `base/_variables.scss`.
- **Font sizes** are expressed in `rem` (16px base = 1rem); the single
  exception is `base/_reset.scss`, which uses `100%`/`inherit`.
- **Fonts** are loaded via `@font-face` in `base/_fonts.scss` from
  `public/fonts`.

## Configuration files

- **`astro.config.mjs`** — sets `output: 'static'`, the `site` origin, and the
  Svelte integration.
- **`postcss.config.cjs`** — runs Autoprefixer on the compiled CSS.
- **`biome.json`** — formatting (2-space, single quotes, 80-col) and linting
  (recommended preset). SCSS has a few rules relaxed and `.astro`/`.svelte` are
  excluded from Biome.
- **`tsconfig.json`** — extends `astro/tsconfigs/strict` with `allowJs`.
- **`.browserslistrc`** — targets the last 2 versions of major browsers,
  Android 4, and Opera 12 (drives Autoprefixer).

## Deployment

Because the output is fully static, the contents of `dist/` can be served by any
static host (Netlify, Vercel, Cloudflare Pages, S3 + CloudFront, etc.):

```sh
bun run build        # produces dist/
```

Point your host's build command at `bun run build` and its output/publish
directory at `dist/`.

## Notes on the migration

This repository is a static port of the original Latin Rogue Cleaning WordPress
site. A few things to keep in mind:

- SEO metadata (Open Graph + schema.org JSON-LD) lives in `Layout.astro` and was
  ported from the original AIOSEO setup.
- The contact form is a **demo only** — see `ContactForm.svelte`.
- The testimonials carousel and nav were reimplemented as Svelte islands to
  avoid heavy legacy dependencies (Flickity, Slick, jQuery smoothscroll).
