import { Router } from "express";
import { userControllers, appControllers } from "../controllers/index.js";
import { jwtAuthorization } from "../middlewares/index.js";
import multer from "multer"

const upload = multer({ dest: 'uploads/' })

const userRouter=Router()

userRouter.get("/",(req,res)=>{
    res.json({
        message:"Healthy route user"
    })
})

//SignIn
userRouter.post("/signin",userControllers.signIn)

//SignUp
userRouter.post("/signup",userControllers.signUp)

//Get User Tags
userRouter.get("/get-user-tags",jwtAuthorization,userControllers.getUserTags)

//Add User Tag
userRouter.post("/add-new-tag",jwtAuthorization,userControllers.addUserTag)

//Delete User Tags
userRouter.delete("/delete-user-tag",jwtAuthorization,userControllers.deleteUserTag)

//Get Profile 
userRouter.get("/get-user-data",jwtAuthorization,userControllers.getUserProfile)

//Update Profile
userRouter.post("/update-profile",jwtAuthorization,userControllers.updateProfile)

//Get all users
userRouter.get("/get-all-users",jwtAuthorization,appControllers.getAllUsers)

//Get User Spendings
userRouter.get("/get-user-spendings",jwtAuthorization,userControllers.getUserSpendings)

//Post a spending record
userRouter.post("/create-spending-record",jwtAuthorization, upload.single('receiptImage'),userControllers.createTransactionRecord)

export {
    userRouter
}