import { getBlogPosts, getBlogPostByTitle } from "@/lib/contentful/queries";
import client from "@/lib/contentful/client";

// Mock contentful client
jest.mock("@/lib/contentful/client", () => ({
  __esModule: true,
  default: {
    getEntries: jest.fn(),
    getEntry: jest.fn(),
  },
}));

describe("Contentful queries", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getBlogPosts", () => {
    it("should fetch blog posts with correct content type", async () => {
      // Mock implementation
      (client.getEntries as jest.Mock).mockResolvedValueOnce({
        items: [
          {
            sys: { id: "1" },
            fields: {
              title: "Test Post 1",
              body: { nodeType: "document", content: [] },
            },
          },
          {
            sys: { id: "2" },
            fields: {
              title: "Test Post 2",
              body: { nodeType: "document", content: [] },
            },
          },
        ],
      });

      const posts = await getBlogPosts();

      expect(client.getEntries).toHaveBeenCalledWith({
        content_type: "blogPage",
      });
      expect(posts).toHaveLength(2);
      expect(posts[0].fields.title).toBe("Test Post 1");
    });
  });

  describe("getBlogPostByTitle", () => {
    it("should fetch a blog post by title", async () => {
      const testTitle = "Test Post 1";

      // Mock implementation
      (client.getEntries as jest.Mock).mockResolvedValueOnce({
        items: [
          {
            sys: { id: "1" },
            fields: {
              title: testTitle,
              body: { nodeType: "document", content: [] },
            },
          },
        ],
      });

      const post = await getBlogPostByTitle(testTitle);

      expect(client.getEntries).toHaveBeenCalledWith({
        content_type: "blogPage",
        "fields.title": testTitle,
        limit: 1,
      });
      expect(post).not.toBeNull();
      expect(post?.fields.title).toBe(testTitle);
    });

    it("should return null when post not found", async () => {
      // Mock empty response
      (client.getEntries as jest.Mock).mockResolvedValueOnce({
        items: [],
      });

      const post = await getBlogPostByTitle("Non-existent Post");

      expect(post).toBeNull();
    });
  });
});
