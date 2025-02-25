import express from 'express'
import morgan from 'morgan';
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js"
import userRoutes from "./routes/user.routes.js"
import configuracionTokenRoutes from './routes/token.routes.js';
import periodoRoutes from "./routes/periodo.routes.js"
import transaccionRoutes from './routes/transaccion.routes.js';
import bancoRoutes from './routes/banco.routes.js';
import conciliacionRoutes from "./routes/conciliacion.routes.js"

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
app.use('/api', periodoRoutes);
app.use('/api', transaccionRoutes);
app.use('/api', bancoRoutes);
app.use('/api', conciliacionRoutes);

export default app;