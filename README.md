# @heyitscharliem/design-system

Centralised design system for Charlie Martins' projects — shared React components, styled with Tailwind CSS + shadcn/ui, published as a public npm package.

The repo itself doubles as its own documentation: `npm run dev` runs a single-page showcase (sidebar nav, search, live components, a real light/dark toggle) instead of a separate tool like Storybook — the page *is* the deliverable.

## Development

```bash
npm install
npm run dev   # showcase page at localhost:5173
```

## Adding a component

Components live under `src/components/ui/` (added via `npx shadcn add <name>`, which respects `components.json`) or hand-written under `src/components/` for anything else (e.g. `theme-provider.tsx`).

1. Add the component.
2. Export it from `src/index.ts` so it's part of the published package.
3. Add it to the showcase: a nav entry in `nav` and a `<Section>` in `src/App.tsx`.

## Building

```bash
npm run build
```

Outputs ESM + CJS bundles and type declarations to `dist/`. React and the component-level dependencies (`radix-ui`, `lucide-react`, `class-variance-authority`, `cn`) stay external — check `vite.config.ts`'s `rollupOptions.external` when adding a new runtime dependency, or it'll get bundled into the package instead of installed alongside it.

## Using this package in another project

This package targets Tailwind CSS v4's CSS-first config (no `tailwind.config.js`). Two things are needed in the consuming project:

```bash
npm install @heyitscharliem/design-system
```

**1. Import the design tokens.** `styles.css` carries the color tokens (`--background`, `--primary`, `--brand-ink`, …), the mustard/space palettes, dark mode support, and font imports that the components are styled against — without it, components render with classes that resolve to nothing. Import it once, from the consuming project's own global stylesheet, *before* anything else so later `@theme`/`@source` overrides in that file still apply:

```css
/* app/globals.css (or equivalent) of the consuming project */
@import "@heyitscharliem/design-system/styles.css";

/* Tell Tailwind to also scan this package's compiled output for the
 * utility classes its components use — node_modules is excluded from
 * automatic content detection by default. */
@source "../node_modules/@heyitscharliem/design-system/dist";
```

Don't add a separate `@import "tailwindcss";` on top of this — `styles.css` already includes it; importing it twice in the same build risks duplicated output.

**2. Use the components:**

```tsx
import { Button, ThemeProvider } from '@heyitscharliem/design-system';
```

## Publishing

This is a **public, scoped** npm package (`publishConfig.access: "public"`). Publishing requires an npm account logged in as `heyitscharliem` (or a member of that scope).

```bash
npm version patch|minor|major
npm publish
```

`prepublishOnly` runs the build automatically before publish.
