import express from 'express'
import { getAllCategories, getCategoryById, getCategoryByItem, getCategoryByName } from '../controllers/category/getCategory'
import { createCategory } from '../controllers/category/createCategory'
import { updateCategory } from '../controllers/category/updateCategory'
import { deleteCategory } from '../controllers/category/deleteCategory'

export const categoryServiceRoute = express.Router()

categoryServiceRoute.get('/', getAllCategories)
categoryServiceRoute.get('/name', getCategoryByName)
categoryServiceRoute.get('/item', getCategoryByItem)
categoryServiceRoute.get('/:id', getCategoryById)
categoryServiceRoute.post('/', createCategory)
categoryServiceRoute.patch('/:id', updateCategory)
categoryServiceRoute.delete('/:id', deleteCategory)
