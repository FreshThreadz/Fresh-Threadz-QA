import express, { Express, Request, Response } from "express";
import path from "path";
import dotenv from "dotenv";
import { connectionDemo } from "./db/postgres";
dotenv.config();

const app: Express = express();
const port = process.env.PORT;

// app.use(express.static(path.join(__dirname, '../client/dist')));
const morgan = require('morgan');
app.use(morgan('dev'));
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

const qaRouter = require('./routes');
app.use('/qa', qaRouter);

app.listen(port, () => {
  console.log(`Listening on port: ${port}`)
});

// connectionDemo();