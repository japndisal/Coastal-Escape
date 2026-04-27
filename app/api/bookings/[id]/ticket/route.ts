import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { connectDB } from '@/lib/mongodb';
import BookingModel from '@/models/Booking';

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    await connectDB();
    const { id } = await params;
    const booking = await BookingModel.findOne({ _id: id, userId }).lean();
    if (!booking) return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    return NextResponse.json(JSON.parse(JSON.stringify(booking)));
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to fetch ticket' }, { status: 500 });
  }
}
