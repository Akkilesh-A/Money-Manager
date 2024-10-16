import express, { Router } from 'express';
import cors from 'cors';
import { configDotenv } from 'dotenv';
import connectDB from './db/connection.js';
import { router } from './routes/index.js';
import { cloudinaryUpload } from './helpers/cloudinaryUpload.js';

const app=express()
app.use(express.json())
configDotenv()
app.use(cors())
connectDB()

app.get("/",(req,res)=>{
    cloudinaryUpload()
    res.status(200).json({
        message:`Healthy server running in ${process.env.PORT}`
    })
})

app.use("/api/v1",router)

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`)
})