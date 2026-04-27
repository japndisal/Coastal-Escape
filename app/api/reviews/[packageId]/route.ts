import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import ReviewModel from '@/models/Review';

export async function GET(_req: Request, { params }: { params: Promise<{ packageId: string }> }) {
  try {
    await connectDB();
    const { packageId } = await params;
    const reviews = await ReviewModel.find({ packageId }).sort({ createdAt: -1 }).lean();
    return NextResponse.json(reviews);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 });
  }
}
