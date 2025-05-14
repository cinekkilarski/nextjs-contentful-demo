"use client";

import { useEffect, useState } from "react";

export default function SkipToContent() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-50 focus:p-4 focus:bg-white focus:text-black dark:focus:bg-gray-900 dark:focus:text-white"
    >
      Skip to content
    </a>
  );
}
