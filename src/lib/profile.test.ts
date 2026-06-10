import { describe, expect, it } from "vitest";
import { BIO_TIMELINE, PROFILE, SOCIAL_LINKS } from "./profile";

describe("profile content", () => {
  it("keeps source, navigation, and biography data consistent", () => {
    expect(PROFILE.handle).toBe("ccctw-ma");
    expect(PROFILE.role).toBe("Frontend Engineer at ByteDance Douyin");
    expect(PROFILE.githubUrl).toBe("https://github.com/ccctw-ma");
    expect(PROFILE.sourceUrl).toContain("ccctw-ma.github.io");
    expect(PROFILE.introZh).toContain("我是一名全栈工程师");
    expect(SOCIAL_LINKS.map((link) => link.label)).toEqual(["GitHub", "Projects"]);
    expect(BIO_TIMELINE.map((item) => item.year)).toEqual([
      "1999",
      "2017",
      "2021",
      "2024",
      "Now",
    ]);
    expect(BIO_TIMELINE.at(-2)).toMatchObject({
      year: "2024",
      href: "https://www.bupt.edu.cn/",
    });
    expect(BIO_TIMELINE.at(-1)).toMatchObject({
      year: "Now",
      href: "https://www.douyin.com/",
    });
    expect(BIO_TIMELINE.at(-1)?.textZh).toContain("抖音部门工作");
  });
});
