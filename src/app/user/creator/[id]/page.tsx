"use client";

import { useParams } from "next/navigation";
import { UserModelProfilePage } from "@/components/pages";

export default function Page() {
  const params = useParams<{ id: string }>();
  return <UserModelProfilePage id={params.id} />;
}
