import express from 'express';

export const departmentRoute = express.Router();

departmentRoute.get('/', (req, res) => { res.send('Department route'); });
departmentRoute.get('/all', (req, res) => { res.json({ message: 'All departments' }); });
