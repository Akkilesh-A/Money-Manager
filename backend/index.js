import express,{ Router } from 'express';
import cors from 'cors';

const app=express();
const port= 3000;
const router=Router();

app.get("/",(req,res)=>{
    res.send("Healthy Server Running!😁")
})

router.get("/admin")

app.listen(port,()=>{
    console.log(`Successfully running in Port-${port}`)
})