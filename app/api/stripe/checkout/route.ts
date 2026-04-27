import { NextResponse } from 'next/server';
import { z } from 'zod';
import { stripe } from '@/lib/stripe';

const schema = z.object({
  packageId: z.string(),
  packageTitle: z.string(),
  packageSlug: z.string(),
  destination: z.string(),
  price: z.number(),
  travelDate: z.string(),
  guests: z.number().int().min(1),
  userId: z.string(),
  userEmail: z.string().email(),
  userName: z.string(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = schema.parse(body);

    const appUrl = process.env.NEXT_PUBLIC_APP_URL!;

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      customer_email: data.userEmail,
      line_items: [
        {
          price_data: {
            currency: 'usd',
            unit_amount: Math.round(data.price * data.guests * 100),
            product_data: {
              name: data.packageTitle,
              description: `${data.destination} · ${data.guests} guest${data.guests > 1 ? 's' : ''} · ${data.travelDate}`,
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        packageId: data.packageId,
        packageTitle: data.packageTitle,
        packageSlug: data.packageSlug,
        destination: data.destination,
        travelDate: data.travelDate,
        guests: String(data.guests),
        userId: data.userId,
        userEmail: data.userEmail,
        userName: data.userName,
        totalAmount: String(data.price * data.guests),
      },
      success_url: `${appUrl}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/packages/${data.packageSlug}`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 });
  }
}
