import express from 'express'
import morgan from 'morgan';
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js"
import transaccionRoutes from './routes/transaccion.routes.js';
import bancoRoutes from './routes/banco.routes.js';

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());

app.use("/api", authRoutes);
app.use('/api', transaccionRoutes);
app.use('/api/banco', bancoRoutes);

export default app;