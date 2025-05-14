import type { EntrySkeletonType, Entry } from "contentful";
import client from "./client";
import { BlogPost } from "@/types/contentful";
import { contentfulConfig } from "@/config";

const { contentTypes } = contentfulConfig;

export const getEntries = async <T extends EntrySkeletonType>(
  contentType: string,
  options: Record<string, unknown> = {}
): Promise<Entry<T>[]> => {
  const entries = await client.getEntries<T>({
    content_type: contentType,
    ...options,
  });

  return entries.items;
};

export const getEntry = async <T extends EntrySkeletonType>(
  entryId: string
): Promise<Entry<T>> => {
  const entry = await client.getEntry<T>(entryId);
  return entry;
};

export const getBlogPosts = async () => {
  return getEntries<BlogPost>(contentTypes.blogPage, {});
};

export const getBlogPostByTitle = async (title: string) => {
  const posts = await getEntries<BlogPost>(contentTypes.blogPage, {
    "fields.title": title,
    limit: 1,
  });

  return posts[0] || null;
};
