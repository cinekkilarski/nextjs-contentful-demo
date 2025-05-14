import { render, screen } from "@testing-library/react";
import BlogPage from "@/app/blog/page";
import { getBlogPosts } from "@/lib/contentful/queries";

// Mock the contentful queries
jest.mock("@/lib/contentful/queries", () => ({
  getBlogPosts: jest.fn(),
}));

// Mock PageTransition component
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

describe("BlogPage", () => {
  it("should render a message when no posts are available", async () => {
    // Mock empty posts array
    (getBlogPosts as jest.Mock).mockResolvedValue([]);

    // Render the blog page (with await since it's an async component)
    const BlogPageComponent = await BlogPage();
    render(BlogPageComponent);

    expect(screen.getByText(/No blog posts found/i)).toBeInTheDocument();
  });

  it("should render posts when available", async () => {
    // Mock posts data
    const mockPosts = [
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
    ];

    (getBlogPosts as jest.Mock).mockResolvedValue(mockPosts);

    // Render the blog page (with await since it's an async component)
    const BlogPageComponent = await BlogPage();
    render(BlogPageComponent);

    expect(screen.getByText("Test Post 1")).toBeInTheDocument();
    expect(screen.getByText("Test Post 2")).toBeInTheDocument();
    expect(screen.getAllByText(/Read more/i)).toHaveLength(2);
  });
});
