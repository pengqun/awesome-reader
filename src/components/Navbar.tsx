"use client";

import Link from "next/link";
import { useState } from "react";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-foreground/10 bg-background/80 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="text-lg font-bold tracking-tight hover:opacity-80 transition-opacity"
        >
          Awesome Reader
        </Link>

        {/* Desktop nav */}
        <div className="hidden sm:flex items-center gap-6 text-sm">
          <Link
            href="/"
            className="text-foreground/70 hover:text-foreground transition-colors"
          >
            Home
          </Link>
          <Link
            href="/search"
            className="text-foreground/70 hover:text-foreground transition-colors"
          >
            Search
          </Link>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground/70 hover:text-foreground transition-colors"
          >
            GitHub
          </a>
          <ThemeToggle />
        </div>

        {/* Mobile hamburger */}
        <button
          className="sm:hidden p-2 text-foreground/70 hover:text-foreground"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="sm:hidden border-t border-foreground/10 px-4 py-3 space-y-2">
          <Link
            href="/"
            className="block text-sm text-foreground/70 hover:text-foreground"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/search"
            className="block text-sm text-foreground/70 hover:text-foreground"
            onClick={() => setMenuOpen(false)}
          >
            Search
          </Link>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-sm text-foreground/70 hover:text-foreground"
          >
            GitHub
          </a>
        </div>
      )}
    </nav>
  );
}
