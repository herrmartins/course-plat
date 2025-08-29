import React from "react";
import ToggleTheme from "../ToggleTheme";
import Link from "next/link";
import Image from "next/image";
import LogoutBtn from "./LogoutBtn";
import { auth } from "@/auth";

async function Header() {
  const session = await auth();
  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur supports-[backdrop-filter]:bg-white/70 dark:supports-[backdrop-filter]:bg-neutral-900/60 border-b border-neutral-200/60 dark:border-neutral-800/60">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between">
          {/* Left: Logo */}
          <div className="flex items-center gap-3 shrink-0">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/imgLogo.jpg"
                alt="Inglês com ideias vivas"
                width={36}
                height={36}
                className="rounded-md shadow-sm ring-1 ring-black/5 dark:ring-white/10"
                priority
              />
              <span className="hidden sm:inline text-sm font-semibold tracking-wide text-neutral-900 dark:text-neutral-100">
                Inglês com ideias vivas
              </span>
            </Link>
          </div>

          {/* Center: Primary links */}
          <ul className="hidden md:flex items-center gap-6 text-sm font-medium">
            <li>
              <Link href="/" className="text-neutral-700 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link href="/auth/register" className="text-neutral-700 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white transition-colors">
                Cadastro
              </Link>
            </li>
            {session && (
              <li>
                <Link href="/dispatcher" className="text-neutral-700 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white transition-colors">
                  Dashboard
                </Link>
              </li>
            )}
          </ul>

          {/* Right: Actions */}
          <div className="flex items-center gap-3">
            <ToggleTheme />
            {!session && (
              <Link
                href="/auth/login"
                className="inline-flex items-center rounded-lg px-3 py-1.5 text-sm font-semibold bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200 transition-colors"
              >
                Login
              </Link>
            )}
            {session && (
              <div className="inline-flex items-center rounded-lg px-3 py-1.5 text-sm font-semibold bg-red-600 text-white hover:bg-red-700 transition-colors">
                <LogoutBtn />
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
