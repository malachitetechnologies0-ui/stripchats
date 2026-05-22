import type { Transaction } from "@/types";

export const transactions: Transaction[] = [
  {
    id: "TX-1001",
    type: "recharge",
    userId: "viewer-1",
    tokenAmount: 240,
    status: "success",
    createdAt: "2026-05-18T10:15:00Z",
    description: "Mock wallet recharge",
    commission: 0,
    refundStatus: "none",
    fraudFlag: false
  },
  {
    id: "TX-1002",
    type: "tip",
    userId: "viewer-1",
    modelId: "nova-live",
    tokenAmount: 35,
    status: "success",
    createdAt: "2026-05-19T14:35:00Z",
    description: "Tip menu: Goal boost",
    commission: 10,
    refundStatus: "none",
    fraudFlag: false
  },
  {
    id: "TX-1003",
    type: "album",
    userId: "viewer-1",
    modelId: "nova-live",
    tokenAmount: 45,
    status: "success",
    createdAt: "2026-05-20T18:22:00Z",
    description: "Paid album unlock",
    commission: 14,
    refundStatus: "none",
    fraudFlag: false
  }
];
