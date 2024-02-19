import { checkJwtGql } from './checkJwtGql.js';
import checkRoles from './checkRolesGql.js';

const validateUserIsAdmin = async (context) => {
  const user = await checkJwtGql(context);
  await checkRoles(user, 'admin');
};

const validateUserIsCustomer = async (context) => {
  const user = await checkJwtGql(context);
  await checkRoles(user, 'customer');
};

const validateAllRoles = async (context) => {
  const user = await checkJwtGql(context);
  await checkRoles(user, 'customer', 'admin');
};

export { validateUserIsAdmin, validateUserIsCustomer, validateAllRoles };
