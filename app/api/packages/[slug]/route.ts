import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import PackageModel from '@/models/Package';

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    await connectDB();
    const { slug } = await params;
    const pkg = await PackageModel.findOne({ slug }).lean();
    if (!pkg) return NextResponse.json({ error: 'Package not found' }, { status: 404 });
    return NextResponse.json(pkg);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch package' }, { status: 500 });
  }
}
