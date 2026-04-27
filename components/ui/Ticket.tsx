'use client';

import { QRCodeSVG } from 'qrcode.react';
import { Compass } from 'lucide-react';
import type { Booking } from '@/types';

interface TicketProps {
  booking: Booking;
}

export default function Ticket({ booking }: TicketProps) {
  const travelDate = new Date(booking.travelDate).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  return (
    <div className="bg-slate text-white rounded-2xl overflow-hidden shadow-xl max-w-md w-full mx-auto">
      {/* Header */}
      <div className="px-6 py-5 flex items-center justify-between border-b border-white/10">
        <div className="flex items-center gap-2">
          <Compass className="w-5 h-5 text-ocean" />
          <span className="font-display text-lg leading-none">
            COASTAL<span className="text-ocean">.</span>
            <span className="font-tagline font-normal text-base ml-1">escape</span>
          </span>
        </div>
        <span className="text-xs font-bold uppercase tracking-widest text-seagreen bg-seagreen/20 px-2.5 py-1 rounded-full">
          Confirmed
        </span>
      </div>

      {/* Trip info */}
      <div className="px-6 py-5 space-y-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-hint">Trip</p>
          <p className="font-bold text-white text-lg leading-tight">{booking.packageTitle}</p>
          <p className="text-stone text-sm">{booking.destination}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-hint mb-0.5">Traveller</p>
            <p className="text-white text-sm font-medium">{booking.userName}</p>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-hint mb-0.5">Guests</p>
            <p className="text-white text-sm font-medium">{booking.guests} {booking.guests === 1 ? 'traveller' : 'travellers'}</p>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-hint mb-0.5">Travel Date</p>
            <p className="text-white text-sm font-medium">{travelDate}</p>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-hint mb-0.5">Total Paid</p>
            <p className="text-white text-sm font-medium">
              ${booking.totalAmount.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* Perforated divider */}
      <div className="flex items-center px-4">
        <div className="w-6 h-6 rounded-full bg-sand -ml-8 shrink-0" />
        <div className="flex-1 border-t-2 border-dashed border-white/20 mx-2" />
        <div className="w-6 h-6 rounded-full bg-sand -mr-8 shrink-0" />
      </div>

      {/* Booking ref + QR */}
      <div className="px-6 py-5 flex items-center justify-between gap-4">
        <div className="space-y-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-hint mb-0.5">Booking Ref</p>
            <p className="font-bold text-white font-mono">{booking.bookingRef}</p>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-hint mb-0.5">Token</p>
            <p className="text-xs text-ocean font-mono break-all leading-relaxed max-w-[180px]">
              {booking.token.substring(0, 8)}…
            </p>
          </div>
        </div>
        <div className="bg-white rounded-xl p-2 shrink-0">
          <QRCodeSVG
            value={booking.token}
            size={80}
            fgColor="#2C2C2A"
          />
        </div>
      </div>
    </div>
  );
}
