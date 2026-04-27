import { auth, currentUser } from '@clerk/nextjs/server';
import { redirect } from '@/lib/navigation';
import { connectDB } from '@/lib/mongodb';
import BookingModel from '@/models/Booking';
import DashboardClient from '@/components/booking/DashboardClient';
import type { Booking } from '@/types';

async function getBookings(userId: string): Promise<Booking[]> {
  try {
    await connectDB();
    const docs = await BookingModel.find({ userId }).sort({ createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(docs));
  } catch {
    return [];
  }
}

export const metadata = { title: 'My Trips — Coastal Escape' };

export default async function DashboardPage() {
  const { userId } = await auth();
  if (!userId) redirect('/sign-in');

  const user = await currentUser();
  const bookings = await getBookings(userId!);
  const firstName = user?.firstName ?? 'Traveller';

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      <div className="mb-10">
        <p className="font-tagline text-ocean text-sm mb-1">Welcome back</p>
        <h1 className="font-display text-4xl sm:text-5xl text-slate">
          HI, {firstName.toUpperCase()}
        </h1>
      </div>
      <DashboardClient bookings={bookings} />
    </div>
  );
}
