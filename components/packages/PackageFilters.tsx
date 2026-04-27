'use client';

import { useRouter, useSearchParams } from '@/lib/navigation';
import { useCallback } from 'react';
import { X } from 'lucide-react';
import type { SortOption } from '@/types';

const REGIONS = ['Europe', 'Southeast Asia', 'Americas', 'Africa', 'Oceania'];
const CATEGORIES = ['Beach', 'Luxury', 'Eco', 'Adventure', 'Culture'];
const DURATIONS = [
  { label: '1–5 nights', value: '1-5' },
  { label: '6–10 nights', value: '6-10' },
  { label: '11+ nights', value: '11+' },
];
const SORT_OPTIONS: { label: string; value: SortOption }[] = [
  { label: 'Featured', value: 'featured' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Top Rated', value: 'rating' },
  { label: 'Duration', value: 'duration' },
];

export default function PackageFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const getArray = (key: string) => searchParams.getAll(key);
  const get = (key: string) => searchParams.get(key) ?? '';

  const push = useCallback(
    (updates: Record<string, string | string[] | null>) => {
      const params = new URLSearchParams(searchParams.toString());
      for (const [key, val] of Object.entries(updates)) {
        params.delete(key);
        if (Array.isArray(val)) {
          val.forEach((v) => params.append(key, v));
        } else if (val !== null) {
          params.set(key, val);
        }
      }
      router.push(`?${params.toString()}`, { scroll: false });
    },
    [router, searchParams]
  );

  const toggleMulti = (key: string, value: string) => {
    const current = getArray(key);
    const next = current.includes(value) ? current.filter((v: string) => v !== value) : [...current, value];
    push({ [key]: next });
  };

  const toggleSingle = (key: string, value: string) => {
    push({ [key]: get(key) === value ? null : value });
  };

  const clearAll = () => router.push('/packages', { scroll: false });

  const hasFilters =
    getArray('region').length > 0 ||
    getArray('category').length > 0 ||
    get('duration') !== '' ||
    get('sort') !== '' && get('sort') !== 'featured';

  return (
    <aside className="space-y-6">
      {/* Sort */}
      <div>
        <h3 className="text-xs font-bold uppercase tracking-widest text-hint mb-3">Sort By</h3>
        <select
          value={get('sort') || 'featured'}
          onChange={(e) => push({ sort: e.target.value })}
          className="w-full text-sm bg-white border border-stone rounded-xl px-3 py-2.5 text-muted focus:outline-none focus:border-ocean"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>

      {/* Region */}
      <div>
        <h3 className="text-xs font-bold uppercase tracking-widest text-hint mb-3">Region</h3>
        <div className="space-y-2">
          {REGIONS.map((r) => (
            <label key={r} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={getArray('region').includes(r)}
                onChange={() => toggleMulti('region', r)}
                className="w-4 h-4 rounded accent-ocean"
              />
              <span className="text-sm text-muted group-hover:text-slate transition-colors">{r}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Category */}
      <div>
        <h3 className="text-xs font-bold uppercase tracking-widest text-hint mb-3">Category</h3>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((c) => {
            const active = getArray('category').includes(c);
            return (
              <button
                key={c}
                onClick={() => toggleMulti('category', c)}
                className={`text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-xl border transition-colors ${
                  active
                    ? 'bg-ocean text-white border-ocean'
                    : 'bg-white text-muted border-stone hover:border-ocean hover:text-ocean'
                }`}
              >
                {c}
              </button>
            );
          })}
        </div>
      </div>

      {/* Duration */}
      <div>
        <h3 className="text-xs font-bold uppercase tracking-widest text-hint mb-3">Duration</h3>
        <div className="space-y-2">
          {DURATIONS.map((d) => (
            <label key={d.value} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="radio"
                name="duration"
                checked={get('duration') === d.value}
                onChange={() => toggleSingle('duration', d.value)}
                className="w-4 h-4 accent-ocean"
              />
              <span className="text-sm text-muted group-hover:text-slate transition-colors">{d.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Clear */}
      {hasFilters && (
        <button
          onClick={clearAll}
          className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-coral hover:text-coral/80 transition-colors"
        >
          <X className="w-3.5 h-3.5" /> Clear all filters
        </button>
      )}
    </aside>
  );
}
