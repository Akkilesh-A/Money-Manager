import { Router } from "express";
import { adultControllers } from "../controllers/index.js";

const adultRouter=Router()

adultRouter.get("/",(req,res)=>{
    res.json({
        message:"Healthy route adult"
    })
})

adultRouter.get("/signin",adultControllers.signIn)

export {
    adultRouter
}