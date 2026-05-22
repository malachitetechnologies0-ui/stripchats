"use client";

import {
  BarChart3,
  Bell,
  Coins,
  Compass,
  Gauge,
  Heart,
  Home,
  LayoutDashboard,
  MessageSquare,
  Radio,
  Search,
  Settings,
  Shield,
  User,
  Users,
  Wallet
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { TokenBalancePill, cx } from "@/components/ui";
import type { NavItem } from "@/types";

const userNav: NavItem[] = [
  { href: "/user", label: "Home", icon: Home },
  { href: "/user/search", label: "Search", icon: Search },
  { href: "/user/favorites", label: "Favorites", icon: Heart },
  { href: "/user/wallet", label: "Wallet", icon: Wallet },
  { href: "/user/messages", label: "Messages", icon: MessageSquare }
];

const modelNav: NavItem[] = [
  { href: "/model", label: "Dashboard", icon: Gauge },
  { href: "/model/profile", label: "Profile", icon: User },
  { href: "/model/broadcast", label: "Broadcast", icon: Radio },
  { href: "/model/pricing", label: "Pricing", icon: Coins },
  { href: "/model/earnings", label: "Earnings", icon: BarChart3 },
  { href: "/model/moderation", label: "Moderation", icon: Shield }
];

const adminNav: NavItem[] = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/models", label: "Models / KYC", icon: User },
  { href: "/admin/token-ledger", label: "Token Ledger", icon: Coins },
  { href: "/admin/payments", label: "Payments", icon: Wallet },
  { href: "/admin/moderation", label: "Moderation", icon: Shield },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3 }
];

export function Brand() {
  return (
    <Link href="/" className="flex items-center gap-3">
      <div className="h-10 w-10 rounded-2xl bg-brand-gradient shadow-glow" />
      <div>
        <div className="font-black">Stripchats Demo</div>
        <div className="text-xs text-white/45">Safe wireframe prototype</div>
      </div>
    </Link>
  );
}

export function AppShell({
  children,
  nav,
  right,
  admin = false
}: {
  children: ReactNode;
  nav?: ReactNode;
  right?: ReactNode;
  admin?: boolean;
}) {
  return (
    <div className={cx("min-h-screen bg-soft-grid", admin && "lg:grid lg:grid-cols-[280px_1fr]")}>
      {admin ? nav : null}
      <div className="min-w-0">
        <header className="sticky top-0 z-40 border-b border-white/10 bg-[#070811]/85 backdrop-blur-xl">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
            <Brand />
            {!admin ? <div className="hidden items-center gap-2 lg:flex">{nav}</div> : null}
            <div className="flex items-center gap-2">{right}</div>
          </div>
          {!admin && nav ? <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 pb-3 lg:hidden">{nav}</div> : null}
        </header>
        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}

function NavLinks({ items, compact = false }: { items: NavItem[]; compact?: boolean }) {
  const pathname = usePathname();
  return (
    <>
      {items.map((item) => {
        const Icon = item.icon;
        const active = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cx(
              "inline-flex min-h-10 items-center gap-2 rounded-xl border border-transparent px-3 text-sm font-semibold text-white/60 transition hover:border-white/10 hover:bg-white/[0.06] hover:text-white",
              active && "border-rose-300/30 bg-rose-400/15 text-white",
              compact && "w-full"
            )}
          >
            <Icon size={16} />
            {item.label}
          </Link>
        );
      })}
    </>
  );
}

export function UserNav() {
  return <NavLinks items={userNav} />;
}

export function ModelNav() {
  return <NavLinks items={modelNav} />;
}

export function AdminSidebar() {
  return (
    <aside className="sticky top-0 hidden h-screen border-r border-white/10 bg-[#0d1020]/80 p-5 backdrop-blur-xl lg:block">
      <Brand />
      <div className="mt-8 space-y-2">
        <NavLinks items={adminNav} compact />
      </div>
      <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/10 bg-white/[0.055] p-4 text-sm text-white/60">
        <div className="flex items-center gap-2 font-bold text-white">
          <Shield size={16} />
          Safe prototype
        </div>
        <p className="mt-2">Neutral placeholders only. No real payment keys or explicit media.</p>
      </div>
    </aside>
  );
}

export function UserShell({ children }: { children: ReactNode }) {
  return (
    <AppShell nav={<UserNav />} right={<TokenBalancePill />}>
      {children}
    </AppShell>
  );
}

export function ModelShell({ children }: { children: ReactNode }) {
  return (
    <AppShell nav={<ModelNav />} right={<Link href="/prototype-map" className="rounded-xl border border-white/10 bg-white/[0.06] px-3 py-2 text-sm font-semibold">Prototype Map</Link>}>
      {children}
    </AppShell>
  );
}

export function AdminShell({ children }: { children: ReactNode }) {
  return (
    <AppShell
      admin
      nav={<AdminSidebar />}
      right={
        <>
          <Link href="/prototype-map" className="hidden rounded-xl border border-white/10 bg-white/[0.06] px-3 py-2 text-sm font-semibold sm:inline-flex">
            Prototype Map
          </Link>
          <span className="inline-flex items-center gap-2 rounded-xl border border-emerald-300/20 bg-emerald-400/10 px-3 py-2 text-sm text-emerald-100">
            <Bell size={15} /> Admin
          </span>
        </>
      }
    >
      {children}
    </AppShell>
  );
}

export function PageHeader({
  eyebrow,
  title,
  description,
  children
}: {
  eyebrow?: string;
  title: string;
  description: string;
  children?: ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
      <div>
        {eyebrow ? <div className="mb-3 inline-flex rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-xs font-bold uppercase tracking-wide text-white/55">{eyebrow}</div> : null}
        <h1 className="max-w-4xl text-4xl font-black tracking-tight md:text-6xl">{title}</h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-white/62">{description}</p>
      </div>
      {children}
    </div>
  );
}

export function DemoNotice() {
  return (
    <div className="rounded-2xl border border-amber-300/20 bg-amber-400/10 p-4 text-sm text-amber-100">
      This is a safe wireframe/prototype demo using placeholder content only.
    </div>
  );
}

export function MobileAdminNav() {
  return (
    <div className="mb-6 flex gap-2 overflow-x-auto lg:hidden">
      <NavLinks items={adminNav} />
    </div>
  );
}

export function SectionGrid({ children }: { children: ReactNode }) {
  return <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">{children}</div>;
}

export function AdminSection({ children }: { children: ReactNode }) {
  return (
    <>
      <MobileAdminNav />
      {children}
    </>
  );
}

export function MarketplaceSearchLink() {
  return (
    <Link href="/user/search" className="flex min-h-12 flex-1 items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] px-4 text-sm text-white/50">
      <Compass size={18} /> Search creators, category, language
    </Link>
  );
}

export function SettingsButton() {
  return (
    <button className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06]">
      <Settings size={17} />
    </button>
  );
}
