# Blog Frontend Plan — Research Notes

- The project uses the Next.js App Router under `src/app`; route-specific pages are server components by default.
- Sanity is configured with `post`, `author`, `category`, and Portable Text block schemas. The post schema has `title`, `slug`, `author`, `mainImage`, `categories`, `publishedAt`, and `body`.
- `src/sanity/lib/queries.ts` currently asks for `summary` and `content`, which are not defined in the post schema. The plan uses existing schema fields and derives card excerpts from `body` rather than expanding the CMS schema.
- `src/sanity/lib/live.ts` exports `sanityFetch` and `SanityLive`; its comment notes `<SanityLive />` should be rendered in the layout for live content updates. Use the existing setup rather than introducing a separate fetch client.
- Sanity images already have a URL builder in `src/sanity/lib/image.ts`. The project sets Next image optimization to unoptimized, compatible with external Sanity image URLs.
- The root locale provider supports de, en, ru, and uk. Add only the UI navigation label in each locale; authored post content remains as published in Sanity.
- The sitemap currently includes the homepage and legal pages only; it is currently synchronous and will need Sanity data to add post URLs.
- Existing `package.json` does not list `@portabletext/react` directly. Add it explicitly for rendering Portable Text blocks.
- No repository feature spec, architecture artifact, or constitution file was found. Scope assumptions were confirmed with the user in chat.

## Decisions

| Decision | Rationale | Alternatives considered |
|----------|-----------|--------------------------|
| Include both index and detail routes | User confirmed `/blog/` plus individual post pages. | Index-only, rejected after clarification. |
| Derive card excerpts from Portable Text `body` | Avoids introducing a CMS schema change when summary is not in the existing schema. | Add a manually authored summary field, deferred as out of frontend scope. |
| Use existing Sanity live-query integration | It is already configured and is the project's intended content-fetch path. | Add a separate client/fetch abstraction, rejected as duplicate plumbing. |
| Keep the four-locale requirement to UI labels | Existing site navigation is translated, while Sanity post fields are not localized. | Translate blog content or add locale-specific routes, excluded from scope. |
