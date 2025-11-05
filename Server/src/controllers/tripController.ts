import type { RequestHandler } from 'express';
// import { AuthRequest } from '../middleware/auth.js';
import Trip from '../models/Trip.js';

export const createTrip: RequestHandler = async (req, res) => {
  try {
    const { title, destination, description, startDate, endDate } = req.body;
    const userId = (req as any).user?.userId as string;

    if (!userId) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    const newTrip = await Trip.create({
      title,
      destination,
      description,
      startDate,
      endDate,
      userId,
    });

    return res
      .status(201)
      .json({ trip: newTrip, message: 'Trip created successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
};

export const getTrips: RequestHandler = async (req, res) => {
  try {
    const userId = (req as any).user?.userId as string;
    const trips = await Trip.find({ userId }).sort({ createdAt: -1 });
    return res.status(200).json(trips);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
};

export const getTrip: RequestHandler = async (req, res) => {
  try {
    const tripId = req.params.id;
    const trip = await Trip.findById(tripId);
    if (!trip) {
      return res.status(404).json({ error: 'Trip not found' });
    }
    return res.status(200).json(trip);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
};

export const updateTrip: RequestHandler = async (req, res) => {
  try {
    const tripId = req.params.id;
    const updatedTrip = await Trip.findByIdAndUpdate(tripId, req.body, {
      new: true,
    });
    if (!updatedTrip) {
      return res.status(404).json({ error: 'Trip not found' });
    }
    return res.status(200).json({ trip: updatedTrip });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
};

export const deleteTrip: RequestHandler = async (req, res) => {
  try {
    const tripId = req.params.id;
    const deletedTrip = await Trip.findByIdAndDelete(tripId);
    if (!deletedTrip) {
      return res.status(404).json({ error: 'Trip not found' });
    }
    return res.status(200).json({ message: 'Trip deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
};

export const uploadTripImages: RequestHandler = async (req, res) => {
  try {
    const tripId = req.params.id;
    const files = req.files as Express.Multer.File[];

    if (!files || files.length === 0) {
      return res.status(400).json({ error: 'No images provided' });
    }

    const trip = await Trip.findById(tripId);
    if (!trip) {
      return res.status(404).json({ error: 'Trip not found' });
    }

    // Convert images to base64 data URLs for storage
    const imageUrls = files.map((file) => {
      const base64 = file.buffer.toString('base64');
      return `data:${file.mimetype};base64,${base64}`;
    });

    trip.images = [...(trip.images || []), ...imageUrls];
    if (!trip.coverImage && imageUrls.length > 0) {
      trip.coverImage = imageUrls[0];
    }

    await trip.save();

    return res.status(200).json({
      message: 'Images uploaded successfully',
      images: imageUrls,
      trip,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
};

export const deleteTripImage: RequestHandler = async (req, res) => {
  try {
    const { id: tripId, imageIndex } = req.params;
    const index = parseInt(imageIndex);

    const trip = await Trip.findById(tripId);
    if (!trip) {
      return res.status(404).json({ error: 'Trip not found' });
    }

    if (!trip.images || index < 0 || index >= trip.images.length) {
      return res.status(400).json({ error: 'Invalid image index' });
    }

    trip.images.splice(index, 1);

    // Update cover image if it was deleted
    if (trip.coverImage === trip.images[index]) {
      trip.coverImage = trip.images.length > 0 ? trip.images[0] : undefined;
    }

    await trip.save();

    return res.status(200).json({
      message: 'Image deleted successfully',
      trip,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
};

export const setCoverImage: RequestHandler = async (req, res) => {
  try {
    const { id: tripId } = req.params;
    const { imageIndex } = req.body;

    const trip = await Trip.findById(tripId);
    if (!trip) {
      return res.status(404).json({ error: 'Trip not found' });
    }

    if (!trip.images || imageIndex < 0 || imageIndex >= trip.images.length) {
      return res.status(400).json({ error: 'Invalid image index' });
    }

    trip.coverImage = trip.images[imageIndex];
    await trip.save();

    return res.status(200).json({
      message: 'Cover image set successfully',
      trip,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
};
