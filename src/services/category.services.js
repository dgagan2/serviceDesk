import boom from '@hapi/boom';
import prisma from '../config/prismaInitialize.js';

/**
 * Represents the service categories on the tickets
 * @class
 */
class CategoryService {
  constructor () {
  }

  /**
   * Creates a new category.
   * @param {string} categoryName - The name of the category.
   * @throws {Error} - If the category already exists.
   */
  async create (categoryName) {
    const existingCategory = await prisma.serviceCategories.findUnique({
      where: {
        categoryName
      }
    });
    if (existingCategory) {
      throw boom.badRequest('Category already exists');
    }
    const category = prisma.serviceCategories.create({
      data: {
        categoryName
      }
    });

    return category;
  }

  /**
   * Retrieves all service categories.
   */
  find () {
    return prisma.serviceCategories.findMany();
  }

  /**
   * Retrieves a service category by its name.
   * @param {string} categoryName - The name of the category to search for.
   */
  async findByName (categoryName) {
    const category = await prisma.serviceCategories.findUnique({
      where: {
        categoryName: {
          equals: categoryName,
          mode: 'insensitive'
        }
      }

    });
    return category;
  }

  /**
   * Find a category by its ID.
   *
   * @param {number} idCategory - The ID of the category.
   * @throws {Error} - If the category is not found.
   */
  async findById (idCategory) {
    try {
      return await prisma.serviceCategories.findUnique({
        where: {
          idCategory
        }
      });
    } catch (error) {
      throw boom.notFound('Category not found', error);
    }
  }

  /**
   * Updates a category by its ID.
   * @param {Object} params - The parameters for the update operation.
   * @param {number} params.idCategory - The ID of the category to update.
   * @param {string} params.categoryName - The new name for the category.
   */
  async update ({ idCategory, categoryName }) {
    await this.findById(idCategory);
    const updatedCategory = await prisma.serviceCategories.update({
      where: {
        idCategory
      },
      data: {
        categoryName
      }
    });
    return updatedCategory;
  }

  /**
   * Deletes a category by its ID.
   * @param {number} idCategory - The ID of the category to delete.
   */
  async delete (idCategory) {
    await this.findById(idCategory);
    const deletedCategory = await prisma.serviceCategories.delete({
      where: {
        idCategory
      }
    });
    return deletedCategory;
  }
}

export default CategoryService;
