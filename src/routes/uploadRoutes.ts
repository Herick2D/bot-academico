import express from 'express';
import { handleFileUpload, uploadMiddleware } from '../controllers/uploadController';

const router = express.Router();

router.post('/', uploadMiddleware, handleFileUpload);

export default router;
