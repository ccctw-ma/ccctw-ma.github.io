import Image from "next/image";
import ProjectTransitionLink from "@/components/ProjectTransitionLink";
import { BIO_TIMELINE, PROFILE } from "@/lib/profile";

export default function Home() {
  return (
    <main className="relative overflow-hidden px-6 pt-28">
      <div className="hero-ambient" aria-hidden="true" />
      <article className="mx-auto max-w-5xl">
        <section className="relative grid min-h-[58vh] items-center gap-10 md:grid-cols-[1.12fr_0.88fr]">
          <div className="hero-panel rounded-[2.25rem] border p-6 md:p-9">
            <p className="accent-pill mb-5 w-fit rounded-full border px-4 py-2 text-xs font-black uppercase tracking-[0.35em]">
              <span className="i18n-en">Personal Website</span>
              <span className="i18n-zh">个人主页</span>
            </p>
            <h1 className="hero-title text-main max-w-3xl text-4xl font-black leading-[0.96] tracking-[-0.065em] md:text-6xl">
              <span className="i18n-en">A short self introduction of me.</span>
              <span className="i18n-zh">关于我的简短自我介绍。</span>
            </h1>
            <p className="text-muted mt-6 max-w-2xl text-base font-bold leading-8 md:text-lg">
              <span className="i18n-en">{PROFILE.intro}</span>
              <span className="i18n-zh block">{PROFILE.introZh}</span>
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ProjectTransitionLink href="/projects" />
            </div>
          </div>
          <div className="profile-showcase relative mx-auto w-full max-w-sm rounded-[2.5rem] border p-5">
            <Image
              className="profile-image rounded-[1.75rem]"
              width={320}
              height={320}
              src={PROFILE.avatarUrl}
              alt="Ccctw Ma avatar"
              priority
            />
            <div className="profile-meta mt-6 rounded-[1.5rem] p-4">
              <h2 className="text-main text-2xl font-black tracking-[-0.04em]">
                {PROFILE.name}
              </h2>
              <p className="text-accent mt-1 text-sm font-black">{PROFILE.role}</p>
              <p className="text-subtle mt-1 text-sm font-semibold">{PROFILE.location}</p>
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
