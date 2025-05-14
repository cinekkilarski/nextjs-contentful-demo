/**
 * Site Configuration
 */
export const siteConfig = {
  name: "Next.js Contentful Blog",
  description: "A blog built with Next.js and Contentful",
  url: "https://nextjs-contentful-demo.vercel.app",
  ogImage: "https://nextjs-contentful-demo.vercel.app/og.jpg",
  links: {
    github: "https://github.com/cinekkilarski/nextjs-contentful-demo",
  },
};

/**
 * Navigation Configuration
 */
export const navigationConfig = {
  mainNav: [
    { label: "Home", path: "/" },
    { label: "Blog", path: "/blog" },
  ],
};

/**
 * Contentful Configuration
 */
export const contentfulConfig = {
  spaceId: process.env.CONTENTFUL_SPACE_ID || "",
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || "",
  contentTypes: {
    blogPage: "blogPage",
  },
};

/**
 * Feature Flags
 */
export const featureFlags = {
  enableDarkMode: true,
  enableBlogComments: false,
  enableNewsletter: false,
};
