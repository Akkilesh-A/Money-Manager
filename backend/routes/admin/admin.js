import express,{Router} from 'express'

const router = Router();

router.get("/",(req,res)=>{
    res.send("Admin Route Working! 😁")
})

export default router