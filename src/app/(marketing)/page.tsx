import { getBlogPosts } from "@/lib/contentful/queries";
import type { ContentfulAsset } from "@/types/contentful";
import Link from "next/link";
import PageTransition from "@/components/ui/page-transition";
import AnimatedImage from "@/components/ui/animated-image";

export default async function Home() {
  const posts = await getBlogPosts();
  const featuredPosts = posts.slice(0, 3); // Display up to 3 featured posts

  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-12">
        <section className="mb-16">
          <h1 className="text-4xl font-bold mb-6">
            Welcome to Contentful Blog
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 mb-8">
            A modern blog built with Next.js and Contentful headless CMS.
          </p>
          <Link
            href="/blog"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-500 dark:hover:bg-blue-600 px-6 py-3 rounded-md font-medium transition-colors"
          >
            View All Posts
          </Link>
        </section>

        {featuredPosts.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-6">Featured Posts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredPosts.map((post) => {
                // Safe access to image fields
                const imageFields = post.fields.image?.fields as
                  | ContentfulAsset["fields"]
                  | undefined;
                const imageUrl = imageFields?.file?.url;
                const imageTitle = imageFields?.title;

                return (
                  <article
                    key={post.sys.id}
                    className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow dark:border-gray-700"
                  >
                    {imageUrl && (
                      <div className="h-48 w-full">
                        <AnimatedImage
                          src={`https:${imageUrl}`}
                          alt={imageTitle || String(post.fields.title)}
                          fill
                          style={{ height: "12rem" }}
                        />
                      </div>
                    )}
                    <div className="p-4">
                      <h3 className="text-xl font-semibold mb-2">
                        {String(post.fields.title)}
                      </h3>
                      <Link
                        href={`/blog/${encodeURIComponent(
                          String(post.fields.title)
                        )}`}
                        className="text-blue-600 hover:underline font-medium dark:text-blue-400"
                      >
                        Read more
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </PageTransition>
  );
}
