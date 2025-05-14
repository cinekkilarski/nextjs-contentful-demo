import { render, screen } from "@testing-library/react";
import BlogPostPage from "@/app/blog/[slug]/page";
import { getBlogPostByTitle } from "@/lib/contentful/queries";
import { notFound } from "next/navigation";

// Mock notFound
jest.mock("next/navigation", () => ({
  notFound: jest.fn(),
  usePathname: jest.fn(() => "/blog/test-post"),
}));

// Mock the contentful queries
jest.mock("@/lib/contentful/queries", () => ({
  getBlogPosts: jest.fn(),
  getBlogPostByTitle: jest.fn(),
}));

// Mock components
jest.mock("@/components", () => ({
  PageTransition: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
  AnimatedImage: (props: {
    src: string;
    alt: string;
    fill?: boolean;
    style?: React.CSSProperties;
  }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={props.src} alt={props.alt} />
  ),
  LikeButton: () => <div data-testid="like-button">Like Button</div>,
}));

// Mock next/image
jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ src, alt }: { src: string; alt: string }) => (
    <img src={src} alt={alt} />
  ),
}));

// Mock next/link
jest.mock("next/link", () => ({
  __esModule: true,
  default: ({
    href,
    children,
  }: {
    href: string;
    children: React.ReactNode;
  }) => <a href={href}>{children}</a>,
}));

// Mock React components from contentful
jest.mock("@contentful/rich-text-react-renderer", () => ({
  documentToReactComponents: jest.fn(() => <div>Rendered Content</div>),
}));

describe("BlogPostPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should call notFound when no post is found", async () => {
    // Mock returning null (no post found)
    (getBlogPostByTitle as jest.Mock).mockResolvedValue(null);

    try {
      await BlogPostPage({ params: { slug: "non-existent-post" } });
    } catch {
      // This is expected since notFound() will throw an error in the test environment
    }

    expect(notFound).toHaveBeenCalled();
  });

  it("should render a blog post when found", async () => {
    // Mock post data with complete structure
    const mockPost = {
      sys: { id: "1" },
      fields: {
        title: "Test Post Title",
        body: {
          nodeType: "document",
          content: [{ nodeType: "paragraph", content: [] }],
        },
        image: {
          fields: {
            file: {
              url: "/test-image.jpg",
              details: {
                size: 1000,
                image: {
                  width: 800,
                  height: 600,
                },
              },
              fileName: "test-image.jpg",
              contentType: "image/jpeg",
            },
            title: "Test Image",
            description: "Test image description",
          },
        },
      },
    };

    (getBlogPostByTitle as jest.Mock).mockResolvedValue(mockPost);

    // Render the blog post page
    const PostPageComponent = await BlogPostPage({
      params: { slug: "test-post-title" },
    });
    render(PostPageComponent);

    // Check that the title is rendered
    expect(screen.getByText("Test Post Title")).toBeInTheDocument();

    // Check for back link
    expect(screen.getByText("← Back to Blog")).toBeInTheDocument();

    // Check that the like button is rendered
    expect(screen.getByTestId("like-button")).toBeInTheDocument();
  });
});
