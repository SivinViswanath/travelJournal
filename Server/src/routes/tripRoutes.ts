import { Router } from 'express';
import { protect } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';
import {
  createTrip,
  deleteTrip,
  getTrip,
  getTrips,
  updateTrip,
  uploadTripImages,
  deleteTripImage,
  setCoverImage,
} from '../controllers/tripController.js';

const router = Router();

router.post('/', protect, createTrip);
router.get('/', protect, getTrips);
router.get('/:id', protect, getTrip);
router.delete('/:id', protect, deleteTrip);
router.put('/:id', protect, updateTrip);

// Image upload routes
router.post(
  '/:id/images',
  protect,
  upload.array('images', 10),
  uploadTripImages,
);
router.delete('/:id/images/:imageIndex', protect, deleteTripImage);
router.put('/:id/cover', protect, setCoverImage);

export default router;
