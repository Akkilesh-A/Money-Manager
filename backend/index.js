import express from 'express';
import { configDotenv } from 'dotenv';

const app=express()
app.use(express.json())
configDotenv()

app.get("/",(req,res)=>{
    res.status(200).json({
        message:`Healthy server running ${process.env.PORT}`
    })
})

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`)
})