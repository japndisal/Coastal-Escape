'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Calendar, MapPin, Users, ArrowRight } from 'lucide-react';
import Ticket from '@/components/ui/Ticket';
import Badge from '@/components/ui/Badge';
import { formatCurrency } from '@/lib/utils';
import type { Booking } from '@/types';

interface DashboardClientProps {
  bookings: Booking[];
}

export default function DashboardClient({ bookings }: DashboardClientProps) {
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  if (bookings.length === 0) {
    return (
      <div className="text-center py-24 bg-white rounded-2xl border border-stone/50">
        <p className="font-tagline text-muted text-xl mb-2">No trips booked yet</p>
        <p className="text-hint text-sm mb-6">Time to plan your next adventure</p>
        <Link
          href="/packages"
          className="inline-flex items-center gap-2 bg-ocean text-white font-bold uppercase tracking-wider px-6 py-3 rounded-xl hover:bg-ocean/90 transition-colors text-sm"
        >
          Browse Packages <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Bookings list */}
      <div className="lg:col-span-2 space-y-4">
        <h2 className="font-bold uppercase tracking-wider text-slate text-sm">Your Trips ({bookings.length})</h2>
        {bookings.map((booking) => {
          const date = new Date(booking.travelDate).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
          });
          const isSelected = selectedBooking?._id === booking._id;

          return (
            <div
              key={booking._id}
              onClick={() => setSelectedBooking(isSelected ? null : booking)}
              className={`bg-white rounded-2xl border p-5 cursor-pointer transition-all ${
                isSelected ? 'border-ocean shadow-md' : 'border-stone/50 hover:border-stone'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0 space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={
                        booking.status === 'confirmed' ? 'seagreen'
                        : booking.status === 'cancelled' ? 'coral'
                        : 'stone'
                      }
                    >
                      {booking.status}
                    </Badge>
                    <span className="text-xs text-hint font-mono">{booking.bookingRef}</span>
                  </div>
                  <h3 className="font-bold text-slate">{booking.packageTitle}</h3>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted">
                    <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{booking.destination}</span>
                    <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{date}</span>
                    <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />{booking.guests} {booking.guests === 1 ? 'guest' : 'guests'}</span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-bold text-slate">{formatCurrency(booking.totalAmount)}</p>
                  <p className="text-xs text-ocean mt-1 font-medium">{isSelected ? 'Hide ticket' : 'View ticket'}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Ticket panel */}
      <div className="lg:col-span-1">
        {selectedBooking ? (
          <div className="sticky top-24 space-y-3">
            <h2 className="font-bold uppercase tracking-wider text-slate text-sm">Your Ticket</h2>
            <Ticket booking={selectedBooking} />
          </div>
        ) : (
          <div className="sticky top-24 bg-white rounded-2xl border border-stone/50 p-6 text-center">
            <p className="font-tagline text-muted text-sm">Select a booking to view your ticket</p>
          </div>
        )}
      </div>
    </div>
  );
}
