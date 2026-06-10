import { describe, expect, it } from "vitest";
import { BIO_TIMELINE, HIGHLIGHTS, PROFILE, SOCIAL_LINKS } from "./profile";

describe("profile content", () => {
  it("keeps source, navigation, and biography data consistent", () => {
    expect(PROFILE.handle).toBe("ccctw-ma");
    expect(PROFILE.githubUrl).toBe("https://github.com/ccctw-ma");
    expect(PROFILE.sourceUrl).toContain("ccctw-ma.github.io");
    expect(HIGHLIGHTS).toHaveLength(4);
    expect(SOCIAL_LINKS.map((link) => link.label)).toEqual([
      "GitHub",
      "Blog",
      "Projects",
    ]);
    expect(BIO_TIMELINE.at(-1)).toMatchObject({
      year: "Now",
      href: PROFILE.githubUrl,
    });
  });
});
