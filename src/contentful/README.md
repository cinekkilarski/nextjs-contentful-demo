# Next.js Contentful Integration

This project includes integration with Contentful, a headless CMS that allows you to manage your content through a web interface while serving it through a powerful API.

## Setup Instructions

### 1. Create a Contentful Account

If you don't already have a Contentful account, sign up at [contentful.com](https://www.contentful.com/).

### 2. Create a New Space (or use an existing one)

Once logged in, create a new space or use an existing one.

### 3. Set Up Content Models

Create content models according to the schema defined in the `example-schema.md` file. The main content type is:

- `blogPage` - For blog content with rich text and images

### 4. Add API Keys to Environment Variables

1. In Contentful, go to Settings > API keys
2. Create a new API key or use an existing one
3. Copy the "Space ID" and "Content Delivery API - access token"
4. Create a `.env.local` file in the root of your project
5. Add the following environment variables:

```
CONTENTFUL_SPACE_ID=your_space_id_here
CONTENTFUL_ACCESS_TOKEN=your_content_delivery_api_access_token
```

### 5. Configure Next.js for Contentful Images

Update your `next.config.ts` to allow images from Contentful:

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["images.ctfassets.net"],
  },
};

export default nextConfig;
```

### 6. Create Some Sample Content

Add a few blog posts in Contentful to test the integration:

- Provide a Title
- Add Rich Text content in the Body field
- Upload and attach an image

### 7. Test the Integration

1. Run the development server: `npm run dev`
2. Visit `/contentful-preview` to check the connection status
3. Visit `/blog` to see your blog posts

## Available Pages

- `/contentful-preview` - Shows the connection status and setup instructions
- `/blog` - Lists all blog posts
- `/blog/[title]` - Shows individual blog post details (uses the title as the URL parameter)

## Key Files

- `src/lib/contentful.ts` - Contentful client configuration
- `src/types/contentful.ts` - TypeScript interfaces for content models
- `src/app/blog/page.tsx` - Blog listing page
- `src/app/blog/[slug]/page.tsx` - Blog post detail page

## Further Customization

You can extend the integration by:

1. Adding more content models in Contentful
2. Creating additional query functions in `contentful.ts`
3. Implementing content preview mode for draft content
4. Adding image transformations using Contentful's Image API

## Troubleshooting

If you encounter issues with the integration:

1. Check that your environment variables are correct in `.env.local`
2. Make sure your content models match the expected TypeScript interfaces
3. Verify that you have published content in Contentful
4. Check the browser console for any API errors
5. Ensure your `next.config.ts` has the Contentful image domain configured
