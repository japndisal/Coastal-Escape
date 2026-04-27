import { Suspense } from 'react';
import PackageFilters from '@/components/packages/PackageFilters';
import PackagesListClient from '@/components/packages/PackagesListClient';
import { connectDB } from '@/lib/mongodb';
import PackageModel from '@/models/Package';
import type { TravelPackage } from '@/types';

async function getAllPackages(): Promise<TravelPackage[]> {
  try {
    await connectDB();
    const docs = await PackageModel.find({}).lean();
    return JSON.parse(JSON.stringify(docs));
  } catch {
    return [];
  }
}

export const metadata = {
  title: 'All Packages — Coastal Escape',
};

export default async function PackagesPage() {
  const packages = await getAllPackages();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <p className="font-tagline text-ocean text-sm mb-2">Discover your next adventure</p>
        <h1 className="font-display text-5xl text-slate">ALL PACKAGES</h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        <div className="lg:w-64 shrink-0">
          <Suspense>
            <PackageFilters />
          </Suspense>
        </div>
        <div className="flex-1">
          <Suspense fallback={<div className="text-muted text-sm">Loading packages…</div>}>
            <PackagesListClient packages={packages} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
