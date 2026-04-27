import { auth, currentUser } from '@clerk/nextjs/server';
import Image from 'next/image';
import { connectDB } from '@/lib/mongodb';
import PackageModel from '@/models/Package';
import BookingForm from '@/components/booking/BookingForm';
import Badge from '@/components/ui/Badge';
import { formatCurrency } from '@/lib/utils';
import type { TravelPackage } from '@/types';

import { notFound, redirect } from '@/lib/navigation';

async function getPackage(id: string): Promise<TravelPackage | null> {
  try {
    await connectDB();
    const doc = await PackageModel.findById(id).lean();
    return doc ? JSON.parse(JSON.stringify(doc)) : null;
  } catch {
    return null;
  }
}

export default async function BookingPage({ params }: { params: Promise<{ packageId: string }> }) {
  const { userId } = await auth();
  if (!userId) redirect('/sign-in');

  const user = await currentUser();
  const { packageId } = await params;
  const pkg = await getPackage(packageId);
  if (!pkg) notFound();

  const userEmail = user?.emailAddresses[0]?.emailAddress ?? '';
  const userName = `${user?.firstName ?? ''} ${user?.lastName ?? ''}`.trim() || 'Traveller';

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="font-display text-4xl text-slate mb-8">BOOK YOUR TRIP</h1>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Package summary */}
        <div className="bg-white rounded-2xl border border-stone/50 overflow-hidden">
          <div className="relative h-48">
            <Image
              src={pkg.images[0]}
              alt={pkg.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-linear-to-t from-slate/60 to-transparent" />
          </div>
          <div className="p-5 space-y-3">
            <div className="flex flex-wrap gap-1.5">
              {pkg.category.map((c) => <Badge key={c} variant="ghostblue">{c}</Badge>)}
            </div>
            <h2 className="font-bold text-slate">{pkg.title}</h2>
            <p className="text-sm text-hint">{pkg.destination} · {pkg.duration} nights</p>
            <div className="border-t border-stone pt-3">
              <p className="text-xs text-hint line-through">{formatCurrency(pkg.originalPrice)}</p>
              <p className="font-display text-3xl text-slate">{formatCurrency(pkg.price)}</p>
              <p className="text-xs text-hint">per person</p>
            </div>
          </div>
        </div>

        {/* Booking form */}
        <BookingForm
          pkg={pkg}
          userId={userId!}
          userEmail={userEmail}
          userName={userName}
        />
      </div>
    </div>
  );
}
