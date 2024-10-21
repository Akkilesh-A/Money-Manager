import { Router } from "express";
import { userRouter } from "./user.js";

const router=Router()

router.get("/",(req,res)=>{
    res.json({
        message:"Healthy route api/v1"
    })
})

router.use("/user",userRouter)

export {
    router
}