/* eslint-disable no-useless-catch */
import prisma from '../../config/prismaInitialize.js'
import { searchServiceId } from '../category-service/getServiceItem.js'
import { searchDepartmentId } from '../department/getDepartment.js'
import { getAllUsers, searchUserInDataBaseById } from '../user/getUsers.js'

export const createTicket = async (req, res) => {
  const { id } = req.user
  const { description, idDepartment, idItem } = req.body
  if (!id || !description || !idDepartment || !idItem) return res.status(404).json({ message: 'Campos obligatorios vacios ' })

  try {
    await validateData(req.body, res)
    const user = await getAllUsers()
    const aleatorio = user[Math.floor(Math.random() * user.length)]
    const idStateTicket = 1
    addNewTicket(id, description, idDepartment, idItem, aleatorio.id, idStateTicket)
  } catch (error) {

  }
}

const addNewTicket = async (idUser, description, idDepartment, idItem, idAgent, idStateTicket) => {
  try {
    const newTicket = await prisma.ticket.create({
      data: {
        description,
        person_ticket_idUserToperson: {
          connect: {
            id: Number(idUser)
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
            id: 1
          }
        },
        person_ticket_idAgentToperson: {
          connect: {
            id: Number(idAgent)
          }
        }
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
