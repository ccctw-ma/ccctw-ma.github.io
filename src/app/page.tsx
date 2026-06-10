import Image from "next/image";
import Link from "next/link";
import { BIO_TIMELINE, HIGHLIGHTS, PROFILE, SOCIAL_LINKS } from "@/lib/profile";

export default function Home() {
  return (
    <main className="px-6 pt-28">
      <article className="mx-auto max-w-5xl">
        <section className="grid min-h-[62vh] items-center gap-10 md:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="mb-4 w-fit rounded-full border border-orange-300/30 bg-orange-400/10 px-4 py-2 text-xs font-black uppercase tracking-[0.35em] text-orange-200">
              Personal Website
            </p>
            <h1 className="text-5xl font-black leading-tight tracking-[-0.06em] text-zinc-50 md:text-7xl">
              Code, craft, and open-source notes from {PROFILE.handle}.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-400">
              {PROFILE.intro}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="rounded-full border border-zinc-700 px-4 py-2 text-sm font-bold text-zinc-200 hover:border-orange-300 hover:text-orange-200"
                >
                  {link.label}
                </a>
              ))}
              <Link
                href="/projects"
                className="rounded-full bg-orange-300 px-4 py-2 text-sm font-black text-zinc-950 hover:bg-orange-200"
              >
                View open-source projects
              </Link>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-sm rounded-[2rem] border border-white/10 bg-white/[0.03] p-4 shadow-2xl shadow-black/40">
            <div className="rounded-[1.5rem] border border-white/10 bg-zinc-950 p-6">
              <Image
                className="rounded-3xl border border-white/10"
                width={320}
                height={320}
                src={PROFILE.avatarUrl}
                alt="Ccctw Ma avatar"
                priority
              />
              <div className="mt-6">
                <h2 className="text-2xl font-black text-zinc-50">{PROFILE.name}</h2>
                <p className="mt-1 text-sm font-semibold text-orange-200">
                  {PROFILE.role}
                </p>
                <p className="mt-1 text-sm text-zinc-500">{PROFILE.location}</p>
              </div>
            </div>
          </div>
        </section>

        <section
          className="mt-14 grid gap-4 md:grid-cols-4"
          aria-label="Engineering highlights"
        >
          {HIGHLIGHTS.map((item) => (
            <div
              key={item}
              className="rounded-3xl border border-zinc-800 bg-zinc-950/70 p-5 text-sm font-bold leading-6 text-zinc-300"
            >
              {item}
            </div>
          ))}
        </section>

        <section className="mt-20 grid gap-10 md:grid-cols-[0.7fr_1.3fr]">
          <div>
            <h2 className="text-3xl font-black tracking-tight text-zinc-50">Bio</h2>
            <p className="mt-3 text-sm leading-6 text-zinc-500">
              A compact timeline from school to current engineering focus.
            </p>
          </div>
          <div className="space-y-4">
            {BIO_TIMELINE.map((item) => (
              <a
                key={item.year}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="grid gap-3 rounded-3xl border border-zinc-800 bg-zinc-950/60 p-5 hover:border-orange-300/60 md:grid-cols-[5rem_1fr]"
              >
                <span className="font-black text-orange-200">{item.year}</span>
                <span className="text-zinc-300">{item.text}</span>
              </a>
            ))}
          </div>
        </section>
      </article>
    </main>
  );
}
