'use client';

import { useState } from 'react';
import { Check, X } from 'lucide-react';
import ReviewList from './ReviewList';
import type { TravelPackage, Review } from '@/types';

const TABS = ['Overview', 'Included', 'Reviews'] as const;
type Tab = typeof TABS[number];

export default function PackageDetailClient({ pkg, reviews }: { pkg: TravelPackage; reviews: Review[] }) {
  const [tab, setTab] = useState<Tab>('Overview');

  return (
    <div className="bg-white rounded-2xl border border-stone/50 overflow-hidden">
      {/* Tab bar */}
      <div className="flex border-b border-stone">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 py-3 text-sm font-bold uppercase tracking-wider transition-colors ${
              tab === t
                ? 'text-ocean border-b-2 border-ocean -mb-px'
                : 'text-muted hover:text-slate'
            }`}
          >
            {t} {t === 'Reviews' && `(${reviews.length})`}
          </button>
        ))}
      </div>

      <div className="p-6">
        {tab === 'Overview' && (
          <div className="space-y-6">
            <div>
              <h3 className="font-bold uppercase tracking-wider text-slate mb-3">Highlights</h3>
              <ul className="space-y-2">
                {pkg.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2 text-sm text-muted">
                    <Check className="w-4 h-4 text-ocean mt-0.5 shrink-0" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-bold uppercase tracking-wider text-slate mb-1">Destination</h3>
              <p className="text-muted text-sm">{pkg.destination} · {pkg.region}</p>
            </div>
          </div>
        )}

        {tab === 'Included' && (
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold uppercase tracking-wider text-seagreen mb-3">Included</h3>
              <ul className="space-y-2">
                {pkg.included.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-muted">
                    <Check className="w-4 h-4 text-seagreen mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-bold uppercase tracking-wider text-coral mb-3">Not Included</h3>
              <ul className="space-y-2">
                {pkg.notIncluded.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-muted">
                    <X className="w-4 h-4 text-coral mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {tab === 'Reviews' && <ReviewList reviews={reviews} />}
      </div>
    </div>
  );
}
