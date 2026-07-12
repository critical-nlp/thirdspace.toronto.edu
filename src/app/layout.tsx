import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { BrandMark } from "@/components/brand-mark";
import { Footer } from "@/components/footer";
import contentData from "../../public/config/content.json";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: contentData.layout.pageTitle,
  description: contentData.layout.pageDescription,
};

export const viewport = {
  colorScheme: "light",
  themeColor: "#1E3765",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { navbar, layout } = contentData;

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <header className="sticky top-0 z-40 w-full border-b border-border bg-card/90 backdrop-blur supports-[backdrop-filter]:bg-card/70">
          <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
            <Link
              href="/"
              className="flex items-center shrink-0"
              aria-label={`${navbar.brandName} ${layout.homeAriaLabelSuffix}`}
            >
              <BrandMark />
            </Link>
            {/* Responsive Navigation */}
            <nav className="flex flex-wrap items-center justify-end gap-x-3 gap-y-1 text-sm sm:gap-1">
              {navbar.links.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="rounded-md px-2 py-1.5 text-xs text-foreground/80 transition-colors hover:bg-muted hover:text-foreground sm:px-3 sm:py-2 sm:text-sm whitespace-nowrap"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </header>
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
