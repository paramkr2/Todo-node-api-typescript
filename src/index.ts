//const express = require('express')
import dotenv from 'dotenv'
const path = require('path');
const envFile = process.env.NODE_ENV === 'test' ? 'var.test.env' : 'var.env';

dotenv.config({ path: envFile });
import express , {Express,Request,Response} from "express";

import todoRoutes from './routes/todoRoutes';
import authRoutes from './routes/authRoutes';
import bodyParser from 'body-parser'
import cors from 'cors';
import dbconnect from "./config/db";

const app : Express = express();

app.use(cors())
app.use(bodyParser.json());

app.use('/auth',authRoutes);
app.use('/todo',todoRoutes);
app.all('*', (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

if( process.env.NODE_ENV != 'test'){
	dbconnect()
}

module.exports = {app,envFile};