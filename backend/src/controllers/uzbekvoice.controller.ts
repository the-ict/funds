import uzbekVoiceService from '../services/uzbekvoice.service.js';
import deepseekService from '../services/deepseek.service.js';
import type { Request, Response } from 'express';
import logger from '../utils/loggers.js';
import fs from 'fs';

interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

export const processVoiceInput = async (req: MulterRequest, res: Response) => {
  try {
    console.log("processing voice input ....");

    if (!req.file) {
      console.log("No audio file provided");
      return res.status(400).json({ error: 'No audio file provided' });
    }

    const { tg_id } = req.body;
    console.log("tg_id: ", tg_id);
    if (!tg_id) {
      if (req.file.path) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(400).json({ error: 'tg_id is required' });
    }

    const audioFilePath = req.file.path;

    try {
      logger.info('Converting speech to text', { filePath: audioFilePath });
      const text = await uzbekVoiceService.convertSpeechToText(audioFilePath);

      logger.info('Speech converted to text', { text });

      logger.info('Getting response from deepseek', { text, tg_id });
      const response = await deepseekService.getResponse(text, tg_id);

      logger.info('Response from deepseek', { response });

      res.json({
        text,
        response,
      });
    } finally {
      if (fs.existsSync(audioFilePath)) {
        fs.unlinkSync(audioFilePath);
      }
    }
  } catch (error) {
    logger.error('Failed to process voice input', { error });
    console.log(error);
    if (req.file && req.file.path && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({ error: 'Failed to process voice input' });
  }
};


export const processTextInput = async (req: Request, res: Response) => {
  try {
    const { text, tg_id } = req.body;
    if (!text) {
      return res.status(400).json({ error: 'No text provided' });
    }
    if (!tg_id) {
      return res.status(400).json({ error: 'tg_id is required' });
    }

    const response = await deepseekService.getResponse(text, tg_id.toString());
    res.json({ text, response });
  } catch (error) {
    logger.error("Failed to process text input", { error });
    res.status(500).json({ error: "Failed to process text input" });
  }
};