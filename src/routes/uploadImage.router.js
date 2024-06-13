import express from 'express';
import upload from '../config/multer.js';
import { uploadImage } from '../services/uploadImages.services.js';

export const uploadImageRoute = express.Router();

uploadImageRoute.post('/', upload.fields([{ name: 'image', maxCount: 1 }]), uploadImage);
