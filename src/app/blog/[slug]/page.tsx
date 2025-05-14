import Link from "next/link";
import { notFound } from "next/navigation";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Document } from "@contentful/rich-text-types";
import { getBlogPostByTitle } from "@/lib";
import type { ContentfulAsset } from "@/types/contentful";
import { LikeButton, PageTransition, AnimatedImage } from "@/components";

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getBlogPostByTitle(decodeURIComponent(params.slug));

  if (!post) {
    notFound();
  }

  // Safe access to image fields
  const imageFields = post.fields.image?.fields as
    | ContentfulAsset["fields"]
    | undefined;
  const imageUrl = imageFields?.file?.url;
  const imageTitle = imageFields?.title;

  // Safely handle document
  const isValidDocument = (doc: unknown): doc is Document => {
    return (
      doc !== undefined &&
      doc !== null &&
      typeof doc === "object" &&
      "nodeType" in (doc as object) &&
      "content" in (doc as object)
    );
  };

  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-12">
        <Link
          href="/blog"
          className="text-blue-600 hover:underline mb-8 inline-block dark:text-blue-400"
        >
          ← Back to Blog
        </Link>

        <article className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">
            {String(post.fields.title)}
          </h1>

          {imageUrl && (
            <div className="mb-8">
              <AnimatedImage
                src={`https:${imageUrl}`}
                alt={imageTitle || String(post.fields.title)}
                fill
                style={{ height: "400px" }}
                className="rounded-lg"
                priority
              />
            </div>
          )}

          <div className="prose prose-lg max-w-none dark:prose-invert">
            {isValidDocument(post.fields.body) &&
              documentToReactComponents(post.fields.body)}
          </div>

          {/* Client-side component for interactivity */}
          <LikeButton />
        </article>
      </div>
    </PageTransition>
  );
}
