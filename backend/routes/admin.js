import express,{Router} from 'express'
import zod from 'zod'

const router = Router();

router.get("/",(req,res)=>{
    res.send("Admin Route Working! 😁")
})


export default router