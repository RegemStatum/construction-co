# Implementation Plan: Blog Frontend

**Date**: 2026-10-07 | **Spec**: User request in chat; scope confirmed as blog index and individual post pages

## Summary

Add a Sanity-backed blog index at `/blog/` and article pages at `/blog/[slug]/`. Reuse the existing Next.js App Router, Sanity client/live-query setup, site header/footer, and Tailwind styling. The current post queries request `summary` and `content`, but the Sanity post schema defines `body`, `publishedAt`, and `mainImage`; align queries and rendering with the schema before wiring the pages.

## Technical Context

**Language/Version**: TypeScript, Next.js App Router, React  
**Primary Dependencies**: `next-sanity`, Sanity schemas, Tailwind CSS; add `@portabletext/react` to render Sanity block content  
**Storage**: Sanity `post`, `author`, and `category` documents  
**Rendering**: Server-rendered route pages using the existing Sanity client/live helpers  
**Routing**: `/blog/` and `/blog/[slug]/`; honor the configured trailing-slash behavior  
**Constraints**: Four supported UI locales (de, en, ru, uk); current Sanity post content itself is not localized. No blog-specific design system, feature spec, or repository constitution was found.  
**Performance/SEO**: Fetch only fields needed by each view; provide route-specific metadata and include published blog URLs in the sitemap.

## Constitution Check

No repository constitution file was found to evaluate. Plan decisions follow the existing App Router, Sanity, localization, and Tailwind patterns; no new client-side state or unrelated site-wide refactor is planned.

## Applied Guidelines

No technology-migration guidelines apply. Follow existing Next.js server-component and Sanity schema/query conventions.

## Scope and Assumptions

- Include a responsive index, individual article routes, global navigation links, empty and not-found states, metadata, and sitemap entries.
- Show posts from the configured Sanity dataset, ordered by `publishedAt` descending with `_createdAt` as a fallback. Standard published-content visibility applies.
- Derive a short card excerpt from the first textual content blocks in `body`; do not add a CMS field or alter Sanity content modeling in this frontend task.
- Render Sanity block content and images from `body` and `mainImage`; article author and category labels are optional when present.
- Exclude search, pagination, category filtering, comments, and translations of post content.
- Use existing page styling and shared header/footer. Add translated labels for the blog navigation to all four existing locale resources.

## Implementation Steps

### Step 1: [Cross-cutting] Align Sanity queries and content rendering
- **Requirements**: REQ-001, REQ-002
- **Design inputs**: `src/sanity/schemaTypes/postType.ts`, `src/sanity/schemaTypes/blockContentType.ts`, existing Sanity client and live-query helpers
- **Description**: Update the list and detail GROQ queries to request fields that exist in the post schema, including slug, `publishedAt`, `_createdAt`, `mainImage`, author/category projections, and `body`. Use a published-date fallback for sorting and excerpt extraction. Add `@portabletext/react` as a direct dependency, use it to render block content and embedded Sanity images/links, and mount the existing `<SanityLive />` component in the root layout for live-query updates.

### Step 2: [Cross-cutting] Add blog navigation and route labels
- **Requirements**: REQ-003
- **Design inputs**: Existing header, footer, `src/i18n.ts`, and locale JSON resources
- **Description**: Add a `/blog/` link to desktop and mobile header navigation and footer navigation. Add a localized label for German, English, Russian, and Ukrainian. Keep existing section-anchor behavior unchanged.

### Step 3: [US1] Build the `/blog/` index
- **Requirements**: REQ-001
- **Design inputs**: Existing site layout, shared header/footer, `POSTS_QUERY`, Sanity image URL helper
- **Description**: Add `src/app/blog/page.tsx` as a server-rendered page. Fetch posts through the existing Sanity live-query helper, show responsive post cards with title, date, image, optional categories, excerpt, and a link to `/blog/[slug]/`. Provide a useful empty state when the dataset contains no posts.

### Step 4: [US2] Build individual article pages
- **Requirements**: REQ-002
- **Design inputs**: `POST_QUERY`, Sanity post and block-content schemas, shared site styling
- **Description**: Add `src/app/blog/[slug]/page.tsx` to resolve a post by slug and render its title, publication date, optional author/categories, main image, and Portable Text body. Use `notFound()` for unknown slugs and provide a link back to the blog index.

### Step 5: [Cross-cutting] Add blog metadata and sitemap URLs
- **Requirements**: REQ-001, REQ-002
- **Design inputs**: Existing root metadata and `src/app/sitemap.ts`
- **Description**: Generate per-post title, description, canonical URL, and Open Graph data from Sanity content. Include `/blog/` and published article URLs in the sitemap, retaining the existing home and legal entries.

### Step 6: [Cross-cutting] Verify routes and rendering
- **Requirements**: REQ-001, REQ-002, REQ-003
- **Design inputs**: Completed routes and shared navigation
- **Description**: Run the project build/type validation and verify the index, article route, empty state, unknown-slug 404, mobile/desktop navigation, and locale labels. Confirm Sanity images and rich-text links render without console/runtime errors.

## Project Structure

```text
src/
├── app/
│   ├── blog/
│   │   ├── page.tsx
│   │   └── [slug]/
│   │       └── page.tsx
│   ├── layout.tsx                 # Mount SanityLive for live-query updates
│   └── sitemap.ts
├── components/
│   └── sections/
│       ├── Header.tsx
│       └── Footer.tsx
├── locales/
│   ├── de.json
│   ├── en.json
│   ├── ru.json
│   └── uk.json
└── sanity/
    └── lib/
        └── queries.ts
```

`package.json` and `package-lock.json` will also change when `@portabletext/react` is added. The precise Portable Text renderer location can follow the current component organization during implementation.

## Validation Strategy

- Build and type-check the Next.js app after implementation.
- Verify published posts appear newest-first at `/blog/`; an empty Sanity result renders the empty state.
- Verify a valid slug renders metadata and Portable Text content, while an invalid slug returns a 404.
- Verify desktop/mobile navigation points to `/blog/`, all four locale resources have the blog label, and sitemap output includes the index and published slugs.

## Tasks

### Phase 1: Foundational
- [x] T001 [Plan:1.1] Align `POSTS_QUERY` and `POST_QUERY` in `src/sanity/lib/queries.ts` with the Sanity post schema, add required projections and published-date fallback, and mount `<SanityLive />` in `src/app/layout.tsx`.
- [x] T002 [P] [Plan:1.1] Add `@portabletext/react` and the Node test command to `package.json`, updating `package-lock.json` as needed.

### Phase 2: US1 — Blog index
- [x] T003 [Plan:3.1] Create the server-rendered blog index in `src/app/blog/page.tsx`, including responsive post cards, derived excerpts, and an empty state.
- [x] T004 [P] [Plan:2.1] Add the blog link to desktop/mobile navigation and footer in `src/components/sections/Header.tsx` and `src/components/sections/Footer.tsx`.
- [x] T005 [P] [Plan:2.1] Add translated blog navigation labels to `src/locales/de.json`, `src/locales/en.json`, `src/locales/ru.json`, and `src/locales/uk.json`.

### Phase 3: US2 — Article pages
- [x] T006 [Plan:4.1] Create `src/app/blog/[slug]/page.tsx` with Sanity data loading, Portable Text and image rendering, a back link, and `notFound()` behavior.
- [x] T007 [Plan:5.1] Add per-post metadata and update `src/app/sitemap.ts` with the blog index and published post URLs.

### Final Phase: Cross-cutting verification
- [x] T008 [Plan:6.1] Build/type-check the app and verify index/detail rendering, empty and not-found states, localization labels, navigation, and sitemap entries.

## Requirement Mapping

| REQ ID | Description | Plan Items | Implementation Evidence |
|--------|-------------|------------|--------------------------|
| REQ-001 | Browse published posts from `/blog/` with useful summaries and navigation. | 1.1, 2.1, 3.1, 5.1, 6.1 | `src/app/blog/page.tsx`, `src/sanity/lib/queries.ts`, navigation components, `src/app/sitemap.ts` |
| REQ-002 | Open a published post at `/blog/[slug]/`, render its Sanity content, and handle unknown slugs. | 1.1, 4.1, 5.1, 6.1 | `src/app/blog/[slug]/page.tsx`, `src/sanity/lib/queries.ts` |
| REQ-003 | Make the blog route discoverable from shared site navigation in supported UI locales. | 2.1, 6.1 | `src/components/sections/Header.tsx`, `src/components/sections/Footer.tsx`, `src/locales/*.json` |
