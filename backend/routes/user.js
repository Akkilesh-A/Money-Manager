import { Router } from "express";
import { userControllers, appControllers, authControllers } from "../controllers/index.js";
import { jwtAuthorization } from "../middlewares/index.js";
import multer from "multer"

const upload = multer({ dest: 'uploads/' })

const userRouter=Router()

userRouter.get("/",(req,res)=>{
    res.json({
        message:"Healthy route user"
    })
})

//AUTH ROUTES
//SignIn
userRouter.post("/signin",authControllers.signIn)

//SignUp
userRouter.post("/signup",authControllers.signUp)

//OTP VERIFICATION 
userRouter.post("/otp-verification",jwtAuthorization,authControllers.otpVerification)
 
//SESSION RESTORATION
userRouter.get("/user-verification",jwtAuthorization,authControllers.userVerification)

// HOME PAGE

//ADD MONEY TO WALLET
userRouter.post("/add-money-to-wallet",jwtAuthorization,userControllers.addMoney)
//WITHDRAW MONEY FROM WALLET
userRouter.post("/withdraw-money-from-wallet",jwtAuthorization,userControllers.withdrawMoney)

//Number of spendings per tag graph
userRouter.get("/get-number-of-spendings-per-tag",jwtAuthorization,userControllers.getNumberOfSpendingsPerTag)
userRouter.get("/get-spendings-per-tag",jwtAuthorization,userControllers.getSpendingsPerTag)

//Get User Tags
userRouter.get("/get-user-tags",jwtAuthorization,userControllers.getUserTags)

//Add User Tag
userRouter.post("/add-new-tag",jwtAuthorization,userControllers.addUserTag)

userRouter.post("/update-user-tag",jwtAuthorization,userControllers.updateUserTag)

//Delete User Tags
userRouter.delete("/delete-user-tag",jwtAuthorization,userControllers.updateUserTag)

//Get Profile 
userRouter.get("/get-user-data",jwtAuthorization,userControllers.getUserProfile)

//Update Profile
userRouter.post("/update-profile",jwtAuthorization,userControllers.updateProfile)

//Get all users
userRouter.get("/get-all-users",jwtAuthorization,appControllers.getAllUsers)

//Get User Spendings
userRouter.get("/get-user-spendings",jwtAuthorization,userControllers.getUserSpendings)

//Post a spending record
userRouter.post("/create-spending-record",jwtAuthorization, upload.single('receiptImage'),userControllers.createSpendingRecord)

export {
    userRouter
}