import Link from 'next/link';
import Image from 'next/image';
import { Star, Clock, Users } from 'lucide-react';
import Badge from '@/components/ui/Badge';
import { formatCurrency } from '@/lib/utils';
import type { TravelPackage } from '@/types';

interface PackageCardProps {
  pkg: TravelPackage;
}

export default function PackageCard({ pkg }: PackageCardProps) {
  const discount = Math.round(((pkg.originalPrice - pkg.price) / pkg.originalPrice) * 100);

  return (
    <Link href={`/packages/${pkg.slug}`} className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-stone/50">
      <div className="relative h-52 overflow-hidden">
        <Image
          src={pkg.images[0]}
          alt={pkg.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate/60 to-transparent" />
        {discount > 0 && (
          <div className="absolute top-3 left-3">
            <Badge variant="coral">{discount}% off</Badge>
          </div>
        )}
        {pkg.featured && (
          <div className="absolute top-3 right-3">
            <Badge variant="ghostblue">Featured</Badge>
          </div>
        )}
        <div className="absolute bottom-3 left-3 right-3">
          <p className="font-tagline text-white/90 text-sm line-clamp-1">{pkg.tagline}</p>
        </div>
      </div>

      <div className="p-5">
        <h3 className="font-bold text-slate text-base mb-1 group-hover:text-ocean transition-colors line-clamp-1">{pkg.title}</h3>
        <p className="text-hint text-sm mb-3">{pkg.destination}</p>

        <div className="flex items-center gap-4 text-xs text-muted mb-4">
          <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{pkg.duration} nights</span>
          <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />Up to {pkg.maxGroupSize}</span>
          <span className="flex items-center gap-1 text-coral">
            <Star className="w-3.5 h-3.5 fill-coral" />{pkg.rating} ({pkg.reviewCount})
          </span>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {pkg.category.slice(0, 3).map((cat) => (
            <Badge key={cat} variant="stone">{cat}</Badge>
          ))}
        </div>

        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs text-hint line-through">{formatCurrency(pkg.originalPrice)}</p>
            <p className="text-lg font-bold text-slate">{formatCurrency(pkg.price)}</p>
            <p className="text-xs text-hint">per person</p>
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-ocean border border-ocean px-3 py-1.5 rounded-xl group-hover:bg-ocean group-hover:text-white transition-colors">
            View Trip
          </span>
        </div>
      </div>
    </Link>
  );
}
