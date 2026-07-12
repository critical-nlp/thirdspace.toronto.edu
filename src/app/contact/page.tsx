import Link from "next/link";
import { Mail, MapPin } from "lucide-react";
import type { Metadata } from "next";
import contentData from "../../../public/config/content.json";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

export const metadata: Metadata = {
  title: contentData.contact.pageTitle,
  description: contentData.contact.headline,
};

export default function ContactPage() {
  const { contact, location, socials } = contentData;

  return (
    <main className="bg-background">
      {/* Hero */}
      <section className="mx-auto w-full max-w-4xl px-6 pt-16 pb-12 sm:pt-24">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
          {contact.eyebrow}
        </p>
        <h1 className="mt-3 font-heading text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          {contact.headline}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
          {contact.body}
        </p>
      </section>

      {/* Direct contact + Office */}
      <section className="mx-auto grid w-full max-w-6xl gap-6 px-6 py-8 sm:grid-cols-2">
        {/* Email card */}
        <article className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
          <div className="flex size-10 items-center justify-center rounded-md bg-primary/10 text-primary ring-1 ring-primary/20">
            <Mail className="size-4" />
          </div>
          <div>
            <h2 className="font-heading text-base font-semibold text-foreground">
              {contact.emailLabel}
            </h2>
            <Link
              href={`mailto:${socials.email}`}
              className="mt-2 inline-block font-mono text-sm text-primary underline decoration-primary/30 underline-offset-4 transition-colors hover:decoration-primary"
            >
              {socials.email}
            </Link>
          </div>
        </article>

        {/* Office card */}
        <HoverCard openDelay={150} closeDelay={150}>
          <HoverCardTrigger asChild>
            <article className="flex cursor-pointer flex-col gap-4 rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
              <div className="flex size-10 items-center justify-center rounded-md bg-primary/10 text-primary ring-1 ring-primary/20">
                <MapPin className="size-4" />
              </div>
              <div>
                <h2 className="font-heading text-base font-semibold text-foreground">
                  Office
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-foreground">
                  {location.institution}
                </p>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {location.title}
                </p>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {location.street}
                </p>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {location.cityCountry}
                </p>
              </div>
            </article>
          </HoverCardTrigger>
          <HoverCardContent className="w-80 overflow-hidden p-0">
            <iframe
              title={`Map of ${location.title}`}
              src={`https://maps.google.com/maps?q=${location.mapsQuery}&hl=en&z=15&output=embed`}
              className="h-48 w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="flex items-center justify-between gap-3 px-4 py-3">
              <span className="text-xs text-muted-foreground">
                {location.street}
              </span>
              <Link
                href={`https://maps.google.com/?q=${location.mapsQuery}`}
                target="_blank"
                rel="noreferrer"
                className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary underline decoration-primary/30 underline-offset-4 transition-colors hover:decoration-primary"
              >
                {location.footerMapLabel}
              </Link>
            </div>
          </HoverCardContent>
        </HoverCard>
      </section>

      {/* Find us online */}
      <section className="mx-auto w-full max-w-6xl px-6 py-10">
        <h2 className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
          Find us online
        </h2>
        <ul className="mt-4 flex flex-wrap gap-3">
          {socials.xUrl && (
            <li>
              <Link
                href={socials.xUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm text-foreground transition-all hover:border-primary/40 hover:text-primary"
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.18em]">
                  {socials.xHandle}
                </span>
              </Link>
            </li>
          )}
        </ul>
      </section>

      {/* Working with us */}
      <section className="mx-auto w-full max-w-4xl px-6 py-10 pb-24">
        <h2 className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
          {contact.connectTitle}
        </h2>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          {contact.connectBody}
        </p>
      </section>
    </main>
  );
}
