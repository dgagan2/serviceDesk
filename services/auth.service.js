import boom from '@hapi/boom';
import { UserService } from '../services/user.services.js';
import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';
import { config } from '../config/config.js';
import { transporter } from '../utils/mailer.js';
import prisma from '../config/prismaInitialize.js';

const service = new UserService();

export class AuthService {
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

  signToken (user) {
    const payload = {
      sub: user.idUser,
      role: user.idRole,
      email: user.email
    };
    const token = jsonwebtoken.sign(payload, config.jwtSecret, { expiresIn: '20min' });
    return token;
  }

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

  async sendMailResetPassword (email) {
    const user = await service.findByEmail(email);
    if (!user) {
      throw boom.unauthorized();
    }
    const payload = {
      sub: user.idUser
    };
    const token = jsonwebtoken.sign(payload, config.jwtSecret, { expiresIn: '15min' });
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
    return { message: 'Email sent' };
  }
}
