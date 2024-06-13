import boom from '@hapi/boom';

/**
 * Validates the request data using a schema and handles any validation errors.
 * @param {Joi.Schema} schema - The schema to validate the request data against.
 * @param {string} property - The property name in the request object that contains the data to be validated.
 * @returns {Function} - The middleware function that performs the validation and error handling.
 */
export function validatorHandler (schema, property) {
  return (req, res, next) => {
    const data = req[property];
    const { error } = schema.validate(data, { abortEarly: false });
    if (error) {
      next(boom.badRequest(error));
    }
    next();
  };
}
