import express,{ Router } from 'express';
import cors from 'cors';
import RouterRoute from './routes/router.js'
const app=express();
const port= 3000;
const router=Router();

app.use(router)

app.get("/",(req,res)=>{
    res.send("Healthy Server Running!😁")
})

router.use("/router",RouterRoute)

app.listen(port,()=>{
    console.log(`Successfully running in Port-${port}`)
})