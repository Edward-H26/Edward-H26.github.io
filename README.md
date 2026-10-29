# edward-h26.github.io

Personal academic website of Qiran Hu, live at [edward-h26.github.io](https://edward-h26.github.io/).
It is a React single-page app; everything a crawler needs is generated from the same content the
pages render. The interactive 3D portfolio lives in the separate
[PersonalWebsite](https://github.com/Edward-H26/PersonalWebsite) repository.

## Stack

- React 18, React Router 7, TypeScript 5, Vite 6
- Tailwind CSS 3 with PostCSS and Autoprefixer
- Framer Motion for the header, mobile menu, scroll progress, and timeline; Lucide icons
- Node 24 for development (`.nvmrc`); `engines` allows Node 20 or newer, and the deploy workflow builds on 20
- Deployed to GitHub Pages by `.github/workflows/pages.yml` on every push to `main`

## Getting started

```bash
nvm use    # or any Node 20 or newer
npm ci
npm run dev    # http://localhost:5173
```

| Script                 | What it does                                                                                                    |
| ---------------------- | --------------------------------------------------------------------------------------------------------------- |
| `npm run dev`          | Vite dev server                                                                                                 |
| `npm run build`        | Regenerates the crawler files, type-checks, builds `dist/`, then writes one `dist/<route>/index.html` per route |
| `npm run preview`      | Serves `dist/` locally                                                                                          |
| `npm run seo`          | Regenerates `index.html`, `public/robots.txt`, `public/sitemap.xml`, and `public/llms.txt` without building     |
| `npm test`             | `node --test`: every `*.test.mjs` under `scripts/`                                                              |
| `npm run lint`         | ESLint over `src/`, `scripts/`, and the config files                                                            |
| `npm run typecheck`    | `tsc --noEmit`                                                                                                  |
| `npm run format`       | Prettier, rewrites files                                                                                        |
| `npm run format:check` | Prettier, reports only (what CI runs)                                                                           |

## Directory map

```
index.html                    Vite entry page; the blocks between the seo:head and seo:body markers are generated
public/                       static files copied to dist/: 404 redirect page, favicon, images, generated crawler files
scripts/seo.mjs               command line entry of the SEO generator; re-exports the module functions for the tests
scripts/seo/                  one generator module per concern, their unit tests, and a content fixture
scripts/seo.test.mjs          end-to-end tests of the generator against the real content and the committed files
src/main.tsx                  mounts the app and restores the path saved by public/404.html
src/App.tsx                   route table
src/data/                     all site content, one module per domain, re-exported by index.ts
src/pages/                    one component per route; SectionPage renders research, teaching, and service
src/components/layout/        Layout, Navigation, MoreMenu, MobileMenu, Sidebar
src/components/profile/       ProfileAvatar, SocialLinks, InstitutionLogo, InstitutionLogos
src/components/publications/  PublicationCard
src/components/experience/    Timeline, TimelineCard, TimelineRocket
src/components/info/          SkillCategory, EducationCard
src/components/ui/            generic building blocks: Card, Badge, BentoGrid, BentoItem, ContentBullets, ContentLinks, ...
src/components/logos/         brand marks and school logos
src/components/effects/       MeshGradient, GrainOverlay, ScrollProgress
src/hooks/                    useReducedMotion
src/utils/                    cn, card helpers, the shared scroll spring
src/styles/                   globals.css imports the other stylesheets in cascade order
```

## Editing content

Everything the site says lives in `src/data/`. Edit the module that owns the domain:

| To change                                           | Edit                                                               |
| --------------------------------------------------- | ------------------------------------------------------------------ |
| Name, role, email, phone, portrait, social profiles | `src/data/profile.ts`                                              |
| Navigation entries and their order                  | `src/data/navigation.ts` (each path must match a key of SECTIONS)  |
| Biography paragraphs and the collaboration note     | `src/data/bio.ts`                                                  |
| News                                                | `src/data/news.ts`                                                 |
| Research interests                                  | `src/data/researchInterests.ts`                                    |
| Papers                                              | `src/data/publications.ts` (citation numbers follow the order)     |
| Research positions                                  | `src/data/research.ts`                                             |
| Professional roles on the timeline                  | `src/data/experience.ts`                                           |
| Projects                                            | `src/data/projects.ts` (the first card is featured at double size) |
| Teaching, service                                   | `src/data/teaching.ts`, `src/data/service.ts`                      |
| Languages, certifications, education                | `src/data/info.ts` (the Info page picks cards by title)            |
| Skill categories and highlighted skills             | `src/data/skills.ts`                                               |

The content model is in `src/data/types.ts`. To add a section, export a `ContentSection` from a new
module, register it in `src/data/sections.ts` under a key equal to its `id`, add a navigation item,
and add a route in `src/App.tsx` (`SectionPage` covers a plain list of cards).

A few strings are fixed in components: the home headline in `src/pages/HomePage.tsx`, the school
names in `src/components/profile/InstitutionLogos.tsx`, the Info page headings in
`src/pages/InfoPage.tsx`, and the "Explore My Journey" link in `src/components/layout/Navigation.tsx`.

After changing content, run `npm run seo` and commit the regenerated `index.html`,
`public/robots.txt`, `public/sitemap.xml`, and `public/llms.txt` together with the edit. `npm test`
fails while the committed files are stale, and the build regenerates them anyway.

## How search engines and AI crawlers see the site

`scripts/seo.mjs` writes everything a crawler needs without running JavaScript:

- the block between `<!-- seo:head -->` markers in `index.html`: title, description, canonical URL,
  Open Graph and Twitter tags, and schema.org JSON-LD (Person, WebSite, ProfilePage, one
  ScholarlyArticle per paper)
- the block between `<!-- seo:body -->` markers: a readable profile that React replaces on mount
- `public/robots.txt`, `public/sitemap.xml`, and `public/llms.txt`
- after `vite build`, one `dist/<route>/index.html` per route with route-specific metadata, so deep
  links answer 200 instead of the 404 redirect

The generator is split by concern under `scripts/seo/`: `site` (URLs and description), `paths`,
`content` (bundles `src/data` with esbuild), `text`, `citation`, `routes`, `jsonLd`, `head`, `body`,
`llms`, `crawlers` (robots and sitemap), `markers`, and `write`. Each module has a focused test next
to it; `scripts/seo.test.mjs` checks the whole pipeline against the real content and the committed
files.

`public/images/og-card.png` is the shared social card and `public/images/profile-1024.jpg` the
avatar.

## Routing on GitHub Pages

GitHub Pages serves `public/404.html` for unknown paths. That page stores the requested path in
`sessionStorage` and redirects to `/`, where `src/main.tsx` restores it before React Router mounts.
The pre-rendered route pages make this fallback rare, but it still covers old links.

## Continuous integration and deployment

- `.github/workflows/ci.yml` runs `npm ci`, lint, typecheck, test, format check, and build on every
  push and pull request.
- `.github/workflows/pages.yml` runs the tests and the build on every push to `main` and deploys
  `dist/` to GitHub Pages.

## Conventions

- Formatting is Prettier's job (`.prettierrc`): no semicolons, double quotes, 140 columns, ES5
  trailing commas in TypeScript and none in `scripts/`, matching the code as it was written.
  `index.html`, `public/`, and the lockfile are not formatted.
- ESLint runs the recommended JavaScript, TypeScript, React Hooks, and React Refresh rules, with
  `eslint-config-prettier` last so no style rule fights the formatter.
- Component files are PascalCase, one component per file, grouped by feature; hooks, utilities, and
  data modules are camelCase.
- Content is `readonly` and declared with `as const` where it helps; the SEO scripts reuse the types
  from `src/data/types.ts` through JSDoc.
- Every export carries a one-line doc comment that says what it is for; comments explain why, not
  what.
- Tailwind scans every file under `src/`, comments included, so a bare utility name such as `table`
  in a comment adds that class to the built CSS. Prefer other words.
- Tests use the Node test runner. Unit tests sit next to the module they cover in `scripts/seo/`;
  `scripts/seo.test.mjs` is the end-to-end check.
