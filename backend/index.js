import express,{ Router } from 'express';
import cors from 'cors';
import RouterRoute from './routes/index.js'
import { connection }  from './db/connection.js';
import dotenv from 'dotenv';
dotenv.config();

const app=express();
const port=process.env.PORT || 3000;
const router=Router();

app.use(express.json())
app.use(cors())

connection();

app.get("/",(req,res)=>{
    res.send("Healthy Server Running!😁")
})

app.use(router)
router.use("/api/v1",RouterRoute)

app.listen(port,()=>{
    console.log(`Successfully running in Port-${port}`)
})