import express, { Router } from 'express';
import cors from 'cors';
import { configDotenv } from 'dotenv';
import connectDB from './db/connection.js';
import { router } from './routes/index.js';

const app=express()
app.use(express.json())
configDotenv()
app.use(cors())
connectDB()

// Log all requests
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
  });

app.get("/",(req,res)=>{
    res.status(200).json({
        message:`Healthy server running in ${process.env.PORT}`
    })
})

app.use("/api/v1",router)

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`)
})