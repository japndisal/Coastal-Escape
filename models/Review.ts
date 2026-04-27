import { models, model, Schema } from 'mongoose';

const ReviewSchema = new Schema({
  packageId: { type: Schema.Types.ObjectId, ref: 'Package', required: true },
  authorName: { type: String, required: true },
  authorAvatar: { type: String, default: '' },
  rating: { type: Number, required: true, min: 1, max: 5 },
  title: { type: String, required: true },
  body: { type: String, required: true },
  travelDate: { type: String, required: true },
  verified: { type: Boolean, default: true },
}, { timestamps: true });

export default models.Review || model('Review', ReviewSchema);
