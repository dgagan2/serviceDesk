import { departmentService } from '../../services/department.service.js';

const service = new departmentService();

// Retrieves a department by name from the database.
export const departmetByName = async (_, { departmentName }) => {
  const department = await service.findByName(departmentName);
  return department;
};

// Retrieves a department by ID from the database.
export const departmentById = async (_, { idDepartment }) => {
  const department = await service.findById(idDepartment);
  return department;
};

// Retrieves all departments from the database.
export const allDepartments = async () => {
  const department = await service.find();
  return department;
};

export const addDepartment = async (departmentName) => {
  const department = await service.create(departmentName);
  return department;
};
