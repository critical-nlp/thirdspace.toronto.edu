"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { Lock, Mail, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  ADMIN_EMAIL,
  ADMIN_PASSWORD,
  ADMIN_SESSION_TTL_HOURS,
} from "@/lib/admin-credentials";
import {
  clearSession,
  readStoredSession,
  signSession,
  storeSession,
  verifySession,
  type AdminSession,
} from "@/lib/admin-session";

export default function AdminPage() {
  const [session, setSession] = useState<AdminSession | null>(null);
  const [checked, setChecked] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const expiryTimer = useRef<number | null>(null);

  function clearExpiryTimer() {
    if (expiryTimer.current !== null) {
      window.clearTimeout(expiryTimer.current);
      expiryTimer.current = null;
    }
  }

  function scheduleExpiry(expMs: number) {
    clearExpiryTimer();
    const delay = Math.max(0, expMs - Date.now());
    expiryTimer.current = window.setTimeout(() => {
      signOut("Session expired");
    }, delay);
  }

  async function adopt(token: string): Promise<AdminSession | null> {
    const verified = await verifySession(token);
    if (!verified) {
      clearSession();
      setSession(null);
      return null;
    }
    setSession(verified);
    scheduleExpiry(verified.exp * 1000);
    return verified;
  }

  function signOut(message?: string) {
    clearSession();
    clearExpiryTimer();
    setSession(null);
    if (message) setError(message);
  }

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const token = readStoredSession();
      if (token) await adopt(token);
      if (!cancelled) setChecked(true);
    })();

    function onStorage(e: StorageEvent) {
      if (e.key !== "thirdspace_admin_session") return;
      if (e.newValue === null) {
        clearExpiryTimer();
        setSession(null);
        return;
      }
      if (e.newValue) {
        void adopt(e.newValue);
      }
    }

    window.addEventListener("storage", onStorage);
    return () => {
      cancelled = true;
      window.removeEventListener("storage", onStorage);
      clearExpiryTimer();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setPending(true);

    try {
      const form = new FormData(e.currentTarget);
      const email = String(form.get("email") ?? "").trim();
      const password = String(form.get("password") ?? "");

      if (
        email.toLowerCase() !== ADMIN_EMAIL.toLowerCase() ||
        password !== ADMIN_PASSWORD
      ) {
        setError("Invalid credentials");
        return;
      }

      const token = await signSession(email);
      storeSession(token);
      const verified = await verifySession(token);
      if (!verified) {
        setError("Failed to establish session");
        return;
      }
      setSession(verified);
      scheduleExpiry(verified.exp * 1000);
    } finally {
      setPending(false);
    }
  }

  if (!checked) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-sm text-muted-foreground">Loading…</p>
      </div>
    );
  }

  return (
    <div className="grid min-h-screen w-full grid-cols-1 bg-background text-foreground lg:grid-cols-2">
      {/* Brand panel */}
      <aside className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-primary/10 via-accent/10 to-background p-10 lg:flex">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,oklch(0.85_0.15_var(--brand-hue)/0.18),transparent_60%),radial-gradient(circle_at_bottom_left,oklch(0.85_0.16_75/0.20),transparent_55%)]"
        />
        <div className="relative flex items-center gap-2 text-foreground">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
            <Sparkles className="h-4 w-4" />
          </div>
          <span className="text-lg font-semibold tracking-tight">
            Thirdspace
          </span>
        </div>

        <div className="relative flex flex-col gap-6">
          <Badge
            variant="secondary"
            className="w-fit gap-1.5 rounded-full bg-card/80 px-3 py-1 text-xs font-medium text-foreground ring-1 ring-border backdrop-blur"
          >
            <ShieldCheck className="h-3.5 w-3.5 text-primary" />
            Restricted area
          </Badge>
          <h1 className="text-balance text-4xl font-semibold leading-tight tracking-tight text-foreground">
            Admin console for the Thirdspace team.
          </h1>
          <p className="max-w-md text-pretty text-base leading-7 text-muted-foreground">
            Sign in to manage content, members, and events. Sessions are
            signed and expire automatically after {ADMIN_SESSION_TTL_HOURS}{" "}
            hours of inactivity.
          </p>
        </div>

        <p className="relative text-xs text-muted-foreground">
          © {new Date().getFullYear()} Thirdspace — University of Toronto
        </p>
      </aside>

      {/* Form panel */}
      <main className="flex items-center justify-center px-6 py-12 sm:px-10">
        {session ? (
          <SignedInView
            email={session.email}
            ttlHours={ADMIN_SESSION_TTL_HOURS}
            onSignOut={() => signOut()}
          />
        ) : (
          <SignInView
            error={error}
            pending={pending}
            onSubmit={onSubmit}
          />
        )}
      </main>
    </div>
  );
}

function SignInView({
  error,
  pending,
  onSubmit,
}: {
  error: string | null;
  pending: boolean;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-sm">
      <div className="mb-8 flex flex-col gap-2">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          Admin sign in
        </h2>
        <p className="text-sm text-muted-foreground">
          Use your admin email and password to continue.
        </p>
      </div>
      <form onSubmit={onSubmit} className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <Label htmlFor="email" className="text-foreground">
            Email
          </Label>
          <div className="flex items-center gap-2 rounded-lg border border-input bg-card px-3 transition-colors focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/20">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="you@example.com"
              className="h-11 border-0 bg-transparent shadow-none focus-visible:ring-0"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="password" className="text-foreground">
            Password
          </Label>
          <div className="flex items-center gap-2 rounded-lg border border-input bg-card px-3 transition-colors focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/20">
            <Lock className="h-4 w-4 text-muted-foreground" />
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              placeholder="••••••••"
              className="h-11 border-0 bg-transparent shadow-none focus-visible:ring-0"
            />
          </div>
        </div>

        {error ? (
          <p
            role="alert"
            className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive"
          >
            {error}
          </p>
        ) : null}

        <Button
          type="submit"
          disabled={pending}
          className="h-11 w-full rounded-lg bg-primary text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          {pending ? "Signing in…" : "Sign in"}
        </Button>

        <p className="text-center text-xs text-muted-foreground">
          By signing in you agree to the Thirdspace acceptable-use policy.
        </p>
      </form>
    </div>
  );
}

function SignedInView({
  email,
  ttlHours,
  onSignOut,
}: {
  email: string;
  ttlHours: number;
  onSignOut: () => void;
}) {
  return (
    <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-sm">
      <div className="mb-6 flex flex-col gap-2">
        <Badge
          variant="secondary"
          className="w-fit gap-1.5 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground"
        >
          <ShieldCheck className="h-3.5 w-3.5" />
          Signed in
        </Badge>
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          Welcome back
        </h2>
        <p className="text-sm text-muted-foreground">{email}</p>
      </div>
      <div className="rounded-lg border border-border bg-muted p-4 text-sm text-foreground">
        <p>
          Your session is valid for {ttlHours} hours. It will sign out
          automatically when it expires.
        </p>
      </div>
      <Button
        variant="outline"
        onClick={onSignOut}
        className="mt-6 h-11 w-full rounded-lg border-border"
      >
        Sign out
      </Button>
    </div>
  );
}
