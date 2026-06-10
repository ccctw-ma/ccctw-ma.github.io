import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import PreferenceControls from "./PreferenceControls";

describe("PreferenceControls", () => {
  it("toggles language and theme preferences with localStorage persistence", async () => {
    const user = userEvent.setup();
    render(<PreferenceControls />);

    await user.click(screen.getByRole("button", { name: "Toggle language" }));
    expect(document.documentElement.dataset.lang).toBe("zh");
    expect(window.localStorage.getItem("ccctw-lang")).toBe("zh");

    await user.click(screen.getByRole("button", { name: "Toggle color theme" }));
    expect(document.documentElement.dataset.theme).toBe("light");
    expect(window.localStorage.getItem("ccctw-theme")).toBe("light");
  });
});
