# CLAUDE.md

@../CLAUDE.md

## Landmines

- `netlify.toml` build command references `yarn` but the project uses `pnpm`. Netlify UI settings may override this — do not "fix" it without confirming the actual deploy config via the Netlify MCP.
- `src/gatsby-types.d.ts` is auto-generated (`graphqlTypegen: true` in gatsby-config). Never edit manually.
- `gatsby-browser.tsx` and `gatsby-ssr.tsx` both wrap pages in `Layout` — changes to the layout wrapper must be mirrored in both files.
