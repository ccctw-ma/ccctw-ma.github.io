import Image from "next/image";
import Link from "next/link";
import { BIO_TIMELINE, PROFILE, SOCIAL_LINKS } from "@/lib/profile";

export default function Home() {
  return (
    <main className="px-6 pt-28">
      <article className="mx-auto max-w-5xl">
        <section className="grid min-h-[58vh] items-center gap-10 md:grid-cols-[1.15fr_0.85fr]">
          <div className="site-card rounded-[2rem] border p-6 md:p-8">
            <p className="accent-pill mb-5 w-fit rounded-full border px-4 py-2 text-xs font-black uppercase tracking-[0.35em]">
              <span className="i18n-en">Personal Website</span>
              <span className="i18n-zh">个人主页</span>
            </p>
            <h1 className="text-main max-w-3xl text-4xl font-black leading-[0.98] tracking-[-0.055em] md:text-6xl">
              <span className="i18n-en">A short self introduction of me.</span>
              <span className="i18n-zh">关于我的简短自我介绍。</span>
            </h1>
            <p className="text-muted mt-6 max-w-2xl text-base font-bold leading-8 md:text-lg">
              <span className="i18n-en">{PROFILE.intro}</span>
              <span className="i18n-zh block">{PROFILE.introZh}</span>
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-main hover:text-accent rounded-full border border-[var(--border)] bg-[var(--surface-strong)] px-4 py-2 text-sm font-bold"
                >
                  {link.label}
                </a>
              ))}
              <Link
                href="/projects"
                className="rounded-full bg-orange-300 px-4 py-2 text-sm font-black text-zinc-950 hover:bg-orange-200"
              >
                <span className="i18n-en">View selected projects</span>
                <span className="i18n-zh">查看精选项目</span>
              </Link>
            </div>
          </div>
          <div className="site-card relative mx-auto w-full max-w-sm rounded-[2rem] border p-4 shadow-2xl shadow-black/20">
            <div className="site-card-strong rounded-[1.5rem] border p-6">
              <Image
                className="rounded-3xl border border-white/10"
                width={320}
                height={320}
                src={PROFILE.avatarUrl}
                alt="Ccctw Ma avatar"
                priority
              />
              <div className="mt-6">
                <h2 className="text-main text-2xl font-black">{PROFILE.name}</h2>
                <p className="text-accent mt-1 text-sm font-semibold">{PROFILE.role}</p>
                <p className="text-subtle mt-1 text-sm">{PROFILE.location}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-20 grid gap-10 md:grid-cols-[0.7fr_1.3fr]">
          <div>
            <h2 className="text-main text-3xl font-black tracking-tight">Bio</h2>
            <p className="text-muted mt-3 text-sm leading-6">
              <span className="i18n-en">Resume</span>
              <span className="i18n-zh">履历</span>
            </p>
          </div>
          <div className="relative space-y-5 pl-7 before:absolute before:left-2 before:top-4 before:h-[calc(100%-2rem)] before:w-px before:bg-[var(--border)]">
            {BIO_TIMELINE.map((item) => (
              <a
                key={item.year}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="site-card relative block rounded-3xl border p-5 transition duration-200 hover:-translate-y-0.5 hover:border-orange-300/60"
              >
                <span className="absolute -left-[1.68rem] top-7 h-4 w-4 rounded-full border-2 border-[var(--accent)] bg-[var(--bg)] shadow-[0_0_0_6px_var(--bg)]" />
                <div className="grid gap-3 md:grid-cols-[5rem_1fr] md:items-start">
                  <span className="text-accent font-black">{item.year}</span>
                  <span className="text-main leading-7">
                    <span className="i18n-en">{item.text}</span>
                    <span className="i18n-zh">{item.textZh}</span>
                  </span>
                </div>
              </a>
            ))}
          </div>
        </section>
      </article>
    </main>
  );
}
