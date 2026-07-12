import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import contentData from "../../../public/config/content.json";

export const metadata: Metadata = {
  title: contentData.aboutPage.pageTitle,
  description: contentData.aboutPage.subhead,
};

export default function AboutPage() {
  const { aboutPage, researchLabs, campuses } = contentData;

  return (
    <main className="bg-background">
      {/* Hero */}
      <section className="mx-auto w-full max-w-4xl px-6 pt-16 pb-12 sm:pt-24">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
          {aboutPage.eyebrow}
        </p>
        <h1 className="mt-3 font-heading text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          {aboutPage.headline}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
          {aboutPage.subhead}
        </p>
      </section>

      {/* Mission */}
      <section className="mx-auto w-full max-w-4xl px-6 py-10">
        <div className="flex items-baseline gap-4">
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            01
          </span>
          <h2 className="font-heading text-2xl font-semibold text-foreground">
            {aboutPage.missionTitle}
          </h2>
        </div>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          {aboutPage.missionBody}
        </p>
      </section>

      {/* Approach */}
      <section className="mx-auto w-full max-w-6xl px-6 py-10">
        <div className="mx-auto mb-8 max-w-4xl">
          <div className="flex items-baseline gap-4">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              02
            </span>
            <h2 className="font-heading text-2xl font-semibold text-foreground">
              {aboutPage.approachTitle}
            </h2>
          </div>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            {aboutPage.approachBody}
          </p>
        </div>
        {aboutPage.approachItems && aboutPage.approachItems.length > 0 && (
          <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-3">
            {aboutPage.approachItems.map((item, i) => (
              <article
                key={`${item.title}-${i}`}
                className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
              >
                <span
                  aria-hidden
                  className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-heading text-base font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {item.body}
                </p>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Story */}
      <section className="mx-auto w-full max-w-4xl px-6 py-10">
        <div className="flex items-baseline gap-4">
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            03
          </span>
          <h2 className="font-heading text-2xl font-semibold text-foreground">
            {aboutPage.storyTitle}
          </h2>
        </div>
        <p className="mt-4 whitespace-pre-line text-base leading-relaxed text-muted-foreground">
          {aboutPage.storyBody}
        </p>
      </section>

      {/* Related links */}
      <section className="mx-auto w-full max-w-6xl px-6 py-12">
        <div className="grid gap-8 sm:grid-cols-2">
          <div>
            <h3 className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              {researchLabs.title}
            </h3>
            <ul className="mt-4 divide-y divide-border rounded-2xl border border-border bg-card">
              {researchLabs.items.map((item, i) => (
                <li key={`${item.name}-${i}`} className="px-4 py-3">
                  {item.url ? (
                    <Link
                      href={item.url}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex items-center justify-between gap-3 text-sm text-foreground transition-colors hover:text-primary"
                    >
                      <span>{item.name}</span>
                      <ArrowUpRight className="size-3.5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                    </Link>
                  ) : (
                    <span className="text-sm text-muted-foreground">
                      {item.name}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              {campuses.title}
            </h3>
            <ul className="mt-4 divide-y divide-border rounded-2xl border border-border bg-card">
              {campuses.items.map((item, i) => (
                <li key={`${item.name}-${i}`} className="px-4 py-3">
                  <Link
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center justify-between gap-3 text-sm text-foreground transition-colors hover:text-primary"
                  >
                    <span>{item.name}</span>
                    <ArrowUpRight className="size-3.5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
