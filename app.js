import express from 'express';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.routes.js';
import workspaceRouter from './routes/workspaces.routes.js';
import errorMiddleware from './middlewares/error.middleware.js';
import dotenv from 'dotenv';
import connectToDatabase from './database/mongodb.js';
import cors from 'cors';
dotenv.config();
const app = express();

app.use(express.json());

app.use(cookieParser());
app.use(cors())

app.use("/api/v1/auth", authRouter)
app.use("/api/v1/workspaces", workspaceRouter)
app.use(errorMiddleware);

await connectToDatabase();
app.listen(process.env.PORT, async () => {
  console.log(`Server running on port ${process.env.PORT}`);
});