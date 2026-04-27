import { models, model, Schema } from 'mongoose';

const BookingSchema = new Schema({
  bookingRef: { type: String, required: true, unique: true },
  userId: { type: String, required: true },
  userEmail: { type: String, required: true },
  userName: { type: String, required: true },
  packageId: { type: Schema.Types.ObjectId, ref: 'Package', required: true },
  packageTitle: { type: String, required: true },
  destination: { type: String, required: true },
  travelDate: { type: Date, required: true },
  guests: { type: Number, required: true, min: 1 },
  totalAmount: { type: Number, required: true },
  currency: { type: String, default: 'USD' },
  status: { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' },
  stripeSessionId: { type: String, default: '' },
  stripePaymentIntentId: { type: String, default: '' },
  token: { type: String, default: '' },
  ticketIssuedAt: { type: Date },
  emailSentAt: { type: Date },
}, { timestamps: true });

export default models.Booking || model('Booking', BookingSchema);
