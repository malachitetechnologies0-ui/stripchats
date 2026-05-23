import type { KycStatus } from "@/types";

const kycStatuses = new Map<string, KycStatus>([
  ["nova-live", "approved"],
  ["mira-studio", "pending"],
  ["ari-online", "rejected"]
]);

export function getKycStatus(modelId: string) {
  return kycStatuses.get(modelId) ?? "pending";
}

export function submitKyc(modelId: string, data: { idUploaded: boolean; selfieUploaded: boolean }) {
  if (!data.idUploaded || !data.selfieUploaded) {
    return { modelId, status: getKycStatus(modelId), error: "ID and selfie uploads are required." };
  }

  kycStatuses.set(modelId, "pending");
  return { modelId, status: "pending" as const, message: "KYC submitted for review." };
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
