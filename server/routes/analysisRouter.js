import express from 'express';
import upload from '../middleware/upload.js';
import { analyzeResume } from '../controllers/analysisController.js';

const router = express.Router();

router.post("/resume",upload.single("file"),analyzeResume)

export default router;