"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangle,
  BadgeCheck,
  Ban,
  Bot,
  CheckCircle2,
  ChevronRight,
  Coins,
  CreditCard,
  Crown,
  Gift,
  Heart,
  Loader2,
  Lock,
  MessageSquare,
  Play,
  Radio,
  Shield,
  Ticket,
  Users,
  Wallet,
  X
} from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { creators } from "@/data/creators";
import { tokenPackages } from "@/data/tokenPackages";
import { handleMockPayment, type PaymentMethod } from "@/lib/mockPayment";
import { useDemoStore } from "@/lib/store";
import type { AdminStat, Creator, CreatorStatus, DeveloperNote, TokenPackage } from "@/types";

export function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function Button({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { children: ReactNode }) {
  return (
    <button
      className={cx(
        "inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.06] px-4 py-2 text-sm font-semibold text-white transition hover:border-white/20 hover:bg-white/[0.1] disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function GradientButton({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { children: ReactNode }) {
  return (
    <button
      className={cx(
        "inline-flex min-h-10 items-center justify-center gap-2 rounded-xl bg-brand-gradient px-4 py-2 text-sm font-bold text-white shadow-glow transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cx("rounded-2xl border border-white/10 bg-white/[0.055] p-5 shadow-panel backdrop-blur", className)}>
      {children}
    </div>
  );
}

export function SafePlaceholder({ label, className }: { label: string; className?: string }) {
  return (
    <div className={cx("safe-placeholder relative overflow-hidden rounded-2xl border border-white/10", className)}>
      <div className="absolute left-6 top-6 h-20 w-20 rounded-full bg-white/15 blur-lg" />
      <div className="absolute bottom-0 right-10 h-28 w-28 rounded-full bg-black/25 blur-xl" />
      <span className="absolute bottom-4 left-4 text-xs text-white/70">{label}</span>
    </div>
  );
}

export function Modal({
  title,
  children,
  open,
  onClose
}: {
  title: string;
  children: ReactNode;
  open: boolean;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="w-full max-w-lg rounded-2xl border border-white/10 bg-[#111529] p-5 shadow-panel"
            initial={{ y: 18, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 18, opacity: 0 }}
          >
            <div className="mb-4 flex items-center justify-between gap-4">
              <h2 className="text-xl font-bold">{title}</h2>
              <Button className="h-9 w-9 p-0" onClick={onClose} aria-label="Close modal">
                <X size={16} />
              </Button>
            </div>
            {children}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export function BottomSheet({
  title,
  open,
  onClose,
  children
}: {
  title: string;
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.div
            className="fixed inset-x-0 bottom-0 mx-auto max-w-2xl rounded-t-3xl border border-white/10 bg-[#111529] p-5 shadow-panel"
            initial={{ y: 360 }}
            animate={{ y: 0 }}
            exit={{ y: 360 }}
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold">{title}</h2>
              <Button className="h-9 w-9 p-0" onClick={onClose} aria-label="Close sheet">
                <X size={16} />
              </Button>
            </div>
            {children}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export function Toast({ message, tone = "success" }: { message: string; tone?: "success" | "error" | "info" }) {
  return (
    <motion.div
      className={cx(
        "fixed bottom-5 right-5 z-[60] max-w-sm rounded-2xl border px-4 py-3 text-sm shadow-panel",
        tone === "success" && "border-emerald-400/25 bg-emerald-400/15 text-emerald-100",
        tone === "error" && "border-rose-400/25 bg-rose-400/15 text-rose-100",
        tone === "info" && "border-white/10 bg-white/10 text-white"
      )}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {message}
    </motion.div>
  );
}

export function LiveBadge() {
  return <span className="inline-flex items-center gap-1 rounded-full bg-rose-500/15 px-2.5 py-1 text-xs font-bold text-rose-200">LIVE</span>;
}

export function StatusBadge({ status }: { status: CreatorStatus }) {
  const map = {
    online: "bg-emerald-400/15 text-emerald-200 border-emerald-300/20",
    busy: "bg-orange-400/15 text-orange-200 border-orange-300/20",
    offline: "bg-slate-400/15 text-slate-300 border-slate-300/15"
  };
  return <span className={cx("rounded-full border px-2.5 py-1 text-xs font-bold capitalize", map[status])}>{status}</span>;
}

export function KycStatusBadge({ status }: { status: "pending" | "approved" | "rejected" }) {
  return (
    <span
      className={cx(
        "rounded-full border px-2.5 py-1 text-xs font-bold capitalize",
        status === "approved" && "border-emerald-300/20 bg-emerald-400/15 text-emerald-200",
        status === "pending" && "border-amber-300/20 bg-amber-400/15 text-amber-200",
        status === "rejected" && "border-rose-300/20 bg-rose-400/15 text-rose-200"
      )}
    >
      KYC {status}
    </span>
  );
}

export function PayoutStatusBadge({ status }: { status: string }) {
  return (
    <span className="rounded-full border border-violet-300/20 bg-violet-400/15 px-2.5 py-1 text-xs font-bold capitalize text-violet-100">
      {status.replace("_", " ")}
    </span>
  );
}

export function TokenBalancePill() {
  const walletBalance = useDemoStore((state) => state.walletBalance);
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-amber-300/20 bg-amber-400/15 px-3 py-1.5 text-sm font-bold text-amber-100">
      <Coins size={16} />
      {walletBalance} tokens
    </span>
  );
}

export function GoalProgress({ current, target }: { current: number; target: number }) {
  const percentage = Math.min(100, Math.round((current / target) * 100));
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="text-white/70">Goal progress</span>
        <span className="font-bold">{percentage}%</span>
      </div>
      <div className="h-2.5 overflow-hidden rounded-full bg-white/10">
        <div className="h-full rounded-full bg-brand-gradient" style={{ width: `${percentage}%` }} />
      </div>
    </div>
  );
}

export function CreatorCard({ creator }: { creator: Creator }) {
  const favorites = useDemoStore((state) => state.favorites);
  const toggleFavorite = useDemoStore((state) => state.toggleFavorite);
  const saved = favorites.includes(creator.id);

  return (
    <motion.div
      className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.055] shadow-panel"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <Link href={`/user/creator/${creator.id}`}>
        <SafePlaceholder label="Blurred safe creator placeholder" className="h-44 rounded-none border-0" />
      </Link>
      <div className="space-y-4 p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold">{creator.name}</h3>
              {creator.verified ? <BadgeCheck size={16} className="text-sky-300" /> : null}
            </div>
            <p className="mt-1 text-sm text-white/55">
              {creator.category} • {creator.language}
            </p>
          </div>
          <StatusBadge status={creator.status} />
        </div>
        <div className="flex items-center justify-between text-sm text-white/60">
          <span>{creator.viewerCount.toLocaleString()} viewers</span>
          <Button className={cx("h-9 w-9 p-0", saved && "border-rose-300/30 bg-rose-400/15 text-rose-100")} onClick={() => toggleFavorite(creator.id)}>
            <Heart size={16} fill={saved ? "currentColor" : "none"} />
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-2">
              <Link className="inline-flex min-h-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] text-sm font-semibold" href={`/user/creator/${creator.id}`}>
            View Profile
          </Link>
          <Link className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl bg-brand-gradient text-sm font-bold" href={`/user/live/${creator.id}`}>
            <Play size={15} /> Watch Live
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export function ChatBubble({ author, text, system }: { author: string; text: string; system?: boolean }) {
  return (
    <div className={cx("rounded-xl p-3 text-sm", system ? "border border-amber-300/15 bg-amber-400/10" : "bg-white/[0.06]")}>
      <div className="font-bold text-white">{author}</div>
      <div className="mt-1 text-white/70">{text}</div>
    </div>
  );
}

export function ChatPanel() {
  const messages = useDemoStore((state) => state.chatMessages);
  const addChatMessage = useDemoStore((state) => state.addChatMessage);
  const [message, setMessage] = useState("");

  return (
    <Card className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-bold">Public chat</h3>
        <span className="text-xs text-white/50">Registered/token buyer rules supported</span>
      </div>
      <div className="max-h-80 space-y-3 overflow-auto pr-1">
        {messages.map((item) => (
          <ChatBubble key={item.id} {...item} />
        ))}
      </div>
      <div className="flex gap-2">
        <input
          className="min-h-11 flex-1 rounded-xl border border-white/10 bg-white/[0.06] px-3 text-sm outline-none focus:border-rosefire/60"
          placeholder="Write a safe demo chat message"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        />
        <GradientButton
          onClick={() => {
            addChatMessage(message || "Prototype chat message sent.");
            setMessage("");
          }}
        >
          Send
        </GradientButton>
      </div>
    </Card>
  );
}

export function TipModal({ creator, open, onClose }: { creator: Creator; open: boolean; onClose: () => void }) {
  const spendTokens = useDemoStore((state) => state.spendTokens);
  const addChatMessage = useDemoStore((state) => state.addChatMessage);
  const [amount, setAmount] = useState(25);
  const [status, setStatus] = useState<string | null>(null);

  return (
    <Modal title={`Tip ${creator.name}`} open={open} onClose={onClose}>
      <div className="space-y-4">
        <TokenBalancePill />
        <div className="grid grid-cols-4 gap-2">
          {[10, 25, 50, 100].map((value) => (
            <Button key={value} className={amount === value ? "border-rose-300/40 bg-rose-400/15" : ""} onClick={() => setAmount(value)}>
              {value}
            </Button>
          ))}
        </div>
        <input className="w-full rounded-xl border border-white/10 bg-white/[0.06] px-3 py-3 outline-none" value={amount} onChange={(event) => setAmount(Number(event.target.value) || 0)} />
        {status ? <p className="text-sm text-amber-100">{status}</p> : null}
        <GradientButton
          className="w-full"
          onClick={() => {
            const ok = spendTokens(amount, `Tip to ${creator.name}`, "tip", creator.id);
            if (ok) {
              addChatMessage(`Tip announcement: ${amount} tokens sent to ${creator.name}.`, "Tip Bot", true);
              setStatus("Tip sent. Goal progress and chat announcement updated.");
            } else {
              setStatus("Insufficient tokens. Use the wallet recharge flow.");
            }
          }}
        >
          <Gift size={16} /> Send tip
        </GradientButton>
      </div>
    </Modal>
  );
}

export function TipMenuSheet({ creator, open, onClose }: { creator: Creator; open: boolean; onClose: () => void }) {
  const spendTokens = useDemoStore((state) => state.spendTokens);
  const addChatMessage = useDemoStore((state) => state.addChatMessage);
  const [message, setMessage] = useState("");

  return (
    <BottomSheet title="Tip menu" open={open} onClose={onClose}>
      <div className="space-y-3">
        {creator.tipMenu.map((item) => (
          <button
            key={item.id}
            className="flex w-full items-center justify-between rounded-xl border border-white/10 bg-white/[0.06] p-4 text-left"
            onClick={() => {
              const ok = spendTokens(item.tokens, `Tip menu: ${item.label}`, "tip", creator.id);
              if (ok) {
                addChatMessage(`Tip menu paid: ${item.label} (${item.tokens} tokens).`, "Tip Bot", true);
                setMessage("Paid interaction posted to chat.");
              } else {
                setMessage("Insufficient tokens. Recharge required.");
              }
            }}
          >
            <span className="font-semibold">{item.label}</span>
            <span className="rounded-full bg-amber-400/15 px-3 py-1 text-sm font-bold text-amber-100">{item.tokens}</span>
          </button>
        ))}
        {message ? <p className="text-sm text-amber-100">{message}</p> : null}
      </div>
    </BottomSheet>
  );
}

export function WalletPackageCard({ pack, onSelect }: { pack: TokenPackage; onSelect: (pack: TokenPackage) => void }) {
  return (
    <button
      onClick={() => onSelect(pack)}
      className={cx(
        "rounded-2xl border p-5 text-left transition hover:-translate-y-1",
        pack.highlight ? "border-rose-300/40 bg-rose-400/15 shadow-glow" : "border-white/10 bg-white/[0.055]"
      )}
    >
      <div className="flex items-center justify-between">
        <h3 className="font-bold">{pack.label}</h3>
        {pack.highlight ? <span className="rounded-full bg-brand-gradient px-2 py-1 text-xs font-bold">Best value</span> : null}
      </div>
      <div className="mt-4 text-3xl font-black">{pack.tokens}</div>
      <div className="mt-1 text-sm text-white/55">tokens</div>
      <div className="mt-5 text-lg font-bold text-amber-100">{pack.price}</div>
    </button>
  );
}

export function PaymentCheckoutModal({
  selectedPackage,
  open,
  onClose
}: {
  selectedPackage: TokenPackage | null;
  open: boolean;
  onClose: () => void;
}) {
  const addTokens = useDemoStore((state) => state.addTokens);
  const [method, setMethod] = useState<PaymentMethod>("card");
  const [status, setStatus] = useState<string | null>(null);

  if (!selectedPackage) return null;

  const pay = (forcedStatus: "success" | "failed" | "pending") => {
    const result = handleMockPayment(selectedPackage.id, method, forcedStatus);
    addTokens(result.tokens, result.message, result.status);
    setStatus(result.message);
  };

  return (
    <Modal title="Mock payment gateway" open={open} onClose={onClose}>
      <div className="space-y-4">
        <div className="rounded-xl border border-white/10 bg-white/[0.06] p-4">
          <div className="text-sm text-white/55">Selected package</div>
          <div className="mt-1 text-2xl font-black">{selectedPackage.tokens} tokens</div>
        </div>
        <div className="grid grid-cols-2 gap-2 md:grid-cols-5">
          {(["card", "upi", "netbanking", "wallet", "paypal"] as PaymentMethod[]).map((item) => (
            <Button key={item} className={method === item ? "border-rose-300/40 bg-rose-400/15" : ""} onClick={() => setMethod(item)}>
              {item === "paypal" ? "Mock PayPal" : item}
            </Button>
          ))}
        </div>
        <div className="grid gap-2 sm:grid-cols-3">
          <GradientButton onClick={() => pay("success")}>
            <CheckCircle2 size={16} /> Pay success
          </GradientButton>
          <Button onClick={() => pay("pending")}>
            <Loader2 size={16} /> Pending
          </Button>
          <Button onClick={() => pay("failed")}>
            <AlertTriangle size={16} /> Failed
          </Button>
        </div>
        {status ? <SuccessState title="Gateway response" message={status} /> : null}
      </div>
    </Modal>
  );
}

export function PrivateShowModal({ creator, open, onClose }: { creator: Creator; open: boolean; onClose: () => void }) {
  const spendTokens = useDemoStore((state) => state.spendTokens);
  const [active, setActive] = useState(false);
  const [error, setError] = useState("");
  const minimum = creator.tokenRatePrivate * 3;

  return (
    <Modal title="Private show confirmation" open={open} onClose={onClose}>
      {active ? (
        <PrivateShowActive creator={creator} onEnd={() => setActive(false)} />
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.06] p-4">
            <span>Rate</span>
            <b>{creator.tokenRatePrivate} tokens/min</b>
          </div>
          <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.06] p-4">
            <span>Minimum balance</span>
            <b>{minimum} tokens</b>
          </div>
          {error ? <ErrorState title="Balance check failed" message={error} /> : null}
          <GradientButton
            className="w-full"
            onClick={() => {
              const ok = spendTokens(minimum, `Private show reserve for ${creator.name}`, "private", creator.id);
              if (ok) setActive(true);
              else setError("Insufficient token balance. Recharge before starting private show.");
            }}
          >
            <Lock size={16} /> Confirm private show
          </GradientButton>
        </div>
      )}
    </Modal>
  );
}

export function PrivateShowActive({ creator, onEnd }: { creator: Creator; onEnd?: () => void }) {
  const walletBalance = useDemoStore((state) => state.walletBalance);
  const spendTokens = useDemoStore((state) => state.spendTokens);
  const [seconds, setSeconds] = useState(0);
  const [ended, setEnded] = useState(false);

  useEffect(() => {
    if (ended) return undefined;
    const interval = window.setInterval(() => {
      setSeconds((value) => value + 1);
      if ((seconds + 1) % 10 === 0) {
        const ok = spendTokens(creator.tokenRatePrivate, "Private show minute deduction", "private", creator.id);
        if (!ok) setEnded(true);
      }
    }, 1000);
    return () => window.clearInterval(interval);
  }, [creator.id, creator.tokenRatePrivate, ended, seconds, spendTokens]);

  if (ended) {
    return (
      <SuccessState
        title="Session summary"
        message={`Session ended after ${seconds}s. Ledger summary saved for viewer, creator, and admin review.`}
      />
    );
  }

  return (
    <div className="space-y-4">
      <SafePlaceholder label="Private show video placeholder" className="h-64" />
      <div className="grid gap-3 sm:grid-cols-3">
        <Metric label="Timer" value={`${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`} />
        <Metric label="Deduction" value={`${creator.tokenRatePrivate}/10s demo`} />
        <Metric label="Remaining" value={`${walletBalance} tokens`} />
      </div>
      {walletBalance < creator.tokenRatePrivate * 2 ? <RechargePrompt /> : null}
      <Button
        className="w-full border-rose-300/30 bg-rose-400/15 text-rose-100"
        onClick={() => {
          setEnded(true);
          onEnd?.();
        }}
      >
        End session
      </Button>
    </div>
  );
}

export function RechargePrompt() {
  return (
    <div className="rounded-xl border border-amber-300/20 bg-amber-400/10 p-4 text-sm text-amber-100">
      Low or insufficient token balance. Open the wallet and recharge with the mock payment gateway.
    </div>
  );
}

export function PaidAlbumCard({ creator, album }: { creator: Creator; album: Creator["albums"][number] }) {
  const unlockedAlbums = useDemoStore((state) => state.unlockedAlbums);
  const unlockAlbum = useDemoStore((state) => state.unlockAlbum);
  const [message, setMessage] = useState("");
  const unlocked = unlockedAlbums.includes(album.id);

  return (
    <Card className="space-y-4">
      <SafePlaceholder label={unlocked ? "Unlocked safe placeholder" : "Locked preview placeholder"} className="h-36" />
      <div className="flex items-center justify-between gap-3">
        <div>
          <h3 className="font-bold">{album.title}</h3>
          <p className="text-sm text-white/55">Duplicate purchase prevention enabled</p>
        </div>
        <span className="rounded-full bg-amber-400/15 px-3 py-1 text-sm font-bold text-amber-100">{album.price}</span>
      </div>
      <GradientButton
        className="w-full"
        disabled={unlocked}
        onClick={() => {
          const ok = unlockAlbum(album.id, album.price, creator.id);
          setMessage(ok ? "Album unlocked." : "Insufficient tokens. Recharge required.");
        }}
      >
        {unlocked ? "Unlocked" : "Unlock album"}
      </GradientButton>
      {message ? <p className="text-sm text-amber-100">{message}</p> : null}
    </Card>
  );
}

export function FanClubCard({ creator }: { creator: Creator }) {
  const fanClubSubscriptions = useDemoStore((state) => state.fanClubSubscriptions);
  const subscribeFanClub = useDemoStore((state) => state.subscribeFanClub);
  const [message, setMessage] = useState("");
  const active = fanClubSubscriptions.includes(creator.id);

  return (
    <Card className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="flex items-center gap-2 font-bold">
            <Crown size={18} className="text-amber-200" /> Fan Club
          </h3>
          <p className="text-sm text-white/55">Badge, subscriber chat, and monthly safe content drops.</p>
        </div>
        <span className="rounded-full bg-amber-400/15 px-3 py-1 text-sm font-bold text-amber-100">{creator.fanClubPrice}/mo</span>
      </div>
      <GradientButton
        className="w-full"
        disabled={active}
        onClick={() => {
          const ok = subscribeFanClub(creator.id, creator.fanClubPrice);
          setMessage(ok ? "Fan badge active." : "Insufficient tokens. Recharge required.");
        }}
      >
        {active ? "Subscribed" : "Subscribe"}
      </GradientButton>
      {message ? <p className="text-sm text-amber-100">{message}</p> : null}
    </Card>
  );
}

export function ReportModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [submitted, setSubmitted] = useState(false);
  return (
    <Modal title="Report / block" open={open} onClose={onClose}>
      {submitted ? (
        <SuccessState title="Report submitted" message="The report is queued for admin moderation and block rules can be applied." />
      ) : (
        <div className="space-y-3">
          {["Spam or scam", "Harassment", "Policy concern", "Payment issue"].map((reason) => (
            <label key={reason} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.06] p-3">
              <input type="radio" name="reason" />
              <span>{reason}</span>
            </label>
          ))}
          <textarea className="min-h-24 w-full rounded-xl border border-white/10 bg-white/[0.06] p-3 outline-none" placeholder="Optional details for moderators" />
          <label className="flex items-center gap-3 text-sm text-white/70">
            <input type="checkbox" /> Block future interactions
          </label>
          <GradientButton className="w-full" onClick={() => setSubmitted(true)}>
            Submit report
          </GradientButton>
        </div>
      )}
    </Modal>
  );
}

export function AdminStatCard({ stat }: { stat: AdminStat }) {
  return (
    <Card className="min-h-32">
      <p className="text-sm text-white/55">{stat.label}</p>
      <div className="mt-4 text-3xl font-black">{stat.value}</div>
      <span
        className={cx(
          "mt-4 inline-flex rounded-full px-2.5 py-1 text-xs font-bold capitalize",
          stat.tone === "success" && "bg-emerald-400/15 text-emerald-200",
          stat.tone === "warning" && "bg-amber-400/15 text-amber-200",
          stat.tone === "danger" && "bg-rose-400/15 text-rose-200",
          stat.tone === "default" && "bg-white/10 text-white/70"
        )}
      >
        {stat.tone}
      </span>
    </Card>
  );
}

export function AdminTable({
  headers,
  rows
}: {
  headers: string[];
  rows: Array<Array<ReactNode>>;
}) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/[0.04]">
      <table className="w-full min-w-[760px] border-collapse text-left text-sm">
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header} className="border-b border-white/10 px-4 py-3 text-xs font-bold uppercase tracking-wide text-white/45">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={`row-${rowIndex}`} className="border-b border-white/5 last:border-0">
              {row.map((cell, cellIndex) => (
                <td key={`${rowIndex}-${cellIndex}`} className="px-4 py-4 text-white/75">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function EmptyState({ title, message }: { title: string; message: string }) {
  return <StateFrame icon={<MessageSquare size={20} />} title={title} message={message} />;
}

export function ErrorState({ title, message }: { title: string; message: string }) {
  return <StateFrame icon={<AlertTriangle size={20} />} title={title} message={message} tone="error" />;
}

export function SuccessState({ title, message }: { title: string; message: string }) {
  return <StateFrame icon={<CheckCircle2 size={20} />} title={title} message={message} tone="success" />;
}

export function LoadingState({ title = "Loading state" }: { title?: string }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.055] p-5 text-white/70">
      <Loader2 size={20} className="animate-spin" />
      {title}
    </div>
  );
}

function StateFrame({
  icon,
  title,
  message,
  tone = "default"
}: {
  icon: ReactNode;
  title: string;
  message: string;
  tone?: "default" | "success" | "error";
}) {
  return (
    <div
      className={cx(
        "rounded-2xl border p-4",
        tone === "default" && "border-white/10 bg-white/[0.055]",
        tone === "success" && "border-emerald-300/20 bg-emerald-400/10",
        tone === "error" && "border-rose-300/20 bg-rose-400/10"
      )}
    >
      <div className="flex items-center gap-3 font-bold">
        {icon}
        {title}
      </div>
      <p className="mt-2 text-sm text-white/65">{message}</p>
    </div>
  );
}

export function DeveloperNotes({ note }: { note: DeveloperNote }) {
  const items = [
    ["Page purpose", note.purpose],
    ["Primary role", note.role],
    ["Main buttons", note.buttons.join(", ")],
    ["Click actions", note.actions.join("; ")],
    ["Required API", note.api.join(", ")],
    ["Success state", note.success],
    ["Error state", note.error],
    ["Business rule", note.businessRule]
  ];
  return (
    <Card className="space-y-4">
      <div className="flex items-center gap-2">
        <Shield size={18} className="text-sky-200" />
        <h3 className="font-bold">Developer Notes</h3>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {items.map(([label, value]) => (
          <div key={label} className="rounded-xl bg-white/[0.045] p-3">
            <div className="text-[11px] font-bold uppercase tracking-wide text-white/40">{label}</div>
            <div className="mt-1 text-sm text-white/70">{value}</div>
          </div>
        ))}
      </div>
    </Card>
  );
}

export function Metric({ label, value, icon }: { label: string; value: string; icon?: ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.055] p-4">
      <div className="flex items-center gap-2 text-sm text-white/55">
        {icon}
        {label}
      </div>
      <div className="mt-3 text-2xl font-black">{value}</div>
    </div>
  );
}

export function ChartBars({ data }: { data: number[] }) {
  return (
    <div className="flex h-56 items-end gap-2 rounded-2xl border border-white/10 bg-white/[0.045] p-4">
      {data.map((height, index) => (
        <div key={`${height}-${index}`} className="flex-1 rounded-t-lg bg-brand-gradient" style={{ height: `${height}%` }} />
      ))}
    </div>
  );
}

export function RoleCard({
  title,
  description,
  href,
  icon,
  bullets
}: {
  title: string;
  description: string;
  href: string;
  icon: ReactNode;
  bullets: string[];
}) {
  return (
    <motion.div whileHover={{ y: -6 }} className="rounded-3xl border border-white/10 bg-white/[0.055] p-6 shadow-panel">
      <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-gradient">{icon}</div>
      <h2 className="text-2xl font-black">{title}</h2>
      <p className="mt-3 text-white/65">{description}</p>
      <div className="mt-5 space-y-2">
        {bullets.map((bullet) => (
          <div key={bullet} className="flex items-center gap-2 text-sm text-white/65">
            <CheckCircle2 size={15} className="text-emerald-200" />
            {bullet}
          </div>
        ))}
      </div>
      <Link href={href} className="mt-6 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-brand-gradient px-4 text-sm font-bold">
        Open Demo <ChevronRight size={16} />
      </Link>
    </motion.div>
  );
}

export function PrototypeFlowCard({ title, nodes }: { title: string; nodes: string[] }) {
  return (
    <Card>
      <h2 className="text-xl font-black">{title}</h2>
      <div className="mt-5 space-y-3">
        {nodes.map((node) => (
          <div key={node} className="flex items-center justify-between rounded-xl bg-white/[0.045] p-3">
            <span>{node}</span>
            <span className="text-amber-200">&gt;</span>
          </div>
        ))}
      </div>
    </Card>
  );
}

export const quickIcons = {
  wallet: Wallet,
  radio: Radio,
  users: Users,
  credit: CreditCard,
  gift: Gift,
  ticket: Ticket,
  bot: Bot,
  ban: Ban
};

export function DefaultCreatorFallback() {
  return creators[0];
}

export { tokenPackages };
