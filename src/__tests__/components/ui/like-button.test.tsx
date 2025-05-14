import { render, screen, fireEvent } from "@testing-library/react";
import { LikeButton } from "@/components";

describe("LikeButton component", () => {
  it("renders a like button with initial count of 0", () => {
    render(<LikeButton />);

    const button = screen.getByRole("button", {
      name: "Like this post (currently 0 likes)",
    });
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Like (0)");
  });

  it("increments like count when clicked", () => {
    render(<LikeButton />);

    const button = screen.getByRole("button", {
      name: "Like this post (currently 0 likes)",
    });
    fireEvent.click(button);

    const updatedButton = screen.getByRole("button", {
      name: "Like this post (currently 1 likes)",
    });
    expect(updatedButton).toBeInTheDocument();
    expect(updatedButton).toHaveTextContent("Like (1)");
  });

  it("shows thank you message after receiving likes", () => {
    render(<LikeButton />);

    // Initially, the thank you message should not be visible
    expect(screen.queryByText(/Thanks for the/i)).not.toBeInTheDocument();

    // Click the like button
    const button = screen.getByRole("button", {
      name: "Like this post (currently 0 likes)",
    });
    fireEvent.click(button);

    // Now the thank you message should be visible with singular form
    expect(screen.getByText(/Thanks for the 1 like!/i)).toBeInTheDocument();

    // Click again to see plural form
    fireEvent.click(button);
    expect(screen.getByText(/Thanks for the 2 likes!/i)).toBeInTheDocument();
  });
});
