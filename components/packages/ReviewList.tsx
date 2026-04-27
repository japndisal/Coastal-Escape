import { Star, CheckCircle } from 'lucide-react';
import Image from 'next/image';
import type { Review } from '@/types';

interface ReviewListProps {
  reviews: Review[];
}

export default function ReviewList({ reviews }: ReviewListProps) {
  if (reviews.length === 0) {
    return <p className="text-muted text-sm italic">No reviews yet.</p>;
  }

  return (
    <div className="space-y-6">
      {reviews.map((r) => (
        <div key={r._id} className="bg-white rounded-2xl p-5 border border-stone/50">
          <div className="flex items-start gap-4">
            <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 bg-stone">
              {r.authorAvatar && (
                <Image src={r.authorAvatar} alt={r.authorName} fill className="object-cover" sizes="40px" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold text-slate text-sm">{r.authorName}</span>
                {r.verified && (
                  <span className="flex items-center gap-0.5 text-xs text-seagreen font-medium">
                    <CheckCircle className="w-3.5 h-3.5" /> Verified
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${i < r.rating ? 'fill-coral text-coral' : 'text-stone'}`}
                    />
                  ))}
                </div>
                <span className="text-xs text-hint">{r.travelDate}</span>
              </div>
              <h4 className="font-bold text-slate text-sm mb-1">{r.title}</h4>
              <p className="text-muted text-sm leading-relaxed">{r.body}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
