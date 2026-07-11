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

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 p-8 font-sans dark:bg-black">
      <main className="w-full max-w-3xl flex flex-col gap-8">
        <div className="flex flex-col items-center gap-3 text-center">
          <Badge variant="secondary">ShadCN UI is ready</Badge>
          <h1 className="text-4xl font-semibold tracking-tight text-black dark:text-zinc-50">
            Next.js 16 + ShadCN UI
          </h1>
          <p className="max-w-xl text-lg leading-7 text-zinc-600 dark:text-zinc-400">
            This homepage is rendered with ShadCN UI components to confirm the
            integration is working correctly.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Sample Card Component</CardTitle>
            <CardDescription>
              Imported from <code>@/components/ui/card</code>.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              The Button below also comes from ShadCN UI. If Tailwind tokens,
              CSS variables, and the Radix primitives are all wired up, this
              card will look themed and the button will animate on click.
            </p>
          </CardContent>
          <CardFooter className="flex gap-2">
            <Button>Primary Action</Button>
            <Button variant="outline">Secondary</Button>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}
