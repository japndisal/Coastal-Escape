import Link from 'next/link';
import { Compass } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Compass className="w-5 h-5 text-ocean" />
              <span className="font-display text-xl leading-none">
                COASTAL<span className="text-ocean">.</span>
                <span className="font-tagline font-normal text-lg ml-1">escape</span>
              </span>
            </div>
            <p className="font-tagline text-stone text-sm leading-relaxed max-w-xs">
              Curated journeys to the world&apos;s most breathtaking destinations, crafted for those who travel with intention.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-hint mb-4">Explore</h4>
            <ul className="space-y-2">
              {[
                { href: '/packages', label: 'All Packages' },
                { href: '/packages?category=Beach', label: 'Beach Escapes' },
                { href: '/packages?category=Adventure', label: 'Adventure' },
                { href: '/packages?category=Luxury', label: 'Luxury' },
                { href: '/about', label: 'About Us' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-stone hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-hint mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-stone">
              <li>hello@coastalescape.com</li>
              <li>+1 (888) 555-COAST</li>
              <li className="pt-2 text-hint text-xs">Mon–Fri 9am–6pm EST</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-hint">© {new Date().getFullYear()} Coastal Escape. All rights reserved.</p>
          <div className="flex gap-4 text-xs text-hint">
            <Link href="#" className="hover:text-stone transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-stone transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
