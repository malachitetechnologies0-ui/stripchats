const streamStatuses = new Map<string, "offline" | "live">();

export function startMockStream(modelId: string) {
  streamStatuses.set(modelId, "live");
  return {
    modelId,
    status: "live" as const,
    streamId: `stream_${modelId}_${Date.now()}`,
    message: "Mock stream started. Replace with WebRTC/RTMP orchestration in production."
  };
}

export function endMockStream(modelId: string) {
  streamStatuses.set(modelId, "offline");
  return {
    modelId,
    status: "offline" as const,
    message: "Mock stream ended and room state saved."
  };
}

export function getMockStreamStatus(modelId: string) {
  return streamStatuses.get(modelId) ?? "offline";
}
