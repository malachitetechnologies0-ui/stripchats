"use client";

import {
  BadgeCheck,
  Ban,
  BarChart3,
  Bot,
  CalendarDays,
  Camera,
  CheckCircle2,
  Coins,
  CreditCard,
  FileCheck,
  Flag,
  Gift,
  Heart,
  KeyRound,
  Lock,
  Mic,
  Play,
  Radio,
  Search,
  Shield,
  SlidersHorizontal,
  Ticket,
  UserCheck,
  Users,
  Wallet
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { adminStats, chartBars } from "@/data/admin";
import { creators, getCreator } from "@/data/creators";
import { tokenPackages } from "@/data/tokenPackages";
import { loginDemoUser, saveAgeConfirmation, signupDemoUser } from "@/lib/mockAuth";
import { approveKyc, rejectKyc } from "@/lib/mockKyc";
import { approvePayout, holdPayout, rejectPayout } from "@/lib/mockPayout";
import { useDemoStore } from "@/lib/store";
import {
  AdminStatCard,
  AdminTable,
  Button,
  Card,
  ChartBars,
  ChatPanel,
  CreatorCard,
  DeveloperNotes,
  EmptyState,
  ErrorState,
  FanClubCard,
  GoalProgress,
  GradientButton,
  KycStatusBadge,
  LiveBadge,
  Metric,
  PaidAlbumCard,
  PaymentCheckoutModal,
  PayoutStatusBadge,
  PrivateShowModal,
  PrototypeFlowCard,
  RechargePrompt,
  ReportModal,
  RoleCard,
  SafePlaceholder,
  StatusBadge,
  SuccessState,
  TipMenuSheet,
  TipModal,
  TokenBalancePill,
  WalletPackageCard,
  cx
} from "@/components/ui";
import {
  AdminSection,
  AdminShell,
  DemoNotice,
  MarketplaceSearchLink,
  ModelShell,
  PageHeader,
  SectionGrid,
  SettingsButton,
  UserShell
} from "@/components/layout";
import type { DeveloperNote, TokenPackage, TransactionType } from "@/types";

function note(partial: Partial<DeveloperNote> & Pick<DeveloperNote, "purpose" | "role">): DeveloperNote {
  return {
    buttons: ["Primary CTA", "Secondary action"],
    actions: ["Update local state", "Show toast or modal", "Write mock ledger row when paid"],
    api: ["Mock service only", "Future REST/GraphQL endpoint"],
    success: "Success state renders inline and critical counters update.",
    error: "Validation, insufficient balance, permission, or review error is shown without data loss.",
    businessRule: "No explicit content, no real payment keys, and all paid actions must be ledger-backed.",
    ...partial
  };
}

export function LandingPage() {
  return (
    <main className="min-h-screen bg-soft-grid px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <nav className="mb-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-2xl bg-brand-gradient shadow-glow" />
            <div>
              <div className="font-black">CreatorLive Demo</div>
              <div className="text-xs text-white/45">Safe creator marketplace prototype</div>
            </div>
          </Link>
          <Link href="/prototype-map" className="rounded-xl border border-white/10 bg-white/[0.06] px-4 py-2 text-sm font-semibold">
            Prototype Map
          </Link>
        </nav>
        <PageHeader
          eyebrow="CreatorLive Demo"
          title="Safe live creator marketplace prototype"
          description="A premium dark-theme learning prototype for viewer, creator, and admin workflows with mock wallet, mock payments, live-room UX, paid unlocks, moderation, KYC, analytics, and developer notes."
        >
          <DemoNotice />
        </PageHeader>
        <div className="mb-8 flex flex-wrap gap-3">
          <Link href="/age-gate" className="inline-flex min-h-11 items-center justify-center rounded-xl bg-brand-gradient px-5 text-sm font-bold">Open User Demo</Link>
          <Link href="/model/onboarding" className="inline-flex min-h-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] px-5 text-sm font-bold">Open Creator Demo</Link>
          <Link href="/admin" className="inline-flex min-h-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] px-5 text-sm font-bold">Open Admin Demo</Link>
          <Link href="/auth/login" className="inline-flex min-h-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] px-5 text-sm font-bold">Dummy Login</Link>
        </div>
        <div className="grid gap-5 lg:grid-cols-3">
          <RoleCard
            title="User / Viewer Demo"
            description="Browse creators, enter live rooms, tip with mock tokens, unlock paid content, and manage favorites."
            href="/age-gate"
            icon={<Users />}
            bullets={["Age gate", "Discovery and live room", "Wallet and paid interactions"]}
          />
          <RoleCard
            title="Model / Creator Demo"
            description="Complete onboarding, configure profile and pricing, start a broadcast, and manage earnings."
            href="/model/onboarding"
            icon={<Radio />}
            bullets={["KYC states", "Broadcast center", "Pricing, bots, payout"]}
          />
          <RoleCard
            title="Admin / Platform Demo"
            description="Review users, creators, KYC, ledgers, payouts, moderation queues, and analytics."
            href="/admin"
            icon={<Shield />}
            bullets={["Admin dashboard", "Token ledger", "KYC and payout controls"]}
          />
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-6">
          {["Live discovery", "Token wallet", "Dummy payment gateway", "Creator dashboard", "Admin moderation", "Payout simulation"].map((feature) => (
            <Card key={feature} className="text-sm font-semibold text-white/75">{feature}</Card>
          ))}
        </div>
      </div>
    </main>
  );
}

export function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("viewer@example.com");
  const [password, setPassword] = useState("demo123");
  const [message, setMessage] = useState("");

  const submit = () => {
    const result = loginDemoUser(email, password);
    setMessage(result.message);
    if (result.ok) router.push("/age-gate");
  };

  return (
    <main className="grid min-h-screen place-items-center bg-soft-grid px-4 py-8">
      <div className="w-full max-w-xl space-y-5">
        <Card className="space-y-4 p-8">
          <h1 className="text-4xl font-black">Login to CreatorLive Demo</h1>
          <p className="text-white/60">Dummy localStorage login only. No backend authentication is connected.</p>
          <input className="min-h-12 w-full rounded-xl border border-white/10 bg-white/[0.06] px-3 outline-none" placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value)} />
          <input className="min-h-12 w-full rounded-xl border border-white/10 bg-white/[0.06] px-3 outline-none" placeholder="Password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
          <GradientButton className="w-full" onClick={submit}>Login</GradientButton>
          <Button className="w-full" onClick={() => router.push("/user")}>Continue as demo user</Button>
          <Link href="/auth/signup" className="block text-center text-sm text-white/60">Create demo account</Link>
          {message ? <SuccessState title="Auth state" message={message} /> : null}
        </Card>
        <DeveloperNotes note={note({ purpose: "Dummy login with localStorage-only auth state.", role: "User / Creator", buttons: ["Login", "Continue as demo user", "Create account"], actions: ["Validate fields", "Save mock user", "Redirect to age gate or dashboard"], api: ["POST /auth/login in production"], businessRule: "No real credentials or sessions are used in this demo." })} />
      </div>
    </main>
  );
}

export function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "Demo User", email: "demo@example.com", password: "demo123", confirmPassword: "demo123", role: "user" as "user" | "creator" | "admin" });
  const [message, setMessage] = useState("");

  const submit = () => {
    const result = signupDemoUser(form);
    setMessage(result.message);
    if (result.ok) router.push(form.role === "creator" ? "/model/onboarding" : "/age-gate");
  };

  return (
    <main className="grid min-h-screen place-items-center bg-soft-grid px-4 py-8">
      <div className="w-full max-w-xl space-y-5">
        <Card className="space-y-4 p-8">
          <h1 className="text-4xl font-black">Create demo account</h1>
          <input className="min-h-12 w-full rounded-xl border border-white/10 bg-white/[0.06] px-3 outline-none" placeholder="Name" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} />
          <input className="min-h-12 w-full rounded-xl border border-white/10 bg-white/[0.06] px-3 outline-none" placeholder="Email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} />
          <input className="min-h-12 w-full rounded-xl border border-white/10 bg-white/[0.06] px-3 outline-none" placeholder="Password" type="password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} />
          <input className="min-h-12 w-full rounded-xl border border-white/10 bg-white/[0.06] px-3 outline-none" placeholder="Confirm password" type="password" value={form.confirmPassword} onChange={(event) => setForm({ ...form, confirmPassword: event.target.value })} />
          <div className="grid gap-2 sm:grid-cols-2">
            {(["user", "creator"] as const).map((role) => (
              <Button key={role} className={form.role === role ? "border-rose-300/40 bg-rose-400/15" : ""} onClick={() => setForm({ ...form, role })}>{role}</Button>
            ))}
          </div>
          <GradientButton className="w-full" onClick={submit}>Create account</GradientButton>
          {message ? (message.includes("required") || message.includes("match") ? <ErrorState title="Signup validation" message={message} /> : <SuccessState title="Signup state" message={message} />) : null}
        </Card>
        <DeveloperNotes note={note({ purpose: "Dummy signup with role selection and local state validation.", role: "User / Creator", buttons: ["Create account", "Role selection"], actions: ["Validate required fields", "Redirect user to age gate", "Redirect creator to onboarding"], api: ["POST /auth/signup in production"] })} />
      </div>
    </main>
  );
}

export function AgeGatePage() {
  const router = useRouter();
  const setAgeConfirmed = useDemoStore((state) => state.setAgeConfirmed);
  const [exit, setExit] = useState(false);

  return (
    <main className="grid min-h-screen place-items-center bg-soft-grid px-4 py-8">
      <div className="w-full max-w-3xl">
        <Card className="space-y-6 p-8">
          <SafePlaceholder label="Neutral brand placeholder" className="h-64" />
          {exit ? (
            <SuccessState title="Safe exit" message="Marketplace content has not been loaded. You can close this tab or return to the landing page." />
          ) : (
            <>
              <div>
                <div className="mb-3 inline-flex rounded-full border border-rose-300/25 bg-rose-400/15 px-3 py-1 text-sm font-bold text-rose-100">18+ only</div>
                <h1 className="text-4xl font-black">Confirm age to enter the viewer demo</h1>
                <p className="mt-3 text-white/62">
                  This safe prototype blocks viewer content until age confirmation is stored in localStorage.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 text-sm text-white/65">
                {["Terms", "Privacy", "Cookie", "Compliance"].map((item) => (
                  <a key={item} href="#" className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1">
                    {item}
                  </a>
                ))}
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <GradientButton
                  onClick={() => {
                    saveAgeConfirmation();
                    setAgeConfirmed(true);
                    router.push("/user");
                  }}
                >
                  <CheckCircle2 size={17} /> I am 18+ / Enter Demo
                </GradientButton>
                <button
                  className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.06] px-4 py-2 text-sm font-semibold text-white transition hover:border-white/20 hover:bg-white/[0.1]"
                  onClick={() => setExit(true)}
                >
                  Exit
                </button>
              </div>
            </>
          )}
        </Card>
        <div className="mt-5">
          <DeveloperNotes
            note={note({
              purpose: "Block all viewer content until legal-age confirmation is stored.",
              role: "User / Viewer",
              buttons: ["I am 18+ / Enter Demo", "Exit"],
              actions: ["Enter writes localStorage and redirects to /user", "Exit shows safe exit message"],
              api: ["POST /compliance/age-confirmation in production"],
              businessRule: "No creator content should be fetched until age confirmation passes."
            })}
          />
        </div>
      </div>
    </main>
  );
}

export function UserHomePage() {
  return (
    <UserShell>
      <PageHeader eyebrow="Viewer marketplace" title="Discover live creators" description="Safe creator cards, category filters, wallet shortcut, status badges, and paid interaction entry points.">
        <div className="flex gap-2">
          <MarketplaceSearchLink />
          <SettingsButton />
        </div>
      </PageHeader>
      <div className="mb-6 flex flex-wrap gap-2">
        {["Top Creators", "Trending", "New", "Live Now", "Language", "Couples", "Guys", "Trans"].map((chip, index) => (
          <span key={chip} className={cx("rounded-full border px-3 py-1 text-sm", index === 0 ? "border-rose-300/30 bg-rose-400/15" : "border-white/10 bg-white/[0.06]")}>
            {chip}
          </span>
        ))}
      </div>
      <SectionGrid>
        {creators.map((creator) => (
          <CreatorCard key={creator.id} creator={creator} />
        ))}
      </SectionGrid>
      <div className="mt-8">
        <DeveloperNotes
          note={note({
            purpose: "Render discovery, creator cards, favorites, wallet shortcut, and live-room entry.",
            role: "User / Viewer",
            buttons: ["View Profile", "Watch Live", "Favorite", "Wallet"],
            actions: ["Profile links to /user/creator/[id]", "Watch links to /user/live/[id]", "Favorite persists in local state"],
            api: ["GET /creators/live", "GET /wallet/balance", "POST /favorites"],
            success: "Cards update favorite state and keep viewer counts/status readable.",
            businessRule: "Age gate must pass before this route is available in production."
          })}
        />
      </div>
    </UserShell>
  );
}

export function UserSearchPage() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const filtered = creators.filter((creator) => {
    const matchesText = [creator.name, creator.category, creator.language].join(" ").toLowerCase().includes(query.toLowerCase());
    const matchesStatus = status === "all" || creator.status === status;
    return matchesText && matchesStatus;
  });

  return (
    <UserShell>
      <PageHeader eyebrow="Magic search" title="Search and category discovery" description="Filter mock creator data by name, language, category, and live status." />
      <Card className="mb-6 space-y-4">
        <div className="flex flex-col gap-3 md:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 text-white/40" size={18} />
            <input className="min-h-12 w-full rounded-xl border border-white/10 bg-white/[0.06] pl-10 pr-3 outline-none" placeholder="Search creators, language, category" value={query} onChange={(event) => setQuery(event.target.value)} />
          </div>
          <div className="flex gap-2 overflow-x-auto">
            {["all", "online", "busy", "offline"].map((item) => (
              <Button key={item} className={status === item ? "border-rose-300/40 bg-rose-400/15" : ""} onClick={() => setStatus(item)}>
                {item}
              </Button>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap gap-2 text-sm text-white/55">
          Recent: <span className="rounded-full bg-white/[0.06] px-3 py-1">Spanish</span><span className="rounded-full bg-white/[0.06] px-3 py-1">New</span>
        </div>
      </Card>
      {filtered.length ? (
        <SectionGrid>{filtered.map((creator) => <CreatorCard key={creator.id} creator={creator} />)}</SectionGrid>
      ) : (
        <EmptyState title="No creators found" message="Clear filters or try another safe demo keyword." />
      )}
      <div className="mt-8">
        <DeveloperNotes
          note={note({
            purpose: "Support search, filters, recent searches, result cards, and empty state.",
            role: "User / Viewer",
            buttons: ["Filter chips", "Result card", "Watch Live"],
            actions: ["Typing filters local mock data", "Result card links to creator profile"],
            api: ["GET /search/creators?query=&filters="],
            error: "No matching creators shows an empty state."
          })}
        />
      </div>
    </UserShell>
  );
}

export function UserModelProfilePage({ id }: { id: string }) {
  const creator = getCreator(id);
  const favorites = useDemoStore((state) => state.favorites);
  const toggleFavorite = useDemoStore((state) => state.toggleFavorite);
  const [tipOpen, setTipOpen] = useState(false);
  const [privateOpen, setPrivateOpen] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);
  const [friendPending, setFriendPending] = useState(false);

  return (
    <UserShell>
      <div className="grid gap-6 lg:grid-cols-[1.25fr_.75fr]">
        <div className="space-y-6">
          <SafePlaceholder label="Creator cover placeholder" className="h-72" />
          <Card className="-mt-20 space-y-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex items-center gap-4">
                <div className="h-20 w-20 rounded-3xl border-2 border-white/20 bg-brand-gradient blur-[.2px]" />
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-3xl font-black">{creator.name}</h1>
                    {creator.verified ? <BadgeCheck className="text-sky-300" /> : null}
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <StatusBadge status={creator.status} />
                    <span className="text-sm text-white/55">{creator.language}</span>
                  </div>
                </div>
              </div>
              <TokenBalancePill />
            </div>
            <p className="text-white/65">{creator.bio}</p>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <GradientButton onClick={() => setTipOpen(true)}>
                <Gift size={16} /> Tip
              </GradientButton>
              <Button onClick={() => toggleFavorite(creator.id)}>
                <Heart size={16} fill={favorites.includes(creator.id) ? "currentColor" : "none"} /> {favorites.includes(creator.id) ? "Favorited" : "Favorite"}
              </Button>
              <Button onClick={() => setFriendPending(true)}>
                <UserCheck size={16} /> {friendPending ? "Pending" : "Friend"}
              </Button>
              <Button onClick={() => setReportOpen(true)}>
                <Flag size={16} /> Report
              </Button>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <Link className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-brand-gradient font-bold" href={`/user/live/${creator.id}`}>
                <Play size={16} /> Watch Live
              </Link>
              <Button onClick={() => setPrivateOpen(true)}>
                <Lock size={16} /> Private show
              </Button>
            </div>
          </Card>
          <Card className="space-y-4">
            <h2 className="text-xl font-bold">Broadcast schedule and epic goal</h2>
            <div className="flex items-center gap-2 text-white/65">
              <CalendarDays size={17} /> {creator.schedule}
            </div>
            <GoalProgress current={creator.goal.current} target={creator.goal.target} />
          </Card>
          <div className="grid gap-5 md:grid-cols-2">
            {creator.albums.map((album) => (
              <PaidAlbumCard key={album.id} creator={creator} album={album} />
            ))}
          </div>
        </div>
        <aside className="space-y-5">
          <FanClubCard creator={creator} />
          <Card>
            <h3 className="font-bold">Custom panels</h3>
            <p className="mt-2 text-sm text-white/60">Safe placeholder panels for bio, rules, schedule, and fan club benefits.</p>
          </Card>
        </aside>
      </div>
      <div className="mt-8">
        <DeveloperNotes
          note={note({
            purpose: "Show creator profile, paid actions, schedule, fan club, albums, and safety controls.",
            role: "User / Viewer",
            buttons: ["Tip", "Private show", "Watch Live", "Fan Club", "Unlock album", "Report"],
            actions: ["Tip opens modal", "Private checks balance", "Album unlock creates entitlement", "Report opens safety modal"],
            api: ["GET /creators/:id", "POST /tips", "POST /media/:id/unlock", "POST /reports"],
            businessRule: "Offline creators show schedule and paid offline-safe actions only."
          })}
        />
      </div>
      <TipModal creator={creator} open={tipOpen} onClose={() => setTipOpen(false)} />
      <PrivateShowModal creator={creator} open={privateOpen} onClose={() => setPrivateOpen(false)} />
      <ReportModal open={reportOpen} onClose={() => setReportOpen(false)} />
    </UserShell>
  );
}

export function UserLiveRoomPage({ id }: { id: string }) {
  const creator = getCreator(id);
  const spendTokens = useDemoStore((state) => state.spendTokens);
  const addChatMessage = useDemoStore((state) => state.addChatMessage);
  const [tipOpen, setTipOpen] = useState(false);
  const [tipMenuOpen, setTipMenuOpen] = useState(false);
  const [privateOpen, setPrivateOpen] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);
  const [status, setStatus] = useState("");

  const paidAction = (amount: number, type: TransactionType, message: string) => {
    const ok = spendTokens(amount, message, type, creator.id);
    setStatus(ok ? `${message} completed.` : "Insufficient tokens. Recharge required.");
    if (ok) addChatMessage(`${message} (${amount} tokens).`, "Room Bot", true);
  };

  return (
    <UserShell>
      <div className="grid gap-6 xl:grid-cols-[1.4fr_.6fr]">
        <div className="space-y-5">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-black shadow-panel">
            <SafePlaceholder label="Large live video placeholder" className="h-[520px] rounded-none border-0" />
            <div className="absolute left-4 right-4 top-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <LiveBadge />
                <span className="rounded-full bg-black/35 px-3 py-1 text-sm">{creator.viewerCount.toLocaleString()} viewers</span>
              </div>
              <TokenBalancePill />
            </div>
            <div className="absolute bottom-4 left-4 right-4 flex flex-col gap-3 rounded-2xl border border-white/10 bg-black/45 p-4 backdrop-blur md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-2xl font-black">{creator.name}</h1>
                <div className="mt-2 flex items-center gap-2">
                  <StatusBadge status={creator.status} />
                  <span className="text-sm text-white/60">{creator.language}</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <GradientButton onClick={() => setTipOpen(true)}>
                  <Gift size={16} /> Tip
                </GradientButton>
                <Button onClick={() => setTipMenuOpen(true)}>Tip Menu</Button>
                <Button onClick={() => setPrivateOpen(true)}>Private</Button>
                <Button onClick={() => paidAction(25, "group", "Group show join")}>Group</Button>
                <Button onClick={() => paidAction(75, "ticket", "Ticket show purchase")}>
                  <Ticket size={16} /> Ticket
                </Button>
                <Button onClick={() => setReportOpen(true)}>Report</Button>
              </div>
            </div>
          </div>
          {status ? (status.includes("Insufficient") ? <RechargePrompt /> : <SuccessState title="Paid action" message={status} />) : null}
          <Card className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-bold">Ticket show banner</h2>
              <span className="rounded-full bg-amber-400/15 px-3 py-1 text-sm font-bold text-amber-100">75 tokens</span>
            </div>
            <p className="text-sm text-white/60">Fixed-price event access is blocked until ticket purchase succeeds.</p>
          </Card>
          <GoalProgress current={creator.goal.current} target={creator.goal.target} />
        </div>
        <aside className="space-y-5">
          <ChatPanel />
          <Card className="space-y-3">
            <h3 className="font-bold">User list</h3>
            {["NovaFan", "TokenBuyer", "Guest842"].map((name) => (
              <div key={name} className="flex items-center justify-between rounded-xl bg-white/[0.045] p-3 text-sm">
                <span>{name}</span>
                <Button className="h-8 px-2">Block</Button>
              </div>
            ))}
          </Card>
        </aside>
      </div>
      <div className="mt-8">
        <DeveloperNotes
          note={note({
            purpose: "Demonstrate public live-room UI, chat, tips, group/ticket/private actions, goal progress, and reporting.",
            role: "User / Viewer",
            buttons: ["Send chat", "Tip", "Tip Menu", "Private", "Group", "Ticket", "Report"],
            actions: ["Chat appends message", "Paid actions check wallet and create ledger entries", "Report opens moderation modal"],
            api: ["WS /chat", "POST /tips", "POST /shows/private/request", "POST /events/:id/tickets"],
            businessRule: "Chat permissions and paid actions must respect wallet, subscription, ban, and room rules."
          })}
        />
      </div>
      <TipModal creator={creator} open={tipOpen} onClose={() => setTipOpen(false)} />
      <TipMenuSheet creator={creator} open={tipMenuOpen} onClose={() => setTipMenuOpen(false)} />
      <PrivateShowModal creator={creator} open={privateOpen} onClose={() => setPrivateOpen(false)} />
      <ReportModal open={reportOpen} onClose={() => setReportOpen(false)} />
    </UserShell>
  );
}

export function UserWalletPage() {
  const transactions = useDemoStore((state) => state.transactions);
  const [selectedPackage, setSelectedPackage] = useState<TokenPackage | null>(null);

  return (
    <UserShell>
      <PageHeader eyebrow="Mock token wallet" title="Wallet and demo payment gateway" description="Select a token package, choose a mock payment method, and simulate success, pending, or failed gateway states.">
        <TokenBalancePill />
      </PageHeader>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {tokenPackages.map((pack) => (
          <WalletPackageCard key={pack.id} pack={pack} onSelect={setSelectedPackage} />
        ))}
      </div>
      <div className="mt-8 grid gap-6 lg:grid-cols-[.75fr_1.25fr]">
        <Card className="space-y-4">
          <h2 className="font-bold">Payment methods</h2>
          {["Card", "UPI", "Net Banking", "Wallet", "Mock PayPal"].map((method) => (
            <div key={method} className="flex items-center gap-3 rounded-xl bg-white/[0.045] p-3">
              <CreditCard size={17} className="text-white/50" />
              {method}
            </div>
          ))}
          <div className="rounded-xl border border-amber-300/20 bg-amber-400/10 p-3 text-sm text-amber-100">Payment verification may be required before real recharge.</div>
        </Card>
        <Card>
          <h2 className="mb-4 font-bold">Transaction history</h2>
          <AdminTable
            headers={["ID", "Type", "Amount", "Status", "Description"]}
            rows={transactions.slice(0, 6).map((tx) => [tx.id, tx.type, tx.tokenAmount, tx.status, tx.description])}
          />
        </Card>
      </div>
      <div className="mt-8">
        <DeveloperNotes
          note={note({
            purpose: "Mock recharge flow with token packages, payment methods, checkout modal, and ledger history.",
            role: "User / Viewer",
            buttons: ["Package card", "Pay success", "Pending", "Failed"],
            actions: ["Success credits tokens", "Failure keeps balance unchanged", "Pending records processing state"],
            api: ["POST /payments/intent", "POST /payments/webhook", "GET /wallet"],
            businessRule: "Real implementation must fulfill only after backend webhook verification."
          })}
        />
      </div>
      <PaymentCheckoutModal selectedPackage={selectedPackage} open={Boolean(selectedPackage)} onClose={() => setSelectedPackage(null)} />
    </UserShell>
  );
}

export function UserMessagesPage() {
  const unlocked = useDemoStore((state) => state.unlockedMessages.includes("msg-locked-1"));
  const unlockMessage = useDemoStore((state) => state.unlockMessage);
  const [message, setMessage] = useState("");
  const creator = creators[0];

  return (
    <UserShell>
      <PageHeader eyebrow="Paid messages" title="Private messages and locked media" description="Unlock paid message content with mock tokens and prevent duplicate purchase." />
      <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
        <Card className="space-y-3">
          {creators.slice(0, 3).map((item) => (
            <div key={item.id} className="flex items-center gap-3 rounded-xl bg-white/[0.045] p-3">
              <div className="h-10 w-10 rounded-xl bg-brand-gradient" />
              <div>
                <div className="font-bold">{item.name}</div>
                <div className="text-xs text-white/45">Demo thread</div>
              </div>
            </div>
          ))}
        </Card>
        <Card className="space-y-4">
          <ChatPanel />
          <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-4">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="font-bold">Locked media message</h3>
              <span className="rounded-full bg-amber-400/15 px-3 py-1 text-sm font-bold text-amber-100">30 tokens</span>
            </div>
            <SafePlaceholder label={unlocked ? "Unlocked safe content placeholder" : "Locked blurred media placeholder"} className="h-52" />
            <GradientButton
              className="mt-4 w-full"
              disabled={unlocked}
              onClick={() => {
                const ok = unlockMessage("msg-locked-1", 30, creator.id);
                setMessage(ok ? "Paid message unlocked." : "Insufficient tokens. Recharge required.");
              }}
            >
              {unlocked ? "Unlocked" : "Unlock message"}
            </GradientButton>
            {message ? <p className="mt-3 text-sm text-amber-100">{message}</p> : null}
          </div>
        </Card>
      </div>
      <div className="mt-8">
        <DeveloperNotes
          note={note({
            purpose: "Demonstrate paid private message unlocks and locked media reveal state.",
            role: "User / Viewer",
            buttons: ["Unlock message"],
            actions: ["Check wallet", "Deduct tokens", "Create entitlement", "Prevent duplicate purchase"],
            api: ["GET /messages", "POST /messages/:id/unlock"],
            businessRule: "Locked media remains inaccessible until entitlement exists."
          })}
        />
      </div>
    </UserShell>
  );
}

export function UserFavoritesPage() {
  const favorites = useDemoStore((state) => state.favorites);
  const removeFavorite = useDemoStore((state) => state.removeFavorite);
  const saved = creators.filter((creator) => favorites.includes(creator.id));
  const [alerts, setAlerts] = useState<Record<string, boolean>>({});

  return (
    <UserShell>
      <PageHeader eyebrow="Favorites" title="Following and online alerts" description="Saved creators, online/offline filters, notification toggles, and remove state." />
      {saved.length ? (
        <div className="grid gap-4">
          {saved.map((creator) => (
            <Card key={creator.id} className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-2xl bg-brand-gradient" />
                <div>
                  <h3 className="font-bold">{creator.name}</h3>
                  <div className="mt-1 flex items-center gap-2">
                    <StatusBadge status={creator.status} />
                    <span className="text-sm text-white/50">{creator.schedule}</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button onClick={() => setAlerts((state) => ({ ...state, [creator.id]: !state[creator.id] }))}>
                  Alerts {alerts[creator.id] ? "On" : "Off"}
                </Button>
                <Link className="inline-flex min-h-10 items-center rounded-xl bg-brand-gradient px-4 text-sm font-bold" href={`/user/creator/${creator.id}`}>
                  Profile
                </Link>
                <Button onClick={() => removeFavorite(creator.id)}>Remove</Button>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <EmptyState title="No favorites yet" message="Use discovery to save safe placeholder creator profiles." />
      )}
      <div className="mt-8">
        <DeveloperNotes
          note={note({
            purpose: "Show saved creators, filters, notification toggles, and remove favorite action.",
            role: "User / Viewer",
            buttons: ["Profile", "Alerts", "Remove"],
            actions: ["Profile opens creator page", "Remove updates local favorites", "Alerts toggle notification preference"],
            api: ["GET /favorites", "PATCH /favorites/:id/notifications", "DELETE /favorites/:id"]
          })}
        />
      </div>
    </UserShell>
  );
}

export function UserHistoryPage() {
  const transactions = useDemoStore((state) => state.transactions);

  return (
    <UserShell>
      <PageHeader eyebrow="Viewer history" title="Transaction and activity history" description="Audit wallet recharges, tips, paid unlocks, private show reserves, tickets, group joins, and fan club subscriptions." />
      <div className="grid gap-5 md:grid-cols-3">
        <Metric label="Total transactions" value={String(transactions.length)} />
        <Metric label="Successful payments" value={String(transactions.filter((tx) => tx.status === "success").length)} />
        <Metric label="Pending reviews" value={String(transactions.filter((tx) => tx.status === "pending").length)} />
      </div>
      <div className="mt-6">
        <AdminTable
          headers={["Transaction", "Type", "Tokens", "Status", "Created", "Description"]}
          rows={transactions.map((tx) => [tx.id, tx.type, tx.tokenAmount, tx.status, new Date(tx.createdAt).toLocaleDateString(), tx.description])}
        />
      </div>
      <div className="mt-8">
        <DeveloperNotes
          note={note({
            purpose: "Show viewer transaction and activity history for QA and ledger handoff.",
            role: "User / Viewer",
            buttons: ["Type/date/status filters in production", "Transaction row"],
            actions: ["Read local mock transaction history", "Open transaction detail drawer in production"],
            api: ["GET /wallet/history", "GET /ledger/:id"],
            businessRule: "Paid action history must reconcile with immutable wallet ledger records."
          })}
        />
      </div>
    </UserShell>
  );
}

export function ModelOnboardingPage() {
  const [step, setStep] = useState(0);
  const kycStatus = useDemoStore((state) => state.kycStatus);
  const setKycStatus = useDemoStore((state) => state.setKycStatus);
  const steps = ["Signup", "Email verification", "KYC / ID upload", "Agreement", "Approval state"];

  return (
    <ModelShell>
      <PageHeader eyebrow="Creator onboarding" title="Model signup, verification, KYC, and agreement flow" description="A step-by-step creator onboarding prototype with pending, approved, and rejected KYC states." />
      <div className="grid gap-6 lg:grid-cols-[.7fr_1.3fr]">
        <Card className="space-y-3">
          {steps.map((item, index) => (
            <button key={item} className={cx("flex w-full items-center gap-3 rounded-xl p-3 text-left", index === step ? "bg-rose-400/15 text-white" : "bg-white/[0.045] text-white/60")} onClick={() => setStep(index)}>
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-white/10 text-xs font-bold">{index + 1}</span>
              {item}
            </button>
          ))}
        </Card>
        <Card className="space-y-5">
          {step === 0 ? <FormBlock title="Signup" fields={["Email", "Password", "Model account type"]} /> : null}
          {step === 1 ? <FormBlock title="Email verification" fields={["Verification code"]} /> : null}
          {step === 2 ? (
            <>
              <SafePlaceholder label="ID upload placeholder" className="h-48" />
              <SafePlaceholder label="Selfie upload placeholder" className="h-48" />
              <Button>Add participant for couple/group account</Button>
            </>
          ) : null}
          {step === 3 ? (
            <div className="space-y-4">
              <h2 className="text-2xl font-black">Agreement acceptance</h2>
              <p className="text-white/65">Creator agreement summary, payout rules, moderation rules, and compliance obligations.</p>
              <label className="flex items-center gap-3"><input type="checkbox" /> Accept latest agreement</label>
            </div>
          ) : null}
          {step === 4 ? (
            <div className="space-y-4">
              <KycStatusBadge status={kycStatus} />
              <div className="grid gap-2 sm:grid-cols-3">
                <Button onClick={() => setKycStatus("pending")}>Pending</Button>
                <Button onClick={() => setKycStatus("approved")}>Approved</Button>
                <Button onClick={() => setKycStatus("rejected")}>Rejected</Button>
              </div>
            </div>
          ) : null}
          <div className="flex justify-between">
            <Button disabled={step === 0} onClick={() => setStep((value) => Math.max(0, value - 1))}>Back</Button>
            <GradientButton onClick={() => setStep((value) => Math.min(steps.length - 1, value + 1))}>Continue</GradientButton>
          </div>
        </Card>
      </div>
      <div className="mt-8">
        <DeveloperNotes
          note={note({
            purpose: "Guide creator through signup, email verification, KYC upload, agreement, and approval states.",
            role: "Model / Creator",
            buttons: ["Continue", "Back", "Pending", "Approved", "Rejected"],
            actions: ["Step navigation", "KYC status update", "Approval gates broadcast access"],
            api: ["POST /creator/auth/signup", "POST /kyc/submissions", "GET /kyc/status"],
            businessRule: "Creators cannot broadcast until KYC is approved and latest agreement is accepted."
          })}
        />
      </div>
    </ModelShell>
  );
}

function FormBlock({ title, fields }: { title: string; fields: string[] }) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-black">{title}</h2>
      {fields.map((field) => (
        <input key={field} className="min-h-12 w-full rounded-xl border border-white/10 bg-white/[0.06] px-3 outline-none" placeholder={field} />
      ))}
    </div>
  );
}

export function ModelDashboardPage() {
  const quickActions: Array<{ href: string; label: string; icon: LucideIcon }> = [
    { href: "/model/broadcast", label: "Go Live", icon: Radio },
    { href: "/model/profile", label: "Edit Profile", icon: FileCheck },
    { href: "/model/pricing", label: "Pricing / Tip Menu", icon: SlidersHorizontal },
    { href: "/model/earnings", label: "Earnings / Payout", icon: Wallet },
    { href: "/model/moderation", label: "Moderation", icon: Shield }
  ];

  return (
    <ModelShell>
      <PageHeader eyebrow="Creator workspace" title="Model dashboard" description="Earnings, token balance, StripScore-style stats, live status, and quick creator actions." />
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <Metric label="Today earnings" value="1,420" icon={<Coins size={16} />} />
        <Metric label="Weekly earnings" value="8,930" icon={<BarChart3 size={16} />} />
        <Metric label="Income/hour" value="310" icon={<Radio size={16} />} />
        <Metric label="Next payout" value="Friday" icon={<Wallet size={16} />} />
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {quickActions.map(({ href, label, icon: Icon }) => (
          <Link key={href} href={href} className="rounded-2xl border border-white/10 bg-white/[0.055] p-5 font-bold transition hover:bg-white/[0.09]">
            <Icon className="mb-4 text-rose-200" />
            {label}
          </Link>
        ))}
      </div>
      <div className="mt-8">
        <DeveloperNotes
          note={note({
            purpose: "Creator dashboard with monetization stats, live status, and quick actions.",
            role: "Model / Creator",
            buttons: ["Go Live", "Edit Profile", "Pricing", "Earnings", "Moderation"],
            actions: ["Navigate to creator tools", "Expose payout and broadcast readiness"],
            api: ["GET /creator/dashboard", "GET /creator/earnings"]
          })}
        />
      </div>
    </ModelShell>
  );
}

export function ModelProfilePage() {
  return (
    <ModelShell>
      <PageHeader eyebrow="Creator profile setup" title="Profile, schedule, and offline state" description="Configure avatar, cover, bio, category, language, custom panels, schedule, and preview card." />
      <div className="grid gap-6 lg:grid-cols-[1fr_.75fr]">
        <Card className="space-y-4">
          <SafePlaceholder label="Cover upload placeholder" className="h-56" />
          <div className="flex items-center gap-3">
            <div className="h-16 w-16 rounded-2xl bg-brand-gradient" />
            <Button>Upload avatar</Button>
          </div>
          <textarea className="min-h-28 w-full rounded-xl border border-white/10 bg-white/[0.06] p-3 outline-none" placeholder="Bio" />
          <div className="grid gap-3 sm:grid-cols-2">
            <input className="min-h-12 rounded-xl border border-white/10 bg-white/[0.06] px-3 outline-none" placeholder="Category" />
            <input className="min-h-12 rounded-xl border border-white/10 bg-white/[0.06] px-3 outline-none" placeholder="Language" />
          </div>
          <input className="min-h-12 w-full rounded-xl border border-white/10 bg-white/[0.06] px-3 outline-none" placeholder="Broadcast schedule" />
          <input className="min-h-12 w-full rounded-xl border border-white/10 bg-white/[0.06] px-3 outline-none" placeholder="Offline message" />
          <GradientButton>Save profile</GradientButton>
        </Card>
        <CreatorCard creator={creators[0]} />
      </div>
      <div className="mt-8">
        <DeveloperNotes
          note={note({
            purpose: "Creator profile setup with preview, schedule, custom panels, and offline message.",
            role: "Model / Creator",
            buttons: ["Upload avatar", "Save profile"],
            actions: ["Validate required fields", "Update profile preview"],
            api: ["PATCH /creators/me/profile", "PATCH /creators/me/schedule"]
          })}
        />
      </div>
    </ModelShell>
  );
}

export function ModelBroadcastPage() {
  const router = useRouter();
  const kycStatus = useDemoStore((state) => state.kycStatus);
  const [obs, setObs] = useState(false);
  const [warning, setWarning] = useState("");

  return (
    <ModelShell>
      <PageHeader eyebrow="Broadcast center" title="Camera, mic, resolution, OBS, and quality check" description="Prepare a safe demo broadcast and gate Start Broadcast by KYC approval." />
      <div className="grid gap-6 lg:grid-cols-[1.2fr_.8fr]">
        <Card className="space-y-4">
          <SafePlaceholder label="Camera preview placeholder" className="h-[420px]" />
          <div className="grid gap-3 md:grid-cols-3">
            <Button><Camera size={16} /> Camera 1</Button>
            <Button><Mic size={16} /> Microphone 1</Button>
            <Button>1080p</Button>
          </div>
          <Button onClick={() => setObs((value) => !value)}>
            <KeyRound size={16} /> OBS mode {obs ? "on" : "off"}
          </Button>
          {obs ? <SuccessState title="OBS instructions" message="Use stream key placeholder: sk_demo_placeholder. Never expose real stream keys client-side." /> : null}
          {warning ? <ErrorState title="Permission warning" message={warning} /> : null}
          <GradientButton
            onClick={() => {
              if (kycStatus !== "approved") {
                setWarning("Camera is ready, but broadcast is blocked until KYC is approved.");
                return;
              }
              router.push("/model/live-room");
            }}
          >
            <Radio size={16} /> Start Broadcast
          </GradientButton>
        </Card>
        <div className="grid gap-4">
          <Metric label="Stream quality" value="Excellent" />
          <Metric label="KYC status" value={kycStatus} />
          <Metric label="Favorites" value="4.2k" />
          <Metric label="Income/hour" value="310" />
        </div>
      </div>
      <div className="mt-8">
        <DeveloperNotes
          note={note({
            purpose: "Prepare broadcast devices, OBS mode, stream quality, and KYC gate.",
            role: "Model / Creator",
            buttons: ["OBS mode", "Start Broadcast"],
            actions: ["OBS reveals stream key placeholder", "Start routes to live room only when approved"],
            api: ["GET /broadcast/config", "POST /broadcast/start"],
            businessRule: "Go-live requires approved KYC, accepted agreement, device permission, and no suspension."
          })}
        />
      </div>
    </ModelShell>
  );
}

export function ModelLiveRoomPage() {
  const [privateRequest, setPrivateRequest] = useState(true);
  const [users, setUsers] = useState(["NovaFan", "TokenBuyer", "Guest842", "Subscriber01"]);
  const addChatMessage = useDemoStore((state) => state.addChatMessage);

  return (
    <ModelShell>
      <PageHeader eyebrow="Model live control" title="Creator live-room control panel" description="Video preview, chat, tips, private requests, groups, ticket controls, bots, and moderation." />
      <div className="grid gap-6 xl:grid-cols-[1.2fr_.8fr]">
        <div className="space-y-5">
          <SafePlaceholder label="Model camera preview" className="h-[420px]" />
          <div className="grid gap-3 md:grid-cols-3">
            <Button onClick={() => addChatMessage("Welcome bot preview message.", "Welcome Bot", true)}><Bot size={16} /> Bot preview</Button>
            <Button><Users size={16} /> Group controls</Button>
            <Button><Ticket size={16} /> Ticket controls</Button>
          </div>
          <GoalProgress current={creators[0].goal.current} target={creators[0].goal.target} />
          {privateRequest ? (
            <Card className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="font-bold">Incoming private show request</h3>
                <p className="text-sm text-white/60">Viewer has enough balance for the minimum reserve.</p>
              </div>
              <div className="flex gap-2">
                <GradientButton onClick={() => setPrivateRequest(false)}>Accept</GradientButton>
                <Button onClick={() => setPrivateRequest(false)}>Reject</Button>
              </div>
            </Card>
          ) : null}
        </div>
        <aside className="space-y-5">
          <ChatPanel />
          <Card className="space-y-3">
            <h3 className="font-bold">User moderation</h3>
            {users.map((name) => (
              <div key={name} className="flex items-center justify-between rounded-xl bg-white/[0.045] p-3 text-sm">
                <span>{name}</span>
                <div className="flex gap-2">
                  <Button className="h-8 px-2" onClick={() => addChatMessage(`${name} muted.`, "Moderation Bot", true)}>Mute</Button>
                  <Button className="h-8 px-2" onClick={() => setUsers((list) => list.filter((user) => user !== name))}>Ban</Button>
                </div>
              </div>
            ))}
          </Card>
        </aside>
      </div>
      <div className="mt-8">
        <DeveloperNotes
          note={note({
            purpose: "Creator control panel for chat, paid show requests, bots, and moderation tools.",
            role: "Model / Creator",
            buttons: ["Accept", "Reject", "Mute", "Ban", "Bot preview"],
            actions: ["Accept/reject private request", "Ban removes user from local list", "Bot posts preview chat message"],
            api: ["WS /creator-room", "POST /moderation/actions", "POST /shows/private/decision"]
          })}
        />
      </div>
    </ModelShell>
  );
}

export function ModelPricingPage() {
  const [items, setItems] = useState(creators[0].tipMenu);
  const [label, setLabel] = useState("Goal boost");
  const [tokens, setTokens] = useState(35);
  const [toast, setToast] = useState("");

  return (
    <ModelShell>
      <PageHeader eyebrow="Monetization controls" title="Pricing, tip menu, goals, bots, polls, and games" description="Configure prices, show controls, tip menu items, automation, and interactive paid moments." />
      <div className="grid gap-6 xl:grid-cols-2">
        <Card className="space-y-4">
          <h2 className="text-xl font-bold">Pricing settings</h2>
          {["Private show price", "Exclusive private price", "Group show price", "Ticket show price", "Fan club price", "Paid message price", "Paid album price"].map((field, index) => (
            <input key={field} className="min-h-12 w-full rounded-xl border border-white/10 bg-white/[0.06] px-3 outline-none" defaultValue={[30, 45, 18, 75, 90, 30, 45][index]} aria-label={field} />
          ))}
          <GradientButton onClick={() => setToast("Pricing saved. Viewer confirmation screens update.")}>Save pricing</GradientButton>
        </Card>
        <Card className="space-y-4">
          <h2 className="text-xl font-bold">Tip menu management</h2>
          <p className="text-sm text-white/55">Max 30 items. Empty name or token price should show validation.</p>
          <div className="grid gap-2 sm:grid-cols-[1fr_120px_auto]">
            <input className="min-h-11 rounded-xl border border-white/10 bg-white/[0.06] px-3 outline-none" value={label} onChange={(event) => setLabel(event.target.value)} />
            <input className="min-h-11 rounded-xl border border-white/10 bg-white/[0.06] px-3 outline-none" value={tokens} onChange={(event) => setTokens(Number(event.target.value) || 0)} />
            <Button
              onClick={() => {
                if (!label || !tokens) {
                  setToast("Validation error: item name and token price are required.");
                  return;
                }
                setItems((list) => [...list, { id: `tip-${Date.now()}`, label, tokens }].slice(0, 30));
              }}
            >
              Add
            </Button>
          </div>
          {items.map((item) => (
            <div key={item.id} className="flex items-center justify-between rounded-xl bg-white/[0.045] p-3">
              <span>{item.label}</span>
              <div className="flex items-center gap-2">
                <span className="text-amber-100">{item.tokens}</span>
                <Button className="h-8 px-2" onClick={() => setItems((list) => list.filter((row) => row.id !== item.id))}>Delete</Button>
              </div>
            </div>
          ))}
        </Card>
        <Card className="space-y-4">
          <h2 className="text-xl font-bold">Goal / Epic Goal</h2>
          <input className="min-h-12 w-full rounded-xl border border-white/10 bg-white/[0.06] px-3 outline-none" defaultValue="Community goal" />
          <input className="min-h-12 w-full rounded-xl border border-white/10 bg-white/[0.06] px-3 outline-none" defaultValue="5000" />
          <GoalProgress current={1840} target={5000} />
          <GradientButton onClick={() => setToast("Goal saved and visible in live room.")}>Save goal</GradientButton>
        </Card>
        <Card className="space-y-4">
          <h2 className="text-xl font-bold">Bots, polls, wheel / game</h2>
          {["Welcome Bot", "Tip Reaction Bot", "Announcement Bot"].map((bot) => (
            <label key={bot} className="flex items-center justify-between rounded-xl bg-white/[0.045] p-3">
              <span>{bot}</span>
              <input type="checkbox" defaultChecked />
            </label>
          ))}
          <input className="min-h-12 w-full rounded-xl border border-white/10 bg-white/[0.06] px-3 outline-none" defaultValue="Poll: choose next theme" />
          <GradientButton onClick={() => setToast("Automation saved. Bot preview can post in live chat.")}>Save automation</GradientButton>
        </Card>
      </div>
      {toast ? <div className="mt-5"><SuccessState title="Saved" message={toast} /></div> : null}
      <div className="mt-8">
        <DeveloperNotes
          note={note({
            purpose: "Manage prices, show controls, tip menu, goals, bots, polls, wheel/game interactions.",
            role: "Model / Creator",
            buttons: ["Save pricing", "Add tip item", "Delete", "Save goal", "Save automation"],
            actions: ["Validate prices", "Add/edit/delete tip items", "Publish automation and games"],
            api: ["PATCH /creators/me/pricing", "POST /tip-menu/items", "PATCH /bots"],
            businessRule: "Tip menu has max 30 active items and paid actions need valid token prices."
          })}
        />
      </div>
    </ModelShell>
  );
}

export function ModelAutomationPage() {
  const addChatMessage = useDemoStore((state) => state.addChatMessage);
  const [saved, setSaved] = useState("");

  return (
    <ModelShell>
      <PageHeader eyebrow="Goals and automation" title="Goals, bots, polls, wheel, and game controls" description="Enable mock automation, add trigger rules, and preview bot messages in the live-room chat state." />
      <div className="grid gap-6 xl:grid-cols-2">
        <Card className="space-y-4">
          <h2 className="text-xl font-bold">Goal / Epic Goal</h2>
          <input className="min-h-12 w-full rounded-xl border border-white/10 bg-white/[0.06] px-3 outline-none" defaultValue="Community goal" />
          <input className="min-h-12 w-full rounded-xl border border-white/10 bg-white/[0.06] px-3 outline-none" defaultValue="5000" />
          <GoalProgress current={1840} target={5000} />
          <GradientButton onClick={() => setSaved("Goal saved and published to viewer live room.")}>Save goal</GradientButton>
        </Card>
        <Card className="space-y-4">
          <h2 className="text-xl font-bold">Bots and trigger rules</h2>
          {["Welcome Bot", "Tip Reaction Bot", "Announcement Bot"].map((bot) => (
            <label key={bot} className="flex items-center justify-between rounded-xl bg-white/[0.045] p-3">
              <span>{bot}</span>
              <input type="checkbox" defaultChecked />
            </label>
          ))}
          <input className="min-h-12 w-full rounded-xl border border-white/10 bg-white/[0.06] px-3 outline-none" defaultValue="Trigger: every 5 minutes" />
          <GradientButton
            onClick={() => {
              addChatMessage("Automation preview: welcome and tip reaction bots are active.", "Automation Bot", true);
              setSaved("Bot trigger saved and preview message added to chat.");
            }}
          >
            Preview bot message
          </GradientButton>
        </Card>
        <Card className="space-y-4 xl:col-span-2">
          <h2 className="text-xl font-bold">Polls and wheel/game</h2>
          <div className="grid gap-3 md:grid-cols-3">
            <input className="min-h-12 rounded-xl border border-white/10 bg-white/[0.06] px-3 outline-none" defaultValue="Poll: choose next theme" />
            <input className="min-h-12 rounded-xl border border-white/10 bg-white/[0.06] px-3 outline-none" defaultValue="Wheel options: A, B, C" />
            <input className="min-h-12 rounded-xl border border-white/10 bg-white/[0.06] px-3 outline-none" defaultValue="15 tokens" />
          </div>
          <Button onClick={() => setSaved("Poll/wheel interaction published to mock live room.")}>Publish interaction</Button>
        </Card>
      </div>
      {saved ? <div className="mt-5"><SuccessState title="Automation state" message={saved} /></div> : null}
      <div className="mt-8">
        <DeveloperNotes
          note={note({
            purpose: "Configure creator goals, bots, announcement triggers, polls, wheel/game controls.",
            role: "Model / Creator",
            buttons: ["Save goal", "Preview bot message", "Publish interaction"],
            actions: ["Toggle bots", "Save trigger rules", "Preview chat bot output", "Publish paid interaction"],
            api: ["PATCH /goals", "PATCH /bots", "POST /interactions/games"],
            businessRule: "Automation messages must respect chat moderation, cooldowns, and room rules."
          })}
        />
      </div>
    </ModelShell>
  );
}

export function ModelEarningsPage() {
  const payoutStatus = useDemoStore((state) => state.payoutStatus);
  const requestPayout = useDemoStore((state) => state.requestPayout);

  return (
    <ModelShell>
      <PageHeader eyebrow="Earnings and payout" title="Revenue, token sources, and payout settings" description="Show creator earnings by source, transaction list, dummy chart, threshold logic, and payout processing state." />
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <Metric label="Today" value="1,420" />
        <Metric label="Weekly" value="8,930" />
        <Metric label="Monthly" value="28,400" />
        <Metric label="Eligible payout" value="5,800" />
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_.8fr]">
        <Card>
          <h2 className="mb-4 font-bold">Income chart</h2>
          <ChartBars data={chartBars} />
        </Card>
        <Card className="space-y-4">
          <h2 className="font-bold">Payout settings</h2>
          <select className="min-h-12 w-full rounded-xl border border-white/10 bg-[#111529] px-3 outline-none"><option>Bank transfer</option><option>Crypto wallet</option></select>
          <div className="rounded-xl bg-white/[0.045] p-3">Minimum threshold: 5,000 tokens</div>
          <div className="rounded-xl bg-white/[0.045] p-3">Method change delay warning: payout may be delayed.</div>
          <PayoutStatusBadge status={payoutStatus} />
          <GradientButton disabled={payoutStatus === "processing"} onClick={requestPayout}>Request payout</GradientButton>
        </Card>
      </div>
      <div className="mt-6">
        <AdminTable
          headers={["Source", "Tokens", "Status"]}
          rows={[["Tips", "3,200", "Settled"], ["Private shows", "4,100", "Settled"], ["Paid content", "1,240", "Settled"], ["Fan club", "820", "Settled"]]}
        />
      </div>
      <div className="mt-8">
        <DeveloperNotes
          note={note({
            purpose: "Display earnings, source attribution, payout method, threshold, and request state.",
            role: "Model / Creator",
            buttons: ["Request payout"],
            actions: ["If threshold met, set payout to processing", "Below threshold disables payout in production"],
            api: ["GET /creator/earnings", "PATCH /payouts/method", "POST /payouts/request"],
            businessRule: "Payout requires threshold, valid method, no compliance hold, and admin review."
          })}
        />
      </div>
    </ModelShell>
  );
}

export function ModelModerationPage() {
  const [banned, setBanned] = useState(["SpamGuest"]);
  const [word, setWord] = useState("");
  const [words, setWords] = useState(["blocked-term"]);

  return (
    <ModelShell>
      <PageHeader eyebrow="Creator safety" title="Moderation panel" description="Manage banned users, muted users, word filters, grey users, trusted moderators, and reports." />
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="space-y-4">
          <h2 className="font-bold">Banned users</h2>
          <div className="flex gap-2">
            <input className="min-h-11 flex-1 rounded-xl border border-white/10 bg-white/[0.06] px-3 outline-none" placeholder="Username" onKeyDown={(event) => {
              if (event.key === "Enter" && event.currentTarget.value) {
                setBanned((list) => [...list, event.currentTarget.value]);
                event.currentTarget.value = "";
              }
            }} />
          </div>
          {banned.map((user) => (
            <div key={user} className="flex items-center justify-between rounded-xl bg-white/[0.045] p-3">
              {user}
              <Button className="h-8 px-2" onClick={() => setBanned((list) => list.filter((item) => item !== user))}>Unban</Button>
            </div>
          ))}
        </Card>
        <Card className="space-y-4">
          <h2 className="font-bold">Word filter and reports</h2>
          <div className="flex gap-2">
            <input className="min-h-11 flex-1 rounded-xl border border-white/10 bg-white/[0.06] px-3 outline-none" placeholder="Add filtered word" value={word} onChange={(event) => setWord(event.target.value)} />
            <Button onClick={() => {
              if (word) setWords((list) => [...list, word]);
              setWord("");
            }}>Add</Button>
          </div>
          <div className="flex flex-wrap gap-2">{words.map((item) => <span key={item} className="rounded-full bg-white/[0.06] px-3 py-1 text-sm">{item}</span>)}</div>
          <label className="flex items-center gap-3"><input type="checkbox" defaultChecked /> Hide grey users</label>
          <div className="grid gap-2 sm:grid-cols-4">
            {["Warn", "Mute", "Ban", "Dismiss"].map((action) => <Button key={action}>{action}</Button>)}
          </div>
        </Card>
      </div>
      <div className="mt-8">
        <DeveloperNotes
          note={note({
            purpose: "Creator room-level moderation controls and report actions.",
            role: "Model / Creator",
            buttons: ["Add banned user", "Unban", "Add word", "Warn", "Mute", "Ban", "Dismiss"],
            actions: ["Ban blocks access", "Mute removes message permission", "Word filter applies to chat"],
            api: ["POST /moderation/ban", "POST /moderation/mute", "PATCH /word-filter"]
          })}
        />
      </div>
    </ModelShell>
  );
}

export function AdminDashboardPage() {
  return (
    <AdminShell>
      <AdminSection>
        <PageHeader eyebrow="Platform operations" title="Admin dashboard" description="Marketplace health, users, models, tokens, revenue, KYC, reports, payouts, failures, and fraud flags." />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
          {adminStats.map((stat) => <AdminStatCard key={stat.label} stat={stat} />)}
        </div>
        <div className="mt-8">
          <DeveloperNotes
            note={note({
              purpose: "Summarize platform operations and route admins into review queues.",
              role: "Admin / Platform",
              buttons: ["Metric cards", "Sidebar navigation"],
              actions: ["Navigate to KYC, reports, payouts, analytics"],
              api: ["GET /admin/overview"],
              businessRule: "Admin metrics require role permissions and audit access."
            })}
          />
        </div>
      </AdminSection>
    </AdminShell>
  );
}

export function AdminUsersPage() {
  const [drawer, setDrawer] = useState("");
  return (
    <AdminShell>
      <AdminSection>
        <PageHeader eyebrow="User management" title="Viewer accounts, wallet, verification, and bans" description="Search/filter users, inspect balances, verification, token counts, and open history drawer." />
        <Card className="mb-5">
          <input className="min-h-12 w-full rounded-xl border border-white/10 bg-white/[0.06] px-3 outline-none" placeholder="Search users or filter by verification/status" />
        </Card>
        <AdminTable
          headers={["User", "Wallet", "Payment verification", "Tx count", "Status", "Action"]}
          rows={[
            ["DemoViewer", "180", "Pending", "28", "Active", <Button key="view" onClick={() => setDrawer("DemoViewer history drawer opened.")}>View history</Button>],
            ["TokenBuyer", "920", "Approved", "140", "Active", <Button key="ban">Suspend</Button>],
            ["RiskCase", "12", "Rejected", "4", "Risk hold", <Button key="ban2"><Ban size={15} /> Ban</Button>]
          ]}
        />
        {drawer ? <div className="mt-5"><SuccessState title="History drawer" message={drawer} /></div> : null}
        <div className="mt-8">
          <DeveloperNotes note={note({ purpose: "Manage viewer accounts, wallet state, payment verification, and history.", role: "Admin / Platform", api: ["GET /admin/users", "PATCH /admin/users/:id/status"] })} />
        </div>
      </AdminSection>
    </AdminShell>
  );
}

export function AdminModelsPage() {
  const [reason, setReason] = useState("");
  const [result, setResult] = useState("");

  return (
    <AdminShell>
      <AdminSection>
        <PageHeader eyebrow="Model management and KYC" title="Creator approval, KYC review, and suspension" description="Review creator list, live status, earnings, profile approval, KYC placeholders, and rejection validation." />
        <AdminTable
          headers={["Model", "KYC", "Live", "Earnings", "Action"]}
          rows={creators.map((creator) => [creator.name, creator.id === "nova-live" ? "Approved" : "Pending", creator.status, `${creator.viewerCount * 12}`, <Button key={creator.id}>Review</Button>])}
        />
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <SafePlaceholder label="Uploaded ID placeholder" className="h-72" />
          <SafePlaceholder label="Selfie placeholder" className="h-72" />
        </div>
        <Card className="mt-6 space-y-4">
          <h2 className="font-bold">KYC decision</h2>
          <label className="flex items-center gap-3"><input type="checkbox" /> ID readable</label>
          <label className="flex items-center gap-3"><input type="checkbox" /> Selfie matches ID</label>
          <textarea className="min-h-24 w-full rounded-xl border border-white/10 bg-white/[0.06] p-3 outline-none" placeholder="Rejection reason" value={reason} onChange={(event) => setReason(event.target.value)} />
          <div className="flex gap-2">
            <GradientButton onClick={() => setResult(`Approved: ${approveKyc("mira-studio").status}`)}>Approve</GradientButton>
            <Button onClick={() => {
              const response = rejectKyc("mira-studio", reason);
              setResult(response.error ?? `Rejected: ${response.status}`);
            }}>Reject</Button>
          </div>
          {result ? <SuccessState title="KYC review result" message={result} /> : null}
        </Card>
        <div className="mt-8">
          <DeveloperNotes note={note({ purpose: "Admin creator management and KYC review decisioning.", role: "Admin / Platform", buttons: ["Approve", "Reject", "Suspend"], actions: ["Approve updates KYC", "Reject requires reason"], api: ["GET /admin/kyc/:id", "POST /admin/kyc/:id/decision"], businessRule: "Rejecting KYC without a reason must fail validation." })} />
        </div>
      </AdminSection>
    </AdminShell>
  );
}

export function AdminTokenLedgerPage() {
  const transactions = useDemoStore((state) => state.transactions);
  const [filter, setFilter] = useState("all");
  const filtered = filter === "all" ? transactions : transactions.filter((tx) => tx.type === filter);
  return (
    <AdminShell>
      <AdminSection>
        <PageHeader eyebrow="Finance audit" title="Token ledger" description="Immutable-style mock ledger table with user debit, model credit, commission, type, refund status, and fraud flag." />
        <div className="mb-5 flex flex-wrap gap-2">
          {["all", "tip", "private", "album", "fan_club", "recharge"].map((item) => <Button key={item} className={filter === item ? "border-rose-300/40 bg-rose-400/15" : ""} onClick={() => setFilter(item)}>{item}</Button>)}
        </div>
        <AdminTable
          headers={["Transaction", "Type", "User debit", "Model credit", "Commission", "Status", "Fraud"]}
          rows={filtered.map((tx) => [tx.id, tx.type, tx.type === "recharge" ? "+" + tx.tokenAmount : "-" + tx.tokenAmount, tx.modelId ? Math.round(tx.tokenAmount * 0.7) : "-", tx.commission ?? 0, tx.status, tx.fraudFlag ? "Flagged" : "Clear"])}
        />
        <div className="mt-8">
          <DeveloperNotes note={note({ purpose: "Audit paid interactions and wallet recharge ledger rows.", role: "Admin / Platform", buttons: ["Filter", "Transaction row"], actions: ["Filter by type/status/date", "Open detail drawer in production"], api: ["GET /admin/ledger"], businessRule: "Ledger entries should be immutable; refunds create adjustment rows." })} />
        </div>
      </AdminSection>
    </AdminShell>
  );
}

export function AdminPaymentsPage() {
  const [reason, setReason] = useState("");
  const [result, setResult] = useState("");

  return (
    <AdminShell>
      <AdminSection>
        <PageHeader eyebrow="Payments and payouts" title="Mock payment failures, verification, refunds, and payout queue" description="Approve, hold, or reject payouts with required reason rules for hold/reject." />
        <div className="grid gap-5 md:grid-cols-4">
          <Metric label="User payments" value="$82k" />
          <Metric label="Failed payments" value="2.9%" />
          <Metric label="Verification pending" value="312" />
          <Metric label="Refunds" value="18" />
        </div>
        <Card className="mt-6 space-y-4">
          <h2 className="font-bold">Payout queue</h2>
          <input className="min-h-12 w-full rounded-xl border border-white/10 bg-white/[0.06] px-3 outline-none" placeholder="Reason required for hold/reject" value={reason} onChange={(event) => setReason(event.target.value)} />
          <AdminTable
            headers={["Model", "Method", "Threshold", "Amount", "Status", "Action"]}
            rows={[
              ["NovaLive", "Bank", "Met", "$2,840", "Eligible", <div key="p1" className="flex gap-2"><Button onClick={() => setResult(approvePayout("nova-live").status)}>Approve</Button><Button onClick={() => setResult(holdPayout("nova-live", reason).error ?? "Held")}>Hold</Button><Button onClick={() => setResult(rejectPayout("nova-live", reason).error ?? "Rejected")}>Reject</Button></div>],
              ["MiraStudio", "Wallet", "Below", "$420", "Blocked", <PayoutStatusBadge key="p2" status="below_threshold" />]
            ]}
          />
          {result ? <SuccessState title="Payout action" message={result} /> : null}
        </Card>
        <div className="mt-8">
          <DeveloperNotes note={note({ purpose: "Manage payment queues, verification, refunds, and model payouts.", role: "Admin / Platform", buttons: ["Approve", "Hold", "Reject"], actions: ["Approve moves to processing", "Hold/reject require reason"], api: ["GET /admin/payouts", "POST /admin/payouts/:id/decision"], businessRule: "Payout approval requires compliance, threshold, valid method, and audit trail." })} />
        </div>
      </AdminSection>
    </AdminShell>
  );
}

export function AdminModerationPage() {
  const [result, setResult] = useState("");
  return (
    <AdminShell>
      <AdminSection>
        <PageHeader eyebrow="Platform safety" title="Moderation center" description="Reports queue, evidence placeholders, action buttons, and global word filter." />
        <AdminTable
          headers={["Report", "Type", "Reporter", "Reported", "Evidence", "Action"]}
          rows={[
            ["R-2041", "Spam", "DemoViewer", "Guest842", "Chat log", <ActionButtons key="r1" onAction={setResult} />],
            ["R-2042", "Harassment", "TokenBuyer", "RiskCase", "Room note", <ActionButtons key="r2" onAction={setResult} />],
            ["R-2043", "Payment issue", "NovaFan", "NovaLive", "Ledger row", <ActionButtons key="r3" onAction={setResult} />]
          ]}
        />
        <Card className="mt-6 space-y-3">
          <h2 className="font-bold">Global word filter</h2>
          <input className="min-h-12 w-full rounded-xl border border-white/10 bg-white/[0.06] px-3 outline-none" placeholder="Add global filtered word" />
        </Card>
        {result ? <div className="mt-5"><SuccessState title="Report action" message={result} /></div> : null}
        <div className="mt-8">
          <DeveloperNotes note={note({ purpose: "Admin report queue and global moderation controls.", role: "Admin / Platform", buttons: ["Warn", "Mute", "Ban", "Dismiss"], actions: ["Action closes report and writes audit log"], api: ["GET /admin/reports", "POST /admin/moderation/actions"] })} />
        </div>
      </AdminSection>
    </AdminShell>
  );
}

function ActionButtons({ onAction }: { onAction: (message: string) => void }) {
  return <div className="flex gap-2">{["Warn", "Mute", "Ban", "Dismiss"].map((action) => <Button key={action} onClick={() => onAction(`${action} action saved with audit log.`)}>{action}</Button>)}</div>;
}

export function AdminAnalyticsPage() {
  return (
    <AdminShell>
      <AdminSection>
        <PageHeader eyebrow="Analytics" title="Revenue, conversion, paying users, and operational health" description="Dummy charts for funnel, ARPU, model income/hour, recharge success, popular categories, and failed payments." />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          <Metric label="Active users" value="124k" />
          <Metric label="Paying users" value="42k" />
          <Metric label="ARPU" value="$31" />
          <Metric label="Recharge success" value="91%" />
        </div>
        <div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_.8fr]">
          <Card>
            <h2 className="mb-4 font-bold">Revenue chart</h2>
            <ChartBars data={chartBars} />
          </Card>
          <Card>
            <h2 className="mb-4 font-bold">Conversion funnel</h2>
            {["Visit", "Signup", "Wallet Recharge", "Tip", "Private Show"].map((item, index) => (
              <div key={item} className="mb-3 rounded-xl bg-white/[0.045] p-3">
                <div className="flex justify-between text-sm"><span>{item}</span><b>{[100, 48, 28, 21, 9][index]}%</b></div>
                <div className="mt-2 h-2 rounded-full bg-white/10"><div className="h-full rounded-full bg-brand-gradient" style={{ width: `${[100, 48, 28, 21, 9][index]}%` }} /></div>
              </div>
            ))}
          </Card>
        </div>
        <div className="mt-8">
          <DeveloperNotes note={note({ purpose: "Analyze marketplace conversion, revenue, recharge success, category popularity, and model income.", role: "Admin / Platform", buttons: ["Date filter", "Category filter"], actions: ["Refresh charts from analytics backend in production"], api: ["GET /admin/analytics"] })} />
        </div>
      </AdminSection>
    </AdminShell>
  );
}

export function PrototypeMapPage() {
  const lanes = [
    {
      title: "Viewer flow",
      nodes: ["Landing", "Age Gate", "Home / Discovery", "Profile", "Live Room", "Tip / Private / Album", "Wallet / Success State"]
    },
    {
      title: "Creator flow",
      nodes: ["Onboarding", "KYC", "Profile Setup", "Broadcast Center", "Live Control", "Pricing / Bots", "Earnings / Payout"]
    },
    {
      title: "Admin flow",
      nodes: ["Dashboard", "Users", "Creators / KYC", "Token Ledger", "Payments / Payouts", "Moderation", "Analytics"]
    }
  ];
  return (
    <main className="min-h-screen bg-soft-grid px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <PageHeader eyebrow="Clickable prototype map" title="End-to-end product architecture" description="A flow reference for founder presentation, developer handoff, and QA scenario mapping.">
          <Link href="/" className="rounded-xl border border-white/10 bg-white/[0.06] px-4 py-2 text-sm font-semibold">Back home</Link>
        </PageHeader>
        <div className="grid gap-5 lg:grid-cols-3">
          {lanes.map((lane) => (
            <PrototypeFlowCard key={lane.title} title={lane.title} nodes={lane.nodes} />
          ))}
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {[
            "Age confirmation gates viewer content.",
            "Wallet balance gates every paid action.",
            "KYC approval gates creator broadcasting.",
            "Admin moderation and payout decisions write audit logs.",
            "Real payment fulfillment must happen after backend webhook verification.",
            "All media here is neutral placeholder content."
          ].map((item) => (
            <Card key={item} className="flex items-center gap-3">
              <CheckCircle2 className="text-emerald-200" />
              {item}
            </Card>
          ))}
        </div>
        <div className="mt-8">
          <h2 className="mb-4 text-2xl font-black">Visible state screen checklist</h2>
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {[
              "Loading",
              "Empty",
              "Success",
              "Error",
              "Insufficient tokens",
              "Payment failed",
              "Payment success",
              "Payment pending",
              "Payment verification pending",
              "KYC pending",
              "KYC rejected",
              "KYC approved",
              "Creator offline",
              "Creator busy/private",
              "Chat permission blocked",
              "User banned",
              "Payout below threshold",
              "Payout processing",
              "Payout approved",
              "Report submitted"
            ].map((state) => (
              <Card key={state} className="text-sm font-semibold text-white/75">{state}</Card>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
