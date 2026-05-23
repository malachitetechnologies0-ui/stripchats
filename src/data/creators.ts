import type { Creator } from "@/types";

export const creators: Creator[] = [
  {
    id: "nova-live",
    name: "NovaLive",
    avatar: "gradient-avatar-1",
    cover: "gradient-cover-1",
    status: "online",
    category: "Top Creators",
    language: "English",
    viewerCount: 2840,
    tokenRatePrivate: 30,
    tokenRateExclusive: 45,
    groupShowRate: 18,
    ticketShowPrice: 75,
    fanClubPrice: 90,
    goal: { title: "Community goal", current: 1840, target: 5000 },
    albums: [
      { id: "nova-album-1", title: "Studio Set", price: 45, locked: true },
      { id: "nova-album-2", title: "Behind The Scenes", price: 60, locked: true }
    ],
    tipMenu: [
      { id: "tm-1", label: "Spotlight message", tokens: 20 },
      { id: "tm-2", label: "Goal boost", tokens: 35 },
      { id: "tm-3", label: "Pinned request", tokens: 50 }
    ],
    bio: "Verified creator profile with neutral custom panels, schedule, goals, and paid interaction controls.",
    schedule: "Today 22:00 - 01:00",
    verified: true
  },
  {
    id: "mira-studio",
    name: "MiraStudio",
    avatar: "gradient-avatar-2",
    cover: "gradient-cover-2",
    status: "busy",
    category: "Couples",
    language: "Spanish",
    viewerCount: 1480,
    tokenRatePrivate: 35,
    tokenRateExclusive: 55,
    groupShowRate: 22,
    ticketShowPrice: 90,
    fanClubPrice: 110,
    goal: { title: "Weekend goal", current: 2600, target: 7000 },
    albums: [{ id: "mira-album-1", title: "Creator Album", price: 55, locked: true }],
    tipMenu: [
      { id: "tm-4", label: "Featured note", tokens: 25 },
      { id: "tm-5", label: "Room celebration", tokens: 70 }
    ],
    bio: "Safe placeholder creator with busy/private-room state and multilingual discovery metadata.",
    schedule: "Tomorrow 20:30",
    verified: true
  },
  {
    id: "ari-online",
    name: "AriOnline",
    avatar: "gradient-avatar-3",
    cover: "gradient-cover-3",
    status: "online",
    category: "New",
    language: "French",
    viewerCount: 842,
    tokenRatePrivate: 25,
    tokenRateExclusive: 40,
    groupShowRate: 15,
    ticketShowPrice: 50,
    fanClubPrice: 75,
    goal: { title: "First goal", current: 980, target: 3000 },
    albums: [{ id: "ari-album-1", title: "Preview Pack", price: 30, locked: true }],
    tipMenu: [
      { id: "tm-6", label: "Send highlight", tokens: 15 },
      { id: "tm-7", label: "Goal push", tokens: 30 }
    ],
    bio: "New creator profile card used to demonstrate discovery, search filters, and fan club conversion.",
    schedule: "Fri 21:00",
    verified: false
  },
  {
    id: "velvet-room",
    name: "VelvetRoom",
    avatar: "gradient-avatar-4",
    cover: "gradient-cover-4",
    status: "offline",
    category: "Language",
    language: "German",
    viewerCount: 0,
    tokenRatePrivate: 28,
    tokenRateExclusive: 45,
    groupShowRate: 16,
    ticketShowPrice: 60,
    fanClubPrice: 85,
    goal: { title: "Offline goal", current: 540, target: 2500 },
    albums: [{ id: "velvet-album-1", title: "Archive Pack", price: 40, locked: true }],
    tipMenu: [{ id: "tm-8", label: "Offline support", tokens: 20 }],
    bio: "Offline profile state with next broadcast schedule and offline tip capability.",
    schedule: "Sun 19:30",
    verified: true
  }
];

export function getCreator(id: string) {
  return creators.find((creator) => creator.id === id) ?? creators[0];
}
