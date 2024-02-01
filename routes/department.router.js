import express from 'express';
import { departmentService } from '../services/department.service.js';
export const departmentRoute = express.Router();

const service = new departmentService();

departmentRoute.get('/', (req, res) => { res.send('Department route'); });
departmentRoute.get('/all', (req, res) => { res.json({ message: 'All departments' }); });
