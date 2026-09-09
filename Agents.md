# Agents Reference Guide

> **Purpose**: This document provides AI agents with a concise yet thorough overview of the project's technology stack, architecture, data flow, state management, and coding conventions. It serves as the single source of truth for understanding how the codebase is organized and how to work within its established patterns.

---

## 1. Tech Stack & Key Libraries

| Layer | Technology / Library | Version (as declared in `package.json`) |
|-------|----------------------|------------------------------------------|
| **Framework** | Next.js (React) | `^14.2.35` |
| **UI** | Chakra UI | `^2.10.1` |
| | Saas UI (theme wrapper) | `^2.9.0` |
| | Framer Motion (animations) | `^11.11.1` |
| | Tabler Icons React | `^3.1.0` |
| **Styling** | Emotion (`@emotion/react`, `@emotion/styled`) | `^11.13.3` / `^11.13.0` |
| **Fonts** | @fontsource-variable/inter | `^5.1.0` |
| **SVG handling** | @svgr/webpack | `^8.1.0` |
| **Metadata & SEO** | Next.js built‑in metadata + custom JSON‑‑LD generation |
| **State / Context** | React Context API (custom LanguageProvider) |
| **Build / Lint** | ESLint (Next core web vitals config) |
| | Prettier (with import‑order plugin) |
| **TypeScript** | TypeScript `5.6.2` |
| **Package Manager** | pnpm (`>=9.0.0`) |
| **Testing / Development** | `next dev`, `next build`, `next start` scripts |

---

## 2. High‑Level Folder Structure & Architecture Overview

```
/music
├─ .eslintrc.json                # ESLint configuration (extends Next core‑web‑vitals)
├─ .prettierrc.cjs               # Prettier config + import order plugin
├─ next.config.mjs               # Custom webpack rule for SVGs via @svgr/webpack
├─ package.json
├─ pnpm-lock.yaml
├─ tsconfig.json
├─ README.md
│
├─ app/                         # Next.js app router entry points
│   ├─ layout.tsx                # Global layout, metadata, JSON‑LD, theme & color mode
│   ├─ provider.tsx              # Wraps SaasProvider + custom LanguageProvider
│   └─ (marketing)/              # Optional marketing‑specific pages (currently empty)
│
├─ components/                  # Re‑usable UI components (Chakra‑styled)
│   ├─ announcement-banner/
│   ├─ button‑link/               # `ButtonLink` component (NextLink + Chakra Button)
│   ├─ faq/
│   ├─ gradients/
│   ├─ hero/                     # Hero section component
│   ├─ highlights/
│   ├─ layout/
│   ├─ logos/
│   ├─ mobile‑nav/
│   ├─ motion/                   # Motion‑enabled wrappers (Framer Motion)
│   ├─ music‑downloader/         # Download UI for tracks
│   ├─ nav‑link/
│   ├─ pricing/
│   ├─ section/
│   ├─ testimonials/
│   └─ typography/
│
├─ context/                     # React context files
│   └─ language‑context.tsx      # Language, direction, translation utilities
│
├─ data/                        # Static content that drives pages (e.g., tracks, FAQ, pricing)
│   ├─ appulse.tsx
│   ├─ config.tsx
│   ├─ faq.tsx
│   ├─ logo.tsx
│   ├─ pricing.tsx
│   ├─ songs.tsx                 # `tracks` array used in layout for JSON‑LD
│   └─ testimonials.tsx
│
├─ hooks/                       # Custom React hooks
│   ├─ use‑route‑changed.ts
│   └─ use‑scrollspy.ts
│
├─ posts/                       # Blog / MDX posts (currently a single example)
│   └─ post‑01.mdx
│
├─ public/                      # Static assets (favicons, images, etc.)
│   └─ static/
│       ├─ favicons/…
│       └─ images/alada.jpeg
│
├─ theme/                       # Chakra theme extensions & design tokens
│   ├─ components/ (custom component theme overrides)
│   ├─ foundations/ (color, typography tokens)
│   └─ index.ts (exports the built theme)
│
└─ (other Next.js folders like .next generated at build time)
```

**Architecture Highlights**
- **App Router** (`app/` directory) drives page rendering, with a top‑level `layout.tsx` that injects SEO metadata and JSON‑LD for the music group. The `Provider` component wraps the whole tree, supplying a Saas UI theme and a custom Language context.
- **Component‑first design**: UI pieces live under `components/`, each in its own folder with an optional `index.ts` barrel export. This encourages re‑use and clear import paths (e.g., `import { ButtonLink } from '@/components/button-link'`).
- **Static Data Layer**: All content that does not require a backend (track list, FAQs, pricing, testimonials) resides in `data/`. Components import these plain‑TSX/JS objects directly.
- **Theme System**: A Chakra‑based design system lives in `theme/`. It is imported in `app/provider.tsx` and passed to `SaasProvider`.
- **Internationalisation**: A lightweight language context (`context/language-context.tsx`) provides a single language (`en` currently) and direction (`ltr`). The pattern can be extended for additional locales.
- **Custom SVG handling**: `next.config.mjs` injects a webpack rule using `@svgr/webpack` so that SVG files can be imported as React components.

---

## 3. Data Flow & State Management Strategies

1. **Static Data Import**
   - Files in `data/` export plain objects/arrays (e.g., `tracks` in `songs.tsx`). These are imported where needed (e.g., the layout uses `tracks` to build JSON‑LD). No runtime fetching; data is bundled at build time.
2. **React Context for Global State**
   - `LanguageProvider` supplies language, direction, and a translation map (`staticTranslations`). Consumers call `useLanguage()` to access `t` (translation functions) and language‑related helpers.
3. **Component Props**
   - Most UI state is managed locally via component props (e.g., `ButtonLink` receives `href`, `children`, and Chakra `Button` props). No global redux/mobx; the project prefers the lightweight Context + prop‑drilling approach.
4. **Theme & UI State**
   - Chakra UI’s `ColorModeScript` together with `theme.config.initialColorMode` provides dark/light mode handling. The color mode value is read from the Chakra theme and passed to the HTML root.
5. **Routing Hooks**
   - Custom hooks such as `use‑route‑changed` and `use‑scrollspy` encapsulate navigation‑related side effects (e.g., updating scroll position or URL tracking). These are imported where needed.
6. **No Client‑Side Data Fetching**
   - All data required for rendering is static; there are no `fetch`/`axios` calls or SWR/React‑Query usage.

---

## 4. Coding Conventions, Styling Rules & Best Practices

### General
- **TypeScript** throughout the codebase (`.tsx` files). Types are explicitly defined for props and context values.
- **ESM (`type: "module"`)** is configured in `package.json`; imports use the modern syntax.
- **Prettier** with `@trivago/prettier-plugin-sort-imports` enforces:
  - No semicolons (`semi: false`).
  - Single quotes, trailing commas, and a max line width of 80.
  - Import groups ordered as: React/React‑DOM, package imports (`^#.(.*)$` alias), relative imports.
- **ESLint** extends `next/core-web-vitals`. The only overridden rule disables `import/no-anonymous-default-export`.
- **File Naming**: kebab‑case for directories, PascalCase for component folder names, and camelCase for files that export a single component (`hero.tsx`). Barrel files (`index.ts`) re‑export components for clean imports.
- **Alias**: The `#theme` alias (defined likely via `tsconfig.json` paths) points to `theme/` for concise imports.

### UI / Component Guidelines
- Use **Chakra UI** primitives (`Box`, `Flex`, `Button`, `Stack`, etc.) for layout and styling.
- When an SVG is needed as a component, import it directly thanks to the custom webpack rule (`import Icon from '@/public/icons/my-icon.svg'`).
- All components are **client‑side** (`'use client'` at top) unless they are pure server components.
- Components that wrap navigation (`ButtonLink`, `NavLink`) use Next.js's `<Link>` with `passHref`.
- Props are typed using **TypeScript intersection** where needed (e.g., `ButtonLinkProps = LinkProps & ButtonProps`).

### Context & Hooks
- Context creation follows the pattern:
  ```tsx
  const MyContext = React.createContext<ContextValue | undefined>(undefined);
  export const MyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // provide values
    return <MyContext.Provider value={...}>{children}</MyContext.Provider>;
  };
  export const useMyContext = () => {
    const ctx = React.useContext(MyContext);
    if (!ctx) throw new Error('useMyContext must be used within MyProvider');
    return ctx;
  };
  ```
- Custom hooks are placed under `hooks/` and are **pure functions** that encapsulate side‑effects.

### Theming
- Theme is built in `theme/index.ts` and exported as `theme`. It extends Chakra’s `extendTheme` and includes custom color palettes, fonts (Inter variable), and component style overrides.
- The `SaasProvider` from `@saas-ui/react` receives the theme, enabling consistent design tokens across the UI.

### SEO & Accessibility
- Page‑level metadata lives in `app/layout.tsx` using Next.js `Metadata` type.
- JSON‑LD (`jsonLd` object) is injected via a `<script type="application/ld+json">` tag for rich search results.
- All images have descriptive `alt` attributes, and icons use `aria‑label` where appropriate.

### Project‑Specific Patterns
- **Static translations** are defined once in `language-context.tsx`. Adding a new language involves extending the `Language` union and providing a new translation map.
- **Track list** (`data/songs.tsx`) supplies fields `title`, `duration`, `audioUrl`. The layout builds structured data from this array.
- **SVG Icons** are imported as React components thanks to the custom webpack rule; no separate asset handling required.
- **Environment**: Node version `>=20 <21`; pnpm version `>=9` is enforced via the `engines` field.

---

## 📌 Quick Reference (for AI Agents)
- **Root entry point**: `app/layout.tsx`
- **Global providers**: `app/provider.tsx`
- **Theme import alias**: `#theme`
- **Language utilities**: `context/language-context.tsx` (`useLanguage` hook)
- **Static content**: `data/` (import directly)
- **Component import pattern**: `import { X } from '@/components/x'` (via `index.ts` barrel where present)
- **Styling**: Chakra UI + Emotion; respect Prettier import order.
- **SVG handling**: Import as React component after the webpack rule.
- **Running the dev server**: `npm run dev` (or `pnpm dev` if a script is defined).

---

*This file is deliberately kept up‑to‑date manually. When the project structure or conventions evolve, remember to update `Agents.md` accordingly.*
