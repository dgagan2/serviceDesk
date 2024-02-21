import { checkJwtGql } from './checkJwtGql.js';
import checkRoles from './checkRolesGql.js';

/**
 * Validates if the user is an admin.
 * @param {Object} context - The context object.
 */
const validateUserIsAdmin = async (context) => {
  const user = await checkJwtGql(context);
  await checkRoles(user, 'admin');
};

/**
 * Validates if the user is a customer.
 * @param {Object} context - The context object.
 * @returns {Promise<void>} - A promise that resolves when the validation is complete.
 */
const validateUserIsCustomer = async (context) => {
  const user = await checkJwtGql(context);
  await checkRoles(user, 'customer');
};

/**
 * Validates all roles for a given context.
 *
 * @param {Object} context - The context object.
 * @returns {Promise<void>} - A promise that resolves when all roles are validated.
 */
const validateAllRoles = async (context) => {
  const user = await checkJwtGql(context);
  await checkRoles(user, 'customer', 'admin');
};

export { validateUserIsAdmin, validateUserIsCustomer, validateAllRoles };
