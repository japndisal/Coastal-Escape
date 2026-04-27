import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Shield, Headphones, Award } from 'lucide-react';
import PackageGrid from '@/components/packages/PackageGrid';
import { connectDB } from '@/lib/mongodb';
import PackageModel from '@/models/Package';
import type { TravelPackage } from '@/types';

async function getFeaturedPackages(): Promise<TravelPackage[]> {
  try {
    await connectDB();
    const docs = await PackageModel.find({ featured: true }).limit(6).lean();
    return JSON.parse(JSON.stringify(docs));
  } catch {
    return [];
  }
}

export const metadata = {
  title: 'Coastal Escape — Curated Travel Packages',
  description: "Discover handpicked travel packages to the world's most breathtaking destinations.",
};

export default async function HomePage() {
  const featured = await getFeaturedPackages();

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-slate">
        <Image
          src="https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?w=1600&h=900&fit=crop"
          alt="Travel destination"
          fill
          priority
          className="object-cover opacity-40"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-linear-to-b from-slate/20 via-transparent to-slate/80" />
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <p className="font-tagline text-stone text-lg mb-4 tracking-wide">Your journey begins here</p>
          <h1 className="font-display text-6xl sm:text-7xl lg:text-8xl text-white leading-none mb-6">
            ESCAPE THE<br />
            <span className="text-ocean">ORDINARY</span>
          </h1>
          <p className="text-stone text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Curated travel experiences to the world&apos;s most breathtaking destinations — crafted for those who demand the extraordinary.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/packages"
              className="inline-flex items-center gap-2 bg-ocean text-white font-bold uppercase tracking-wider px-8 py-4 rounded-xl hover:bg-ocean/90 transition-colors text-sm"
            >
              Explore Packages <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 border-2 border-white/40 text-white font-bold uppercase tracking-wider px-8 py-4 rounded-xl hover:border-white transition-colors text-sm"
            >
              Our Story
            </Link>
          </div>
        </div>

        {/* Stats bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-white/10 backdrop-blur border-t border-white/20">
          <div className="max-w-5xl mx-auto px-4 py-5 grid grid-cols-3 gap-4 text-center">
            {[
              { num: '12+', label: 'Destinations' },
              { num: '5K+', label: 'Happy Travellers' },
              { num: '4.9★', label: 'Average Rating' },
            ].map((s) => (
              <div key={s.label}>
                <p className="font-display text-2xl sm:text-3xl text-white leading-none">{s.num}</p>
                <p className="text-stone text-xs sm:text-sm mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Packages */}
      <section className="py-20 px-4 max-w-7xl mx-auto w-full">
        <div className="text-center mb-12">
          <p className="font-tagline text-ocean text-sm tracking-widest mb-2">Handpicked for you</p>
          <h2 className="font-display text-4xl sm:text-5xl text-slate">FEATURED TRIPS</h2>
        </div>
        <PackageGrid packages={featured} />
        <div className="text-center mt-12">
          <Link
            href="/packages"
            className="inline-flex items-center gap-2 border-2 border-slate text-slate font-bold uppercase tracking-wider px-8 py-4 rounded-xl hover:bg-slate hover:text-white transition-colors text-sm"
          >
            View All Packages <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Why us */}
      <section className="bg-slate py-20 px-4">
        <div className="max-w-5xl mx-auto text-center mb-12">
          <h2 className="font-display text-4xl sm:text-5xl text-white mb-4">WHY COASTAL ESCAPE</h2>
          <p className="font-tagline text-stone text-lg">We obsess over the details so you don&apos;t have to</p>
        </div>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Shield, title: 'Fully Protected', body: 'Every booking is financially protected and backed by our 100% satisfaction guarantee.' },
            { icon: Headphones, title: '24/7 Support', body: 'Our travel experts are available around the clock, wherever in the world you are.' },
            { icon: Award, title: 'Expert Curation', body: 'Every package is personally vetted by our team — no filler, only the extraordinary.' },
          ].map(({ icon: Icon, title, body }) => (
            <div key={title} className="text-center p-6 rounded-2xl bg-white/5 border border-white/10">
              <div className="w-12 h-12 bg-ocean/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Icon className="w-6 h-6 text-ocean" />
              </div>
              <h3 className="font-bold uppercase tracking-wider text-white mb-2">{title}</h3>
              <p className="text-stone text-sm leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 text-center bg-ocean">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-display text-4xl sm:text-5xl text-white mb-4">READY TO ESCAPE?</h2>
          <p className="font-tagline text-white/80 text-lg mb-8">Book a free 30-minute consultation with one of our travel experts.</p>
          <Link
            href="/packages"
            className="inline-flex items-center gap-2 bg-white text-ocean font-bold uppercase tracking-wider px-8 py-4 rounded-xl hover:bg-sand transition-colors text-sm"
          >
            Start Planning <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
