"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export default function AnalyticsClient() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // @ts-ignore
    if (typeof window === "undefined" || typeof window.gtag !== "function") {
      return;
    }

    const url = pathname + (searchParams?.toString() ? `?${searchParams}` : "");
// @ts-ignore
    window.gtag("event", "page_view", {
      page_path: url,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [pathname, searchParams]);

  return null;
}
