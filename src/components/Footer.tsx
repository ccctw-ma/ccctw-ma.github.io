import { PROFILE } from "@/lib/profile";

export default function Footer() {
  return (
    <footer className="mx-auto mt-24 max-w-5xl px-6 py-10 text-center text-sm text-zinc-500">
      <a
        href={PROFILE.githubUrl}
        className="font-bold text-zinc-300 hover:text-orange-200"
      >
        {PROFILE.handle}
      </a>{" "}
      © {new Date().getFullYear()} · Built with Next.js, MDX, Vitest, and GitHub Pages.
    </footer>
  );
}
