# edward-h26.github.io

Personal academic website of Qiran Hu, live at [edward-h26.github.io](https://edward-h26.github.io/).
The interactive 3D version of the portfolio lives in the separate
[PersonalWebsite](https://github.com/Edward-H26/PersonalWebsite) repository.

## Stack

- React 18, React Router 7, TypeScript, Vite
- Tailwind CSS 3 with PostCSS and Autoprefixer
- Framer Motion for the header, mobile menu, and scroll progress animations; Lucide icons
- Deployed to GitHub Pages by `.github/workflows/pages.yml` on every push to `main`

## Getting started

Requires Node 20 or newer.

```bash
npm ci
npm run dev        # http://localhost:5173
```

| Script            | What it does                                                                 |
| ----------------- | ---------------------------------------------------------------------------- |
| `npm run dev`     | Vite dev server                                                              |
| `npm run build`   | Regenerates the SEO files, type-checks, builds `dist/`, writes route pages   |
| `npm run preview` | Serves `dist/` locally                                                       |
| `npm run seo`     | Regenerates the crawler-facing files without building                        |
| `npm test`        | Unit tests for the SEO generator (`node --test`)                             |
| `npm run lint`    | ESLint                                                                       |

## Editing content

Nearly all text comes from `src/data/content.ts` (profile, biography, news, research interests,
publications, experience, projects, skills) and pages under `src/pages/` render it. The few fixed
strings live in the components that show them: the home headline in `src/pages/HomePage.tsx`, the
highlighted author name in `src/components/ui/PublicationCard.tsx`, the school names in
`src/components/ui/InstitutionLogos.tsx`, and the section headings in `src/pages/InfoPage.tsx`.

After changing content, run `npm run seo` and commit the regenerated `index.html`,
`public/robots.txt`, `public/sitemap.xml`, and `public/llms.txt` together with your edit. `npm test` fails when the
committed files are stale, and the build regenerates them anyway.

## How search engines and AI crawlers see the site

The site is a single-page app, so `scripts/seo.mjs` writes everything a crawler needs without
running JavaScript:

- the block between `<!-- seo:head -->` markers in `index.html`: title, description, canonical
  URL, Open Graph and Twitter tags, and schema.org JSON-LD (Person, WebSite, ProfilePage,
  ScholarlyArticle per paper)
- the block between `<!-- seo:body -->` markers: a static, readable profile that React replaces
  on mount
- `public/robots.txt`, `public/sitemap.xml`, and `public/llms.txt`
- after `vite build`, one `dist/<route>/index.html` per route (`/publications/`, `/research/`,
  `/experience/`, `/projects/`, `/info/`) with route-specific metadata, so deep links answer
  200 instead of the 404 redirect

`public/images/og-card.png` is the shared social card and `public/images/profile-1024.jpg` the
avatar. The original portrait is kept locally in `assets/profile.png`, which is gitignored.

## Routing on GitHub Pages

GitHub Pages serves `public/404.html` for unknown paths. That page stores the requested path in
`sessionStorage` and redirects to `/`, where `src/main.tsx` restores it before React Router
mounts. The pre-rendered route pages make this fallback rare, but it still covers old links.

## Project structure

```
index.html            entry page with generated SEO blocks
scripts/seo.mjs       SEO generator (prebuild and postbuild)
scripts/seo.test.mjs  its tests
src/data/content.ts   all site content
src/pages/            one component per route
src/components/       layout, UI, logo, and visual effect components
src/hooks/            reduced-motion hook
src/utils/            class-name and content helpers
src/styles/           Tailwind entry and global styles
public/               static files copied to dist/
```
