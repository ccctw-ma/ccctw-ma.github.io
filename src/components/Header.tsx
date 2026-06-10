import Link from "next/link";
import {
  IoDocumentText,
  IoHome,
  IoLayersSharp,
  IoLogoGithub,
} from "react-icons/io5/index.js";
import { PROFILE } from "@/lib/profile";

const navItems = [
  { label: "Blog", href: "/blog" },
  { label: "Projects", href: "/projects" },
];

export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-20 border-b border-white/5 bg-zinc-950/70 p-2 backdrop-blur-xl">
      <div className="mx-auto max-w-5xl">
        <nav
          className="hidden items-center gap-3 text-base md:flex"
          aria-label="Main navigation"
        >
          <Link
            href="/"
            className="rounded-full px-3 py-2 font-black tracking-tight text-zinc-50 hover:bg-white/5"
          >
            Ccctw Ma
          </Link>
          <div className="flex-1" />
          <div className="flex items-center gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full px-3 py-2 text-sm font-bold text-zinc-300 hover:bg-white/5 hover:text-orange-200"
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="flex-1" />
          <a
            href={PROFILE.sourceUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-bold text-zinc-300 hover:bg-white/5 hover:text-orange-200"
          >
            <IoLogoGithub aria-hidden="true" />
            Source
          </a>
        </nav>
        <nav
          className="flex items-center justify-between px-6 py-2 text-lg md:hidden"
          aria-label="Mobile navigation"
        >
          <div className="flex gap-5">
            <Link href="/" aria-label="Home">
              <IoHome />
            </Link>
            <Link href="/blog" aria-label="Blog">
              <IoDocumentText />
            </Link>
            <Link href="/projects" aria-label="Projects">
              <IoLayersSharp />
            </Link>
          </div>
          <a
            href={PROFILE.githubUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
          >
            <IoLogoGithub />
          </a>
        </nav>
      </div>
    </header>
  );
}
