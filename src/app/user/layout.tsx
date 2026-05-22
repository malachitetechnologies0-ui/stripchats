"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { hasAgeConfirmation } from "@/lib/mockAuth";
import { useDemoStore } from "@/lib/store";
import { LoadingState } from "@/components/ui";

export default function UserLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const storeAgeConfirmed = useDemoStore((state) => state.ageConfirmed);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const confirmed = storeAgeConfirmed || hasAgeConfirmation();
    if (!confirmed) {
      router.replace("/age-gate");
      return;
    }
    // Age confirmation is a browser-only demo gate, so the client layout marks itself ready after localStorage is checked.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setReady(true);
  }, [router, storeAgeConfirmed]);

  if (!ready) {
    return (
      <main className="grid min-h-screen place-items-center px-4">
        <LoadingState title="Checking age confirmation" />
      </main>
    );
  }

  return children;
}
