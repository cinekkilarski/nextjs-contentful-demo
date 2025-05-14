import { getEntries } from "@/lib/contentful";
import type { BlogPost, ContentfulAsset } from "@/types/contentful";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Document } from "@contentful/rich-text-types";
import LikeButton from "@/components/LikeButton";

interface BlogPostDetailProps {
  params: {
    slug: string;
  };
}

async function getBlogPostBySlug(slug: string) {
  const posts = await getEntries<BlogPost>("blogPage", {
    "fields.title": decodeURIComponent(slug),
    limit: 1,
  });

  return posts[0] || null;
}

export default async function BlogPostPage({ params }: BlogPostDetailProps) {
  const post = await getBlogPostBySlug(params.slug);

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
    <div className="container mx-auto px-4 py-12">
      <Link
        href="/blog"
        className="text-blue-600 hover:underline mb-8 inline-block"
      >
        ← Back to Blog
      </Link>

      <article className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">{String(post.fields.title)}</h1>

        {imageUrl && (
          <div className="relative h-[400px] w-full mb-8">
            <Image
              src={`https:${imageUrl}`}
              alt={imageTitle || String(post.fields.title)}
              fill
              style={{ objectFit: "cover" }}
              className="rounded-lg"
            />
          </div>
        )}

        <div className="prose prose-lg max-w-none">
          {isValidDocument(post.fields.body) &&
            documentToReactComponents(post.fields.body)}
        </div>

        {/* Client-side component for interactivity */}
        <LikeButton />
      </article>
    </div>
  );
}
