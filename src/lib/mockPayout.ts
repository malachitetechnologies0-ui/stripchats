const payoutStatuses = new Map<string, "eligible" | "below_threshold" | "processing" | "held" | "rejected">([
  ["nova-live", "eligible"],
  ["mira-studio", "below_threshold"]
]);

export function requestPayout(modelId: string) {
  const current = payoutStatuses.get(modelId) ?? "below_threshold";
  if (current !== "eligible") {
    return { ok: false, status: current, message: "Payout threshold or compliance rule is not met." };
  }
  payoutStatuses.set(modelId, "processing");
  return { ok: true, status: "processing" as const, message: "Payout request moved to processing." };
}

export function approvePayout(modelId: string) {
  payoutStatuses.set(modelId, "processing");
  return { modelId, status: "processing" as const };
}

export function holdPayout(modelId: string, reason: string) {
  if (!reason.trim()) {
    return { modelId, status: payoutStatuses.get(modelId), error: "Hold reason is required." };
  }
  payoutStatuses.set(modelId, "held");
  return { modelId, status: "held" as const, reason };
}

export function rejectPayout(modelId: string, reason: string) {
  if (!reason.trim()) {
    return { modelId, status: payoutStatuses.get(modelId), error: "Reject reason is required." };
  }
  payoutStatuses.set(modelId, "rejected");
  return { modelId, status: "rejected" as const, reason };
}
