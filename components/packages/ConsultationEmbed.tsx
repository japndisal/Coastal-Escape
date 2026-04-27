'use client';

import Cal from '@calcom/embed-react';

export default function ConsultationEmbed() {
  const calLink = process.env.NEXT_PUBLIC_CAL_LINK ?? 'demo/consultation';

  return (
    <div className="bg-white rounded-2xl border border-stone/50 overflow-hidden">
      <div className="px-6 pt-6 pb-4 border-b border-stone">
        <p className="font-tagline text-ocean text-sm mb-1">Need help deciding?</p>
        <h3 className="font-bold uppercase tracking-wider text-slate">Book a Free Consultation</h3>
        <p className="text-sm text-muted mt-1">30 minutes with one of our travel experts — completely free, no obligation.</p>
      </div>
      <Cal
        calLink={calLink}
        style={{ width: '100%', height: '500px', overflow: 'scroll' }}
        config={{ layout: 'month_view' }}
      />
    </div>
  );
}
