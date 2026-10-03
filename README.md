# andysibilla.com

Source for [andysibilla.com](https://andysibilla.com), a personal website
that loads articles and navigation metadata from remote APIs.

The frontend is a statically exported Next.js application with a dark MUI
theme. Production builds are deployed to Amazon S3.

## Tech stack

- [Next.js 16](https://nextjs.org) with the App Router
- [React 19](https://react.dev) and TypeScript
- [MUI v9](https://mui.com) with Emotion
- [isomorphic-dompurify](https://github.com/kkomelin/isomorphic-dompurify)
  for article HTML sanitization
- Yarn

## Getting started

Install dependencies:

```bash
yarn install
```

Start the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000).

## Available scripts

```bash
yarn dev           # Start the development server
yarn build         # Create a static production build in out/
yarn lint          # Run ESLint
yarn check:types   # Run the TypeScript compiler without emitting files
yarn format        # Format the project with Prettier
yarn format:check  # Check formatting without changing files
```

## Project structure

| Path | Purpose |
| --- | --- |
| `app/` | App Router pages, root layout, `robots.ts`, and `sitemap.ts` |
| `components/` | Shared UI, application shell, and content renderers |
| `api/` | Article and reference-data fetch helpers |
| `hooks/` | Shared React hooks |
| `theme/` | MUI theme configuration |
| `types/` | Shared TypeScript types |
| `constants/` | API URLs, paths, and fixed article IDs |
| `utils/` | General utility functions |

The application provides routes for the homepage, about page, article list,
and individual articles:

- `/`
- `/about/`
- `/articles/`
- `/article/?id=<article-id>&type=<article-type>`

Build also emits `robots.txt` and `sitemap.xml` (home, about, and articles
list only).

## Content architecture

Article data is loaded from `https://api.andysibilla.com/api/get-article`.
Navigation labels and article types are loaded from
`https://andysibilla.com/reference-data/articleTypes.json`.

API article fields such as `article-id` and `article-type` are normalized to
camelCase in `api/index.ts`.

Home and About fetch their articles at build time so the content is baked into
the static HTML. The articles list and individual article pages fetch on the
client; client-fetched content is cached in `AppContext`, and request errors
are displayed through the global error alert.

Article bodies contain HTML from the API. Before rendering, the markup is
sanitized by `components/SafeHtml.tsx` using a restricted DOMPurify allowlist.

Pages also define Open Graph metadata (`og:title`, `og:description`, and
related tags) for social link previews.

## Static export and deployment

`next.config.ts` configures the application with:

- `output: 'export'`
- `trailingSlash: true`
- unoptimized images for static hosting
- `serverExternalPackages` for `isomorphic-dompurify`

Running `yarn build` writes the site to `out/`. The AWS CodeBuild configuration
in `buildspec.yml` installs dependencies, builds the site, and synchronizes
`out/` to the S3 bucket specified by `S3_BUCKET`.

Because production uses static hosting, features that require a persistent
Next.js server—such as dynamic server rendering or runtime route handlers—are
not available without changing the deployment model. Build-time data fetching
in Server Components (used by Home and About) is supported and runs during
`yarn build`.
