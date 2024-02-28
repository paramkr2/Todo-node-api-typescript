//const express = require('express')
//const dotenv = require('dotenv') 
import dotenv from "dotenv" ;
dotenv.config({ path:  'var.env' });

import express , {Express,Request,Response} from "express";

import todoRoutes from './routes/todoRoutes';
import authRoutes from './routes/authRoutes';
import bodyParser from 'body-parser'
import cors from 'cors';
import dbconnect from "./config/db";


const app : Express = express();
const port = 8000;
app.use(cors())
app.use(bodyParser.json());

app.use('/auth',authRoutes);
app.use('/todos',todoRoutes);
app.all('*', (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});




dbconnect()

app.listen( port , ()=>{
	console.log(`[server]:Server is running at port ${port}`)
});
