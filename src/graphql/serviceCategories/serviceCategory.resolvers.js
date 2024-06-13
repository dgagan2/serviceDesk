import { checkJwtGql } from '../../utils/auth/checkJwtGql.js';
import CategoryService from '../../services/category.services.js';
import { validateUserIsAdmin } from '../../utils/auth/userPermissions.js';

// Creates a new instance of the CategoryService class
const service = new CategoryService();

/**
 * validateUserIsAdmin() - Validates that the user has a JWT and is an administrator.
 * checkJwtGql(); - Verifies that the user has a valid JWT.
 * * @param {any} context - El contexto de la consulta con los datos del usuario.
 */

/**
 * Retrieves a category by name.
 *
 * @param {any} _ - The root object of the query.
 * @param {Object} args - The arguments of the query.
 * @param {string} args.categoryName - The name of the category to search for.
 */
export const categoryByName = async (_, { categoryName }, context) => {
  await validateUserIsAdmin(context);
  return service.findByName(categoryName);
};

/**
 * Retrieves a service category by its ID.
 *
 * @param {any} _ - The parent object.
 * @param {Object} args - The arguments passed to the resolver.
 * @param {string} args.idCategory - The ID of the category to retrieve.
 */
export const categoryById = async (_, { idCategory }, context) => {
  await checkJwtGql(context);
  return service.findById(idCategory);
};

/**
 * Retrieves all service categories.
 */
export const allCategories = async (_, __, context) => {
  await validateUserIsAdmin(context);
  return await service.find();
};

/**
 * Adds a new category.
 *
 * @param {any} _ - The parent object.
 * @param {Object} args - The arguments passed to the resolver.
 * @param {string} args.categoryName - The name of the category to be added.ry.
 */
export const addCategory = async (_, { categoryName }, context) => {
  await validateUserIsAdmin(context);
  return service.create(categoryName);
};

/**
 * Updates a category.
 *
 * @param {any} _ - The placeholder for the parent resolver.
 * @param {object} args - The arguments for updating the category.
 */
export const updateCategory = async (_, args, context) => {
  await validateUserIsAdmin(context);
  return service.update(args);
};

/**
 * Deletes a category.
 *
 * @param {any} _ - The parent object.
 * @param {Object} args - The arguments passed to the resolver.
 * @param {string} args.idCategory - The ID of the category to delete.
 */
export const deleteCategory = async (_, { idCategory }, context) => {
  await validateUserIsAdmin(context);
  return service.delete(idCategory);
};
