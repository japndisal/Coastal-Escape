import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const metadata = { title: 'About — Coastal Escape' };

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-80 bg-slate flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1600&h=600&fit=crop"
          alt="About Coastal Escape"
          fill
          className="object-cover opacity-40"
          sizes="100vw"
        />
        <div className="relative z-10 text-center">
          <p className="font-tagline text-stone text-sm mb-2">Our story</p>
          <h1 className="font-display text-5xl sm:text-6xl text-white">ABOUT US</h1>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-20 space-y-16">
        <div className="text-center">
          <h2 className="font-display text-3xl text-slate mb-4">WE BELIEVE TRAVEL SHOULD BE EXTRAORDINARY</h2>
          <p className="font-tagline text-muted text-lg leading-relaxed">
            Coastal Escape was founded with a single conviction: that every journey deserves to be remarkable.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="relative h-72 rounded-2xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1488085061387-422e29b40080?w=800&h=600&fit=crop"
              alt="Travel planning"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="space-y-4">
            <h3 className="font-bold uppercase tracking-wider text-ocean text-sm">Our Mission</h3>
            <p className="text-muted leading-relaxed">
              We curate experiences that go beyond the guidebook — connecting travellers with the hidden rhythms of each destination. Every package is personally vetted by our team, ensuring authenticity, quality, and unforgettable moments.
            </p>
            <p className="text-muted leading-relaxed">
              From overwater bungalows in the Maldives to trekking the Patagonian wilderness, we pair world-class accommodation with local expertise to create journeys that linger long after you return home.
            </p>
          </div>
        </div>

        <div className="text-center bg-ocean rounded-2xl p-10">
          <h2 className="font-display text-3xl text-white mb-3">START YOUR JOURNEY</h2>
          <p className="font-tagline text-white/80 mb-6">Browse our curated collection of travel packages</p>
          <Link
            href="/packages"
            className="inline-flex items-center gap-2 bg-white text-ocean font-bold uppercase tracking-wider px-8 py-4 rounded-xl hover:bg-sand transition-colors text-sm"
          >
            Explore Packages <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
