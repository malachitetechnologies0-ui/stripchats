import type { Report } from "@/types";

export const reports: Report[] = [
  {
    id: "R-2041",
    reporterId: "viewer-1",
    reportedId: "guest-842",
    type: "spam",
    reason: "Repeated unsafe links in chat",
    status: "open",
    createdAt: "2026-05-22T10:00:00Z"
  },
  {
    id: "R-2042",
    reporterId: "token-buyer",
    reportedId: "risk-case",
    type: "harassment",
    reason: "User reported abusive messages",
    status: "open",
    createdAt: "2026-05-22T11:30:00Z"
  }
];
