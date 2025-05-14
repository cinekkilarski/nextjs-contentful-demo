import type { EntrySkeletonType, Asset, Entry } from "contentful";
import { Document } from "@contentful/rich-text-types";

export interface ContentfulAsset {
  fields: {
    file: {
      url: string;
      details?: {
        size?: number;
        image?: {
          width?: number;
          height?: number;
        };
      };
      fileName?: string;
      contentType?: string;
    };
    title?: string;
    description?: string;
  };
}

export interface BlogPost extends EntrySkeletonType {
  fields: {
    title: string;
    body: Document;
    image?: {
      fields: ContentfulAsset["fields"];
    };
    recommendedPosts?: Entry<BlogPost>[];
  };
}

export interface Author extends EntrySkeletonType {
  fields: {
    name: string;
    bio: string;
    avatar?: Asset;
  };
}
