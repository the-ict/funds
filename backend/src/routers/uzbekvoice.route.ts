import { processTextInput, processVoiceInput } from '../controllers/uzbekvoice.controller.js';
import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const router = Router();

const storage = multer.diskStorage({
  destination: (req: any, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
    const uploadDir = 'src/audios';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req: any, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    console.log("file is saving...")
    cb(null, 'audio-' + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 25 * 1024 * 1024,
  },
  fileFilter: (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    const allowedMimes = [
      'audio/mpeg',
      'audio/wav',
      'audio/ogg',
      'audio/webm',
      'audio/x-wav',
      'audio/x-m4a',
    ];

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only audio files are allowed'));
    }
  },
});

router.post('/', upload.single('audio'), processVoiceInput as any);
router.post('/text', processTextInput);

export default router;