# AGENTS.md

Guidance for AI agents working in this repository.

## Project overview

Personal site for [andysibilla.com](https://andysibilla.com): a Next.js App Router frontend that loads article content and navigation metadata from remote APIs and renders a dark-themed MUI UI.

This is a **static export** site (`output: 'export'` in `next.config.ts`). There is no Next.js server runtime in production. Builds emit to `out/` and deploy to S3 via AWS CodeBuild (`buildspec.yml`).

## Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **MUI v9** + Emotion (`styled` from `@mui/material/styles`)
- **isomorphic-dompurify** for sanitizing article HTML before `dangerouslySetInnerHTML` (works at build/SSR and in the browser; pinned for Node engine compatibility)
- Package manager: **Yarn**
- Path alias: `@/*` → project root (see `tsconfig.json`)

## Repository layout

| Path | Purpose |
| --- | --- |
| `app/` | Routes: `/`, `/about`, `/articles`, `/article`; also `robots.ts` and `sitemap.ts` |
| `components/` | Shared UI and app shell (Header, Footer, loaders, etc.) |
| `api/` | Fetch helpers (`getArticle`, `getReferenceData`) used at build time and on the client |
| `hooks/` | Shared hooks (e.g. `useReferenceData`) |
| `theme/` | MUI dark theme |
| `types/` | Shared TypeScript types |
| `constants/` | API URLs, article IDs, path constants |
| `utils/` | Small helpers (e.g. `formatDate`) |

## App behavior

- Root layout (`app/layout.tsx`) wraps pages with `AppContextProvider`, `ThemeRegistry`, `Header`, `ErrorAlert`, and `Footer`.
- Root layout also sets `metadataBase`, title template, description, and base Open Graph fields. Page/segment layouts add route-specific `title`, `description`, and `openGraph` (no `og:image` yet).
- **Home and About** are async Server Components that `await getArticle(...)` at build time and render `ArticleContent` + `SetPageTitle`. A failed/empty fetch should fail the build.
- **Articles list and individual article** remain `'use client'` and fetch in `useEffect` so new articles do not require a redeploy.
- Article HTML is rendered through `SafeHtml` only — do not bypass sanitization.
- Prefetched article pages use `ArticleContent`; client-fetched single articles use `LoadContent` (which renders `ArticleContent` after fetch). List pages use `LoadContentList`.
- Header page titles for server-rendered routes are set via the client `SetPageTitle` helper (AppContext).
- Individual article links use query params: `/article/?id=...&type=...` (trailing slash required by config).
- Navigation labels/types come from reference data at `ASSETS_URL/reference-data/articleTypes.json`.
- Article payloads come from `API_URL/api/get-article`.
- API responses use kebab-case fields (`article-id`, `article-type`); normalize to camelCase in `api/index.ts` before use.
- `app/robots.ts` and `app/sitemap.ts` emit static `robots.txt` and `sitemap.xml` at build time. The sitemap lists only `/`, `/about/`, and `/articles/` (not query-param article URLs).

## Coding conventions

- Prefer functional React components and MUI `styled(...)` for component styles.
- Keep shared types in `types/`, constants in `constants/`, and fetch logic in `api/`.
- Import with the `@/` alias instead of deep relative paths when crossing folders.
- For MUI + Next.js links, prefer `component={Link}` + `href` on interactive MUI elements so the full hit target is clickable (see `NavigationMenu`, `HomeButton`).
- Surface client fetch failures through `AppContext.setError` so `ErrorAlert` can display them.
- Client route segments cannot export `metadata`; put metadata in a sibling `layout.tsx` instead (see `app/articles/layout.tsx`, `app/article/layout.tsx`).
- When setting route `openGraph`, include `siteName` and `type` on that object — Next replaces nested `openGraph` rather than deep-merging with the root.
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
- Build-time `fetch` in Server Components is fine and is how Home/About content is baked into `out/`.
- `trailingSlash: true` — keep internal links compatible with trailing slashes.
- `serverExternalPackages` includes `isomorphic-dompurify` to avoid jsdom bundling issues during build.
- Production sync deploys `out/` to S3 (`aws s3 sync out/ s3://$S3_BUCKET --delete`).
- Response security headers (HSTS, CSP, etc.) are not configurable from this Next app; they would need a CloudFront response headers policy outside this repo.

## What not to change casually

- Hard-coded article IDs in `constants/index.ts` (`HOMEPAGE_ARTICLE_ID`, `ABOUT_ARTICLE_ID`)
- API/asset base URLs in `constants/index.ts`
- DOMPurify allowlists in `SafeHtml.tsx`
- Static export / trailing-slash settings in `next.config.ts` unless the hosting approach is intentionally changing
- Moving `/articles` or `/article` to build-time fetch without intentionally accepting redeploys for content updates
