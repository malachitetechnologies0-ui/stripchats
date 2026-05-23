import type { LucideIcon } from "lucide-react";

export type CreatorStatus = "online" | "busy" | "offline";
export type KycStatus = "pending" | "approved" | "rejected";
export type PaymentStatus = "success" | "failed" | "pending";
export type TransactionType =
  | "tip"
  | "private"
  | "group"
  | "ticket"
  | "album"
  | "message"
  | "fan_club"
  | "recharge"
  | "payout";

export interface TipMenuItem {
  id: string;
  label: string;
  tokens: number;
}

export interface Album {
  id: string;
  title: string;
  price: number;
  locked: boolean;
}

export interface Creator {
  id: string;
  name: string;
  avatar: string;
  cover: string;
  status: CreatorStatus;
  category: string;
  language: string;
  viewerCount: number;
  tokenRatePrivate: number;
  tokenRateExclusive: number;
  groupShowRate: number;
  ticketShowPrice: number;
  fanClubPrice: number;
  goal: {
    title: string;
    current: number;
    target: number;
  };
  albums: Album[];
  tipMenu: TipMenuItem[];
  bio: string;
  schedule: string;
  verified: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  walletBalance: number;
  favorites: string[];
  paymentVerified: boolean;
  blockedUsers: string[];
  role: "user" | "creator" | "admin";
}

export interface Transaction {
  id: string;
  type: TransactionType;
  userId: string;
  modelId?: string;
  creatorId?: string;
  tokenAmount: number;
  status: PaymentStatus;
  createdAt: string;
  description: string;
  commission?: number;
  refundStatus?: "none" | "requested" | "refunded";
  fraudFlag?: boolean;
}

export interface TokenPackage {
  id: string;
  label: string;
  tokens: number;
  price: string;
  highlight?: boolean;
}

export interface AdminStat {
  label: string;
  value: string;
  tone: "default" | "warning" | "danger" | "success";
}

export interface DeveloperNote {
  purpose: string;
  role: string;
  buttons: string[];
  actions: string[];
  api: string[];
  success: string;
  error: string;
  businessRule: string;
}

export interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

export interface Report {
  id: string;
  reporterId: string;
  reportedId: string;
  type: "spam" | "harassment" | "policy" | "payment" | "safety";
  reason: string;
  status: "open" | "warned" | "muted" | "banned" | "dismissed";
  createdAt: string;
}

export interface MessageThread {
  id: string;
  creatorId: string;
  title: string;
  lastMessage: string;
  lockedMediaPrice?: number;
}
