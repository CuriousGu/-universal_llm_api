import express, { Application } from 'express';
import { chatRouter } from './src/api/routes';


const app: Application = express();

app.use(express.json());
app.use('/chat/', chatRouter);

export default app;
