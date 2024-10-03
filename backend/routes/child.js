import { Router } from "express";

const childRouter=Router()

childRouter.get("/",(req,res)=>{
    res.json({
        message:"Healthy route child"
    })
})

export {
    childRouter
}