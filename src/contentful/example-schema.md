# Contentful Content Model Schema

Below are the Contentful content models used in this project. You can use these as a reference when setting up your Contentful space.

## Blog Page Content Model

**Content Type ID:** `blogPage`

| Field ID         | Field Name        | Field Type    | Required | Validations/Settings                 |
| ---------------- | ----------------- | ------------- | -------- | ------------------------------------ |
| title            | Title             | Short text    | Yes      | -                                    |
| body             | Body              | Rich Text     | No       | Enable headings, lists, quotes, etc. |
| image            | Image             | Media - Image | No       | -                                    |
| recommendedPosts | Recommended posts | References    | No       | Allow only Blog Page content type    |

## Author Content Model

**Content Type ID:** `author`

| Field ID    | Field Name   | Field Type    | Required | Validations/Settings |
| ----------- | ------------ | ------------- | -------- | -------------------- |
| name        | Name         | Short text    | Yes      | Min: 1, Max: 50      |
| bio         | Bio          | Long text     | Yes      | Min: 10, Max: 500    |
| avatar      | Avatar       | Media - Image | No       | -                    |
| socialLinks | Social Links | Object        | No       | -                    |

## How to Create These Models in Contentful

1. Log in to your Contentful space
2. Go to Content model
3. Click "Add content type"
4. Create the content type with ID `blogPage`
5. Add the fields specified above
6. Configure validations and appearance as needed
7. Add some sample content in the "Content" section

## Example .env.local Configuration

```
CONTENTFUL_SPACE_ID=your_space_id_here
CONTENTFUL_ACCESS_TOKEN=your_access_token_here
```

You can find these values in your Contentful space under Settings > API keys.

## Next.js Configuration

Make sure to update your `next.config.ts` file to allow Contentful image domains:

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["images.ctfassets.net"],
  },
};

export default nextConfig;
```
