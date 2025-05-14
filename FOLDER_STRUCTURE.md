# Project Folder Structure

This project follows a modular, organized folder structure for better maintainability and scalability.

## Main Structure

```
src/
├── app/                     # Next.js App Router routes
│   ├── (marketing)/         # Group for marketing pages
│   │   ├── page.tsx         # Marketing homepage
│   │   └── loading.tsx      # Loading state for marketing pages
│   ├── blog/                # Blog pages
│   │   ├── page.tsx         # Blog index page
│   │   ├── loading.tsx      # Loading state for blog pages
│   │   └── [slug]/          # Individual blog post pages
│   ├── contentful-preview/  # Contentful preview pages
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Root page (redirects to marketing)
│   ├── loading.tsx          # Root loading state
│   ├── favicon.ico          # Site favicon
│   └── globals.css          # Global styles
├── components/              # Shared components
│   ├── ui/                  # UI primitives
│   │   ├── like-button.tsx  # Kebab-case filenames
│   │   └── ...
│   ├── layout/              # Layout components
│   │   ├── header.tsx
│   │   └── footer.tsx
│   ├── theme/               # Theme-related components
│   │   ├── theme-provider.tsx
│   │   └── theme-toggle.tsx
│   └── index.ts             # Barrel file for easy imports
├── lib/                     # Utility functions and libraries
│   ├── contentful/          # Contentful integration
│   │   ├── client.ts
│   │   └── queries.ts
│   ├── utils/               # Utility functions
│   │   └── index.ts         # Helper functions
│   └── index.ts             # Barrel file for lib exports
├── types/                   # TypeScript type definitions
│   └── contentful.ts        # Contentful type definitions
├── config.ts                # Central configuration file
└── __tests__/               # Tests organized by component/feature
    ├── components/          # Component tests
    │   └── ui/              # UI component tests
    ├── lib/                 # Library function tests
    └── pages/               # Page component tests
```

## File Organization

This project uses a consistent naming convention:

- Components use kebab-case filenames (`ui/like-button.tsx`)
- All components use PascalCase for their exports

## About Route Groups

The `(marketing)` folder is a Next.js route group. The parentheses in the folder name indicate:

1. It's a route grouping mechanism, not a route segment
2. The parentheses make the folder name not included in the URL path
3. It allows organizing related routes without affecting the URL structure

For example, files inside `app/(marketing)/page.tsx` will be served at the root URL path `/` rather than `/marketing`.

## Naming Conventions

- **Files**:

  - React components: PascalCase for component names, kebab-case for filenames
  - Utility functions: camelCase for both functions and filenames
  - Configuration: camelCase

- **Directories**:
  - All lowercase, kebab-case if multiple words
  - Route groups in parentheses: `(groupName)`

## Import Strategy

We use barrel files for cleaner imports:

```tsx
// Instead of this:
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";

// You can do this:
import { Button, Input } from "@/components";
```

### Path Aliases

TypeScript path aliases are configured for easier imports:

- `@/components/*` - Components
- `@/lib/*` - Utilities and libraries
- `@/types/*` - TypeScript types

## Configuration

Project configuration is centralized in `src/config.ts`, including:

- Site information
- Navigation
- Contentful settings
- Feature flags
- Theme configuration

## Contentful Integration

Contentful integration is handled in a modular approach:

- `src/lib/contentful/` - Modular approach with separate files
  - `client.ts` - Contentful client configuration
  - `queries.ts` - Content fetching functions

## Testing

Tests follow the same structure as the source code:

```
__tests__/
├── components/          # Tests for components
│   ├── ui/             # Tests for UI components
│   ├── layout/         # Tests for layout components
│   └── theme/          # Tests for theme components
├── lib/                # Tests for utility functions
└── pages/              # Tests for pages
```
