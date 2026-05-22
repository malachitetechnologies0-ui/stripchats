"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { creators } from "@/data/creators";
import { transactions as seedTransactions } from "@/data/transactions";
import { users } from "@/data/users";
import type { PaymentStatus, Transaction, TransactionType } from "@/types";

interface ChatMessage {
  id: string;
  author: string;
  text: string;
  system?: boolean;
}

interface DemoState {
  walletBalance: number;
  favorites: string[];
  unlockedAlbums: string[];
  unlockedMessages: string[];
  fanClubSubscriptions: string[];
  transactions: Transaction[];
  chatMessages: ChatMessage[];
  ageConfirmed: boolean;
  kycStatus: "pending" | "approved" | "rejected";
  payoutStatus: "eligible" | "below_threshold" | "processing";
  toggleFavorite: (creatorId: string) => void;
  addChatMessage: (text: string, author?: string, system?: boolean) => void;
  addTokens: (tokens: number, description: string, status?: PaymentStatus) => void;
  spendTokens: (amount: number, reason: string, type: TransactionType, modelId?: string) => boolean;
  unlockAlbum: (albumId: string, price: number, modelId: string) => boolean;
  unlockMessage: (messageId: string, price: number, modelId: string) => boolean;
  subscribeFanClub: (creatorId: string, price: number) => boolean;
  setAgeConfirmed: (confirmed: boolean) => void;
  setKycStatus: (status: DemoState["kycStatus"]) => void;
  requestPayout: () => void;
  removeFavorite: (creatorId: string) => void;
}

const demoUser = users[0];

function makeTransaction(
  type: TransactionType,
  tokenAmount: number,
  description: string,
  status: PaymentStatus = "success",
  modelId?: string
): Transaction {
  return {
    id: `TX-${Math.floor(100000 + Math.random() * 900000)}`,
    type,
    userId: demoUser.id,
    modelId,
    tokenAmount,
    status,
    createdAt: new Date().toISOString(),
    description,
    commission: type === "recharge" ? 0 : Math.round(tokenAmount * 0.3),
    refundStatus: "none",
    fraudFlag: false
  };
}

export const useDemoStore = create<DemoState>()(
  persist(
    (set, get) => ({
      walletBalance: demoUser.walletBalance,
      favorites: demoUser.favorites,
      unlockedAlbums: [],
      unlockedMessages: [],
      fanClubSubscriptions: [],
      transactions: seedTransactions,
      chatMessages: [
        { id: "c1", author: "System", text: "Welcome to the safe demo room.", system: true },
        { id: "c2", author: "NovaFan", text: "Great live-room wireframe." },
        { id: "c3", author: "Goal Bot", text: "Goal progress updates after tips.", system: true }
      ],
      ageConfirmed: false,
      kycStatus: "pending",
      payoutStatus: "below_threshold",
      toggleFavorite: (creatorId) =>
        set((state) => ({
          favorites: state.favorites.includes(creatorId)
            ? state.favorites.filter((id) => id !== creatorId)
            : [...state.favorites, creatorId]
        })),
      removeFavorite: (creatorId) =>
        set((state) => ({ favorites: state.favorites.filter((id) => id !== creatorId) })),
      addChatMessage: (text, author = "You", system = false) =>
        set((state) => ({
          chatMessages: [...state.chatMessages, { id: crypto.randomUUID(), author, text, system }]
        })),
      addTokens: (tokens, description, status = "success") =>
        set((state) => ({
          walletBalance: status === "success" ? state.walletBalance + tokens : state.walletBalance,
          transactions: [makeTransaction("recharge", tokens, description, status), ...state.transactions]
        })),
      spendTokens: (amount, reason, type, modelId = creators[0].id) => {
        const state = get();
        if (state.walletBalance < amount) return false;
        set({
          walletBalance: state.walletBalance - amount,
          transactions: [makeTransaction(type, amount, reason, "success", modelId), ...state.transactions]
        });
        return true;
      },
      unlockAlbum: (albumId, price, modelId) => {
        const state = get();
        if (state.unlockedAlbums.includes(albumId)) return true;
        const paid = state.spendTokens(price, "Paid album unlock", "album", modelId);
        if (paid) set({ unlockedAlbums: [...get().unlockedAlbums, albumId] });
        return paid;
      },
      unlockMessage: (messageId, price, modelId) => {
        const state = get();
        if (state.unlockedMessages.includes(messageId)) return true;
        const paid = state.spendTokens(price, "Paid message unlock", "message", modelId);
        if (paid) set({ unlockedMessages: [...get().unlockedMessages, messageId] });
        return paid;
      },
      subscribeFanClub: (creatorId, price) => {
        const state = get();
        if (state.fanClubSubscriptions.includes(creatorId)) return true;
        const paid = state.spendTokens(price, "Fan club subscription", "fan_club", creatorId);
        if (paid) set({ fanClubSubscriptions: [...get().fanClubSubscriptions, creatorId] });
        return paid;
      },
      setAgeConfirmed: (confirmed) => set({ ageConfirmed: confirmed }),
      setKycStatus: (status) => set({ kycStatus: status }),
      requestPayout: () => set({ payoutStatus: "processing" })
    }),
    {
      name: "stripchats-demo-store",
      partialize: (state) => ({
        walletBalance: state.walletBalance,
        favorites: state.favorites,
        unlockedAlbums: state.unlockedAlbums,
        unlockedMessages: state.unlockedMessages,
        fanClubSubscriptions: state.fanClubSubscriptions,
        ageConfirmed: state.ageConfirmed,
        kycStatus: state.kycStatus,
        payoutStatus: state.payoutStatus,
        transactions: state.transactions,
        chatMessages: state.chatMessages
      })
    }
  )
);
