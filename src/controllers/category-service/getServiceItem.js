/* eslint-disable no-useless-catch */
import prisma from '../../config/prismaInitialize.js'

export const getServiceItem = async (req, res) => {
  const { nameItem } = req.query
  if (!nameItem) return res.status(500).json({ message: 'Nombre del servicio vacio' })

  try {
    const service = await searchService(nameItem)
    if (service) {
      res.status(200).json(service)
    } else {
      res.status(404).json({ message: 'No se encontro el servicio' })
    }
  } catch (error) {
    res.satus(500).json({ message: 'Something went wrong', error })
  }
}

export const getServiceById = async (req, res) => {
  const { id } = req.params
  if (!id) return res.status(400).json({ message: 'Empty service ID' })

  try {
    const service = await searchServiceId(id)
    if (service) {
      res.status(200).json(service)
    } else {
      res.status(404).json({ message: 'Service not found' })
    }
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error })
  }
}

export const searchServiceId = async (id) => {
  try {
    const service = await prisma.itemService.findUnique({
      where: {
        id: Number(id)
      },
      include: {
        categoryService: {
          select: {
            idCategory: true,
            nameCategory: true
          }
        }
      }
    })
    return service
  } catch (error) {
    throw error
  }
}
export const searchService = async (nameItem) => {
  const exist = await prisma.itemService.findMany({
    where: {
      nameItem: {
        contains: nameItem,
        mode: 'insensitive'
      }
    },
    include: {
      categoryService: {
        select: {
          idCategory: true,
          nameCategory: true
        }
      }
    }
  })
  if (exist.length > 0) {
    return exist
  } else {
    return false
  }
}

export const getAllItems = async (req, res) => {
  try {
    const service = await prisma.itemService.findMany({
      include: {
        categoryService: {
          select: {
            idCategory: true,
            nameCategory: true
          }
        }
      }
    })
    res.status(200).json(service)
  } catch (error) {
    res.satus(500).json({ message: 'Something went wrong', error })
  }
}
