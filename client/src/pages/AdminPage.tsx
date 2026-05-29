import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronDown,
  ChevronUp,
  LogOut,
  Mail,
  MessageSquareQuote,
  Phone,
  RefreshCw,
  Star,
  Trash2,
} from "lucide-react";
import {
  adminDeleteContact,
  adminDeleteReview,
  adminListContacts,
  adminListReviews,
  adminSetReviewApproved,
  adminVerify,
  clearAdminToken,
  getAdminToken,
  setAdminToken,
  type ContactRequest,
  type Review,
} from "../lib/api";
import { Logo } from "../components/Logo";

type Tab = "requests" | "reviews";

export function AdminPage() {
  const [authed, setAuthed] = useState<boolean>(false);
  const [checking, setChecking] = useState<boolean>(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (!getAdminToken()) {
        if (!cancelled) setChecking(false);
        return;
      }
      try {
        const ok = await adminVerify();
        if (!cancelled) {
          setAuthed(ok);
          if (!ok) clearAdminToken();
        }
      } catch {
        if (!cancelled) setAuthed(false);
      } finally {
        if (!cancelled) setChecking(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  if (checking) {
    return <FullCenter>Verifying session…</FullCenter>;
  }

  if (!authed) {
    return <Login onAuthed={() => setAuthed(true)} />;
  }

  return <Dashboard onLogout={() => { clearAdminToken(); setAuthed(false); }} />;
}

function FullCenter({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-ink-900 px-6 text-sm text-bone-200">
      {children}
    </div>
  );
}

function Login({ onAuthed }: { onAuthed: () => void }) {
  const [token, setToken] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    setAdminToken(token.trim());
    try {
      const ok = await adminVerify();
      if (ok) onAuthed();
      else {
        clearAdminToken();
        setError("Invalid token.");
      }
    } catch {
      clearAdminToken();
      setError("Couldn’t reach the server.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-ink-900 px-5 py-16 sm:px-6">
      <div className="w-full max-w-md rounded-3xl border border-bone-100/10 bg-ink-800/70 p-8 shadow-ink backdrop-blur-xl sm:p-10">
        <div className="flex items-center justify-between">
          <Logo />
          <Link to="/" className="text-[10px] uppercase tracking-luxe text-bone-300 hover:text-gold-300">
            ← Site
          </Link>
        </div>
        <p className="eyebrow mt-8">Admin</p>
        <h1 className="display mt-2 text-3xl text-bone-100">Sign in</h1>
        <p className="mt-3 text-sm text-bone-300">
          Enter your admin token to manage contact requests and reviews.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <label className="block">
            <span className="text-[11px] uppercase tracking-luxe text-bone-300">Admin Token</span>
            <input
              type="password"
              autoComplete="current-password"
              autoFocus
              required
              value={token}
              onChange={(e) => setToken(e.target.value)}
              className="mt-2 w-full rounded-xl border border-bone-100/15 bg-ink-900/70 px-4 py-3 text-sm text-bone-100 outline-none ring-gold-500/0 transition focus:border-gold-500 focus:ring-2 focus:ring-gold-500/30"
              placeholder="••••••••••••"
            />
          </label>
          {error && (
            <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs text-red-200">
              {error}
            </p>
          )}
          <button
            disabled={loading || !token.trim()}
            className="btn-gold w-full justify-center disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Verifying…" : "Sign In"}
          </button>
        </form>
        <p className="mt-6 text-[10px] uppercase tracking-luxe text-bone-400">
          Token is set via <code className="text-gold-300">ADMIN_TOKEN</code> in server env.
        </p>
      </div>
    </div>
  );
}

function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [tab, setTab] = useState<Tab>("requests");

  return (
    <div className="min-h-screen bg-ink-900 text-bone-100">
      <header className="sticky top-0 z-30 border-b border-bone-100/5 bg-ink-900/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 sm:px-6 sm:py-5 md:px-8">
          <div className="flex items-center gap-4">
            <Logo />
            <span className="hidden text-[10px] uppercase tracking-luxe text-bone-400 sm:inline">
              Admin Console
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Link
              to="/"
              className="rounded-full border border-bone-100/15 px-3 py-2 text-[10px] uppercase tracking-luxe text-bone-200 hover:border-gold-500 hover:text-gold-300"
            >
              View Site
            </Link>
            <button
              onClick={onLogout}
              className="inline-flex items-center gap-2 rounded-full border border-bone-100/15 px-3 py-2 text-[10px] uppercase tracking-luxe text-bone-200 hover:border-gold-500 hover:text-gold-300"
            >
              <LogOut size={12} /> Sign out
            </button>
          </div>
        </div>

        <div className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-5 sm:px-6 md:px-8">
          <TabButton active={tab === "requests"} onClick={() => setTab("requests")} icon={<Mail size={14} />}>
            Requests
          </TabButton>
          <TabButton active={tab === "reviews"} onClick={() => setTab("reviews")} icon={<MessageSquareQuote size={14} />}>
            Reviews
          </TabButton>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 py-8 sm:px-6 sm:py-10 md:px-8 md:py-12">
        {tab === "requests" ? <RequestsPanel /> : <ReviewsPanel />}
      </main>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  children,
  icon,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  icon: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-2 border-b-2 px-3 py-3 text-[11px] uppercase tracking-luxe transition-colors ${
        active
          ? "border-gold-500 text-gold-300"
          : "border-transparent text-bone-300 hover:text-bone-100"
      }`}
    >
      {icon} {children}
    </button>
  );
}

// ============ Requests ============

function RequestsPanel() {
  const [items, setItems] = useState<ContactRequest[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  async function load() {
    setLoading(true);
    setError(null);
    try {
      setItems(await adminListContacts());
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function handleDelete(id: string) {
    if (!confirm("Delete this request? This cannot be undone.")) return;
    try {
      await adminDeleteContact(id);
      setItems((cur) => cur?.filter((r) => r.id !== id) ?? null);
    } catch (e) {
      alert(e instanceof Error ? e.message : "Failed");
    }
  }

  return (
    <section>
      <PanelHeader
        title="Contact Requests"
        count={items?.length ?? 0}
        loading={loading}
        onRefresh={load}
      />

      {error && <ErrorBanner message={error} />}

      {items && items.length === 0 && !loading && (
        <EmptyState title="No requests yet" body="Inbound forms will appear here in real time." />
      )}

      <ul className="mt-6 space-y-3">
        {items?.map((r) => {
          const open = !!expanded[r.id];
          return (
            <li
              key={r.id}
              className="overflow-hidden rounded-2xl border border-bone-100/10 bg-ink-800/60"
            >
              <button
                onClick={() => setExpanded((e) => ({ ...e, [r.id]: !open }))}
                className="flex w-full flex-col items-start gap-3 px-5 py-4 text-left transition-colors hover:bg-ink-700/60 sm:flex-row sm:items-center sm:gap-4"
              >
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-display text-lg text-bone-100">{r.name}</p>
                    <span className="rounded-full border border-gold-500/30 px-2 py-0.5 text-[10px] uppercase tracking-luxe text-gold-300">
                      {r.inquiryType}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-bone-300">
                    <a href={`mailto:${r.email}`} className="hover:text-gold-300">{r.email}</a>
                    {r.phone && (
                      <>
                        {" · "}
                        <a href={`tel:${r.phone}`} className="hover:text-gold-300">{r.phone}</a>
                      </>
                    )}
                  </p>
                </div>
                <div className="flex items-center gap-3 text-[10px] uppercase tracking-luxe text-bone-400">
                  <time>{formatDate(r.createdAt)}</time>
                  {open ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </div>
              </button>

              {open && (
                <div className="border-t border-bone-100/5 px-5 py-5">
                  <p className="whitespace-pre-wrap text-sm leading-relaxed text-bone-200">
                    {r.message}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    <a
                      href={`mailto:${r.email}?subject=Re: Your ${r.inquiryType} inquiry`}
                      className="inline-flex items-center gap-2 rounded-full border border-bone-100/15 px-3 py-2 text-[10px] uppercase tracking-luxe text-bone-200 hover:border-gold-500 hover:text-gold-300"
                    >
                      <Mail size={12} /> Reply
                    </a>
                    {r.phone && (
                      <a
                        href={`tel:${r.phone}`}
                        className="inline-flex items-center gap-2 rounded-full border border-bone-100/15 px-3 py-2 text-[10px] uppercase tracking-luxe text-bone-200 hover:border-gold-500 hover:text-gold-300"
                      >
                        <Phone size={12} /> Call
                      </a>
                    )}
                    <button
                      onClick={() => handleDelete(r.id)}
                      className="ml-auto inline-flex items-center gap-2 rounded-full border border-red-400/30 px-3 py-2 text-[10px] uppercase tracking-luxe text-red-200 hover:bg-red-500/10"
                    >
                      <Trash2 size={12} /> Delete
                    </button>
                  </div>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}

// ============ Reviews ============

function ReviewsPanel() {
  const [items, setItems] = useState<Review[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<"all" | "displayed" | "hidden">("all");

  async function load() {
    setLoading(true);
    setError(null);
    try {
      setItems(await adminListReviews());
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  const visible = useMemo(() => {
    if (!items) return [];
    const filtered =
      filter === "displayed"
        ? items.filter((r) => r.approved)
        : filter === "hidden"
          ? items.filter((r) => !r.approved)
          : items;

    return filtered.slice().sort((a, b) => {
      if (a.approved !== b.approved) return Number(b.approved) - Number(a.approved);
      return b.createdAt.localeCompare(a.createdAt);
    });
  }, [items, filter]);

  async function toggleDisplayed(r: Review) {
    try {
      await adminSetReviewApproved(r.id, !r.approved);
      setItems((cur) =>
        cur?.map((x) => (x.id === r.id ? { ...x, approved: !r.approved } : x)) ?? null,
      );
    } catch (e) {
      alert(e instanceof Error ? e.message : "Failed");
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this review? This cannot be undone.")) return;
    try {
      await adminDeleteReview(id);
      setItems((cur) => cur?.filter((r) => r.id !== id) ?? null);
    } catch (e) {
      alert(e instanceof Error ? e.message : "Failed");
    }
  }

  return (
    <section>
      <PanelHeader
        title="Reviews"
        count={items?.length ?? 0}
        loading={loading}
        onRefresh={load}
      />

      <div className="mt-4 flex flex-wrap gap-2">
        {(["all", "displayed", "hidden"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-full border px-3 py-1.5 text-[10px] uppercase tracking-luxe transition-colors ${
              filter === f
                ? "border-gold-500 text-gold-300"
                : "border-bone-100/15 text-bone-300 hover:text-bone-100"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {error && <ErrorBanner message={error} />}

      {items && items.length === 0 && !loading && (
        <EmptyState title="No reviews yet" body="Submitted reviews show up here for display control." />
      )}

      <ul className="mt-6 space-y-3">
        {visible.map((r) => (
          <li key={r.id} className="overflow-hidden rounded-2xl border border-bone-100/10 bg-ink-800/60 p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-display text-lg text-bone-100">{r.name}</p>
                  <span
                    className={`rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-luxe ${
                      r.approved
                        ? "border-emerald-400/40 text-emerald-300"
                        : "border-amber-400/40 text-amber-200"
                    }`}
                  >
                    {r.approved ? "Displayed" : "Hidden"}
                  </span>
                </div>
                <p className="mt-1 text-xs text-bone-300">
                  {r.location ?? "—"} · {formatDate(r.createdAt)}
                </p>
              </div>
              <div className="flex items-center gap-1 text-gold-300">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={i < r.rating ? "fill-gold-500 text-gold-500" : "text-bone-400"}
                  />
                ))}
              </div>
            </div>

            {r.title && <p className="mt-3 font-display text-base text-bone-100">{r.title}</p>}
            <p className="mt-2 text-sm leading-relaxed text-bone-200">{r.body}</p>

            <div className="mt-4 flex flex-wrap gap-2">
              <button
                onClick={() => toggleDisplayed(r)}
                className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-[10px] uppercase tracking-luxe ${
                  r.approved
                    ? "border-bone-100/15 text-bone-200 hover:border-amber-400/50 hover:text-amber-200"
                    : "border-emerald-400/40 text-emerald-200 hover:bg-emerald-500/10"
                }`}
              >
                {r.approved ? "Hide" : "Display"}
              </button>
              <button
                onClick={() => handleDelete(r.id)}
                className="ml-auto inline-flex items-center gap-2 rounded-full border border-red-400/30 px-3 py-2 text-[10px] uppercase tracking-luxe text-red-200 hover:bg-red-500/10"
              >
                <Trash2 size={12} /> Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

// ============ Shared bits ============

function PanelHeader({
  title,
  count,
  loading,
  onRefresh,
}: {
  title: string;
  count: number;
  loading: boolean;
  onRefresh: () => void;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div>
        <p className="eyebrow">Live</p>
        <h2 className="display mt-1 text-3xl text-bone-100">
          {title} <span className="text-bone-400">· {count}</span>
        </h2>
      </div>
      <button
        onClick={onRefresh}
        disabled={loading}
        className="inline-flex items-center gap-2 rounded-full border border-bone-100/15 px-3 py-2 text-[10px] uppercase tracking-luxe text-bone-200 hover:border-gold-500 hover:text-gold-300 disabled:opacity-50"
      >
        <RefreshCw size={12} className={loading ? "animate-spin" : ""} />
        Refresh
      </button>
    </div>
  );
}

function EmptyState({ title, body }: { title: string; body: string }) {
  return (
    <div className="mt-8 rounded-2xl border border-dashed border-bone-100/15 p-10 text-center">
      <p className="font-display text-xl text-bone-100">{title}</p>
      <p className="mt-2 text-sm text-bone-300">{body}</p>
    </div>
  );
}

function ErrorBanner({ message }: { message: string }) {
  return (
    <p className="mt-4 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs text-red-200">
      {message}
    </p>
  );
}

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}
