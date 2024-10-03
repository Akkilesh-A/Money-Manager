import { Router } from "express";

const parentRouter=Router()

parentRouter.get("/",(req,res)=>{
    res.json({
        message:"Healthy route parent"
    })
})

export {
    parentRouter
}