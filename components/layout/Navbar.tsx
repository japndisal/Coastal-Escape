'use client';

import Link from 'next/link';
import { usePathname } from '@/lib/navigation';
import { SignInButton, SignUpButton, UserButton, useAuth } from '@clerk/nextjs';
import { Menu, X, Compass } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const { isSignedIn } = useAuth();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const navLinks = [
    { href: '/packages', label: 'Packages' },
    { href: '/about', label: 'About' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-stone">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <Compass className="w-6 h-6 text-ocean" />
            <span className="font-display text-xl text-slate tracking-tight leading-none">
              COASTAL<span className="text-ocean">.</span>
              <span className="font-tagline font-normal text-lg ml-1">escape</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium uppercase tracking-wider transition-colors ${
                  pathname.startsWith(link.href) ? 'text-ocean' : 'text-muted hover:text-slate'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Auth */}
          <div className="hidden md:flex items-center gap-3">
            {isSignedIn ? (
              <>
                <Link
                  href="/dashboard"
                  className="text-sm font-medium uppercase tracking-wider text-muted hover:text-slate transition-colors"
                >
                  My Trips
                </Link>
                <UserButton />
              </>
            ) : (
              <>
                <SignInButton mode="modal">
                  <button className="text-sm font-bold uppercase tracking-wider text-muted hover:text-slate transition-colors">
                    Sign in
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className="text-sm font-bold uppercase tracking-wider bg-ocean text-white px-4 py-2 rounded-xl hover:bg-ocean/90 transition-colors">
                    Sign up
                  </button>
                </SignUpButton>
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 text-muted hover:text-slate"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden border-t border-stone py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block text-sm font-medium uppercase tracking-wider text-muted hover:text-slate py-1"
              >
                {link.label}
              </Link>
            ))}
            {isSignedIn ? (
              <Link href="/dashboard" onClick={() => setOpen(false)} className="block text-sm font-medium uppercase tracking-wider text-muted hover:text-slate py-1">
                My Trips
              </Link>
            ) : (
              <div className="flex gap-3 pt-2">
                <SignInButton mode="modal">
                  <button className="text-sm font-bold uppercase tracking-wider text-muted hover:text-slate">Sign in</button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className="text-sm font-bold uppercase tracking-wider bg-ocean text-white px-4 py-2 rounded-xl hover:bg-ocean/90">Sign up</button>
                </SignUpButton>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
