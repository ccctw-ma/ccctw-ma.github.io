import Link from "next/link";
import { IoHome, IoLogoGithub } from "react-icons/io5/index.js";
import { PROFILE } from "@/lib/profile";
import PreferenceControls from "./PreferenceControls";

export default function Header() {
  return (
    <header className="site-header fixed inset-x-0 top-0 z-20 border-b p-2 backdrop-blur-xl">
      <div className="mx-auto max-w-5xl">
        <nav
          className="hidden items-center gap-3 text-base md:flex"
          aria-label="Main navigation"
        >
          <Link
            href="/"
            className="text-main rounded-full px-3 py-2 font-black tracking-tight hover:bg-black/5 dark:hover:bg-white/5"
          >
            Ccctw Ma
          </Link>
          <div className="flex-1" />
          <a
            href={PROFILE.sourceUrl}
            target="_blank"
            rel="noreferrer"
            className="text-muted hover:text-accent inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-bold hover:bg-black/5 dark:hover:bg-white/5"
          >
            <IoLogoGithub aria-hidden="true" />
            Source
          </a>
          <PreferenceControls />
        </nav>
        <nav
          className="flex items-center justify-between px-6 py-2 text-lg md:hidden"
          aria-label="Mobile navigation"
        >
          <div className="flex gap-5 text-main">
            <Link href="/" aria-label="Home">
              <IoHome />
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <PreferenceControls />
            <a
              href={PROFILE.githubUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="text-main"
            >
              <IoLogoGithub />
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
