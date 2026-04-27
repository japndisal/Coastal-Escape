import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import PackageModel from '@/models/Package';

export async function GET() {
  try {
    await connectDB();
    const packages = await PackageModel.find({}).sort({ featured: -1, createdAt: -1 }).lean();
    return NextResponse.json(packages);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch packages' }, { status: 500 });
  }
}
