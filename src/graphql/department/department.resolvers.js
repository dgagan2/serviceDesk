import { departmentService } from '../../services/department.service.js';
const service = new departmentService();

// Retrieves a department by name from the database.
export const departmetByName = (_, { departmentName }) => {
  return service.findByName(departmentName);
};

// Retrieves a department by ID from the database.
export const departmentById = (_, { idDepartment }) => {
  return service.findById(idDepartment);
};

// Retrieves all departments from the database.
export const allDepartments = () => {
  return service.find();
};

export const addDepartment = (_, { dto }) => {
  const { departmentName } = dto;
  return service.create(departmentName);
};

export const updateDepartment = (_, { dto }) => {
  return service.update(dto);
};

export const deleteDepartment = (_, { idDepartment }) => {
  return service.delete(idDepartment);
};
