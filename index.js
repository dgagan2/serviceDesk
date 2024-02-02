import express from 'express';
import logger from 'morgan';
import dotenv from 'dotenv';
import { routerApi } from './routes/main.router.js';
import { errorHandler, boomErrorHandler } from './middleware/error.handler.js';
import jwtStrategy from './utils/auth/strategies/jwt.strategy.js';
import passport from 'passport';
import cors from 'cors';
import localStrategy from './utils/auth/strategies/local.strategy.js';

dotenv.config();
const { PORT } = process.env;

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

const app = express();
app.use(cors(options));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
passport.use(jwtStrategy);
passport.use(localStrategy);

app.use(logger('dev'));
routerApi(app);

app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is runing on PORT ${PORT}`);
});
