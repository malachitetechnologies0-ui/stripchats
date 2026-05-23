import type { TokenPackage } from "@/types";

export const tokenPackages: TokenPackage[] = [
  { id: "tokens-50", label: "Starter", tokens: 50, price: "$4.99" },
  { id: "tokens-100", label: "Basic", tokens: 100, price: "$8.99" },
  { id: "tokens-250", label: "Popular", tokens: 250, price: "$19.99", highlight: true },
  { id: "tokens-500", label: "Plus", tokens: 500, price: "$37.99" },
  { id: "tokens-1000", label: "Premium", tokens: 1000, price: "$69.99" },
  { id: "tokens-2500", label: "Boss Demo", tokens: 2500, price: "$149.99" }
];
