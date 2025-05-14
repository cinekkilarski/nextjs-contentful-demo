import { getEntries } from "@/lib/contentful";
import type { BlogPost, ContentfulAsset } from "@/types/contentful";
import Image from "next/image";
import Link from "next/link";

async function getBlogPosts() {
  // Get all blog posts
  const posts = await getEntries<BlogPost>("blogPage", {});

  return posts;
}

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Blog</h1>

      {posts.length === 0 ? (
        <p>
          No blog posts found. Please configure your Contentful space and add
          some content.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => {
            // Safe access to image fields
            const imageFields = post.fields.image?.fields as
              | ContentfulAsset["fields"]
              | undefined;
            const imageUrl = imageFields?.file?.url;
            const imageTitle = imageFields?.title;

            return (
              <article
                key={post.sys.id}
                className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                {imageUrl && (
                  <div className="relative h-48 w-full">
                    <Image
                      src={`https:${imageUrl}`}
                      alt={imageTitle || String(post.fields.title)}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                )}
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2">
                    {String(post.fields.title)}
                  </h2>
                  <Link
                    href={`/blog/${encodeURIComponent(
                      String(post.fields.title)
                    )}`}
                    className="text-blue-600 hover:underline font-medium"
                  >
                    Read more
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
