'use client';

import { useSearchParams } from '@/lib/navigation';
import PackageGrid from './PackageGrid';
import type { TravelPackage, SortOption } from '@/types';

interface Props {
  packages: TravelPackage[];
}

export default function PackagesListClient({ packages }: Props) {
  const searchParams = useSearchParams();

  const regions = searchParams.getAll('region');
  const categories = searchParams.getAll('category');
  const duration = searchParams.get('duration') ?? '';
  const sort = (searchParams.get('sort') ?? 'featured') as SortOption;

  let filtered = packages;

  if (regions.length > 0) {
    filtered = filtered.filter((p) => regions.includes(p.region));
  }
  if (categories.length > 0) {
    filtered = filtered.filter((p) => p.category.some((c) => categories.includes(c)));
  }
  if (duration) {
    filtered = filtered.filter((p) => {
      if (duration === '1-5') return p.duration >= 1 && p.duration <= 5;
      if (duration === '6-10') return p.duration >= 6 && p.duration <= 10;
      if (duration === '11+') return p.duration >= 11;
      return true;
    });
  }

  const sorted = [...filtered].sort((a, b) => {
    if (sort === 'price-asc') return a.price - b.price;
    if (sort === 'price-desc') return b.price - a.price;
    if (sort === 'rating') return b.rating - a.rating;
    if (sort === 'duration') return b.duration - a.duration;
    return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
  });

  return (
    <div>
      <p className="text-sm text-hint mb-6">
        {sorted.length} {sorted.length === 1 ? 'package' : 'packages'} found
      </p>
      <PackageGrid packages={sorted} />
    </div>
  );
}
