import express from 'express'
import { getAllItems, getItemsByCategory, getServiceById, getServiceItem } from '../controllers/category-service/getServiceItem.js'
import { createServiceItem } from '../controllers/category-service/createServiceItem.js'
import { updateServiceItem } from '../controllers/category-service/updateServiceItem.js'
import { deleteServiceItem } from '../controllers/category-service/deleteServiceItem.js'

export const itemServiceRoute = express.Router()

itemServiceRoute.get('/', getAllItems)
itemServiceRoute.get('/name', getServiceItem)
itemServiceRoute.get('/bycategory', getItemsByCategory)
itemServiceRoute.get('/:id', getServiceById)
itemServiceRoute.post('/', createServiceItem)
itemServiceRoute.patch('/:id', updateServiceItem)
itemServiceRoute.delete('/:id', deleteServiceItem)
