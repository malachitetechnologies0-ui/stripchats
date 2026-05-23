import type { MessageThread } from "@/types";

export const messageThreads: MessageThread[] = [
  {
    id: "thread-nova",
    creatorId: "nova-live",
    title: "NovaLive",
    lastMessage: "Thanks for joining the room. A locked safe media preview is attached.",
    lockedMediaPrice: 30
  },
  {
    id: "thread-mira",
    creatorId: "mira-studio",
    title: "MiraStudio",
    lastMessage: "Fan club schedule update for this week."
  }
];
