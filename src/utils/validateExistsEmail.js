import prisma from '../config/prismaInitialize.js'

async function validateExistsEmail (email) {
  const existingUser = await prisma.person.findUnique({
    where: {
      email
    }
  })
  return existingUser
}

export default validateExistsEmail
