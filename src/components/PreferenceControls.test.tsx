import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import PreferenceControls from "./PreferenceControls";

describe("PreferenceControls", () => {
  it("toggles language and theme preferences with localStorage persistence", async () => {
    const user = userEvent.setup();
    render(<PreferenceControls />);

    expect(document.documentElement.dataset.lang).toBe("en");
    expect(document.documentElement.dataset.theme).toBe("light");

    await user.click(screen.getByRole("button", { name: "Toggle language" }));
    expect(document.documentElement.dataset.lang).toBe("zh");
    expect(window.localStorage.getItem("ccctw-lang")).toBe("zh");

    await user.click(screen.getByRole("button", { name: "Toggle color theme" }));
    expect(document.documentElement.dataset.theme).toBe("dark");
    expect(window.localStorage.getItem("ccctw-theme")).toBe("dark");
  });

  it("loads stored preferences and toggles back to English and light", async () => {
    window.localStorage.setItem("ccctw-lang", "zh");
    window.localStorage.setItem("ccctw-theme", "dark");
    const user = userEvent.setup();

    render(<PreferenceControls />);

    await user.click(screen.getByRole("button", { name: "Toggle language" }));
    await user.click(screen.getByRole("button", { name: "Toggle color theme" }));

    expect(document.documentElement.dataset.lang).toBe("en");
    expect(document.documentElement.dataset.theme).toBe("light");
  });

  it("defaults to light even when the system prefers dark", () => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: vi.fn(() => ({
        matches: false,
        media: "(prefers-color-scheme: dark)",
        onchange: null,
        addListener: () => undefined,
        removeListener: () => undefined,
        addEventListener: () => undefined,
        removeEventListener: () => undefined,
        dispatchEvent: () => false,
      })),
    });

    render(<PreferenceControls />);

    expect(document.documentElement.dataset.theme).toBe("light");
  });
});
