import Joi from 'joi';

const idUser = Joi.string();
const email = Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'es'] } });
const name = Joi.string().regex(/^[a-zA-Z0-9 ]+$/).min(3).max(30);
const password = Joi.string().regex(/^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$/).min(6).messages({
  'string.pattern.base': 'La contraseña debe contener al menos una letra y un número.',
  'string.min': 'La contraseña debe tener al menos {#limit} caracteres.'
});

export const createUserSchema = Joi.object({
  email: email.required(),
  password: password.required(),
  name: name.required()
});

export const recoveryPasswordSchema = Joi.object({
  email: email.required()
});

export const changePasswordSchema = Joi.object({
  password: password.required()
});
