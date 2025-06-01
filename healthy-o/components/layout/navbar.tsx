"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/utils";

const navItems = [
  { href: "/", label: "홈" },
  { href: "/question", label: "건강진단" },
  { href: "/hospital", label: "병원찾기" },
  { href: "/supplement", label: "영양제추천" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="text-xl font-bold">Healthy-O</span>
        </Link>
        <nav className="flex flex-1 items-center space-x-6 text-sm">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "transition-colors hover:text-foreground/80",
                pathname === item.href ? "text-foreground" : "text-foreground/60"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center space-x-4">
          <Link
            href="/login"
            className={cn(
              "text-sm transition-colors hover:text-foreground/80",
              pathname === "/login" ? "text-foreground" : "text-foreground/60"
            )}
          >
            로그인
          </Link>
        </div>
      </div>
    </header>
  );
} 