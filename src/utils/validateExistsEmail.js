import prisma from '../config/prismaInitialize.js'

async function validateExistsEmail (email) {
  const existingUser = await prisma.person.findUnique({
    where: {
      email
    }
  })
  return existingUser !== null
}

export default validateExistsEmail
