import { config } from '../config/config.js';
import nodemailer from 'nodemailer';

/**
 * Creates a nodemailer transporter object for sending emails.
 * @type {Object}
 * @property {string} host - The SMTP server host.
 * @property {number} port - The SMTP server port.
 * @property {boolean} secure - Indicates if the connection should use SSL.
 * @property {Object} auth - The authentication credentials for the email account.
 * @property {string} auth.user - The email account username.
 * @property {string} auth.pass - The email account password.
 */
export const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: config.emailUser,
    pass: config.emailPassword
  }
});
