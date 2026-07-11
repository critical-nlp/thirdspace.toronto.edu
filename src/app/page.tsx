import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Users, Calendar, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="border-b border-border">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-20 text-center sm:py-28">
          <Badge
            variant="secondary"
            className="mx-auto w-fit gap-1.5 rounded-full bg-accent/20 px-3 py-1 text-xs font-medium text-accent-foreground ring-1 ring-accent/30"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Now active at the University of Toronto
          </Badge>
          <h1 className="text-balance text-5xl font-semibold tracking-tight text-foreground sm:text-6xl">
            Thirdspace at UofT.
          </h1>
          <p className="mx-auto max-w-2xl text-pretty text-lg leading-8 text-muted-foreground">
            A community for students, faculty, and staff at the University of
            Toronto. Connect, attend events, and find your people across all
            three campuses.
          </p>
          <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
            <Button className="h-11 rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground hover:bg-primary/90">
              Join the community
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-11 rounded-md border-border px-6"
            >
              Upcoming events
            </Button>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="border-b border-border bg-muted/30">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-6 px-6 py-16 sm:grid-cols-3">
          {[
            {
              icon: Users,
              title: "Community",
              body: "Find your people across the three campuses. Study groups, socials, and shared interests.",
            },
            {
              icon: Calendar,
              title: "Events",
              body: "Workshops, panels, mixers, and signature gatherings throughout the academic year.",
            },
            {
              icon: Sparkles,
              title: "Resources",
              body: "Curated guides, mentors, and tools to help you thrive at U of T.",
            },
          ].map(({ icon: Icon, title, body }) => (
            <Card key={title} className="border-border bg-card">
              <CardHeader>
                <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-md bg-primary/10 text-primary ring-1 ring-primary/20">
                  <Icon className="h-4 w-4" />
                </div>
                <CardTitle className="text-foreground">{title}</CardTitle>
                <CardDescription className="text-muted-foreground">
                  {body}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      {/* Sample card */}
      <section className="bg-background">
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-6 py-16">
          <Card>
            <CardHeader>
              <CardTitle>Sample card component</CardTitle>
              <CardDescription>
                Imported from <code>@/components/ui/card</code>.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                The Button below also comes from ShadCN UI. The whole palette
                is derived from <code>--brand-hue</code> in
                <code> globals.css</code> — change it to retheme the site.
              </p>
            </CardContent>
            <CardFooter className="flex gap-2">
              <Button>Primary Action</Button>
              <Button variant="outline">Secondary</Button>
            </CardFooter>
          </Card>
        </div>
      </section>
    </div>
  );
}
