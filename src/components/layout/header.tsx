"use client";

import Link from "next/link";
import { ThemeToggle } from "@/components";
import { usePathname } from "next/navigation";
import { navigationConfig } from "@/config";

export default function Header() {
  const pathname = usePathname();
  const { mainNav } = navigationConfig;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 backdrop-blur-sm bg-opacity-80 dark:bg-opacity-80">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex gap-6 items-center">
          <Link
            href="/"
            className="flex items-center space-x-2 font-bold text-xl text-white hover:text-gray-200 transition-colors"
          >
            Contentful Blog
          </Link>
          <nav className="hidden md:flex gap-6">
            {mainNav.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`text-sm font-medium transition-colors ${
                  pathname === item.path
                    ? "text-black dark:text-white"
                    : "text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
