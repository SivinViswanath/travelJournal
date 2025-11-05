import mongoose, { Document, Schema } from 'mongoose';

export interface ITrip extends Document {
  title: string;
  destination: string;
  description: string;
  startDate: Date;
  endDate: Date;
  userId: Schema.Types.ObjectId;
  images: string[];
  coverImage?: string;
  location?: {
    type: string;
    coordinates: [number, number];
  };
  tags?: string[];
  rating?: number;
}

const TripSchema = new Schema<ITrip>(
  {
    title: {
      type: String,
      required: true,
    },
    destination: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    images: {
      type: [String],
      default: [],
    },
    coverImage: {
      type: String,
    },
    location: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point',
      },
      coordinates: {
        type: [Number],
        default: [0, 0],
      },
    },
    tags: {
      type: [String],
      default: [],
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

// Add indexes for better performance
TripSchema.index({ userId: 1, createdAt: -1 });
TripSchema.index({ destination: 'text', title: 'text' });
TripSchema.index({ location: '2dsphere' });

export default mongoose.model<ITrip>('Trip', TripSchema);
