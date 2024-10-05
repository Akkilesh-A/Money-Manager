import { Router } from "express";
import { adultControllers } from "../controllers/index.js";
import { jwtAuthorization } from "../middlewares/index.js";
import multer from "multer"

const uploads=multer({
    dest:"uploads/"
})

const adultRouter=Router()

adultRouter.get("/",(req,res)=>{
    res.json({
        message:"Healthy route adult"
    })
})

adultRouter.post("/signin",adultControllers.signIn)

adultRouter.post("/signup",adultControllers.signUp)

adultRouter.get("/get-data",jwtAuthorization,adultControllers.getData)

adultRouter.post("/update-profile",jwtAuthorization,uploads.single(),adultControllers.updateProfile)

export {
    adultRouter
}