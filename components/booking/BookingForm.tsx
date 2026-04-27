'use client';

import { useState } from 'react';
import { useRouter } from '@/lib/navigation';
import { Calendar, Users, User, Mail } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import type { TravelPackage } from '@/types';

interface BookingFormProps {
  pkg: TravelPackage;
  userId: string;
  userEmail: string;
  userName: string;
}

export default function BookingForm({ pkg, userId, userEmail, userName }: BookingFormProps) {
  const router = useRouter();
  const [travelDate, setTravelDate] = useState('');
  const [guests, setGuests] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const total = pkg.price * guests;

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          packageId: pkg._id,
          packageTitle: pkg.title,
          packageSlug: pkg.slug,
          destination: pkg.destination,
          stripePriceId: pkg.stripePriceId,
          price: pkg.price,
          travelDate,
          guests,
          userId,
          userEmail,
          userName,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Checkout failed');
      router.push(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 14);

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-stone/50 p-6 space-y-5">
      <h2 className="font-bold text-slate text-lg uppercase tracking-wider">Your Details</h2>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-hint flex items-center gap-1.5">
            <User className="w-3.5 h-3.5" /> Name
          </label>
          <input
            type="text"
            value={userName}
            readOnly
            className="w-full bg-sand border border-stone rounded-xl px-3 py-2.5 text-sm text-muted"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-hint flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5" /> Email
          </label>
          <input
            type="email"
            value={userEmail}
            readOnly
            className="w-full bg-sand border border-stone rounded-xl px-3 py-2.5 text-sm text-muted"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-hint flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" /> Travel Date
          </label>
          <input
            type="date"
            required
            value={travelDate}
            min={minDate.toISOString().split('T')[0]}
            onChange={(e) => setTravelDate(e.target.value)}
            className="w-full bg-white border border-stone rounded-xl px-3 py-2.5 text-sm text-slate focus:outline-none focus:border-ocean"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-hint flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5" /> Guests
          </label>
          <select
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            className="w-full bg-white border border-stone rounded-xl px-3 py-2.5 text-sm text-slate focus:outline-none focus:border-ocean"
          >
            {Array.from({ length: pkg.maxGroupSize }, (_, i) => i + 1).map((n) => (
              <option key={n} value={n}>{n} {n === 1 ? 'guest' : 'guests'}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="border-t border-stone pt-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted">{formatCurrency(pkg.price)} × {guests} {guests === 1 ? 'guest' : 'guests'}</span>
          <span className="font-bold text-slate">{formatCurrency(total)}</span>
        </div>
      </div>

      {error && (
        <p className="text-sm text-coral bg-coral/10 rounded-xl px-3 py-2">{error}</p>
      )}

      <button
        type="submit"
        disabled={loading || !travelDate}
        className="w-full bg-ocean text-white font-bold uppercase tracking-wider py-4 rounded-xl hover:bg-ocean/90 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Redirecting to payment…' : `Pay ${formatCurrency(total)}`}
      </button>
    </form>
  );
}
