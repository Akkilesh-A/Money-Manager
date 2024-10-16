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

//SignIn
adultRouter.post("/signin",adultControllers.signIn)

//SignUp
adultRouter.post("/signup",adultControllers.signUp)

//Get User Tags
adultRouter.get("/get-user-tags",jwtAuthorization,adultControllers.getUserTags)

//Add User Tag
adultRouter.post("/add-new-tag",jwtAuthorization,adultControllers.addUserTags)

//Delete User Tags
adultRouter.delete("/delete-user-tag",jwtAuthorization,adultControllers.deleteUserTag)

//Get Profile 
adultRouter.get("/get-user-data",jwtAuthorization,adultControllers.getData)

//Update Profile
adultRouter.post("/update-profile",jwtAuthorization,adultControllers.updateProfile)

export {
    adultRouter
}