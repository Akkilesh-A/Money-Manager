import { Router } from "express";
import { adultControllers } from "../controllers/index.js";

const adultRouter=Router()

adultRouter.get("/",(req,res)=>{
    res.json({
        message:"Healthy route adult"
    })
})

adultRouter.post("/signin",adultControllers.signIn)

adultRouter.post("/signup",adultControllers.signUp)

export {
    adultRouter
}