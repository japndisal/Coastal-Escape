import PackageCard from './PackageCard';
import type { TravelPackage } from '@/types';

interface PackageGridProps {
  packages: TravelPackage[];
}

export default function PackageGrid({ packages }: PackageGridProps) {
  if (packages.length === 0) {
    return (
      <div className="text-center py-24">
        <p className="font-tagline text-muted text-xl mb-2">No packages found</p>
        <p className="text-hint text-sm">Try adjusting your filters</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {packages.map((pkg) => (
        <PackageCard key={pkg._id} pkg={pkg} />
      ))}
    </div>
  );
}
