import { departmentService } from '../../services/department.service.js';

const service = new departmentService();

// Retrieves a department by name from the database.
export const departmetByName = async (_, { departmentName }) => {
  const department = await service.findByName(departmentName);
  return department;
};

// Retrieves a department by ID from the database.
export const departmentById = (_, { idDepartment }) => {
  const department = service.findById(idDepartment);
  return department;
};

// Retrieves all departments from the database.
export const allDepartments = () => {
  const department = service.find();
  return department;
};
