import boom from '@hapi/boom';
import { UserService } from '../services/user.services.js';
import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';
import { config } from '../config/config.js';
import { transporter } from '../utils/mailer.js';
import prisma from '../config/prismaInitialize.js';

/**
 * Represents an instance of the UserService class.
 * @type {UserService}
 */
const service = new UserService();

/**
 * Class representing an authentication service.
 */
export class AuthService {
  /**
   * Retrieves a user based on their email and validate with bcrypt that the password is correct.
   * @param {string} email - The user's email.
   * @param {string} password - The user's password.
   * @throws {Error} If the user is not found or the password is invalid.
   */
  async getUser (email, password) {
    const user = await service.findByEmail(email);

    if (!user) {
      throw boom.unauthorized('User not found');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw boom.unauthorized('User or password not valid');
    }
    delete user.password;
    return user;
  }

  /**
   * Generates a JSON Web Token (JWT) for the user.
   * @param {Object} user - The user object.
   * @returns {string} The generated JWT.
   */
  signToken (user) {
    const payload = {
      sub: user.idUser,
      role: user.idRole,
      email: user.email,
      state: user.idState
    };
    const token = jsonwebtoken.sign(payload, config.jwtSecret, { expiresIn: '40min' });
    return token;
  }

  /**
   * Sends an email.
   * @param {Object} infoMail - The email information.
   * @param {string} infoMail.email - The recipient's email address.
   * @param {string} infoMail.subject - The email subject.
   * @param {string} infoMail.text - The email body text.
   * @param {string} infoMail.url - The URL to include in the email body.
   * @throws {Error} If any required data is missing.
   */

  async sendMail (infoMail) {
    const { email, subject, text, url } = infoMail;
    if (!email || !subject || !text) throw boom.badRequest('Missing data');
    const info = await transporter.sendMail({
      from: `${config.emailUser}`, // sender address
      to: `${email}`, // list of receivers
      subject: `${subject}`, // Subject line
      html: `<b>${text}</b>
      <br>${url}</br>` // html body
    });
    return info;
  }

  /**
   * Sends a password reset email using an URL with the JWT which is saved in the database.
   * @param {string} email - The user's email.
   * @throws {Error} If the user is not found.
   */
  async sendMailResetPassword (email) {
    const user = await service.findByEmail(email);
    if (!user) {
      throw boom.unauthorized();
    }
    const payload = {
      sub: user.idUser
    };
    const token = jsonwebtoken.sign(payload, config.jwtSecretReset, { expiresIn: '15min' });
    const url = `${config.frontUrl}/reset-password?token=${token}`;
    await this.sendMail({
      user,
      email,
      subject: 'Recovery Password',
      text: 'Para recuperar su contraseña ingrese al siguiente enlace',
      url
    });
    await prisma.users.update({
      where: {
        idUser: user.idUser
      },
      data: {
        recoveryToken: token
      }
    });
    return { message: 'Email has been sent' };
  }

  /**
   * Changes the user's password.
   * @param {string} password - The new password.
   * @param {string} token - The password reset token.
   * @returns {Promise<Object>} A message indicating that the password has been changed.
   * @throws {Error} If the token is invalid or the user is not found.
   */
  async changePassword (password, token) {
    try {
      const payload = jsonwebtoken.verify(token, config.jwtSecretReset);
      const user = await prisma.users.findById(payload.sub);
      if (user.recoveryToken !== token) throw boom.unauthorized('Invalid token');
      const hash = await bcrypt.hash(password, 10);
      await prisma.users.update({
        where: {
          idUser: user.idUser
        },
        data: {
          password: hash,
          recoveryToken: null
        }
      });
      return { message: 'Password has been changed' };
    } catch (error) {
      throw boom.unauthorized('Invalid token');
    }
  }
}
