import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { connectDB } from '@/lib/mongodb';
import BookingModel from '@/models/Booking';
import { generateTicketToken, generateBookingRef } from '@/lib/ticket';

export async function POST(req: Request) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature')!;

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const meta = session.metadata!;

    try {
      await connectDB();

      const token = generateTicketToken();
      const bookingRef = generateBookingRef();
      const now = new Date();

      const booking = await BookingModel.create({
        bookingRef,
        userId: meta.userId,
        userEmail: meta.userEmail,
        userName: meta.userName,
        packageId: meta.packageId,
        packageTitle: meta.packageTitle,
        destination: meta.destination,
        travelDate: new Date(meta.travelDate),
        guests: Number(meta.guests),
        totalAmount: Number(meta.totalAmount),
        currency: 'USD',
        status: 'confirmed',
        stripeSessionId: session.id,
        stripePaymentIntentId: session.payment_intent as string,
        token,
        ticketIssuedAt: now,
      });

      // Send ticket email
      await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/email/ticket`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          booking: {
            bookingRef,
            userEmail: meta.userEmail,
            userName: meta.userName,
            token,
          },
          packageData: {
            title: meta.packageTitle,
            destination: meta.destination,
          },
        }),
      });

      await BookingModel.findByIdAndUpdate(booking._id, { emailSentAt: new Date() });
    } catch (err) {
      console.error('Webhook processing error:', err);
      return NextResponse.json({ error: 'Processing failed' }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}
