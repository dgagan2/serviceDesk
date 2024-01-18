/* eslint-disable no-useless-catch */
import prisma from '../../config/prismaInitialize.js'

export const searchUser = async (req, res) => {
  const { email, name, idRole, idState, idDepartment } = req.query
  // eslint-disable-next-line no-var
  var userFound = false
  try {
    if (email) {
      const user = await searchUserByEmailDatabase(email)
      if (user) {
        userFound = true
        return res.status(200).json(user)
      }
    }
    if (name) {
      const user = await searchUserByNameDatabase(name)
      if (user) {
        userFound = true
        return res.status(200).json(user)
      }
    }
    if (idRole) {
      const user = await searchUserByRoleDatabase(idRole)
      if (user) {
        userFound = true
        return res.status(200).json(user)
      }
    }
    if (idState) {
      const user = await searchUserByStateDatabase(idState)
      if (user) {
        userFound = true
        return res.status(200).json(user)
      }
    }
    if (idDepartment) {
      const user = await searchUserByDepartmentDatabase(idDepartment)
      if (user) {
        userFound = true
        return res.status(200).json(user)
      }
    }
    if (!userFound) {
      return res.status(404).json({ message: 'No se encontro el usuario' })
    }
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong', error })
  }
}

const searchUserByEmailDatabase = async (email) => {
  try {
    const user = await prisma.person.findMany({
      where: {
        email: {
          contains: email,
          mode: 'insensitive'
        }
      },
      include: {
        roleUser: {
          select: {
            idRole: true,
            nameRole: true
          }
        },
        stateUser: {
          select: {
            idState: true,
            nameState: true
          }
        },
        department: {
          select: {
            id: true,
            nameDepartment: true
          }
        }
      }
    })
    if (user.length > 0) {
      return user
    } else {
      return false
    }
  } catch (error) {
    throw error
  }
}

const searchUserByNameDatabase = async (name) => {
  try {
    const user = await prisma.person.findMany({
      where: {
        name: {
          contains: name,
          mode: 'insensitive'
        }
      },
      include: {
        roleUser: {
          select: {
            idRole: true,
            nameRole: true
          }
        },
        stateUser: {
          select: {
            idState: true,
            nameState: true
          }
        },
        department: {
          select: {
            id: true,
            nameDepartment: true
          }
        }
      }
    })
    if (user.length > 0) {
      return user
    } else {
      return false
    }
  } catch (error) {
    throw error
  }
}
const searchUserByRoleDatabase = async (idRole) => {
  try {
    const user = await prisma.person.findMany({
      where: {
        idRole: Number(idRole)
      },
      include: {
        roleUser: {
          select: {
            idRole: true,
            nameRole: true
          }
        },
        stateUser: {
          select: {
            idState: true,
            nameState: true
          }
        },
        department: {
          select: {
            id: true,
            nameDepartment: true
          }
        }
      }
    })

    if (user.length > 0) {
      return user
    } else {
      return false
    }
  } catch (error) {
    throw error
  }
}
const searchUserByStateDatabase = async (idState) => {
  try {
    const user = await prisma.person.findMany({
      where: {
        idState: Number(idState)
      },
      include: {
        roleUser: {
          select: {
            idRole: true,
            nameRole: true
          }
        },
        stateUser: {
          select: {
            idState: true,
            nameState: true
          }
        },
        department: {
          select: {
            id: true,
            nameDepartment: true
          }
        }
      }
    })
    if (user.length > 0) {
      return user
    } else {
      return false
    }
  } catch (error) {
    throw error
  }
}
const searchUserByDepartmentDatabase = async (idDepartment) => {
  try {
    const user = await prisma.person.findMany({
      where: {
        idDepartment: Number(idDepartment)
      },
      include: {
        roleUser: {
          select: {
            idRole: true,
            nameRole: true
          }
        },
        stateUser: {
          select: {
            idState: true,
            nameState: true
          }
        },
        department: {
          select: {
            id: true,
            nameDepartment: true
          }
        }
      }
    })
    if (user.length > 0) {
      return user
    } else {
      return false
    }
  } catch (error) {
    throw error
  }
}
