import { Router } from "express";
import { adultControllers, appControllers } from "../controllers/index.js";
import { jwtAuthorization } from "../middlewares/index.js";
import multer from "multer"

const uploads=multer({
    dest:"uploads/"
})

const userRouter=Router()

userRouter.get("/",(req,res)=>{
    res.json({
        message:"Healthy route adult"
    })
})

//SignIn
userRouter.post("/signin",adultControllers.signIn)

//SignUp
userRouter.post("/signup",adultControllers.signUp)

//Get User Tags
userRouter.get("/get-user-tags",jwtAuthorization,adultControllers.getUserTags)

//Add User Tag
userRouter.post("/add-new-tag",jwtAuthorization,adultControllers.addUserTag)

//Delete User Tags
userRouter.delete("/delete-user-tag",jwtAuthorization,adultControllers.deleteUserTag)

//Get Profile 
userRouter.get("/get-user-data",jwtAuthorization,adultControllers.getUserProfile)

//Update Profile
userRouter.post("/update-profile",jwtAuthorization,adultControllers.updateProfile)

//Get Transactions
userRouter.get("/get-user-transactions",jwtAuthorization,adultControllers.getUserTransactions)

//Get all users
userRouter.get("/get-all-users",jwtAuthorization,appControllers.getAllUsers)

//Post a transaction record
userRouter.post("/create-transaction-record",jwtAuthorization,adultControllers.createTransactionRecord)

export {
    userRouter
}