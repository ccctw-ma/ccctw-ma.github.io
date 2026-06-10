import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Footer from "./Footer";

describe("Footer", () => {
  it("renders profile ownership and stack summary", () => {
    render(<Footer />);

    expect(screen.getByRole("link", { name: "ccctw-ma" })).toHaveAttribute(
      "href",
      "https://github.com/ccctw-ma",
    );
    expect(
      screen.getByText(/Built with Next.js, MDX, Vitest, and GitHub Pages/),
    ).toBeInTheDocument();
  });
});
