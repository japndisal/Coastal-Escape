import { NextResponse } from 'next/server';
import { resend } from '@/lib/resend';
import { TicketEmail } from '@/components/email/TicketEmail';
import { createElement } from 'react';

export async function POST(req: Request) {
  try {
    const { booking, packageData } = await req.json();

    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL!,
      to: booking.userEmail,
      subject: `Your trip is confirmed — ${packageData.title} (${booking.bookingRef})`,
      react: createElement(TicketEmail, { booking, packageData }),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Email send error:', err);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
