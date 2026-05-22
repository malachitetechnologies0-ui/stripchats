"use client";

import { useParams } from "next/navigation";
import { UserLiveRoomPage } from "@/components/pages";

export default function Page() {
  const params = useParams<{ id: string }>();
  return <UserLiveRoomPage id={params.id} />;
}
