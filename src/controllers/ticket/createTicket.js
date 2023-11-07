/* eslint-disable no-useless-catch */
import prisma from '../../config/prismaInitialize.js'
import { searchServiceId } from '../category-service/getServiceItem.js'
import { searchDepartmentId } from '../department/getDepartment.js'
import { searchIdState } from '../user-state/getState.js'
import { personsWithAgentRole } from '../user/getUsers.js'

export const createTicket = async (req, res) => {
  const { id } = req.user
  const { description, idDepartment, idItem, itemDescription } = req.body
  if (!id || !description || !idDepartment || !idItem || !itemDescription) return res.status(404).json({ message: 'Campos obligatorios vacios ' })

  try {
    await validateData(req.body, res)
    const user = await personsWithAgentRole()
    const aleatorio = user[Math.floor(Math.random() * user.length)]
    const state = await searchIdState('abierto')

    const ticket = await addNewTicket(id, description, idDepartment, idItem, itemDescription, aleatorio.id, state)
    res.status(201).json({ message: 'Su solicitud se registro', ticket })
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error })
  }
}

const addNewTicket = async (idUser, description, idDepartment, idItem, itemDescription, idAgent, idStateTicket) => {
  try {
    const newTicket = await prisma.ticket.create({
      data: {
        description,
        person_ticket_idUserToperson: {
          connect: {
            id: idUser
          }
        },
        department: {
          connect: {
            id: Number(idDepartment)
          }
        },
        itemService: {
          connect: {
            id: Number(idItem)
          }
        },
        stateTicket: {
          connect: {
            id: idStateTicket
          }
        },
        person_ticket_idAgentToperson: {
          connect: {
            id: idAgent
          }
        },
        itemDescription
      }
    })
    return newTicket
  } catch (error) {
    throw error
  }
}
const validateData = async (data, res) => {
  try {
    const { idDepartment, idItem } = data
    const department = await searchDepartmentId(idDepartment)
    if (!department) return res.status(404).json({ message: 'Departamento no valido' })
    const item = await searchServiceId(idItem)
    if (!item) return res.status(404).json({ message: 'Servicio no valido' })
  } catch (error) {
    throw error
  }
}

export const deleteTicket = async (req, res) => {
  const { id } = req.params
  try {
    await prisma.ticket.delete({
      where: {
        numberTicket: Number(id)
      }
    })
    res.status(200).json({ message: 'Ticket Eliminado' })
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error })
  }
}

export const getTicketByUser = async (req, res) => {
  const { id } = req.user
  try {
    const tickets = await prisma.ticket.findMany({
      where: {
        person_ticket_idUserToperson: {
          id
        }
      },
      include: {
        department: {
          select: {
            id: true,
            nameDepartment: true
          }
        },
        itemService: {
          select: {
            id: true,
            nameItem: true,
            categoryService: true,
            idCategory: true
          }
        },
        person_ticket_idAgentToperson: {
          select: {
            name: true
          }
        },
        stateTicket: {
          select: {
            nameState: true
          }
        }
      }
    })
    res.status(200).json(tickets)
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error })
  }
}
