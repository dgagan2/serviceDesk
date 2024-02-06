import { config } from '../config/config.js';
import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: config.emailUser,
    pass: config.emailPassword
  }
});
