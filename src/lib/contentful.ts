import { createClient } from "contentful";
import type { EntrySkeletonType, Entry } from "contentful";

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID || "",
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || "",
});

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

export default client;
