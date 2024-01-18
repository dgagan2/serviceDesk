import prisma from '../config/prismaInitialize.js'

async function validateExistsEmail (email) {
  const existingUser = await prisma.person.findUnique({
    where: {
      email
    },
    include: {
      roleUser: {
        select: {
          nameRole: true,
          idRole: true
        }
      }
    }
  })
  return existingUser
}

export default validateExistsEmail
