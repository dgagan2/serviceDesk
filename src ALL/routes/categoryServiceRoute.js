import express from 'express'
import { getAllCategories, getCategoryById, getCategoryByItem, getCategoryByName } from '../controllers/category/getCategory.js'
import { createCategory } from '../controllers/category/createCategory.js'
import { updateCategory } from '../controllers/category/updateCategory.js'
import { deleteCategory } from '../controllers/category/deleteCategory.js'

export const categoryServiceRoute = express.Router()

categoryServiceRoute.get('/', getAllCategories)
categoryServiceRoute.get('/name', getCategoryByName)
categoryServiceRoute.get('/item', getCategoryByItem)
categoryServiceRoute.get('/:id', getCategoryById)
categoryServiceRoute.post('/', createCategory)
categoryServiceRoute.patch('/:id', updateCategory)
categoryServiceRoute.delete('/:id', deleteCategory)
