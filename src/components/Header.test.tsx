import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Header from "./Header";

describe("Header", () => {
  it("renders desktop and mobile navigation with source links", () => {
    render(<Header />);

    expect(
      screen.getByRole("navigation", { name: "Main navigation" }),
    ).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Blog" })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Projects" })).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Source" })).toHaveAttribute(
      "href",
      "https://github.com/ccctw-ma/ccctw-ma.github.io",
    );
    expect(
      screen.getByRole("navigation", { name: "Mobile navigation" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "GitHub" })).toHaveAttribute(
      "href",
      "https://github.com/ccctw-ma",
    );
    expect(screen.getAllByRole("button", { name: "Toggle language" })).toHaveLength(2);
    expect(screen.getAllByRole("button", { name: "Toggle color theme" })).toHaveLength(2);
  });
});
