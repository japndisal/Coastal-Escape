import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const MONGODB_URI = process.env.MONGODB_URI!;

// ── Schemas (inline so script is self-contained) ─────────────────────────────

const PackageSchema = new mongoose.Schema({
  slug: String, title: String, tagline: String, destination: String,
  region: String, category: [String], duration: Number, price: Number,
  originalPrice: Number, images: [String], highlights: [String],
  included: [String], notIncluded: [String], maxGroupSize: Number,
  rating: Number, reviewCount: Number, featured: Boolean,
  stripeProductId: String, stripePriceId: String,
}, { timestamps: true });

const ReviewSchema = new mongoose.Schema({
  packageId: mongoose.Schema.Types.ObjectId,
  authorName: String, authorAvatar: String, rating: Number,
  title: String, body: String, travelDate: String, verified: Boolean,
}, { timestamps: true });

const Package = mongoose.models.Package || mongoose.model('Package', PackageSchema);
const Review = mongoose.models.Review || mongoose.model('Review', ReviewSchema);

// ── Package data ──────────────────────────────────────────────────────────────

const packages = [
  {
    slug: 'bali-overwater-retreat',
    title: 'Bali Overwater Retreat',
    tagline: 'Where the jungle meets the sea in eternal bliss',
    destination: 'Bali, Indonesia',
    region: 'Southeast Asia',
    category: ['Beach', 'Luxury'],
    duration: 8,
    price: 3200,
    originalPrice: 3800,
    images: [
      'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=800&h=600&fit=crop',
    ],
    highlights: ['Private overwater villa', 'Daily spa treatments', 'Rice terrace trekking', 'Temple sunset tour'],
    included: ['Return flights', 'Private villa 8 nights', 'All meals', 'Airport transfers', 'Guided tours'],
    notIncluded: ['Travel insurance', 'Personal shopping', 'Alcoholic beverages'],
    maxGroupSize: 2,
    rating: 4.9,
    reviewCount: 128,
    featured: true,
  },
  {
    slug: 'santorini-caldera-escape',
    title: 'Santorini Caldera Escape',
    tagline: 'Sunsets painted in gold over cobalt domes',
    destination: 'Santorini, Greece',
    region: 'Europe',
    category: ['Beach', 'Luxury', 'Culture'],
    duration: 7,
    price: 4100,
    originalPrice: 4600,
    images: [
      'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800&h=600&fit=crop',
    ],
    highlights: ['Cave suite with caldera view', 'Private catamaran day trip', 'Wine tasting tour', 'Oia sunset walk'],
    included: ['Return flights', 'Cave suite 7 nights', 'Breakfast daily', 'Catamaran tour', 'Transfers'],
    notIncluded: ['Lunches & dinners', 'Travel insurance', 'Optional excursions'],
    maxGroupSize: 4,
    rating: 4.8,
    reviewCount: 94,
    featured: true,
  },
  {
    slug: 'maldives-private-island',
    title: 'Maldives Private Island',
    tagline: 'A speck of paradise in the middle of forever',
    destination: 'North Malé Atoll, Maldives',
    region: 'Southeast Asia',
    category: ['Beach', 'Luxury', 'Eco'],
    duration: 10,
    price: 6800,
    originalPrice: 7500,
    images: [
      'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=800&h=600&fit=crop',
    ],
    highlights: ['Over-water bungalow', 'Snorkelling with manta rays', 'Seaplane arrival', 'Sunset dolphin cruise'],
    included: ['Seaplane transfers', 'Overwater bungalow 10 nights', 'Full board', 'Non-motorised water sports'],
    notIncluded: ['International flights', 'Diving courses', 'Spa treatments'],
    maxGroupSize: 2,
    rating: 5.0,
    reviewCount: 67,
    featured: true,
  },
  {
    slug: 'kyoto-cultural-immersion',
    title: 'Kyoto Cultural Immersion',
    tagline: 'Bamboo groves, matcha rituals, and a thousand lanterns',
    destination: 'Kyoto, Japan',
    region: 'Southeast Asia',
    category: ['Culture', 'Adventure'],
    duration: 9,
    price: 2900,
    originalPrice: 3200,
    images: [
      'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&h=600&fit=crop',
    ],
    highlights: ['Ryokan stay with onsen', 'Tea ceremony workshop', 'Arashiyama bamboo grove', 'Fushimi Inari hike'],
    included: ['Return flights', 'Ryokan 5 nights + hotel 4 nights', 'Breakfast daily', 'JR Pass 7-day', 'Guided tours'],
    notIncluded: ['Lunches & dinners', 'Personal shopping', 'Optional temples entry'],
    maxGroupSize: 10,
    rating: 4.7,
    reviewCount: 112,
    featured: false,
  },
  {
    slug: 'patagonia-trekking-adventure',
    title: 'Patagonia Trekking Adventure',
    tagline: 'Where the wind sculpts the world and silence roars',
    destination: 'Torres del Paine, Chile',
    region: 'Americas',
    category: ['Adventure', 'Eco'],
    duration: 12,
    price: 3600,
    originalPrice: 4000,
    images: [
      'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&h=600&fit=crop',
    ],
    highlights: ['W-Trek full circuit', 'Glacier Grey boat trip', 'Condor spotting', 'Base Torres sunrise hike'],
    included: ['Return flights to Punta Arenas', 'Lodge accommodation 12 nights', 'All meals on trek', 'Certified guide'],
    notIncluded: ['Travel insurance', 'National Park entrance fee', 'Alcoholic drinks'],
    maxGroupSize: 8,
    rating: 4.8,
    reviewCount: 56,
    featured: false,
  },
  {
    slug: 'amalfi-coast-sailing',
    title: 'Amalfi Coast Sailing Week',
    tagline: 'Lemon groves tumbling into the electric-blue sea',
    destination: 'Amalfi Coast, Italy',
    region: 'Europe',
    category: ['Beach', 'Adventure', 'Culture'],
    duration: 7,
    price: 3400,
    originalPrice: 3900,
    images: [
      'https://images.unsplash.com/photo-1555992457-b8fefdd09069?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=800&h=600&fit=crop',
    ],
    highlights: ['Private sailboat 7 days', 'Positano & Ravello visits', 'Limoncello distillery tour', 'Snorkelling at Blue Grotto'],
    included: ['Sailboat charter with skipper', 'All meals on board', 'Fuel & marina fees', 'Airport transfers Naples'],
    notIncluded: ['International flights', 'Travel insurance', 'Shore excursions'],
    maxGroupSize: 6,
    rating: 4.6,
    reviewCount: 43,
    featured: true,
  },
  {
    slug: 'morocco-desert-journey',
    title: 'Morocco Desert Journey',
    tagline: 'Dunes at dusk, starlight over the Sahara',
    destination: 'Marrakech & Sahara, Morocco',
    region: 'Africa',
    category: ['Adventure', 'Culture'],
    duration: 8,
    price: 1900,
    originalPrice: 2200,
    images: [
      'https://images.unsplash.com/photo-1539020140153-e479b8c21d4b?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1548013146-72479768bada?w=800&h=600&fit=crop',
    ],
    highlights: ['Camel trek to desert camp', 'Riad stay in Marrakech medina', 'Fès old city walking tour', 'Atlas Mountains day trip'],
    included: ['Return flights', 'Riad & luxury camp 8 nights', 'Breakfast & dinner', 'Private driver & guide', 'Camel trek'],
    notIncluded: ['Lunches', 'Personal shopping in souks', 'Travel insurance'],
    maxGroupSize: 12,
    rating: 4.7,
    reviewCount: 88,
    featured: false,
  },
  {
    slug: 'new-zealand-fjord-explorer',
    title: 'New Zealand Fjord Explorer',
    tagline: 'Waterfalls cascading into mirror-glass fjords',
    destination: 'Fiordland, New Zealand',
    region: 'Oceania',
    category: ['Adventure', 'Eco'],
    duration: 11,
    price: 4500,
    originalPrice: 5000,
    images: [
      'https://images.unsplash.com/photo-1469521669194-babb45599def?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=800&h=600&fit=crop',
    ],
    highlights: ['Milford & Doubtful Sound cruises', 'Routeburn Track multi-day trek', 'Glow-worm cave tour', 'Bungee jumping option'],
    included: ['Return flights Auckland', 'Lodge & eco-camp 11 nights', 'All meals', 'All activities listed'],
    notIncluded: ['International flights', 'Optional bungee', 'Travel insurance'],
    maxGroupSize: 10,
    rating: 4.9,
    reviewCount: 71,
    featured: false,
  },
  {
    slug: 'costa-rica-rainforest-retreat',
    title: 'Costa Rica Rainforest Retreat',
    tagline: 'Howler monkeys at dawn, bioluminescent bays at midnight',
    destination: 'Guanacaste & Arenal, Costa Rica',
    region: 'Americas',
    category: ['Eco', 'Adventure'],
    duration: 9,
    price: 2400,
    originalPrice: 2800,
    images: [
      'https://images.unsplash.com/photo-1518259102261-b40117eabbc9?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&h=600&fit=crop',
    ],
    highlights: ['Arenal volcano hike', 'Bioluminescent kayak tour', 'Zip-lining through canopy', 'Sea turtle nesting night walk'],
    included: ['Return flights', 'Eco-lodge 9 nights', 'All meals', 'All listed activities', 'Airport transfers'],
    notIncluded: ['Travel insurance', 'Optional white-water rafting', 'Personal purchases'],
    maxGroupSize: 8,
    rating: 4.8,
    reviewCount: 103,
    featured: false,
  },
  {
    slug: 'tuscany-villa-food-wine',
    title: 'Tuscany Villa — Food & Wine',
    tagline: 'Terracotta rooftops, truffle hunts, and Chianti at golden hour',
    destination: 'Chianti, Tuscany, Italy',
    region: 'Europe',
    category: ['Luxury', 'Culture'],
    duration: 7,
    price: 3800,
    originalPrice: 4200,
    images: [
      'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=800&h=600&fit=crop',
    ],
    highlights: ['Private villa with pool', 'Truffle hunting with local guide', 'Chianti & Brunello wine tastings', 'Cooking class with Nonna'],
    included: ['Return flights', 'Private villa 7 nights', 'Breakfast & 4 dinners', 'All food & wine experiences'],
    notIncluded: ['Lunches', 'Personal wine purchases', 'Travel insurance'],
    maxGroupSize: 8,
    rating: 4.9,
    reviewCount: 59,
    featured: true,
  },
  {
    slug: 'kenya-masai-mara-safari',
    title: 'Kenya Masai Mara Safari',
    tagline: 'The Great Migration — a million hooves on amber savannah',
    destination: 'Masai Mara, Kenya',
    region: 'Africa',
    category: ['Eco', 'Adventure', 'Luxury'],
    duration: 8,
    price: 5200,
    originalPrice: 5800,
    images: [
      'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800&h=600&fit=crop',
    ],
    highlights: ['Big Five game drives', 'Hot air balloon over Mara', 'Masai village visit', 'Mara River wildebeest crossing'],
    included: ['Return flights Nairobi', 'Luxury tented camp 8 nights', 'Full board', 'All game drives', 'Balloon safari'],
    notIncluded: ['International flights', 'Travel insurance', 'Gratuities'],
    maxGroupSize: 6,
    rating: 5.0,
    reviewCount: 82,
    featured: true,
  },
  {
    slug: 'iceland-northern-lights',
    title: 'Iceland Northern Lights Quest',
    tagline: 'Dancing auroras above black sand and frozen waterfalls',
    destination: 'Reykjavik & Ring Road, Iceland',
    region: 'Europe',
    category: ['Adventure', 'Eco'],
    duration: 6,
    price: 2700,
    originalPrice: 3100,
    images: [
      'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1520769945061-0a448c463865?w=800&h=600&fit=crop',
    ],
    highlights: ['Aurora borealis guided night tours', 'Golden Circle tour', 'Blue Lagoon geothermal soak', 'Glacier walk on Vatnajökull'],
    included: ['Return flights', 'Boutique hotel 6 nights', 'Breakfast daily', 'Aurora tours (3 nights)', 'Blue Lagoon entry'],
    notIncluded: ['Lunches & dinners', 'Travel insurance', 'Optional snowmobile tour'],
    maxGroupSize: 12,
    rating: 4.7,
    reviewCount: 97,
    featured: false,
  },
];

// ── Review templates ──────────────────────────────────────────────────────────

const reviewTemplates = [
  { rating: 5, title: 'Absolutely life-changing', body: 'This trip exceeded every expectation. The attention to detail from the Coastal Escape team was extraordinary — every transfer, every meal, every experience felt curated just for us.' },
  { rating: 5, title: 'Worth every penny', body: 'I was hesitant about the price but this was the best decision I\'ve ever made. The accommodation was stunning and the guides were incredibly knowledgeable and passionate.' },
  { rating: 4, title: 'Magical experience', body: 'Truly unforgettable. A couple of minor logistics hiccups on day two but the team sorted everything quickly. Would absolutely book again.' },
  { rating: 5, title: 'Best holiday of my life', body: 'My partner and I have been dreaming about this trip for years. Coastal Escape turned that dream into reality. The itinerary was perfectly balanced — adventure and relaxation in equal measure.' },
  { rating: 4, title: 'Highly recommended', body: 'Exceptional service and incredible destinations. The local guides were the highlight — their stories and knowledge brought the place to life in a way no guidebook could.' },
  { rating: 5, title: 'Flawless from start to finish', body: 'Every single detail was taken care of. I didn\'t have to worry about anything — just showed up and experienced pure magic. Already planning my next trip with Coastal Escape.' },
  { rating: 4, title: 'A journey to remember', body: 'The scenery was even more breathtaking than the photos. Some days were packed and I could have used more downtime, but overall an amazing trip I\'d recommend to anyone.' },
  { rating: 5, title: 'Exceeded all expectations', body: 'From the moment we landed to the final farewell, everything was seamless. The luxury touches were extraordinary without feeling over the top. Perfect trip.' },
  { rating: 3, title: 'Beautiful but overpromised', body: 'The destination is genuinely stunning and the accommodation was lovely. However, some of the included activities weren\'t available during our visit, which was disappointing.' },
  { rating: 5, title: 'Pure paradise', body: 'I\'ve travelled extensively and this ranks among the top experiences of my life. Thoughtfully designed, beautifully executed, and genuinely transformative.' },
  { rating: 4, title: 'Great value for a luxury trip', body: 'Compared to booking everything individually, this package saved us significant money while delivering a premium experience. The team\'s local connections made a real difference.' },
  { rating: 5, title: 'Do it. Just do it.', body: 'If you\'re on the fence, stop deliberating. This trip is extraordinary. The memories we made will last a lifetime — I\'m already telling everyone I know to book it.' },
];

const authorNames = [
  'Sarah Mitchell', 'James Okonkwo', 'Elena Vasquez', 'Tom Hartley', 'Priya Nair',
  'Marcus Chen', 'Isabelle Dupont', 'Raj Patel', 'Anna Kowalski', 'David Fernandez',
  'Sophie Williams', 'Luca Romano', 'Aisha Ibrahim', 'Ben Thompson', 'Mei Lin',
];

const travelMonths = [
  'January 2025', 'February 2025', 'March 2025', 'April 2025', 'May 2025',
  'June 2025', 'July 2025', 'August 2025', 'September 2025', 'October 2025',
];

async function seed() {
  console.log('Connecting to MongoDB…');
  await mongoose.connect(MONGODB_URI);
  console.log('Connected.');

  // Clear existing data
  await Package.deleteMany({});
  await Review.deleteMany({});
  console.log('Cleared existing packages and reviews.');

  // Insert packages
  const inserted = await Package.insertMany(packages);
  console.log(`Inserted ${inserted.length} packages.`);

  // Insert reviews (8–12 per package)
  const reviews = [];
  for (const pkg of inserted) {
    const count = 8 + Math.floor(Math.random() * 5);
    const usedAuthors = new Set<string>();
    for (let i = 0; i < count; i++) {
      let author = authorNames[Math.floor(Math.random() * authorNames.length)];
      while (usedAuthors.has(author)) {
        author = authorNames[Math.floor(Math.random() * authorNames.length)];
      }
      usedAuthors.add(author);
      const template = reviewTemplates[Math.floor(Math.random() * reviewTemplates.length)];
      reviews.push({
        packageId: pkg._id,
        authorName: author,
        authorAvatar: `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'women' : 'men'}/${Math.floor(Math.random() * 70) + 1}.jpg`,
        rating: template.rating,
        title: template.title,
        body: template.body,
        travelDate: travelMonths[Math.floor(Math.random() * travelMonths.length)],
        verified: true,
      });
    }
  }
  await Review.insertMany(reviews);
  console.log(`Inserted ${reviews.length} reviews.`);

  await mongoose.disconnect();
  console.log('Done. Database seeded successfully!');
}

seed().catch((err) => { console.error(err); process.exit(1); });
