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
    }, 180);
  }

  return (
    <a
      href={href}
      onClick={goToProjects}
      className={`project-cta rounded-full bg-orange-300 px-4 py-2 text-sm font-black text-zinc-950 hover:bg-orange-200 ${
        isLeaving ? "project-cta-loading" : ""
      }`}
    >
      <span className="i18n-en">View selected projects</span>
      <span className="i18n-zh">查看精选项目</span>
    </a>
  );
}
