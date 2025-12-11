/**
 * @description  Aplicación
 */

import express from "express"
import cors from 'cors'
import morgan from "morgan"
import v1Routes from './routes/v1/index.js'

import { errorNotFoundMiddleware, errorConverterMiddleware, errorHandlerMiddleware } from "./middlewares/error.js";

const app = express();
app.use(cors({
    origin: ['http://localhost:5173'],
    credentials: true,
  }));
  
app.use(morgan('short'));
app.use(express.json({ limit: '20mb' }));

app.use('/v1', v1Routes);

app.use(errorNotFoundMiddleware);
app.use(errorConverterMiddleware);
app.use(errorHandlerMiddleware);

export default app