"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SettingsRootPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/dashboard/settings/membership");
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-[300px] text-slate-400 text-xs font-medium">
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
        <span>Loading settings...</span>
      </div>
    </div>
  );
}
