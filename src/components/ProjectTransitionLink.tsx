"use client";

import { useRouter } from "next/navigation";
import { MouseEvent, useState } from "react";

type ProjectTransitionLinkProps = {
  href: string;
};

export default function ProjectTransitionLink({ href }: ProjectTransitionLinkProps) {
  const router = useRouter();
  const [isLeaving, setIsLeaving] = useState(false);

  function goToProjects(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    if (isLeaving) {
      return;
    }

    setIsLeaving(true);
    document.documentElement.classList.add("page-transition-out");
    window.setTimeout(() => {
      router.push(href);
      document.documentElement.classList.remove("page-transition-out");
    }, 420);
  }

  return (
    <>
      <a
        href={href}
        onClick={goToProjects}
        className={`project-cta group inline-flex items-center gap-3 rounded-full px-5 py-3 text-sm font-black text-zinc-950 ${
          isLeaving ? "project-cta-loading" : ""
        }`}
      >
        <span>
          <span className="i18n-en">View selected projects</span>
          <span className="i18n-zh">查看精选项目</span>
        </span>
        <span
          aria-hidden="true"
          className="project-cta-arrow grid h-7 w-7 place-items-center rounded-full bg-zinc-950 text-orange-200"
        >
          →
        </span>
      </a>
      {isLeaving ? (
        <div className="project-route-overlay" aria-hidden="true">
          <div className="project-route-orb" />
          <p>
            <span className="i18n-en">Opening selected projects</span>
            <span className="i18n-zh">正在打开精选项目</span>
          </p>
        </div>
      ) : null}
    </>
  );
}
