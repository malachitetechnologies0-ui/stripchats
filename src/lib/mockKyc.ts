import type { KycStatus } from "@/types";

const kycStatuses = new Map<string, KycStatus>([
  ["nova-live", "approved"],
  ["mira-studio", "pending"],
  ["ari-online", "rejected"]
]);

export function getKycStatus(modelId: string) {
  return kycStatuses.get(modelId) ?? "pending";
}

export function approveKyc(modelId: string) {
  kycStatuses.set(modelId, "approved");
  return { modelId, status: "approved" as const };
}

export function rejectKyc(modelId: string, reason: string) {
  if (!reason.trim()) {
    return { modelId, status: getKycStatus(modelId), error: "Rejection reason is required." };
  }

  kycStatuses.set(modelId, "rejected");
  return { modelId, status: "rejected" as const, reason };
}
