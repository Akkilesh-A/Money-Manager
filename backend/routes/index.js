import express,{Router} from 'express'
import userRouter from './user.js'
import adminRouter from './admin.js'

const router = Router();

router.get("/",(req,res)=>{
    res.send("Router Route Working! 😁")
})

router.use("/admin",adminRouter)

router.use("/user",userRouter)

export default router