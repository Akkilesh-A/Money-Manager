import { Router } from "express";
import { parentRouter } from "./parent.js";
import { childRouter } from "./child.js";
import { adultRouter } from "./adult.js";

const router=Router()

router.get("/",(req,res)=>{
    res.json({
        message:"Healthy route api/v1"
    })
})

router.use("/parent",parentRouter)

router.use("/child",childRouter)

router.use("/adult",adultRouter)

export {
    router
}