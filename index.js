import express from 'express';
import logger from 'morgan';
import dotenv from 'dotenv';
import { routerApi } from './routes/main.router.';
dotenv.config();
const { PORT } = process.env;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger('dev'));
routerApi(app);

app.listen(PORT, () => {
  console.log(`Server is runing on PORT ${PORT}`);
});
