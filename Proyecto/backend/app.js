import express from 'express'
import morgan from 'morgan';
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js"
import userRoutes from "./routes/user.routes.js"
import configuracionTokenRoutes from './routes/token.routes.js';
import transaccionRoutes from './routes/transaccion.routes.js';
import bancoRoutes from './routes/banco.routes.js';

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());

app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use('/api', configuracionTokenRoutes);
app.use('/api', transaccionRoutes);
app.use('/api/banco', bancoRoutes);

export default app;