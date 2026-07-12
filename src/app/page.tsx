import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Brain,
  Calendar,
  Cpu,
  Globe,
  HeartHandshake,
  MapPin,
  Microscope,
  Orbit,
  Quote,
  Scale,
  Sparkles,
  Users,
} from "lucide-react";

import contentData from "../../public/config/content.json";
import { getAssetPath } from "@/lib/utils";

type IconName =
  | "Users"
  | "Calendar"
  | "Sparkles"
  | "Brain"
  | "HeartHandshake"
  | "Globe"
  | "Microscope"
  | "Scale";

const iconMap: Record<IconName, React.ComponentType<{ className?: string }>> = {
  Users,
  Calendar,
  Sparkles,
  Brain,
  HeartHandshake,
  Globe,
  Microscope,
  Scale,
};

export default function Home() {
  const {
    hero,
    marquee,
    groupOverview,
    professor,
    researchDomains,
    about,
    pillars,
  } = contentData;

  return (
    <main className="bg-background">
      {/* HERO — editorial split, mono meta strip, generous whitespace */}
      <section className="border-b border-border">
        <div className="mx-auto w-full max-w-6xl px-5 pt-16 pb-20 sm:px-8 sm:pt-24 sm:pb-28">
          {/* Meta strip */}
          <div className="mb-12 flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-border pb-4 sm:mb-16">
            <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              <Orbit className="size-3 text-primary" />
              {hero.badge}
            </span>
            <span className="hidden h-3 w-px bg-border sm:block" />
            <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              <MapPin className="size-3 text-primary" />
              {hero.locationChip}
            </span>
            <span className="hidden h-3 w-px bg-border sm:block" />
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              Vol. 01 · 2026
            </span>
          </div>

          {/* Headline + lede */}
          <div className="grid gap-12 md:gap-16 lg:grid-cols-12 lg:gap-20">
            <div className="lg:col-span-8">
              <h1 className="font-heading text-[clamp(2.5rem,5.4vw,5rem)] font-medium leading-[1.02] tracking-[-0.035em] text-foreground">
                <span className="block">Utilizing human values,</span>
                <span className="block italic text-muted-foreground">
                  situated knowledge,
                </span>
                <span className="block">and lived experiences.</span>
              </h1>
            </div>

            <aside className="space-y-8 lg:col-span-4 lg:pt-3">
              <p className="text-pretty text-base leading-7 text-muted-foreground">
                {hero.subParagraph}
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href="#about-group"
                  className="inline-flex items-center gap-2 rounded-md bg-foreground px-4 py-2.5 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
                >
                  {hero.primaryActionText}
                  <ArrowRight className="size-3.5" />
                </Link>
                <Link
                  href="/team"
                  className="inline-flex items-center gap-2 px-1 py-2.5 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground"
                >
                  {hero.secondaryActionText}
                  <ArrowUpRight className="size-3" />
                </Link>
              </div>
            </aside>
          </div>

          {/* Plate — single photograph, no chrome */}
          <figure className="mt-16 grid gap-6 sm:mt-20 md:grid-cols-12">
            <div className="md:col-span-7">
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                  src={getAssetPath(hero.groupPhotoPath)}
                  alt={hero.groupPhotoAlt}
                  fill
                  priority
                  sizes="(min-width: 768px) 60vw, 100vw"
                  className="object-cover grayscale-[8%]"
                />
              </div>
              <figcaption className="mt-3 flex items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                <span>Fig. 01 · {hero.groupPhotoAlt}</span>
                <span>{hero.locationChip}</span>
              </figcaption>
            </div>

            <div className="md:col-span-5 md:pl-2 md:pt-1">
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary">
                {hero.researchPostureLabel}
              </span>
              <p className="mt-3 font-heading text-2xl font-medium leading-snug tracking-[-0.025em] text-foreground sm:text-3xl">
                {hero.researchPostureBody}
              </p>
              <dl className="mt-8 grid grid-cols-2 gap-6 border-t border-border pt-6">
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                    {hero.methodsLabel}
                  </dt>
                  <dd className="mt-2 text-sm font-medium leading-snug text-foreground">
                    {hero.methodsValue}
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                    {hero.focusLabel}
                  </dt>
                  <dd className="mt-2 text-sm font-medium leading-snug text-foreground">
                    {hero.focusValue}
                  </dd>
                </div>
              </dl>
            </div>
          </figure>
        </div>

        {/* Marquee keyword band — kept, restrained */}
        <div className="overflow-hidden border-y border-border">
          <div className="flex w-max animate-marquee">
            {[...marquee.keywords, ...marquee.keywords].map((keyword, i) => (
              <div
                key={i}
                className="flex items-center gap-4 px-6 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground whitespace-nowrap"
              >
                <span>{keyword}</span>
                <span aria-hidden className="h-1 w-1 rounded-full bg-primary/40" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GROUP OVERVIEW — wide editorial block, hairline-bordered, professor profile alongside */}
      <section
        id="about-group"
        className="scroll-mt-24 border-b border-border"
      >
        <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
          <div className="mb-10 flex items-baseline justify-between gap-6 border-b border-border pb-4">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              01 · {groupOverview.eyebrow}
            </span>
            <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              <span aria-hidden className="size-1.5 rounded-full bg-emerald-500" />
              {groupOverview.locationChip}
            </span>
          </div>

          <div className="grid gap-12 md:gap-16 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <h2 className="font-heading text-3xl font-medium leading-[1.1] tracking-[-0.03em] text-foreground sm:text-4xl md:text-5xl">
                {groupOverview.headline}
              </h2>
              <p className="mt-8 max-w-2xl text-pretty text-base leading-7 text-muted-foreground">
                {groupOverview.body.split(professor.name)[0]}
                <a
                  href={professor.website}
                  target="_blank"
                  rel="noreferrer"
                  className="text-foreground underline decoration-primary/40 decoration-1 underline-offset-[5px] transition-colors hover:decoration-primary"
                  aria-label={`Visit ${professor.name}'s website`}
                >
                  {professor.name}
                </a>
                {groupOverview.body.split(professor.name)[1]}
              </p>

              {/* Focus index — hairline list, no cards */}
              <ol className="mt-12 border-t border-border">
                {groupOverview.focusCards.map((item, index) => {
                  const Icon =
                    iconMap[item.icon as IconName] ?? iconMap.Globe;
                  return (
                    <li
                      key={item.title}
                      className="group/focus border-b border-border"
                    >
                      <div className="grid gap-4 py-5 sm:grid-cols-12 sm:items-baseline sm:gap-6 sm:py-6">
                        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground sm:col-span-1">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <div className="flex items-start gap-3 sm:col-span-11 sm:gap-4">
                          <Icon className="mt-0.5 size-4 shrink-0 text-primary" />
                          <div className="flex-1">
                            <h3 className="font-heading text-base font-medium tracking-[-0.015em] text-foreground">
                              {item.title}
                              <span className="ml-2 font-mono text-[10px] font-normal uppercase tracking-[0.18em] text-muted-foreground">
                                · {item.label}
                              </span>
                            </h3>
                            <p className="mt-1.5 max-w-prose text-sm leading-6 text-muted-foreground">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>

            <aside className="lg:col-span-4 lg:pl-2">
              <div className="lg:sticky lg:top-28">
                <a
                  href={professor.website}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Visit ${professor.name}'s website`}
                  className="group/profile block"
                >
                  <div className="relative aspect-[3/4] w-full overflow-hidden bg-muted">
                    <Image
                      src={getAssetPath(professor.imagePath)}
                      alt={professor.name}
                      fill
                      sizes="(min-width: 1024px) 33vw, 100vw"
                      className="object-cover grayscale transition-[filter] duration-500 group-hover/profile:grayscale-0"
                    />
                  </div>
                  <p className="mt-3 flex items-center justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                    <span>Fig. 02 · {professor.name}</span>
                    <ArrowUpRight className="size-3 transition-transform group-hover/profile:-translate-y-0.5 group-hover/profile:translate-x-0.5" />
                  </p>
                  <div className="mt-4 space-y-1.5 border-t border-border pt-4">
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                      {professor.title}
                    </p>
                    <p className="font-heading text-lg font-medium tracking-[-0.02em] text-foreground">
                      {professor.name}
                    </p>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {professor.department}, {professor.institution}.
                      <br />
                      {professor.role}.
                    </p>
                  </div>
                </a>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ABOUT THE GROUP — quote, hairline-left accent */}
      {about && (
        <section className="border-b border-border bg-muted/30">
          <div className="mx-auto w-full max-w-5xl px-5 py-20 sm:px-8 sm:py-28">
            <div className="flex items-center gap-3 border-b border-border pb-4">
              <Quote className="size-4 text-primary" />
              <h2 className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                02 · {about.title}
              </h2>
            </div>
            <p className="mt-10 max-w-3xl border-l border-primary pl-6 font-heading text-2xl font-medium leading-snug tracking-[-0.025em] text-foreground sm:text-3xl">
              {about.body}
            </p>
            {(about as { ctaLabel?: string; ctaHref?: string }).ctaLabel && (
              <Link
                href={(about as { ctaHref?: string }).ctaHref ?? "/about"}
                className="group mt-10 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-foreground transition-colors hover:text-primary"
              >
                {(about as { ctaLabel?: string }).ctaLabel}
                <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
              </Link>
            )}
          </div>
        </section>
      )}

      {/* RESEARCH DOMAINS — clean 2-col index, hairline rules, no bento */}
      <section className="border-b border-border">
        <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
          <div className="mb-10 flex items-baseline justify-between gap-6 border-b border-border pb-4">
            <div className="flex items-center gap-2">
              <Cpu className="size-3.5 text-primary" />
              <h2 className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                03 · {researchDomains.sectionLabel}
              </h2>
            </div>
            <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              <span aria-hidden className="size-1.5 rounded-full bg-emerald-500" />
              {researchDomains.statusLabel}
            </span>
          </div>

          <ul className="grid gap-x-12 gap-y-0 sm:grid-cols-2 md:gap-x-16">
            {researchDomains.items.map((item, index) => {
              const Icon = iconMap[item.icon as IconName] ?? iconMap.Globe;
              return (
                <li
                  key={item.title}
                  className="group/dom border-b border-border py-7 first:border-t first:border-border sm:py-8"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <Icon className="mt-1 size-4 shrink-0 text-primary" />
                      <div>
                        <h3 className="font-heading text-lg font-medium tracking-[-0.02em] text-foreground">
                          {item.title}
                        </h3>
                        <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                    </div>
                    <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* PILLARS — three columns, hairline borders, no shadows */}
      <section>
        <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
          <div className="mb-12 border-b border-border pb-4">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              04 · Three pillars
            </span>
          </div>

          <div className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
            {pillars.map((pillar, index) => {
              const Icon =
                iconMap[pillar.icon as IconName] ?? iconMap.Sparkles;
              return (
                <article
                  key={pillar.id}
                  className="bg-background p-8 transition-colors hover:bg-muted/40 sm:p-10"
                >
                  <div className="flex items-center justify-between">
                    <Icon className="size-4 text-primary" />
                    <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-10 font-heading text-xl font-medium tracking-[-0.02em] text-foreground">
                    {pillar.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    {pillar.body}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
