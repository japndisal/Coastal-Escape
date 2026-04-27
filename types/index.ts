export interface TravelPackage {
  _id: string;
  slug: string;
  title: string;
  tagline: string;
  destination: string;
  region: string;
  category: string[];
  duration: number;
  price: number;
  originalPrice: number;
  images: string[];
  highlights: string[];
  included: string[];
  notIncluded: string[];
  maxGroupSize: number;
  rating: number;
  reviewCount: number;
  featured: boolean;
  stripeProductId: string;
  stripePriceId: string;
  createdAt: string;
}

export interface Booking {
  _id: string;
  bookingRef: string;
  userId: string;
  userEmail: string;
  userName: string;
  packageId: string;
  packageTitle: string;
  destination: string;
  travelDate: string;
  guests: number;
  totalAmount: number;
  currency: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  stripeSessionId: string;
  stripePaymentIntentId: string;
  token: string;
  ticketIssuedAt: string;
  emailSentAt: string;
  createdAt: string;
}

export interface Review {
  _id: string;
  packageId: string;
  authorName: string;
  authorAvatar: string;
  rating: number;
  title: string;
  body: string;
  travelDate: string;
  verified: boolean;
  createdAt: string;
}

export interface PackageFilters {
  region: string[];
  category: string[];
  duration: string;
  priceRange: [number, number];
}

export type SortOption = 'price-asc' | 'price-desc' | 'rating' | 'duration' | 'featured';
