# AGENTS.md

Guidance for AI agents working in this repository.

## Project overview

Personal site for [andysibilla.com](https://andysibilla.com): a Next.js App Router frontend that loads article content and navigation metadata from remote APIs and renders a dark-themed MUI UI.

This is a **static export** site (`output: 'export'` in `next.config.ts`). There is no Next.js server runtime in production. Builds emit to `out/` and deploy to S3 via AWS CodeBuild (`buildspec.yml`).

## Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **MUI v9** + Emotion (`styled` from `@mui/material/styles`)
- **DOMPurify** for sanitizing article HTML before `dangerouslySetInnerHTML`
- Package manager: **Yarn**
- Path alias: `@/*` → project root (see `tsconfig.json`)

## Repository layout

| Path | Purpose |
| --- | --- |
| `app/` | Routes: `/`, `/about`, `/articles`, `/article` |
| `components/` | Shared UI and app shell (Header, Footer, loaders, etc.) |
| `api/` | Client fetch helpers (`getArticle`, `getReferenceData`) |
| `hooks/` | Shared hooks (e.g. `useReferenceData`) |
| `theme/` | MUI dark theme |
| `types/` | Shared TypeScript types |
| `constants/` | API URLs, article IDs, path constants |
| `utils/` | Small helpers (e.g. `formatDate`) |

## App behavior

- Root layout (`app/layout.tsx`) wraps pages with `AppContextProvider`, `ThemeRegistry`, `Header`, `ErrorAlert`, and `Footer`.
- Most pages are `'use client'` and fetch data in `useEffect`.
- Article HTML is rendered through `SafeHtml` only — do not bypass sanitization.
- Single-article pages use `LoadContent`; list pages use `LoadContentList`.
- Individual article links use query params: `/article/?id=...&type=...` (trailing slash required by config).
- Navigation labels/types come from reference data at `ASSETS_URL/reference-data/articleTypes.json`.
- Article payloads come from `API_URL/api/get-article`.
- API responses use kebab-case fields (`article-id`, `article-type`); normalize to camelCase in `api/index.ts` before use.

## Coding conventions

- Prefer functional React components and MUI `styled(...)` for component styles.
- Keep shared types in `types/`, constants in `constants/`, and fetch logic in `api/`.
- Import with the `@/` alias instead of deep relative paths when crossing folders.
- For MUI + Next.js links, prefer `component={Link}` + `href` on interactive MUI elements so the full hit target is clickable (see `NavigationMenu`, `HomeButton`).
- Surface fetch failures through `AppContext.setError` so `ErrorAlert` can display them.
- Images from remote content currently use plain `<img>`; `@next/next/no-img-element` is intentionally off in ESLint, and `images.unoptimized` is enabled for static export.

## Formatting and lint

Prettier (`.prettierrc`):

- single quotes
- semicolons
- trailing commas: `es5`
- tab width 2
- print width 80

Useful scripts:

```bash
yarn dev
yarn build
yarn lint
yarn check:types
yarn format
yarn format:check
```

## Deployment constraints

Because this is a static export:

- Do not add server-only Next.js features (Route Handlers that must run at request time, server actions that require a Node server, dynamic SSR assumptions, etc.) without also changing the deploy model.
- `trailingSlash: true` — keep internal links compatible with trailing slashes.
- Production sync deploys `out/` to S3 (`aws s3 sync out/ s3://$S3_BUCKET --delete`).

## What not to change casually

- Hard-coded article IDs in `constants/index.ts` (`HOMEPAGE_ARTICLE_ID`, `ABOUT_ARTICLE_ID`)
- API/asset base URLs in `constants/index.ts`
- DOMPurify allowlists in `SafeHtml.tsx`
- Static export / trailing-slash settings in `next.config.ts` unless the hosting approach is intentionally changing
