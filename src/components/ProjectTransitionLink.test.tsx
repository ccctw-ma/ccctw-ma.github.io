import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import ProjectTransitionLink from "./ProjectTransitionLink";

const push = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push }),
}));

describe("ProjectTransitionLink", () => {
  it("applies a soft page transition before navigating", () => {
    const setTimeoutSpy = vi
      .spyOn(window, "setTimeout")
      .mockImplementation((callback: TimerHandler) => {
        if (typeof callback === "function") {
          callback();
        }
        return 0 as unknown as ReturnType<typeof window.setTimeout>;
      });

    render(<ProjectTransitionLink href="/projects" />);

    fireEvent.click(screen.getByRole("link", { name: /View selected projects/ }));

    expect(screen.getByText("Opening selected projects")).toBeInTheDocument();
    expect(push).toHaveBeenCalledWith("/projects");
    expect(document.documentElement).not.toHaveClass("page-transition-out");
    expect(setTimeoutSpy).toHaveBeenCalledWith(expect.any(Function), 420);
    setTimeoutSpy.mockRestore();
  });
});
