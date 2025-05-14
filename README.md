# Next.js Contentful Blog Demo

A modern blog application built with Next.js App Router and Contentful headless CMS. Features server-side rendering for content, client-side interactivity, and TypeScript integration.

![Next.js](https://img.shields.io/badge/Next.js-15.3-black)
![Contentful](https://img.shields.io/badge/Contentful-CMS-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-blue)
![Jest](https://img.shields.io/badge/Jest-29-red)
![Turbopack](https://img.shields.io/badge/Turbopack-Enabled-green)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-Animations-purple)

## Features

- 📱 Responsive design with TailwindCSS
- 🚀 Next.js 15.3 App Router for server components
- 🔄 Hybrid rendering (server + client components)
- 📝 Rich text content from Contentful CMS
- 🖼️ Optimized image loading with Next.js Image component
- 📊 TypeScript for type safety
- ❤️ Client-side interactivity with like button and confetti animations
- 🧪 Comprehensive testing with Jest and React Testing Library
- ⚡ Fast development with Turbopack
- 🌓 Dark mode support with system preference detection
- 🔄 Page transition animations with Framer Motion
- 🏃‍♂️ Loading skeletons for better perceived performance
- ♿ Accessibility features (skip links, ARIA attributes, keyboard navigation)
- 🌐 Modern folder structure following best practices
- 🧩 Component organization with barrel files for cleaner imports

## Folder Structure

The project follows a modern, modular folder structure:

```
src/
├── app/                     # Next.js App Router routes
│   ├── (marketing)/         # Group for marketing pages
│   │   ├── page.tsx         # Homepage
│   │   └── loading.tsx
│   ├── blog/                # Blog pages
│   │   ├── page.tsx         # Blog index page
│   │   ├── loading.tsx
│   │   └── [slug]/          # Individual blog post pages
│   ├── contentful-preview/  # Contentful preview pages
│   ├── layout.tsx           # Root layout
│   └── globals.css          # Global styles
├── components/              # Shared components
│   ├── ui/                  # UI primitives
│   │   ├── like-button.tsx  # Kebab-case filenames
│   │   ├── skip-to-content.tsx
│   │   └── animated-image.tsx
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
└── __tests__/               # Tests organized by component/feature
```

## Style Guide

This project follows a consistent style guide:

- **Files**:

  - React components: PascalCase for component names, kebab-case for filenames
  - Utility functions: camelCase for both functions and filenames
  - Configuration: camelCase

- **Directories**:

  - All lowercase, kebab-case if multiple words

- **Imports**:
  - Using barrel files for cleaner imports
  - Path aliases configured for better organization

## Getting Started

### Prerequisites

- Node.js 18+
- Contentful account

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/cinekkilarski/nextjs-contentful-demo.git
   cd nextjs-contentful-demo
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root directory with your Contentful credentials:
   ```
   CONTENTFUL_SPACE_ID=your_space_id_here
   CONTENTFUL_ACCESS_TOKEN=your_content_delivery_api_access_token
   ```

### Contentful Setup

1. **Create a Contentful account** if you don't have one at [contentful.com](https://www.contentful.com/sign-up/)

2. **Create a new space** or use an existing one

3. **Create a content model** with ID `blogPage` containing these fields:

   - `title` (Short text) - Required
   - `body` (Rich Text) - Enable formatting options
   - `image` (Media - Image) - Optional
   - `recommendedPosts` (References) - Optional, reference to other blog pages

4. **Create sample content**:

   - Add at least one blog post
   - Include an image to test image loading
   - Add some rich text content to test formatting

5. **Get API credentials**:

   - Go to Settings > API keys
   - Create a new API key or use the default one
   - Copy "Space ID" and "Content Delivery API - access token"
   - Add these to your `.env.local` file

6. **Configure Next.js for Contentful images**:
   The `next.config.ts` file should include:

   ```typescript
   images: {
     domains: ['images.ctfassets.net'],
   }
   ```

   This allows Next.js to optimize and serve images from Contentful's CDN.

### Troubleshooting Contentful Connection

If you have issues connecting to Contentful:

1. Check that your API credentials are correct in `.env.local`
2. Ensure your content model is named exactly `blogPage`
3. Verify that you've published (not just saved) your content
4. Visit `/contentful-preview` route to check connection status

### Running the Development Server

```bash
# Run development server (Turbopack enabled by default)
npm run dev

# Clear cache if you encounter styling issues
rm -rf .next && npm run dev

# Run without Turbopack
npm run dev -- --no-turbo
```

Open [http://localhost:3000](http://localhost:3000) to see your application.

- Visit `/blog` to see your blog posts
- Click on any post to see the detail page
- Try the like button to test client-side interactivity

> **Note:** Next.js 15.3 uses Turbopack by default. You'll see `▲ Next.js 15.3.2 (Turbopack)` in the console when it's enabled.

### Known Issues and Troubleshooting

#### Styling Issues with Turbopack

Turbopack may occasionally cache styles incorrectly. If you experience styling inconsistencies:

1. Stop the development server
2. Delete the `.next` folder with `rm -rf .next`
3. Restart the server with `npm run dev`
4. If problems persist, try running without Turbopack: `npm run dev -- --no-turbo`

#### Custom CSS Solutions

For certain styling challenges, we've implemented:

- Custom class declarations in `globals.css` for styling elements that need to override Tailwind defaults
- Direct style attributes for components that need consistent styling across different environments

## Project Structure

- `src/app` - Next.js application routes
- `src/app/blog` - Blog listing page
- `src/app/blog/[slug]` - Blog post detail page
- `src/app/contentful-preview` - Contentful connection status page
- `src/components` - Reusable components
- `src/lib` - Utility functions and API clients
- `src/types` - TypeScript type definitions

## Key Components

### Server Components

The blog pages use server components for data fetching and rendering:

```typescript
// src/app/blog/page.tsx (Server Component)
export default async function BlogPage() {
  const posts = await getBlogPosts();
  // Server-side rendering
}
```

### Client Components

Interactive elements use client components:

```typescript
// src/components/LikeButton.tsx (Client Component)
"use client";

export default function LikeButton() {
  const [likes, setLikes] = useState(0);
  // Client-side interactivity
}
```

## Testing

The application includes a comprehensive testing suite using Jest and React Testing Library.

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch
```

### Test Structure and Coverage

Tests mirror the source code structure:

- `src/__tests__/components/` - Component tests (UI, layout, themes)
- `src/__tests__/pages/` - Page component tests
- `src/__tests__/lib/` - Utility function tests

The test suite covers:

1. **Component Testing**: UI components like `LikeButton`
2. **Page Testing**: Page components
3. **Data Fetching**: Contentful integration

### Testing Utilities

To support testing, the project includes:

```typescript
// Example component test
it("increments like count when clicked", () => {
  render(<LikeButton />);
  fireEvent.click(screen.getByRole("button"));
  expect(screen.getByText(/like \(1\)/i)).toBeInTheDocument();
});

// Contentful mock for testing
function createMockClient() {
  return {
    getEntries: jest.fn().mockResolvedValue({ items: [] }),
    getEntry: jest.fn().mockResolvedValue({
      fields: { title: "Mock Title", content: "Mock Content" },
    }),
  };
}

// Browser API mocks
class MockIntersectionObserver {
  constructor(callback) {
    this.callback = callback;
  }
  observe() {
    this.callback([{ isIntersecting: true }]);
  }
  // ... other methods
}
```

## Deployment

This application can be deployed using Vercel or any other Next.js compatible hosting platform.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Contentful Documentation](https://www.contentful.com/developers/docs/)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro)

## License

This project is licensed under the MIT License.

## User Experience

The application includes several user experience enhancements:

### Loading Skeletons

We use loading.tsx files in each route directory to provide loading skeletons while content is being fetched:

```tsx
// src/app/blog/loading.tsx
export default function BlogLoading() {
  // Loading skeleton UI
}
```

### Dark Mode Support

The app includes a full-featured dark mode that:

- Respects system preferences
- Allows manual toggling
- Persists user preferences
- Provides dark-themed styling for all components

### Page Transitions

Smooth transitions between pages using Framer Motion:

```tsx
<PageTransition>{/* Page content */}</PageTransition>
```
