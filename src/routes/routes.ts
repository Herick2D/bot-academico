import express from 'express';
import { uploadMiddleware, handleFileUpload, handleDownload } from '../controllers/uploadController';

const router = express.Router();

router.post('/upload', uploadMiddleware, handleFileUpload);
router.get('/download', handleDownload);

export default router;
