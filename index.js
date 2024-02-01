import express from 'express';
import logger from 'morgan';
import dotenv from 'dotenv';
import { routerApi } from './routes/main.router.js';
import { errorHandler, boomErrorHandler } from './middleware/error.handler.js';
import cors from 'cors';
import './utils/auth/index.js';
dotenv.config();
const { PORT } = process.env;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const whitelist = ['http://localhost:3000'];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('no permitido'));
    }
  }
};
app.use(cors(options));

app.use(logger('dev'));
routerApi(app);

app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is runing on PORT ${PORT}`);
});
