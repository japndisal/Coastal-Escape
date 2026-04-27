import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { connectDB } from '@/lib/mongodb';
import BookingModel from '@/models/Booking';

export async function GET() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    await connectDB();
    const bookings = await BookingModel.find({ userId }).sort({ createdAt: -1 }).lean();
    return NextResponse.json(JSON.parse(JSON.stringify(bookings)));
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 });
  }
}
