import { reports } from "@/data/reports";
import type { Report } from "@/types";

const bannedUsers = new Set<string>();
const mutedUsers = new Set<string>();
let reportQueue: Report[] = [...reports];

export function banUser(userId: string) {
  bannedUsers.add(userId);
  return { userId, status: "banned" as const, message: "User banned from mock room." };
}

export function muteUser(userId: string) {
  mutedUsers.add(userId);
  return { userId, status: "muted" as const, message: "User muted in mock room." };
}

export function unbanUser(userId: string) {
  bannedUsers.delete(userId);
  return { userId, status: "active" as const, message: "User unbanned." };
}

export function submitReport(data: Omit<Report, "id" | "status" | "createdAt">) {
  const report: Report = {
    ...data,
    id: `R-${Math.floor(1000 + Math.random() * 9000)}`,
    status: "open",
    createdAt: new Date().toISOString()
  };
  reportQueue = [report, ...reportQueue];
  return report;
}

export function updateReportStatus(reportId: string, status: Report["status"]) {
  reportQueue = reportQueue.map((report) => (report.id === reportId ? { ...report, status } : report));
  return reportQueue.find((report) => report.id === reportId);
}

export function listReports() {
  return reportQueue;
}
