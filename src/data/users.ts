import type { User } from "@/types";

export const users: User[] = [
  {
    id: "viewer-1",
    name: "DemoViewer",
    email: "viewer@example.com",
    walletBalance: 180,
    favorites: ["nova-live"],
    paymentVerified: false,
    blockedUsers: [],
    role: "user"
  }
];
