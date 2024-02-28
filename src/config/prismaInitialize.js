import { PrismaClient } from '@prisma/client';
import boom from '@hapi/boom';
const prisma = new PrismaClient();

prisma.$connect()
  .then(() => {
    console.log('Conexión a la base de datos establecida correctamente');
  })
  .catch(error => {
    console.error('Error al conectar a la base de datos:');
    throw boom.badImplementation('Error al conectar a la base de datos', error);
  });

export default prisma;
