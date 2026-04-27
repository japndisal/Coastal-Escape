import mongoose, { Schema, models, model } from 'mongoose';

const PackageSchema = new Schema({
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  tagline: { type: String, required: true },
  destination: { type: String, required: true },
  region: { type: String, required: true },
  category: [{ type: String }],
  duration: { type: Number, required: true },
  price: { type: Number, required: true },
  originalPrice: { type: Number, required: true },
  images: [{ type: String }],
  highlights: [{ type: String }],
  included: [{ type: String }],
  notIncluded: [{ type: String }],
  maxGroupSize: { type: Number, default: 12 },
  rating: { type: Number, default: 4.5 },
  reviewCount: { type: Number, default: 0 },
  featured: { type: Boolean, default: false },
  stripeProductId: { type: String, default: '' },
  stripePriceId: { type: String, default: '' },
}, { timestamps: true });

export default models.Package || model('Package', PackageSchema);
