import express from 'express';
import { getTouristSuggestions } from '../controllers/aiController.js';

const router = express.Router();

router.post('/suggestions', getTouristSuggestions);

export default router;
