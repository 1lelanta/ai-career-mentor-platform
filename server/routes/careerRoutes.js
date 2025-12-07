import express from 'express';
import auth from "../middleware/authMiddleware.js";
import { getCareerRoadmap } from '../controllers/careerController.js';
import router from './authRoutes.js';

router = express.Router();
router.post("/roadmap",auth,getCareerRoadmap);

export default router;