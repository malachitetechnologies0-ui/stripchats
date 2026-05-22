import type { AdminStat } from "@/types";

export const adminStats: AdminStat[] = [
  { label: "Total users", value: "482k", tone: "default" },
  { label: "Active models", value: "8,420", tone: "success" },
  { label: "Live rooms", value: "1,240", tone: "success" },
  { label: "Tokens sold", value: "92M", tone: "default" },
  { label: "Revenue", value: "$1.84M", tone: "default" },
  { label: "Pending KYC", value: "312", tone: "warning" },
  { label: "Reports", value: "86", tone: "danger" },
  { label: "Payout queue", value: "$284k", tone: "warning" },
  { label: "Payment failures", value: "2.9%", tone: "danger" },
  { label: "Fraud flags", value: "41", tone: "danger" }
];

export const chartBars = [38, 58, 44, 72, 86, 64, 91, 74, 88, 96, 82, 90];
