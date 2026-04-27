import { notFound } from '@/lib/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Check, X, Clock, Users, Star, ArrowLeft } from 'lucide-react';
import { connectDB } from '@/lib/mongodb';
import PackageModel from '@/models/Package';
import ReviewModel from '@/models/Review';
import ReviewList from '@/components/packages/ReviewList';
import Badge from '@/components/ui/Badge';
import PackageDetailClient from '@/components/packages/PackageDetailClient';
import ConsultationEmbed from '@/components/packages/ConsultationEmbed';
import { formatCurrency } from '@/lib/utils';
import type { TravelPackage, Review } from '@/types';

async function getPackage(slug: string): Promise<TravelPackage | null> {
  try {
    await connectDB();
    const doc = await PackageModel.findOne({ slug }).lean();
    return doc ? JSON.parse(JSON.stringify(doc)) : null;
  } catch {
    return null;
  }
}

async function getReviews(packageId: string): Promise<Review[]> {
  try {
    await connectDB();
    const docs = await ReviewModel.find({ packageId }).sort({ createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(docs));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const pkg = await getPackage(slug);
  if (!pkg) return { title: 'Package Not Found' };
  return { title: `${pkg.title} — Coastal Escape`, description: pkg.tagline };
}

export default async function PackageDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [pkg, reviews] = await Promise.all([getPackage(slug), (async () => {
    const p = await getPackage(slug);
    if (!p) return [];
    return getReviews(p._id);
  })()]);

  if (!pkg) notFound();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <Link href="/packages" className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-slate mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to packages
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Hero image */}
          <div className="relative h-72 sm:h-96 rounded-2xl overflow-hidden">
            <Image
              src={pkg.images[0]}
              alt={pkg.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 66vw"
            />
            <div className="absolute inset-0 bg-linear-to-t from-slate/70 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5">
              <div className="flex flex-wrap gap-2 mb-3">
                {pkg.category.map((c) => <Badge key={c} variant="ghostblue">{c}</Badge>)}
              </div>
              <h1 className="font-display text-3xl sm:text-4xl text-white leading-tight">{pkg.title}</h1>
              <p className="font-tagline text-white/80 mt-1">{pkg.tagline}</p>
            </div>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { icon: Clock, label: 'Duration', value: `${pkg.duration} nights` },
              { icon: Users, label: 'Group size', value: `Up to ${pkg.maxGroupSize}` },
              { icon: Star, label: 'Rating', value: `${pkg.rating} (${pkg.reviewCount})` },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="bg-white rounded-2xl p-4 border border-stone/50 text-center">
                <Icon className="w-5 h-5 text-ocean mx-auto mb-2" />
                <p className="text-xs text-hint uppercase tracking-wider mb-0.5">{label}</p>
                <p className="font-bold text-slate text-sm">{value}</p>
              </div>
            ))}
          </div>

          {/* Tabbed content */}
          <PackageDetailClient pkg={pkg} reviews={reviews} />

          {/* Consultation embed */}
          <ConsultationEmbed />
        </div>

        {/* Sticky sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 bg-white rounded-2xl border border-stone/50 p-6 shadow-sm space-y-5">
            <div>
              <p className="text-xs text-hint line-through">{formatCurrency(pkg.originalPrice)}</p>
              <p className="font-display text-4xl text-slate">{formatCurrency(pkg.price)}</p>
              <p className="text-sm text-hint">per person</p>
            </div>

            <div className="border-t border-stone pt-4 space-y-2">
              {pkg.included.slice(0, 4).map((item) => (
                <div key={item} className="flex items-start gap-2 text-sm">
                  <Check className="w-4 h-4 text-seagreen mt-0.5 shrink-0" />
                  <span className="text-muted">{item}</span>
                </div>
              ))}
            </div>

            <BookCTA packageId={pkg._id} />

            <p className="text-xs text-hint text-center">Free cancellation up to 30 days before travel</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Server component — uses Clerk server auth
import { auth } from '@clerk/nextjs/server';

async function BookCTA({ packageId }: { packageId: string }) {
  const { userId } = await auth();

  if (userId) {
    return (
      <Link
        href={`/booking/${packageId}`}
        className="block w-full text-center bg-ocean text-white font-bold uppercase tracking-wider py-4 rounded-xl hover:bg-ocean/90 transition-colors text-sm"
      >
        Book This Trip
      </Link>
    );
  }

  return (
    <div className="space-y-2">
      <Link
        href="/sign-in"
        className="block w-full text-center bg-ocean text-white font-bold uppercase tracking-wider py-4 rounded-xl hover:bg-ocean/90 transition-colors text-sm"
      >
        Sign In to Book
      </Link>
      <p className="text-xs text-hint text-center">Create a free account to book this trip</p>
    </div>
  );
}
