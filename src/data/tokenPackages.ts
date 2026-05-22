import type { TokenPackage } from "@/types";

export const tokenPackages: TokenPackage[] = [
  { id: "starter", label: "Starter", tokens: 80, price: "$7.99" },
  { id: "popular", label: "Popular", tokens: 240, price: "$19.99", highlight: true },
  { id: "pro", label: "Creator Fan", tokens: 620, price: "$49.99" },
  { id: "premium", label: "Premium", tokens: 1400, price: "$99.99" }
];
