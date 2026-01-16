import { Schema, model } from 'mongoose';

const RatingSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User', // User table se link karne ke liye
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  review: {
    type: String,
    trim: true,
    default: "" // Agar user text nahi likhta to khali rahega
  },
  appVersion: {
    type: String, // Ye track karne ke liye ki kis version par rating mili
    default: "1.0.0"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Taaki ek user ek hi baar rating de sake (Unique Index)
RatingSchema.index({ userId: 1 }, { unique: true });

export default model('Rating', RatingSchema);